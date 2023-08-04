**Groovy** is (at the current time) a rough and ready [Nova extension](https://extensions.panic.com/) for the [Groovy](http://www.groovy-lang.org) programming language. It basically does nothing beyond package up [other people's good work](#credits) into a Nova extension.

![Groovy Nova screenshot](https://raw.githubusercontent.com/atomicules/Groovy.novaextension/main/Images/extension/groovy-nova-screenshot.png)


## Requirements

Groovy requires some additional tools to be installed on your Mac:

- Java (However that maybe: Homebrew, or [Adoptium](https://adoptium.net/temurin/releases), or other)


## Usage

Groovy runs automatically (syntax highlighting and a language server) on any file identified as Groovy. The language server will report errors and warnings in Nova's **Issues** sidebar and the editor gutter.


### Configuration

There is minimal configuration at the moment. You can set the path the the `java` binary by opening **Extensions → Extension Library...** then selecting Groovy's **Preferences** tab.


## Developing

This extension bundles in the [Groovy Language Server](https://github.com/GroovyLanguageServer/groovy-language-server). That will need updating periodically. Follow their README instructions to update the jar.

It's using tree-sitter since that is the preferred approach in Nova now. There look to be a few options now (although [very recently weren't any](https://github.com/tree-sitter/tree-sitter/discussions/1274)):

- [Decodetalkers/tree-sitter-groovy](https://github.com/Decodetalkers/tree-sitter-groovy)
- [codieboomboom/tree-sitter-groovy](https://github.com/codieboomboom/tree-sitter-groovy)
- [evolighting/tree-sitter-groovy](https://github.com/evolighting/tree-sitter-groovy)

I've tried all of these in order and so am currently using [evolighting/tree-sitter-groovy](https://github.com/evolighting/tree-sitter-groovy).

The dylib will have to be [re-built](https://docs.nova.app/syntax-reference/tree-sitter/#compiling-a-parser) periodically per the Nova docs, e.g:

```
cd /path/to/groovy-tree-sitter
# Copy in the example compile_parser.sh and Makefile provided by Panic
tree-sitter generate
./compile_parser.sh ./ /Applications/Nova.app/
cp libtree-sitter-groovy.dylib /path/to/this/Groovy.novaextension/Syntaxes/libtree-sitter-groovy.dylib
cd /path/to/this/Groovy.novaextension/Syntaxes/libtree-sitter-groovy.dylib
codesign -s - Syntaxes/libtree-sitter-groovy.dylib
```

### Todo

1. Understand Tree-sitter and `highlights.scm`. Try as I might I just don't get them yet.
2. Maybe tweak whichever tree-sitter-groovy is currently being used, if needed
3. Tweak `highlights.scm` so it's better
4. Goto 2, repeat, etc


## Motivation

I wanted syntax highlighting for working on Jenkins Groovy files. In my naïvety I didn't realise the Language Server Protocol stuff didn't include syntax highlighting so implemented that needlessly really.


## Credits

- [Groovy Language Server](https://github.com/GroovyLanguageServer/groovy-language-server)
- [tree-sitter-groovy](https://github.com/evolighting/tree-sitter-groovy)
- [tree-sitter-java](https://github.com/tree-sitter/tree-sitter-java) (I based highlights.scm on [theirs](https://github.com/tree-sitter/tree-sitter-java/blob/master/queries/highlights.scm))