# Change Log

All notable changes to the "perl-insert-package" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## 1.10.2

- Make package name completion experimental.
- Make package name completion disabled by default.
  - Package name completion overrides all completion candidates. It was very inconvenient so I decided making disabled it by default.

## 1.10.1

- Completion for `package` declaration is triggered up to first 3 lines of Perl program.
- If Perl program already has a `package` declaration, completion for `package` declaration is not triggered.

## 1.10.0

- Add a completion for package name. (new feature)

## 1.9.2

- Move used packages to the top of QuickPick. (new feature)

## 1.8.2

- Add a changelog.

## 1.8.1

- Move recently completed package to top of QuickPick.
- Load cached file list on opening a VS Code window. (bug fix)

## 1.8.0

- Add a command to insert current package name. (new feature)

## 1.7.1

- Show package name on QuickPick.

## 1.7.0

- Cache file list.

## 1.6.2

- Add a screenshot.

## 1.6.1

- Revert change of package name.

## 1.6.0

- Implement complemention of package name from QuickPick. (new feature)
- Enable the extension only `editorLangId == perl` .

## 1.5.4

- Use OS default path separator as default replace rule.

## 1.5.3

- Use OS default path separator for applying many replace rules.

## 1.5.2

- Change package name. (vscode-perl-insert-package -> perl-insert-package)
- Use OS default path separator.

## 1.5.1

- Invoke completion of package name declaration after inserting `packa` .

## 1.5.0

- Make file path to package name translation rule configuable. (new feature)

## 1.4.0

- Add package name completion.
- Add screenshot to README.

## 1.3.0

- Replace all `/` to `::`.

## 1.2.0

- Use registerTextEditorCommand.

## 1.1.0

- Change command namespace.

## 1.0.4 (1.0.3)

- Remove debug log output.
- Add activation condition. (onLanguage:Perl)

## 1.0.2

- Change category.
- Add icon.

## 1.0.1

- Change displayName.

## 1.0.0

- First release.
