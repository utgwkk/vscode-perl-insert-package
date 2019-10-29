// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

function currentFileRelativePath(editor: vscode.TextEditor): string {
	const currentFileUri = editor.document.uri;
	const relativePath = vscode.workspace.asRelativePath(currentFileUri);

	return relativePath;
}

function makePackageName(path: string): string {
	return path.replace('.pm', '').replace('lib/', '').replace(/\//g, '::');
}

function makePackageDeclaration(path: string): string {
	const packageName = makePackageName(path);
	return `package ${packageName};`;
}

function insertPackageDecl(editor: vscode.TextEditor, editBuilder: vscode.TextEditorEdit) {
	const relativePath = currentFileRelativePath(editor);
	if (relativePath === undefined) {
		vscode.window.showErrorMessage('please open perl file');
		return;
	}

	const packageDecl = makePackageDeclaration(relativePath);
	editor.selections.forEach(selection => {
		editBuilder.insert(selection.start, packageDecl);
	});
}

const packageDeclCompletionProvider = {
	provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
		const editor = vscode.window.activeTextEditor;
		if (editor === undefined) {
			return [];
		}

		const relativePath = currentFileRelativePath(editor);
		if (relativePath === undefined) {
			vscode.window.showErrorMessage('please open perl file');
			return;
		}

		const packageDecl = makePackageDeclaration(relativePath);
		return [new vscode.CompletionItem(packageDecl)];
	}
};

const perlSelector = { scheme: 'file', language: 'perl' };

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const disposables = [
		vscode.languages.registerCompletionItemProvider(perlSelector, packageDeclCompletionProvider, 'packagedecl'),
		vscode.commands.registerTextEditorCommand('perl-insert-package.insertPackageDecl', insertPackageDecl),
	];

	disposables.forEach(disposable => context.subscriptions.push(disposable));
}

// this method is called when your extension is deactivated
export function deactivate() {}
