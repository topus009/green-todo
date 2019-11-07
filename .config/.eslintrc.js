module.exports = {
  parser: 'babel-eslint', //FIXME: ЧТОБЫ НЕ РУГАЛОСЬ НА OPTIONAL-CHAINING,
  extends: ['airbnb', 'plugin:prettier/recommended', 'prettier/react'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  rules: {
    'jsx-a11y/href-no-hash': ['off'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
    'react/no-array-index-key': 0,
    'react/prop-types': 0,
    'max-len': [
      'warn',
      {
        code: 120,
        tabWidth: 2,
        comments: 120,
        ignoreComments: false,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'import/no-extraneous-dependencies': 0,
    'no-shadow': 0,
    'no-underscore-dangle': 0,
    'no-console': 0,
    'global-require': 0,
    'import/prefer-default-export': 0,

    // FIXME: ЧТОБЫ НЕ РУГАЛОСЬ НА OPTIONAL-CHAINING,
    camelcase: 0,
    'no-unused-expressions': 0,
  },
  globals: {
    PRODUCTION: 'readonly',
  },
};
