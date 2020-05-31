/* snowpack.config.js */
module.exports = {
  extends: '@snowpack/app-scripts-react',
  installOptions: {

    rollup: {
      plugins: [require('rollup-plugin-node-polyfills')()],
    },
  },
  install: [
    'firebase',
    'react-router',
    'react-router-dom',
  ],
};
