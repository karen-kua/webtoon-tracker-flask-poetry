const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js'
    },
    mode: "development",
    devServer: {
      devMiddleware: {
        writeToDisk: true
      },
        host: '0.0.0.0',
        port: 3000,
        historyApiFallback: true,
        hot: true,
        proxy: {
          '/api': {
            target: 'http://localhost:5000',
            // pathRewrite: { '^/api': '' },
            changeOrigin: true
          }
        }
     },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          },
          {
            test: /\.(css|scss)$/,
            use: ['style-loader', 'css-loader']
          },
        ],
      },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html'
        })
    ]
}