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

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "perl-insert-package" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.insertPackageDecl', () => {
		// The code you place here will be executed every time your command is executed
		const editor = vscode.window.activeTextEditor;
		if (editor === undefined)
			return undefined;
	
		const relativePath = currentFileRelativePath(editor);
		if (relativePath === undefined) {
			vscode.window.showInformationMessage('please open perl file');
			return;
		}

		const packageDecl = makePackageDeclaration(relativePath);
		editor.edit(builder => {
			editor.selections.forEach(selection => {
				builder.insert(selection.start, packageDecl);
			});
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
