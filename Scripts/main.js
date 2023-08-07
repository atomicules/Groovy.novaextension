
var langserver = null;

exports.activate = function() {
    // Do work when the extension is activated
    langserver = new GroovyLanguageServer();
}

exports.deactivate = function() {
    // Clean up state before the extension is deactivated
    if (langserver) {
        langserver.deactivate();
        langserver = null;
    }
}


class GroovyLanguageServer {
    constructor() {
        // Observe the configuration setting for the server's location, and restart the server on change
        nova.config.observe('groovy.java-binary-path', function(path) {
            this.start(path);
        }, this);

        // Handle preference change for enable/disable.
        // Copied from: https://github.com/GwynethLlewelyn/Go.novaextension/blob/master/Scripts/main.js
        nova.config.onDidChange('groovy.lsp-enabled', function (current, previous) {
            // This is firing too much at the moment. See:
            // https://devforum.nova.app/t/nova-config-ondidchange-callback-invokes-7-times/2020
            console.log("DEBUG: current is: " + current);
            console.log("DEBUG: previous is: " + previous);
            // We don't care about `previous` here since we are just dealing with a boolean
            // We just need to know if `current` is `true` or `false`
            if (current) {
                this.start();
            } else {
                this.stop();
            }
        }, this);
    }

    deactivate() {
        this.stop();
    }

    start(path) {
        if (this.languageClient) {
            this.languageClient.stop();
            nova.subscriptions.remove(this.languageClient);
        }

        // Use the default server path if one isn't set
        if (!path) {
            path = '/usr/bin/java' ;
        }

        // Create the client
        var serverOptions = {
            path: path,
            args: ['-jar', nova.path.join(nova.extension.path, 'Scripts/server/groovy-language-server-all.jar')]
        };

        var lcDebug = false;
        if (nova.inDevMode()) {
            lcDebug = true
        }

        var clientOptions = {
            // The set of document syntaxes for which the server is valid
            syntaxes: ['groovy'],
            debug: lcDebug
        };

        var client = new LanguageClient('groovy-langserver', 'Groovy Language Server', serverOptions, clientOptions);

        if (nova.config.get('groovy.lsp-enabled')) {
            if (nova.inDevMode()) {
                console.log("DEBUG: Option to start Groovy language server is selected");
                console.log("DEBUG: Java path is: " + path);
            }
            try {
                // Start the client
                client.start();
                console.log("INFO: Starting Groovy language server");
                // Add the client to the subscriptions to be cleaned up
                nova.subscriptions.add(client);
                this.languageClient = client;
            }
            catch (err) {
                // If the .start() method throws, it's likely because the path to the language server is invalid
                
                if (nova.inDevMode()) {
                    console.error(err);
                }
            }
        }
        else {
            if (nova.inDevMode()) {
                console.log("DEBUG: Option to start Groovy language server is deselected");
            }
            // We could also explicitly call a stop here, but in theory it shouldn't reach this point and be running
        }
    }

    stop() {
        if (this.languageClient) {
            console.log("INFO: Stopping Groovy language server");
            this.languageClient.stop();
            nova.subscriptions.remove(this.languageClient);
            this.languageClient = null;
        }
    }
}

