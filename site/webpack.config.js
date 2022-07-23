const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  entry: [
    resolve(__dirname, 'index.ts'),
    resolve(__dirname, 'scss/main.scss')
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].css',
            },
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          {
            loader: 'sass-loader',
            options: {
              // Prefer Dart Sass
              implementation: require('sass'),
              sassOptions: {
                includePaths: ['node_modules'],
              },
              // See https://github.com/webpack-contrib/sass-loader/issues/804
              webpackImporter: false,
            },
          },
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'index.html')
    }),
    new CopyPlugin({
      patterns: [
        { from: resolve(__dirname, 'img'), to: 'img' },
      ],
    }),
    new EslintPlugin()
  ],
  output: {
    filename: '[name].[chunkhash].js',
    path: resolve(__dirname, '../docs'),
  },
};
