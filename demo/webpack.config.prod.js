/* eslint-disable no-var */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
var webpackBaseConfig = require('./webpack.config.base');

module.exports = Object.assign(webpackBaseConfig, {
  devtool: 'source-map',

  entry: {
    app: [path.join(__dirname, 'client', 'index.js')],
    main: [path.join(__dirname, 'index.html.js')],
  },

  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
    libraryTarget: 'umd',
    publicPath: '/',
  },

  plugins: [
    new ExtractTextPlugin({ filename: 'app.css', allChunks: true }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      screw_ie8: true,
      compressor: { warnings: false },
    }),
    new StaticSiteGeneratorPlugin({
      entry: 'main',
      paths: ['/'],
      locals: { css: 'app.css' }
    }),
  ],
  module: {
    rules: webpackBaseConfig.module.rules.concat(
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
          ],
        }),
        include: /node_modules/
      }
    )
  },
});
