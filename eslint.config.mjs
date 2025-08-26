import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { FlatCompat } from '@eslint/eslintrc'
import eslintPluginImport from 'eslint-plugin-import'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

const eslintConfig = [
	...compat.config({
		extends: ['next', 'prettier', 'next/core-web-vitals', 'next/typescript'],
		rules: {
			'no-console': 'warn',
		},
	}),

	{
		plugins: {
			import: eslintPluginImport,
		},
		settings: {
			'import/resolver': {
				typescript: {
					project: './tsconfig.json',
				},
				node: {
					extensions: ['.js', '.jsx', '.ts', '.tsx'],
				},
			},
		},
		rules: {
			'import/order': [
				'error',
				{
					'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
					'pathGroups': [
						{
							'pattern': 'react',
							'group': 'external',
							'position': 'before',
						},
						{
							'pattern': 'next/**',
							'group': 'external',
							'position': 'before',
						},
						{
							'pattern': '@/**',
							'group': 'internal',
						},
					],
					'pathGroupsExcludedImportTypes': ['react'],
					'newlines-between': 'always',
					'alphabetize': {
						'order': 'asc',
						'caseInsensitive': true,
					},
				},
			],
			'import/first': 'error',
			'import/newline-after-import': 'error',
			'import/no-duplicates': 'error',
		},
	},

	
	{
		rules: {
			
			'no-constant-binary-expression': 'error',
			'no-promise-executor-return': 'error',
			'no-unreachable-loop': 'error',
			'no-self-compare': 'error',
			'no-template-curly-in-string': 'warn',

			
			'curly': ['error', 'multi-line'],
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
				{
					'argsIgnorePattern': '^_',
					'varsIgnorePattern': '^_',
				},
			],
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{
					'prefer': 'type-imports',
					'fixStyle': 'inline-type-imports',
				},
			],

			
			'react-hooks/exhaustive-deps': 'error',
			'react/jsx-no-useless-fragment': ['error', { 'allowExpressions': true }],
			'react/self-closing-comp': [
				'error',
				{
					'component': true,
					'html': true,
				},
			],
		},
	},
]

export default eslintConfig
