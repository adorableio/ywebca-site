module.exports = {
  devtool: '#source-map',
  output: {
    filename: 'site.js',
    sourcemapFilename: 'site.map'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  }
};
