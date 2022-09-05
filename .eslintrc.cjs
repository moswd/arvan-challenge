module.exports = {
  parserOptions: { parser: '@typescript-eslint/parser' },
  env: { node: true },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  ignorePatterns: ['/**/*.d.ts'],
  plugins: ['@typescript-eslint'],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'vue/no-setup-props-destructure': 'off',
  },
  globals: {
    $ref: 'readonly',
    $computed: 'readonly',
    $shallowRef: 'readonly',
    $customRef: 'readonly',
    $toRef: 'readonly',
    $$: 'readonly'
  }
}
