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
    port: 8080,
    open: true,
    index: 'home.html',
    quiet: false,
  },
  entry: {
    main: './src/dock_all.js'
  },
  output: {
    path: path.join(__dirname, '/deploy'),
    filename: 'bundle.[chunkhash:12].js',
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
      filename: "bundle.[name].css",
      chunkFilename: "[name]-id.css"
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    }),

    ...['home','product01','product02'].map((event) => {
      return new HTMLWebpackPlugin({
        title: `${event}`,
        template: `./src/views/${event}/index.html`,
        favicon: '', //'./src/images/m_ico.ico',
        mViewPort: 'width=device-width, initial-scale=1.0',
        mFonts: 'https://fonts.googleapis.com/css?family=Fira+Sans+Condensed:200, 300,400|M+PLUS+1p:500,700|Secular+One&display=swap',
        mLayoutType: 'views',
        mWrapperClass: 'container-fluid p-0 m-0',
        //memblem: './src/images/m_emblem_white_58x75.png', //using file-loader as a backup until we get an answer on getting this to work with partial files | https://stackoverflow.com/questions/55268696/how-to-process-html-webpack-plugin-options-in-required-files | https://github.com/jantimon/html-webpack-plugin/issues/1179
        filename: `${event}.html`
      })
    }),
  ]
}