// eslint-disable-next-line import/no-commonjs
const utils = require("@eslint-community/eslint-utils");
module.exports = {
  extends: ['algolia', 'algolia/react', 'algolia/typescript'],
//  exports: [ "./lib/util/glob-util" = "./util" ],
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
