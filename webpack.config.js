const webpack = require('webpack')
const path = require('path')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

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
        'loader': 'babel-loader',
        'test': /\.jsx?$/,
        'exclude': /node_modules/,
        'query': {
          'plugins': ['lodash'],
          'presets': [['env', { 'targets': { 'node': 4 } }]]
        }
      },
      {
        test: /\.css$/,
        loader: 'css-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new LodashModuleReplacementPlugin,
    new webpack.optimize.UglifyJsPlugin,
    new LiveReloadPlugin()
  ]
}
