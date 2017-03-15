const path = require('path')
const LiveReloadPlugin = require('webpack-livereload-plugin')

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
    reasons: true,
    chunks: true
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
  },
  plugins: [
    new LiveReloadPlugin()
  ]
}
