import * as stable from "stable";
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

export function insertCurrentPackageName(editor: vscode.TextEditor, editBuilder: vscode.TextEditorEdit) {
	const relativePath = currentFileRelativePath(editor);
	if (relativePath === undefined) {
		vscode.window.showErrorMessage('please open perl file');
		return;
	}

	const packageName = makePackageName(relativePath);
	editor.selections.forEach(selection => {
		editBuilder.insert(selection.start, packageName);
	});
}

let cachedFiles: vscode.Uri[];

function getCachedFiles() {
	return cachedFiles;
}

export async function refreshPerlFileList() {
	cachedFiles = await vscode.workspace.findFiles('**/**.pm');
}

export function insertPackageName() {
	const items = getCachedFiles().map(url => {
		const relativePath = vscode.workspace.asRelativePath(url);
		return {
			label: relativePath,
			description: makePackageName(relativePath),
		};
	});
	vscode.window.showQuickPick(items, { matchOnDescription: true }).then(selected => {
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
		sortCachedFilesByRecentlyUsed(packagePath);
	});
}

function sortCachedFilesByRecentlyUsed(packagePath: string) {
	stable.inplace(cachedFiles, (_, b) => vscode.workspace.asRelativePath(b) === packagePath);
}
