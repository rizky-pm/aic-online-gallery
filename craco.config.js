const CracoLessPlugin = require('craco-less');
const styles = require('./src/antdTheme');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { ...styles },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
