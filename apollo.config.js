/* eslint import/no-commonjs: off */

const port = process.env.PORT
const apiURL = process.env.WEB_UI_API_URL || `${host}`;

module.exports = {
  client: {
    env: { API_URL: process.env.WEB_UI_API_URL }, 
    env: { API_PORT: process.env.PORT},
    service: {
      name: 'bobarr',
      url: 'http://${API_URL}:${API_PORT}/graphql',
    },
    excludes: ['**/*.{ts,tsx,js,jsx}'],
  },
};
