/**
 * ESLint flat config. Every service keeps its own identical copy so it can run on its own.
 *
 * @type {import('eslint').Linter.Config[]}
 */
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  { ignores: ['dist/', 'coverage/', 'src/generated/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { rules: { 'no-undef': 'off', '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }] } },
];
