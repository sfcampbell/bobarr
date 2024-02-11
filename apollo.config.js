/* eslint import/no-commonjs: off */

module.exports = {
  client: {
    service: {
      name: 'bobarr',
      url: 'http://localhost:${PORT}/graphql',
    },
    excludes: ['**/*.{ts,tsx,js,jsx}'],
  },
};
