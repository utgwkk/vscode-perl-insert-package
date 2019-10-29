import * as vscode from 'vscode';
import * as path from 'path';

const namePlaceholder = '{{name}}';
const packagePlaceholder = '{{package}}';

interface ReplaceRule {
	before: string;
	after: string;
	separator?: string;
}

const defaultReplaceRule: ReplaceRule = {
	before: `lib/${namePlaceholder}.pm`,
	after: packagePlaceholder,
	separator: path.sep,
};

function loadReplaceRulesFromConfig(): ReplaceRule[] {
	const config = vscode.workspace.getConfiguration('perl-insert-package');
	const rules = config.get<ReplaceRule[]>('replaceRules');

	return rules === undefined ? [defaultReplaceRule] : rules;
}

function applyReplaceRule(path: string, rule: ReplaceRule): string {
	const separator = rule.separator === undefined ? '/' : rule.separator;
	const separatorRegex = new RegExp(separator, 'g');

	const namePlaceholderRegex = new RegExp(namePlaceholder, 'g');
	const before = new RegExp(rule.before.replace(namePlaceholderRegex, '(.+)'));

	const packagePlaceholderRegex = new RegExp(packagePlaceholder, 'g');
	const after = rule.after.replace(packagePlaceholderRegex, '$1');

	return before.test(path) ? path.replace(before, after).replace(separatorRegex, '::') : path;
}

function applyReplaceRules(path: string, rules: ReplaceRule[]): string {
	rules.forEach(rule => {
		path = applyReplaceRule(path, rule);
	});
	return path;
}

export function makePackageName(path: string): string {
	const rules = loadReplaceRulesFromConfig();
	return applyReplaceRules(path, rules);
}

export function makePackageDeclaration(path: string): string {
	const packageName = makePackageName(path);
	return `package ${packageName};`;
}
