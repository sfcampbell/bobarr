/* eslint import/no-commonjs: off */

module.exports = process.env.WEB_UI_API_URL ? {
  client: {
    service: {
      name: 'bobarr',
      url: [process.env.WEB_UI_API_URL,'/graphql'].join(''),
    },
    excludes: ['**/*.{ts,tsx,js,jsx}'],
  },
}:{
  client: {
    service: {
      name: 'bobarr',
      url: 'http://localhost:4000/graphql',
    },
    excludes: ['**/*.{ts,tsx,js,jsx}'],
  },
};
