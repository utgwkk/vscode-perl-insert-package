import * as vscode from 'vscode';
import { getCachedFiles } from './filelist';
import { currentFileRelativePath } from './helper';
import { makePackageDeclaration, makePackageName } from './path-to-package';

export const packageDeclCompletionProvider = {
	provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.CompletionItem[] | undefined {
		const editor = vscode.window.activeTextEditor;
		if (editor === undefined) {
			return [];
		}

		const lineText = document.lineAt(position.line).text;
		if (/^packa/.test(lineText)) {
			return this.providePackageDeclarationCompletionItems(editor, document, position, token, context);
		}
		
		return [];
	},
	
	providePackageDeclarationCompletionItems(editor: vscode.TextEditor, document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.CompletionItem[] | undefined {
		const relativePath = currentFileRelativePath(editor);
		if (relativePath === undefined) {
			vscode.window.showErrorMessage('please open perl file');
			return;
		}

		const packageDecl = makePackageDeclaration(relativePath);
		return [new vscode.CompletionItem(packageDecl, vscode.CompletionItemKind.Module)];
	}
};

export const packageNameCompletionProvider = {
	provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.CompletionItem[] | undefined {
		return getCachedFiles().map((url) => {
			const relativePath = vscode.workspace.asRelativePath(url);
			const packageName = makePackageName(relativePath);
			return new vscode.CompletionItem(packageName, vscode.CompletionItemKind.Class);
		});
	},
};
