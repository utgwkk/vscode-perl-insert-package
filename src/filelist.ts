import * as stable from "stable";
import * as vscode from 'vscode';

let cachedFiles: vscode.Uri[];
export function getCachedFiles(): vscode.Uri[] {
	return cachedFiles;
}

export async function refreshPerlFileList(): Promise<void> {
	cachedFiles = await vscode.workspace.findFiles('**/**.pm');
}
export function sortCachedFilesByRecentlyUsed(packagePath: string): void {
	stable.inplace(cachedFiles, (_, b) => vscode.workspace.asRelativePath(b) === packagePath);
}
