## Version 1.1.0

Makes enabling the language server optional

- Bug fix: Changing the Java binary path didn't work due to variable name mismatch
- Add setting for toggling the language server on/off. I.e. if you just want syntax highlighting
- Improve the development/debug logging

## Version 1.0.1

- Enable syntax highlighting for Jenkinsfile and JobDSL (which was the whole point of this extension)
- Don't enable the LSP for those though. Let's keep that to just *.groovy files for now.

## Version 1.0

Initial release.

Very rough and ready. Syntax highlighting is not quite right, but is "better than nothing".
