var path = require('path'); // eslint-disable-line no-var
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // eslint-disable-line no-var

module.exports = {
  resolve: {
    alias: {
      'draft-js-oneteam-rte-plugin': path.join(__dirname, '..', 'src'),
      react: path.join(__dirname, '..', 'node_modules', 'react'),
    }
  },
  module: {
    rules: [
      {
        // match all js files except example.js
        test: /^(?!.*example\.js$).*\.js$/,
        loaders: 'babel-loader',
        exclude: /node_modules/,
        include: path.join(__dirname, 'client'),
      },
      {
        test: /\.js$/,
        loaders: 'babel-loader',
        include: [
          path.join(__dirname),
          path.join(__dirname, '..', 'src'),
          path.join(__dirname, 'client')
        ],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { modules: true, importLoaders: 1, localIdentName: '[local]___[hash:base64:5]' }
            },
            { loader: 'postcss-loader' }
          ]
        }),
        include: path.join(__dirname, 'client', 'components'),
      }
    ],
  }
};
