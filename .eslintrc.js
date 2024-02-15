// eslint-disable-next-line import/no-commonjs
module.exports = {
  extends: ['algolia', 'algolia/react', 'algolia/typescript'],
  //exports: [ "./util", "./web-1080/utils", "./web-720/utils", "./api-1080/src/utils", "./api-720/src/utils"],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    'import/extensions': 'off',
    'import/no-unresolved': 'off',

    'no-shadow': 'off',
    'no-redeclare': 'off',
    'new-cap': 'off',
    'no-console': 'warn',
  },
};
