var path = require("path");
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: ['babel-polyfill', "./src/client/index.js"],

  devtool: '#inline-source-map',
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'src/shared']
  },

  watch: true,

  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,        
        loader: ExtractTextPlugin.extract('css!sass')
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        WEBPACK: JSON.stringify(true),
      }
    }),
    new ExtractTextPlugin("style.css", {
      allChunks: true
    })
    // new webpack.optimize.UglifyJsPlugin({
      // minimize: true
    // })
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: './dist'
  }
};
