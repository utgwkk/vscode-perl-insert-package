export function makePackageName(path: string): string {
	return path.replace('.pm', '').replace('lib/', '').replace(/\//g, '::');
}

export function makePackageDeclaration(path: string): string {
	const packageName = makePackageName(path);
	return `package ${packageName};`;
}
