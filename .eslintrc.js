module.exports = {
  'env': {
    'es6': true,
    'node': true,
  },
  'root': true,
  'extends': 'eslint:recommended',
  'parserOptions': {
    'sourceType': 'module',
  },
  'rules': {
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1,
      },
    ],
    'no-console': 'off',
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'never',
    ],
  },
}
