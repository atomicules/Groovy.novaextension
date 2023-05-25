
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
        nova.config.observe('example.language-server-path', function(path) {
            this.start(path);
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
        
        // Use the default server path
        if (!path) {
            path = '/usr/bin/java' ;
        }

        // Create the client
        var serverOptions = {
            path: path,
            args: ['-jar', nova.path.join(nova.extension.path, 'Scripts/server/groovy-language-server-all.jar')]
        };

        var clientOptions = {
            // The set of document syntaxes for which the server is valid
            syntaxes: ['groovy'],
            debug: true
        };
        var client = new LanguageClient('groovy-langserver', 'Groovy Language Server', serverOptions, clientOptions);
        
        try {
            // Start the client
            client.start();
            
            if (nova.inDevMode()) {
                console.log("Starting Groovy language server");
            }
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
    
    stop() {
        if (this.languageClient) {
            if (nova.inDevMode()) {
                // TODO: Why doesn't this log?
                console.log("Stopping Groovy language server");
            }
            this.languageClient.stop();
            nova.subscriptions.remove(this.languageClient);
            this.languageClient = null;
        }
    }
}

