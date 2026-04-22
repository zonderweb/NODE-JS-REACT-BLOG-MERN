import js from '@eslint/js';
import nPlugin from 'eslint-plugin-n';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    ignores: ['node_modules/', 'dist/', 'coverage/'],
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module', // має збігатися з "type" у package.json
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      n: nPlugin,
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'semi': ['error', 'always'],
      'consistent-return': 'error',
      'n/no-unpublished-require': 'error',
      'n/no-missing-require': 'error',
      'n/callback-return': 'error',
      'n/handle-callback-err': 'error',
    },
  },
];
