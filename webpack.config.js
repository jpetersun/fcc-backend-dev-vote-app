const path = require('path')

module.exports = {
  context: __dirname,
  entry: './js/Entry.jsx',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundlerino.js',
    publicPath: '/public/'
  },
  devServer: {
    inline: true,
    watchContentBase: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  stats: {
    colors: true,
    reasons: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: "pre",
        loader: "eslint-loader",
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: 'css-loader'
      }
    ]
  }
}
