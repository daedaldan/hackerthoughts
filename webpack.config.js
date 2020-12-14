var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  entry: path.join(__dirname, './src/index.js'),

  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name]-[hash].js'
  },

  plugins: [
      new BundleTracker({
        path: __dirname,
        filename: 'webpack-stats.json'
      }),
  ],
};
