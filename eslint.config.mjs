import { dirname } from 'path'
import { fileURLToPath } from 'url'
import eslintPluginImport from 'eslint-plugin-import'
import tseslintParser from '@typescript-eslint/parser'
import tseslintPlugin from '@typescript-eslint/eslint-plugin'
import nextPlugin from '@next/eslint-plugin-next'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactPlugin from 'eslint-plugin-react'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const config = [
	{
		// Глобальные игноры (должны быть в отдельном объекте без поля files)
		ignores: ['node_modules', 'dist', '.next', 'out', 'coverage', 'public'],
	},
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
		languageOptions: {
			parser: tseslintParser,
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {
				project: './tsconfig.json',
				tsconfigRootDir: __dirname,
				ecmaFeatures: { jsx: true },
			},
		},
		plugins: {
			import: eslintPluginImport,
			'@typescript-eslint': tseslintPlugin,
			'@next/next': nextPlugin,
			'react-hooks': reactHooksPlugin,
			'react': reactPlugin,
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
			// Базовые правила Next.js вручную (взамен старого extends)
			...nextPlugin.configs.recommended.rules,
			...nextPlugin.configs['core-web-vitals'].rules,
			...reactHooksPlugin.configs.recommended.rules,

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

			// Теперь эти правила будут работать корректно
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
			],
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{ prefer: 'type-imports', fixStyle: 'inline-type-imports' },
			],

			'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
			'react/self-closing-comp': ['error', { component: true, html: true }],
		},
	},
]

export default config
