'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  target:  'web',
  cache:   false,
  context: __dirname,
  devtool: false,

  entry: {
    demo: ['./src/index.js']
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel?stage=0&loose=all', exclude: /node_modules/ },
      { test: /\.scss$/, loader: 'css?modules&localIdentName=[local]!postcss!sass'}
    ]
  },

  externals: {
    react: 'React'
  },

  output: {
    filename: 'dist/react-credit-card',
    libraryTarget: 'umd',
    library: 'ReactComponentCreditCard'
  },


  resolve: {
    extensions: ['', '.js'],
    alias: {
      '@components': path.join(__dirname, 'src'),
      '@styles': path.join(__dirname, 'styles')
    }
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ]
};
