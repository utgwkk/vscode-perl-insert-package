import * as vscode from 'vscode';
import { currentFileRelativePath } from './helper';
import { makePackageDeclaration } from './path-to-package';

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
