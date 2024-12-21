module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:prettier/recommended'],
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // `react` first, then packages starting with a character
          ['^react$', '^[a-z]', '^@'],
          // Packages starting with `@generated` or `@msa`
          ['^@content', '^@e2e', '^@generated', '^@src'],
          // Imports starting with `./` and `../`
          [
            '^\\.\\.(?!/?$)',
            '^\\.\\./?$',
            '^\\.(?!/?$)',
            '^\\./(?=.*/)(?!/?$)',
            '^\\./?$',
          ],
          // Style imports
          ['^.+\\.s?css$', '^.+\\.styles'],
          // Side effect imports - 'import "./setup"'
          ['^\\u0000'],
        ],
      },
    ],
    curly: 'off',
    'object-curly-spacing': ['error', 'always'],
  },
};
