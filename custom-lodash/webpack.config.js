module.exports = {
    mode: 'development',
    entry: './index',
  
    output: {
      path: __dirname,
      filename: 'bundle.js'
    },
    devtool: 'cheap-eval-source-map' // remove for build

  };
