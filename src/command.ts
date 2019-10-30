import * as path from 'path';
import * as vscode from 'vscode';
import { currentFileRelativePath } from './helper';
import { makePackageDeclaration, makePackageName } from './path-to-package';

export function insertPackageDecl(editor: vscode.TextEditor, editBuilder: vscode.TextEditorEdit) {
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

let cachedFiles: vscode.QuickPickItem[];

export async function refreshPerlFileList() {
	const urls = await vscode.workspace.findFiles('**/**.pm');
	cachedFiles = urls.map(url => {
		const relativePath = vscode.workspace.asRelativePath(url);
		return {
			label: relativePath,
			description: makePackageName(relativePath),
		};
	});
}

export function insertPackageName() {
	const files = cachedFiles;
	vscode.window.showQuickPick(files, { matchOnDescription: true }).then(selected => {
		if (selected === undefined) {
			return;
		}
		const packagePath = selected.label;
		const editor = vscode.window.activeTextEditor;
		if (editor === undefined) {
			vscode.window.showErrorMessage('please open perl file');
			return;
		}

		const packageName = makePackageName(packagePath);
		editor.edit(editBuilder => {
			editor.selections.forEach(selection => {
				editBuilder.insert(selection.start, packageName);
			});
		});
	});
}
