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
    react: 'React',
    'react-dom': 'ReactDOM'
  },

  output: {
    filename: 'dist/react-credit-card.js',
    libraryTarget: 'umd',
    library: 'CreditCard'
  },


  resolve: {
    extensions: ['', '.js']
  },

  plugins: [
    new webpack.optimize.DedupePlugin()
  ]
};
