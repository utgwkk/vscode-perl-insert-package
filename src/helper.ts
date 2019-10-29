import * as vscode from 'vscode';

export function currentFileRelativePath(editor: vscode.TextEditor): string {
	const currentFileUri = editor.document.uri;
	const relativePath = vscode.workspace.asRelativePath(currentFileUri);

	return relativePath;
}
