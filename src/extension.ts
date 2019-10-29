// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { insertPackageDecl, insertPackageName } from './command';
import { packageDeclCompletionProvider } from './completion';

const perlSelector = { scheme: 'file', language: 'perl' };

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const disposables = [
		vscode.languages.registerCompletionItemProvider(perlSelector, packageDeclCompletionProvider, 'packagedecl'),
		vscode.commands.registerTextEditorCommand('perl-insert-package.insertPackageDecl', insertPackageDecl),
		vscode.commands.registerCommand('perl-insert-package.insertPackageName', insertPackageName),
	];

	disposables.forEach(disposable => context.subscriptions.push(disposable));
}

// this method is called when your extension is deactivated
export function deactivate() {}
