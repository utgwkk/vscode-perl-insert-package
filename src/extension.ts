// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

function currentFileRelativePath(editor: vscode.TextEditor): string {
	const currentFileUri = editor.document.uri;
	const relativePath = vscode.workspace.asRelativePath(currentFileUri);

	return relativePath;
}

function makePackageDeclaration(path: string): string {
	const packageName = path.replace('.pm', '').replace('lib/', '').replace('/', '::');
	return `package ${packageName};`;
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerTextEditorCommand('perl-insert-package.insertPackageDecl', (editor, editBuilder) => {
		const relativePath = currentFileRelativePath(editor);
		if (relativePath === undefined) {
			vscode.window.showErrorMessage('please open perl file');
			return;
		}

		const packageDecl = makePackageDeclaration(relativePath);
		editor.selections.forEach(selection => {
			editBuilder.insert(selection.start, packageDecl);
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
