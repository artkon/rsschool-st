const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'app.js',
        publicPath: '/js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'src'),
    },

    devtool: 'cheap-eval-source-map' // remove for build
};
