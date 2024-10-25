module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'semi': ['error', 'always'],
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'quotes': ['error', 'single', { 'avoidEscape': true }],
    'max-len': ['error', { 'code': 80 }],
  },
};
