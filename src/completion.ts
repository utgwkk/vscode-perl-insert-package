import * as vscode from 'vscode';
import { currentFileRelativePath } from './helper';
import { makePackageDeclaration } from './path-to-package';

export const packageDeclCompletionProvider = {
	provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
		const editor = vscode.window.activeTextEditor;
		if (editor === undefined) {
			return [];
		}

		const lineText = document.lineAt(position.line).text;
		if (!/^packa/.test(lineText)) {
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
