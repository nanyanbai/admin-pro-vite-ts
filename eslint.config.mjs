import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import VueEslintParser from 'vue-eslint-parser';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';
const __dirname = dirname(fileURLToPath(import.meta.url));
const autoImportGlobals = JSON.parse(readFileSync(resolve(__dirname, '.eslintrc-auto-import.json')), 'utf-8');

/** @type {import('eslint').Linter.Config[]} */
export default [
  /** 匹配指定后缀文件或者目录 */
  // { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  /** 配置全局变量 */
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        ...autoImportGlobals.globals,
        /** 追加一些其他自定义全局规则 */
        // wx: true
      },
    },
  },
  /** js推荐配置 */
  pluginJs.configs.recommended,
  /** ts推荐配置 */
  ...tseslint.configs.recommended,
  /** vue推荐配置 */
  ...pluginVue.configs['flat/recommended'],
  /** javascript规则 */
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    rules: {
      'no-var': 'error', // 要求使用 let 或 const 而不是 var
      'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-unexpected-multiline': 'error', // 禁止空余的多行
      'no-useless-escape': 'off', // 禁止不必要的转义字符
      'no-extra-boolean-cast': 'off', // 禁止不必要的布尔转换
    },
  },
  /** vue规则 */
  {
    files: ['**/*.vue'],
    plugins: {
      pluginVue: pluginVue,
    },
    languageOptions: {
      parser: VueEslintParser,
      ecmaVersion: 'latest',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        /** 允许在.vue 文件中使用 JSX */
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
      'vue/script-setup-uses-vars': 'error', // 防止<script setup>使用的变量<template>被标记为未使用
      'vue/no-mutating-props': 'off', // 不允许组件 prop的改变
      'vue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式
    },
  },
  /**  typescript规则 */
  {
    files: ['**/*.{ts,tsx,vue}'],
    plugins: {
      tseslint: tseslint,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error', // 禁止未使用的变量
        {
          args: 'all', // 允许所有参数
          argsIgnorePattern: '^_', // 忽略以 _ 开头的参数
          caughtErrors: 'all', // 允许所有错误
          caughtErrorsIgnorePattern: '^_', // 忽略以 _ 开头的错误
          destructuredArrayIgnorePattern: '^_', // 忽略以 _ 开头的数组
          varsIgnorePattern: '^_', // 忽略以 _ 开头的变量
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
      '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
      '@typescript-eslint/no-unsafe-function-type': 'off', // 禁止使用 unsafe 函数类型
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
      '@typescript-eslint/semi': 'off',
    },
  },
  /** 忽略文件规则 */
  { ignores: ['node_modules', 'dist', '/public', '/docs', '*.md', '.vscode', '.idea', '.husky', '.local', '/bin'] },
  /**
   * prettier 配置
   * 会合并根目录下的prettier.config.js 文件
   * @see https://prettier.io/docs/en/options
   */
  eslintPluginPrettierRecommended,
];
