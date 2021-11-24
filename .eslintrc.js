module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    './node_modules/standard/eslintrc.json'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
  }
}
