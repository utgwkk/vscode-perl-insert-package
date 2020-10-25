# perl-insert-package README

## Features

### Insert `package` declaration for Perl

#### Completion

![completion](https://i.gyazo.com/fb7fc83d4717aa8898b57af8110d82bc.gif)

#### Command

![screenshot](https://i.gyazo.com/32c4dfcf6ec3bf3a39530fa35b6cab66.gif)

### Insert package name for Perl 

#### QuickPick

![insert package name with QuickPick](https://i.gyazo.com/b47345d53a0a142582e3f174a73235fe.gif)

#### Completion

![Package name completion](https://i.gyazo.com/5b0cbea7f4af0aae00f9c75cd4bb1eba.gif)]

## Requirements

You can use this extension without any dependency.
VS Code is only required.

## Extension Settings

### `perl-insert-package.replaceRules`

An array representing replace rules from file path to Perl package name.

Each rule consists of two or three parameters:

#### `before`

A regular expression of target Perl file path.
`{{name}}` is a placeholder of Perl file name that will be converted into package name.

eg: `"^lib/{{name}}\\.pm"`

#### `after`

A conversion destination from file path to package name.
`{{package}}` is a placeholder of package name, that is, `{{name}}` whose separators are replaced into `::`.

eg: `"{{package}}"`

#### `separator`

A delimiter that is converted to `::`. If omitted, default value `/` is used.

### `perl-insert-package.packageNameCompletion.enabled`

Whether package name completion is enabled. Default value is `false` (disabled).
