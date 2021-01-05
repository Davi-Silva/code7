const withImage = require('next-images');
const withCSS = require('@zeit/next-css');
const withSASS = require('@zeit/next-sass');
const {
  serverRuntimeConfig,
  publicRuntimeConfig
} = require('./next.runtimeConfig');

module.exports = withImage(
  withCSS(
    withSASS({
      cssModules: true,
      serverRuntimeConfig,
      publicRuntimeConfig,
      target: 'serverless',
      webpack: (config, { isServer }) => {
        if (isServer) {
          require('./scripts/generate-sitemap');
        }
        return config;
      },
      env: {
        API_ENDPOINT: process.env.API_ENDPOINT
      }
    })
  )
);
