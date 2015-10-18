var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',

  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel?state=0', exclude: /node_modules/ },
      {test: /\.scss$/, loader: 'css?modules!postcss!sass'}
    ]
  },

  externals: {
    react: 'React'
  },

  // TODO: use your component name here
  output: {
    filename: 'dist/react-component-starter-kit.js',
    libraryTarget: 'umd',
    library: 'ReactComponentStarterKit'
  },

  plugins: [
    new webpack.optimize.DedupePlugin()
  ],

  resolve: {
    extensions: ['', '.jsx', '.js']
  }
};
