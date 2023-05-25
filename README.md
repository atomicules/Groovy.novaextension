**Groovy** is (at the current time) a rough and ready [Nova extension](https://extensions.panic.com/) for the [Groovy](http://www.groovy-lang.org) programming language. It basically does nothing beyond package up [other people's good work](#Credits) into a Nova extension.

<!--
🎈 It can also be helpful to include a screenshot or GIF showing your extension in action:
-->

![](https://nova.app/images/en/dark/editor.png)

## Requirements

Groovy requires some additional tools to be installed on your Mac:

- Java (However that maybe: Homebrew, or [Adoptium](https://adoptium.net/temurin/releases), or other)


## Usage


<!--
🎈 Alternatively, if your extension runs automatically (as in the case of a validator), consider showing users what they can expect to see:
-->

Groovy runs any time you open a local project, automatically lints all open files, then reports errors and warnings in Nova's **Issues** sidebar and the editor gutter:

![](https://nova.app/images/en/dark/tools/sidebars.png)

### Configuration

<!--
🎈 If your extension offers global- or workspace-scoped preferences, consider pointing users toward those settings. For example:
-->

To configure global preferences, open **Extensions → Extension Library...** then select Groovy's **Preferences** tab.

You can also configure preferences on a per-project basis in **Project → Project Settings...**

### Developing

This extension bundles in the [Groovy Language Server](https://github.com/GroovyLanguageServer/groovy-language-server). That will need updating periodically. Follow their README instructions to update the jar.

It's using tree-sitter since that is the preferred approach in Nova now. There look to be a few options now (although [very recently weren't any](https://github.com/tree-sitter/tree-sitter/discussions/1274)):

- [Decodetalkers/tree-sitter-groovy](https://github.com/Decodetalkers/tree-sitter-groovy)
- [codieboomboom/tree-sitter-groovy](https://github.com/codieboomboom/tree-sitter-groovy)
- [evolighting/tree-sitter-groovy](https://github.com/evolighting/tree-sitter-groovy)

I went for [Decodetalkers/tree-sitter-groovy](https://github.com/Decodetalkers/tree-sitter-groovy) because it has a `highlights.scm` which at least works as a starter.

The dylib will have to be [re-built](https://docs.nova.app/syntax-reference/tree-sitter/#compiling-a-parser) periodically per the Nova docs.

### Credits

- [Groovy Language Server](https://github.com/GroovyLanguageServer/groovy-language-server)
- [tree-sitter-groovy](https://github.com/Decodetalkers/tree-sitter-groovy)