module.exports = {
  'env': {
    'es6': true,
    'mocha': true,
    'node': true,
  },
  'extends': [
    'plugin:react/recommended',
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
      'jsx': true,
    },
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
  },
}
