const fs = require('fs');
const path = require('path');

module.exports = {
  extends: [
    'react-app'
  ],
  rules: {
    'jsx-quotes': [2, 'prefer-double'],
    'no-var': 2,
    'prefer-const': 2,
    'sort-imports': [2, {'allowSeparatedGroups': true, 'ignoreDeclarationSort': true}]
  },
  overrides: [
    {
      files: ['**/*.ts?(x)']
    }
  ]
};
