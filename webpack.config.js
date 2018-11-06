'use strict';

const { join, resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: [resolve('src', 'index.tsx')],
  devtool: 'inline-cheap-module-source-map',
  output: {
    filename: '[name].bundle.js',
    path: resolve('dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.mjs']
  },
  module: {
    rules: [
      {
        // for graphql
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      {
        test: /\.ts|.tsx$/,
        use: {
          loader: 'awesome-typescript-loader',
        }
      }
    ]
  },
  plugins: [
    new Dotenv(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin()
  ],
  devServer: {
    contentBase: 'dist',
    port: 3000,
    hot: true
  },
};