var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function(_env, argv) {
  const isProduction = argv.mode === 'production';
  const isDevelopment = !isProduction;

  return {
    entry: path.join(__dirname, './src/index.js'),

    output: {
      path: path.join(__dirname, './dist'),
      filename: '[name]-[hash].js',
      publicPath: '/'
    },

    plugins: [
        new BundleTracker({
          path: __dirname,
          filename: 'webpack-stats.json'
        }),
        new MiniCssExtractPlugin({
          filename: './src/css/[name].[contenthash:8].css',
          chunkFilename: './src/css/[name].[contenthash:8].chunk.css'
        })
    ],

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              envName: isProduction ? 'production' : 'development'
            }
          }
        },
        {
          test: /\.css$/,
          use: [
              isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    }
  };
};

