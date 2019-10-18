'use strict';
const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    watchContentBase: true,
    port: 8081,
    open: true,
    index: 'home.html',
    quiet: false,
  },
  entry: {
    main: './src/dock_all.js'
  },
  output: {
    path: path.join(__dirname, '/deploy'),
    filename: 'bundle.[name].[chunkhash:12].js',
    publicPath: ''
  },
  devtool: 'source-map',
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          { loader: 'postcss-loader', options: { 
            plugins: [],
            sourceMap: true
        } },
          { loader: 'sass-loader',        
            options: {
              sourceMap: true
            }
          }
        ]
      },
    ]
  },
  plugins: [

    new CopyPlugin([
      {from: 'src/images/', to: 'images', ignore: [ 'stock/**/*' ]},
      {from: 'src/json/', to: 'json'},
    ]),

    new MiniCssExtractPlugin({
      filename: "bundle.[name].[chunkhash:12].css",
      chunkFilename: "[name]-id.css"
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    }),

    ...['index','product01','product02'].map((event) => {
      return new HTMLWebpackPlugin({
        title: `${event}`,
        template: `./src/views/${event}/index.html`,
        favicon: `./src/images/favicon-16x16.png`,
        mViewPort: 'width=device-width, initial-scale=1.0',
        mFonts: 'https://fonts.googleapis.com/css?family=Fira+Sans+Condensed:200, 300,400|M+PLUS+1p:500,700|Secular+One&display=swap',
        mLayoutType: 'views',
        mWrapperClass: 'container-fluid p-0 m-0',
        filename: `${event}.html`
      })
    }),
  ]
}