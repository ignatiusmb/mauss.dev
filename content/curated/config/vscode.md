---
title: VS Code Configuration - Extensions and Settings
date:updated: 2020-08-08
---

This is my curated list of VS Code extensions that I have installed and its corresponding settings, fully synced on all of my machines. Each extensions has its own purpose and unique perks, I'll explain it briefly for each item in this list.

I will list all the extensions complete with its name and url link to the marketplace. Another way to install all the extensions in this list quickly is to use a [simple python script](https://github.com/ignatiusmb/codesync-extensions/) I made, available as a repository on my GitHub account with my extensions embedded with it.

## Editor Enhancements

```json
~Built-in settings
"editor.suggest.snippetsPreventQuickSuggestions": false,
```

### [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)

Spell checking has helped me so much in naming my variables and writing my code. It has also helped me a lot when I'm writing for my posts in markdown so that I don't misspell anything stupid, paired with `Error Lens` it makes a perfect combo for dev bloggers.

### [Beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify)

I only use this to format my `html` files, everything else uses Prettier.

```json
"beautify.language": {
  "js": {},
  "css": [],
  "html": ["htm", "html"]
},
"[html]": {
  "editor.defaultFormatter": "HookyQR.beautify"
},
```

### [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

From [editorconfig.org](https://editorconfig.org/), it helps maintain consistent coding styles for multiple developers across various editors and IDEs. A lot of editors should natively support this, but VS Code doesn't, so this is where the plugin comes in. Below is my current goto config, will be updated frequently as I get used to it.

```editorconfig
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = tab
trim_trailing_whitespace = true

[*.md]
indent_size = 4
indent_style = space

[package.json]
indent_style = space
```

### [gitignore](https://marketplace.visualstudio.com/items?itemName=codezombiech.gitignore)

Quickly add a `.gitignore` file that fetches its data from the GitHub mega repository consisting of multiple ignore files for various file extensions.

### [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

Makes everything related to Git more convenient and nice.

```json
"gitlens.advanced.telemetry.enabled": false,
"gitlens.codeLens.scopes": ["document", "containers"],
"gitlens.mode.statusBar.enabled": false,
"gitlens.recentChanges.highlight.locations": ["line", "gutter", "overview"],
"gitlens.views.compare.enabled": false,
"gitlens.views.fileHistory.location": "scm",
"gitlens.views.lineHistory.enabled": false,
```

### [Image preview](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-gutter-preview)

Creates a small preview of the image linked in the sidebar right by the line number, helpful to know if the link in valid. Anything from relative paths to url will be displayed.

### [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

My choice of code formatter, it supports a huge variety of languages.

```json
"prettier.disableLanguages": ["html", "vue"],
"vetur.format.defaultFormatter.css": "prettier",
"vetur.format.defaultFormatter.js": "prettier",
```

### [Remote - WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)

The only extension made to connect VS Code and WSL natively by Microsoft.

### [Visual Studio IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)

Still has some problems with Python built-in jedi, but it's way too useful for other languages, especially JavaScript.

```json
"vsintellicode.modify.editor.suggestSelection": "automaticallyOverrodeDefaultValue",
"vsintellicode.python.completionsEnabled": true, // false if you want to use jedi
```

## Editor Visuals

### [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)

Supports `.env` files with syntax highlighting.

### [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)

Super helpful extension that highlights the entire line where a diagnostic is generated with the message printed inline. Always makes any error stands out to quickly debug and fix it.

### [indent-rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow)

Really helpful and makes reading code easier with the different indentation color coded.

```json
"indentRainbow.errorColor": "rgba(0,0,0,0)",
```

### [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)

My icon pack of choice.

### [Rainbow Brackets](https://marketplace.visualstudio.com/items?itemName=2gua.rainbow-brackets)

Rainbow Brackets is an alternative to Bracket Pair Colorizer, it's lightweight and doesn't heat up the PC much. I read it somewhere that Bracket Pair Colorizer, even when idle sucks up much power, so I immediately changed it to Rainbow Brackets and noticed some improvements with it.

### [Rainbow CSV](https://marketplace.visualstudio.com/items?itemName=mechatroner.rainbow-csv)

Makes CSV much more easy to read while still being lightweight.

## Language Specific

### [C/C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)

### [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)

### [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python)

### [Python Indent](https://marketplace.visualstudio.com/items?itemName=KevinRose.vsc-python-indent)

Python Indent makes it so when you enter into a new line, it corrects it for you automatically. Working with other languages is a breeze, you don't need to worry about the indentation or spacing between it because the formatter will correct itself according to the curly brackets. But, we don't have that in Python, and one indent difference is the difference between executing in the loop or after the loop.

### [MagicPython](https://marketplace.visualstudio.com/items?itemName=magicstack.MagicPython)

A supplementary extension for those working with other file extensions that don't necessarily have `py` in it but still relates to Python like `.wsgi`

### [Kivy](https://marketplace.visualstudio.com/items?itemName=BattleBas.kivy-vscode)

Used to work with Kivy making cross-platform applications using Python and this has helped a lot with providing syntax highlighting, code snippets, and language server that provides diagnostics.

### [Java Properties](https://marketplace.visualstudio.com/items?itemName=ithildir.java-properties)

A simple syntax highlighter for `.properties` files.

### [Gradle Language Support](https://marketplace.visualstudio.com/items?itemName=naco-siren.gradle-language)

Add syntax highlighting and language support with autocomplete (Intellisense).

## Web Development

### [Babel JavaScript](https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel)

Used to have this when I was developing with React (JSX), it supports a lot of things in modern JS ecosystem like highlighting for React, GraphQL, and style-components (CSS-in-JS).

### [CSS Peek](https://marketplace.visualstudio.com/items?itemName=pranaygp.vscode-css-peek)

Allow peeking CSS IDs and classes directly to the respective CSS file. Avoid having to manually search and debug for the selectors by yourself.

### [css-triggers](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.csstriggers)

Pretty helpful for beginners to learn writing CSS firsthand. It provides information about their costs, what will be affected, and how it will affect it.

### [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Integrates ESLint directly to VS Code whenever you have it install globally or locally.

### [HTML CSS Support](https://marketplace.visualstudio.com/items?itemName=ecmel.vscode-html-css)

CSS support with class and ID attribute completion.

```json
"css.lint.duplicateProperties": "error",
"css.lint.compatibleVendorPrefixes": "warning",
"css.lint.float": "error",
"css.remoteStyleSheets": [],
```

### [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

Quick server for plain HTML and vanilla JavaScript development.

```json
"liveServer.settings.CustomBrowser": "firefox",
"liveServer.settings.donotShowInfoMsg": true,
"liveServer.settings.donotVerifyTags": true,
"liveServer.settings.host": "localhost",
"liveServer.settings.port": 0,
```

### [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)

Display the size of the imported package inline after the import.

```json
"importCost.bundleSizeDecoration": "both",
"importCost.javascriptExtensions": ["\\.js?$", "\\.jsx?$"],
"importCost.timeout": 60000,
```

### [npm](https://marketplace.visualstudio.com/items?itemName=eg2.vscode-npm-script)

This extension is to ensure that `package.json` is up to date and are not bloated by unused modules. Used with the extension below.

### [npm Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)

This indexes the `package.json` and `node_modules` folder to autocomplete `import` statements when importing or requiring modules.

### [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

Allows you to send HTTP request and view the response in directly from the file editor. A lightweight and simple alternative for Postman.

```json
"rest-client.enableTelemetry": false,
```

### [TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin)

Typescript Lint support by Microsoft.

## JS Framework Complementary

### [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)

The official Svelte extension developed by the internal team is available and it's amazing, I think it's definitely not a question for anyone writing Svelte in VS Code.

```json
"[svelte]": {
  "editor.defaultFormatter": "svelte.svelte-vscode"
},
```

### [Svelte 3 Snippets](https://marketplace.visualstudio.com/items?itemName=fivethree.vscode-svelte-snippets)

Using snippets are completely a subjective matter, it's really your choice whether to use pre-made snippets, create your own, or just write it from scratch every time. At least for me, I quite enjoy having snippets to quickly type in my code.

### [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)

### [Vue Snippets](https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-snippets)

## Mobile Development

### [Dart](https://marketplace.visualstudio.com/items?itemName=Dart-Code.dart-code)

Dart language support and debugger.

```json
"dart.debugExternalLibraries": false,
"dart.debugSdkLibraries": false,
"dart.previewFlutterUiGuides": true,
"dart.previewFlutterUiGuidesCustomTracking": true,

"[dart]": {
  "editor.rulers": [80],
  "editor.selectionHighlight": false,
  "editor.suggest.snippetsPreventQuickSuggestions": false,
  "editor.suggestSelection": "first",
  "editor.tabCompletion": "onlySnippets",
  "editor.wordBasedSuggestions": false
},
```

### [Flutter](https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter)

A must-have for Flutter development.

### [Flutter Tree](https://marketplace.visualstudio.com/items?itemName=marcelovelasquez.flutter-tree)

Like emmet for Flutter.

### [Pubspec Assist](https://marketplace.visualstudio.com/items?itemName=jeroen-meijer.pubspec-assist)

Easily add dependencies to your Dart / Flutter project.

## Miscellaneous

### [Ascii Tree Generator](https://marketplace.visualstudio.com/items?itemName=aprilandjan.ascii-tree-generator)

Quickly generates tree-like structure of directories and files with ascii. Pretty helpful when working with text-only to visualize something and we don't need to exit the editor.

### [Instant Markdown](https://marketplace.visualstudio.com/items?itemName=dbankier.vscode-instant-markdown)

Instantly preview markdown inside the editor.

```json
"instantmarkdown.autoOpenBrowser": false,
"instantmarkdown.autoCloseServerAndBrowser": false,
```

### [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)

Complete all in one markdown support.

```json
"[markdown]": {
  "editor.defaultFormatter": "yzhang.markdown-all-in-one",
  "editor.lineHeight": 24,
  "editor.lineNumbers": "off",
  "editor.minimap.enabled": false,
  "editor.tabSize": 4,
  "editor.wordWrap": "wordWrapColumn",
  "editor.wordWrapColumn": 96,
  "editor.quickSuggestions": {
    "other": false,
    "comments": false,
    "strings": false
  },
  "files.eol": "\n"
},
```

### [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)

Markdown linter for clean markdown writing.

```json
"markdownlint.config": {
  "MD013": false,
  "MD025": false,
  "MD029": false,
  "MD033": false,
  "MD040": false,
  "MD041": false
},
```

### [XML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-xml) & [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml)

XML and YAML language support with syntax highlighting by Red Hat.

## Complete User Configuration

```json
~VS Code Version 1.47.3
{
  "beautify.language": {
    "js": {},
    "css": [],
    "html": ["htm", "html"]
  },
  "breadcrumbs.enabled": true,
  "C_Cpp.clang_format_fallbackStyle": "{ BasedOnStyle: Google, IndentWidth: 3, ColumnLimit: 0}",
  "css.lint.duplicateProperties": "error",
  "css.lint.compatibleVendorPrefixes": "warning",
  "css.lint.float": "error",
  "css.remoteStyleSheets": [],
  "debug.inlineValues": true,
  "dart.debugExternalLibraries": false,
  "dart.debugSdkLibraries": false,
  "dart.previewFlutterUiGuides": true,
  "dart.previewFlutterUiGuidesCustomTracking": true,
  "diffEditor.ignoreTrimWhitespace": false,
  "diffEditor.renderSideBySide": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.markdownlint": true,
    "source.fixAll.eslint": true
  },
  "editor.cursorSmoothCaretAnimation": true,
  "editor.detectIndentation": true,
  "editor.fontFamily": "Fira Code Light",
  "editor.fontLigatures": true,
  "editor.fontSize": 14,
  "editor.fontWeight": "300",
  "editor.formatOnSave": true,
  "editor.insertSpaces": false,
  "editor.minimap.enabled": true,
  "editor.multiCursorModifier": "ctrlCmd",
  "editor.renameOnType": true,
  "editor.renderWhitespace": "selection",
  "editor.suggest.maxVisibleSuggestions": 15,
  "editor.suggest.snippetsPreventQuickSuggestions": false,
  "editor.suggestSelection": "first",
  "editor.tabSize": 2,
  "editor.wordWrap": "bounded",
  "editor.wordWrapColumn": 100,
  "eslint.options": {
    "extensions": [".html", ".js", ".vue", ".jsx"]
  },
  "eslint.validate": ["javascript", "javascriptreact", "html"],
  "explorer.confirmDelete": false,
  "explorer.confirmDragAndDrop": false,
  "files.associations": {},
  "files.autoSave": "off",
  "files.encoding": "utf8",
  "files.eol": "\n",
  "files.exclude": {
    "**/.classpath": true,
    "**/.project": true,
    "**/.settings": true,
    "**/.factorypath": true
  },
  "files.insertFinalNewline": true,
  "files.trimFinalNewlines": true,
  "git.alwaysShowStagedChangesResourceGroup": true,
  "git.autofetch": true,
  "git.confirmSync": false,
  "git.untrackedChanges": "separate",
  "git.promptToSaveFilesBeforeCommit": "staged",
  "gitlens.advanced.telemetry.enabled": false,
  "gitlens.codeLens.scopes": ["document", "containers"],
  "gitlens.mode.statusBar.enabled": false,
  "gitlens.recentChanges.highlight.locations": ["line", "gutter", "overview"],
  "gitlens.views.compare.enabled": false,
  "gitlens.views.fileHistory.location": "scm",
  "gitlens.views.lineHistory.enabled": false,
  "importCost.bundleSizeDecoration": "both",
  "importCost.javascriptExtensions": ["\\.js?$", "\\.jsx?$"],
  "importCost.timeout": 60000,
  "indentRainbow.errorColor": "rgba(0,0,0,0)",
  "instantmarkdown.autoOpenBrowser": false,
  "instantmarkdown.autoCloseServerAndBrowser": false,
  "java.format.settings.profile": "GoogleStyle",
  "java.format.settings.url": "https://raw.githubusercontent.com/google/styleguide/gh-pages/eclipse-java-google-style.xml",
  "java.implementationsCodeLens.enabled": true,
  "java.errors.incompleteClasspath.severity": "ignore",
  "javascript.format.enable": false,
  "javascript.implicitProjectConfig.checkJs": true,
  "javascript.validate.enable": false,
  "liveServer.settings.CustomBrowser": "firefox",
  "liveServer.settings.donotShowInfoMsg": true,
  "liveServer.settings.donotVerifyTags": true,
  "liveServer.settings.host": "localhost",
  "liveServer.settings.port": 0,
  "markdownlint.config": {
    "MD013": false,
    "MD025": false,
    "MD029": false,
    "MD033": false,
    "MD040": false,
    "MD041": false
  },
  "material-icon-theme.activeIconPack": "none",
  "material-icon-theme.hidesExplorerArrows": true,
  "material-icon-theme.opacity": 1,
  "php.suggest.basic": false,
  "prettier.disableLanguages": ["html", "vue"],
  "python.autoComplete.addBrackets": false,
  "python.dataScience.askForKernelRestart": false,
  "python.dataScience.sendSelectionToInteractiveWindow": false,
  "python.formatting.autopep8Args": ["--ignore", "E402"],
  "python.formatting.blackArgs": ["--line-length", "100"],
  "python.formatting.provider": "yapf",
  "python.languageServer": "Microsoft",
  "python.linting.pylintArgs": [
    "--load-plugins",
    "pylint_django",
    "pylint_flask",
    "--disable",
    "C0111"
  ],
  "python.linting.pylintEnabled": true,
  "remote.downloadExtensionsLocally": true,
  "rest-client.enableTelemetry": false,
  "telemetry.enableTelemetry": false,
  "telemetry.enableCrashReporter": false,
  "terminal.explorerKind": "integrated",
  "terminal.integrated.cursorBlinking": true,
  "terminal.integrated.cursorStyle": "block",
  "terminal.integrated.commandsToSkipShell": [],
  "terminal.integrated.fontFamily": "Fira Code Light",
  "terminal.integrated.fontSize": 14,
  "terminal.integrated.rendererType": "dom",
  "terminal.integrated.rightClickBehavior": "copyPaste",
  "terminal.integrated.shell.windows": "C:\\Windows\\System32\\cmd.exe",
  "terminal.integrated.showExitAlert": false,
  "vetur.format.defaultFormatter.css": "prettier",
  "vetur.format.defaultFormatter.js": "prettier",
  "vetur.validation.template": false,
  "vsintellicode.modify.editor.suggestSelection": "automaticallyOverrodeDefaultValue",
  "vsintellicode.python.completionsEnabled": true,
  "window.titleSeparator": " • ",
  "window.zoomLevel": 0,
  "workbench.iconTheme": "material-icon-theme",
  "workbench.settings.editor": "json",
  "workbench.sideBar.location": "right",
  "workbench.tree.indent": 10,
  "xml.codeLens.enabled": true,
  "xml.format.splitAttributes": true,
  "[cpp]": {
    "editor.tabSize": 3,
    "editor.wordBasedSuggestions": true
  },
  "[dart]": {
    "editor.rulers": [80],
    "editor.selectionHighlight": false,
    "editor.suggest.snippetsPreventQuickSuggestions": false,
    "editor.suggestSelection": "first",
    "editor.tabCompletion": "onlySnippets",
    "editor.wordBasedSuggestions": false
  },
  "[html]": {
    "editor.defaultFormatter": "HookyQR.beautify"
  },
  "[java]": {
    "editor.tabSize": 4
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.fontLigatures": "'ss02', 'ss19'"
  },
  "[markdown]": {
    "editor.defaultFormatter": "yzhang.markdown-all-in-one",
    "editor.lineHeight": 24,
    "editor.lineNumbers": "off",
    "editor.minimap.enabled": false,
    "editor.tabSize": 4,
    "editor.wordWrap": "wordWrapColumn",
    "editor.wordWrapColumn": 96,
    "editor.quickSuggestions": {
      "other": false,
      "comments": false,
      "strings": false
    },
    "files.eol": "\n"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[python]": {
    "editor.tabSize": 4
  },
  "[svelte]": {
    "editor.defaultFormatter": "svelte.svelte-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[yaml]": {
    "editor.defaultFormatter": "redhat.vscode-yaml"
  }
}

```
