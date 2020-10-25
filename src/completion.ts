import * as vscode from 'vscode';
import { getCachedFiles } from './filelist';
import { currentFileRelativePath } from './helper';
import { makePackageDeclaration, makePackageName } from './path-to-package';

export const packageDeclCompletionProvider = {
	// 0-index
	maximumPackageDeclarationCompletionLine: 2,

	provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.CompletionItem[] | undefined {
		const editor = vscode.window.activeTextEditor;
		if (editor === undefined) {
			return [];
		}

		if (position.line > this.maximumPackageDeclarationCompletionLine) {
			return [];
		}

		const relativePath = currentFileRelativePath(editor);
		if (this.alreadyHasPackageDeclaration(document, relativePath)) {
			return [];
		}

		return this.providePackageDeclarationCompletionItems(editor, document, position, token, context);
	},
	
	providePackageDeclarationCompletionItems(editor: vscode.TextEditor, document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.CompletionItem[] | undefined {
		const relativePath = currentFileRelativePath(editor);
		if (relativePath === undefined) {
			vscode.window.showErrorMessage('please open perl file');
			return;
		}

		const packageDecl = makePackageDeclaration(relativePath);
		return [new vscode.CompletionItem(packageDecl, vscode.CompletionItemKind.Module)];
	},

	alreadyHasPackageDeclaration(document: vscode.TextDocument, relativePath: string): boolean {
		const packageName = makePackageName(relativePath)
		const packageDeclRegexp = new RegExp(`^package\\s+${packageName}\\s*;`);
		const maxLine = Math.min(this.maximumPackageDeclarationCompletionLine, document.lineCount - 1);

		for (let i = 0; i <= maxLine; i++) {
			const lineText = document.getText(document.lineAt(i).range);
			if (packageDeclRegexp.test(lineText)) {
				return true;
			}
		}

		return false;
	},
};

export const packageNameCompletionProvider = {
	provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.CompletionItem[] | undefined {
		const config = vscode.workspace.getConfiguration('perl-insert-package');
		const enabled = config.get<boolean>("packageNameCompletion.enabled");
		if (!enabled) {
			return;
		}

		return getCachedFiles().map((url) => {
			const relativePath = vscode.workspace.asRelativePath(url);
			const packageName = makePackageName(relativePath);
			return new vscode.CompletionItem(packageName, vscode.CompletionItemKind.Class);
		});
	},
};
