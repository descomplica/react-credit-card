'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    demo: ['./src/index.jsx']
  },

  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'babel?stage=0&loose=all', exclude: /node_modules/ },
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
    extensions: ['', '.jsx', '.js'],
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
