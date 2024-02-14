/* eslint import/no-commonjs: off */

module.exports = process.env.WEB_UI_API_URL ? {
  env: { WEB_UI_API_URL: process.env.WEB_UI_API_URL },
  env: { API_QUALITY: process.env.API_QUALITY },
  env: { API_PORT: process.env.PORT },
  client: {
    service: {
      name: 'bobarr-' & { API_QUALITY },
      url: { WEB_UI_API_URL} +'/graphql',
    },
    excludes: ['**/*.{ts,tsx,js,jsx}'],
  },
}:{
  client: {
    service: {
      name: 'bobarr-' & { API_QUALITY },
      url: 'http://localhost:4000/graphql',
    },
    excludes: ['**/*.{ts,tsx,js,jsx}'],
  },
};
