module.exports = {
  parserOptions: { parser: '@typescript-eslint/parser' },
  env: { node: true },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  ignorePatterns: ['/**/*.d.ts'],
  rules: {}
}
