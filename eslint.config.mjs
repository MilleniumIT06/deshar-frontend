import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import eslintPluginImport from 'eslint-plugin-import'
import tseslintParser from '@typescript-eslint/parser'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

const config = [
	{
		// Глобальные игноры
		ignores: ['node_modules', 'dist', '.next', 'out', 'coverage', 'public'],
	},

	// Базовый конфиг Next.js (должен быть в начале)
	...compat.config({
		extends: ['next', 'prettier', 'next/core-web-vitals', 'next/typescript'],
	}),
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
		languageOptions: {
			parser: tseslintParser,
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {
				project: './tsconfig.json',
				ecmaFeatures: { jsx: true },
			},
		},
		plugins: {
			import: eslintPluginImport,
		},
		settings: {
			'import/resolver': {
				typescript: {
					alwaysTryTypes: true,
					project: './tsconfig.json',
				},
				node: true,
			},
		},
		rules: {
			'no-console': 'warn',
			'import/order': [
				'error',
				{
					groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index', 'object', 'type'],
					'newlines-between': 'always',
					alphabetize: { order: 'asc', caseInsensitive: true },
				},
			],
			'import/first': 'error',
			'import/newline-after-import': 'error',
			'import/no-duplicates': 'error',

			// Остальные правила
			'no-constant-binary-expression': 'error',
			'no-promise-executor-return': 'error',
			'no-unreachable-loop': 'error',
			'no-self-compare': 'error',
			'no-template-curly-in-string': 'warn',
			curly: ['error', 'multi-line'],
			'dot-notation': 'error',
			'no-else-return': 'error',
			'no-implicit-coercion': 'error',
			'no-lonely-if': 'error',
			'no-throw-literal': 'error',
			'prefer-const': 'error',
			'prefer-template': 'error',

			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
			],
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{ prefer: 'type-imports', fixStyle: 'inline-type-imports' },
			],

			'react-hooks/exhaustive-deps': 'error',
			'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
			'react/self-closing-comp': ['error', { component: true, html: true }],
		},
	},
]

export default config
