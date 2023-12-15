module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
  plugins: [],
  rules: {
    'no-console': 'off',
    semi: 2,
    'vue/no-multiple-template-root': 'off',
    'vue/no-v-html': 'off',
    // 'vue/multi-word-component-names': 'warn',
    // 'no-unused-vars': 'warn',
    // 'space-in-parens': 'off',
    // 'computed-property-spacing': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  ignorePatterns: ['.history/*'],
}
