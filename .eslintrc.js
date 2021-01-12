const fs = require('fs');
const path = require('path');

module.exports = {
  extends: [
    'react-app'
  ],
  rules: {
    'jsx-quotes': [1, 'prefer-double'],
    'no-var': 1,
    'prefer-const': 1,
    'sort-imports': [1, {'allowSeparatedGroups': true, 'ignoreDeclarationSort': true}],
  },
  overrides: [
    {
      files: ['**/*.ts?(x)']
    }
  ]
};
