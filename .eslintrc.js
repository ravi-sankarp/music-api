module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'prettier' // Add Prettier plugin
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript/base',
    'plugin:security/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended' // Integrates Prettier with ESLint
  ],
  root: true,
  env: {
    node: true,
    jest: true
  },
  ignorePatterns: ['.eslintrc.js', 'database/*'],
  rules: {
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'spaced-comment': 'error',
    'no-console': 'off',
    '@typescript-eslint/consistent-return': 'off',
    '@typescript-eslint/func-names': 'off',
    '@typescript-eslint/object-shorthand': 'off',
    '@typescript-eslint/no-process-exit': 'off',
    '@typescript-eslint/no-param-reassign': 'off',
    '@typescript-eslint/no-return-await': 'off',
    '@typescript-eslint/no-underscore-dangle': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    'class-methods-use-this': 'off',
    'prefer-destructuring': [
      'error',
      {
        object: true,
        array: false
      }
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_|req|res|next'
      }
    ],
    '@typescript-eslint/semi': [2, 'always'],
    'no-restricted-syntax': ['warn'],
    'prettier/prettier': 'error'
  }
};
