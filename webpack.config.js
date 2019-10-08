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
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader'},
          { loader: 'postcss-loader', options: { plugins: []} },
          { loader: 'sass-loader'}
        ]
      },
      {
        test: /\.(png|jpg)$/,
        use: [{loader: 'file-loader'}]
      }
    ]
  }, 
  plugins: [

    new CopyPlugin([
      {from: 'src/images/', to: 'images'},
    ]),

    new MiniCssExtractPlugin({
      filename: "bundle.[chunkhash:12].css",
      chunkFilename: "[name]-id.css"
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    }),
  
    ...['home'].map((event) => {
      return new HTMLWebpackPlugin({
          title: `${event}`,
          template: `./src/views/${event}/index.html`,
          favicon: '',//'./src/images/ffa_ico.ico',
          mViewPort: 'width=device-width, initial-scale=1.0',
          mFonts: 'https://fonts.googleapis.com/css?family=Fira+Sans+Condensed:300,400|M+PLUS+1p:500,700|Secular+One&display=swap',
          mLayoutType: 'views',
          mWrapperClass: 'container-fluid p-0 m-0',
          //memblem: './src/images/nffa_emblem_white_58x75.png', //using file-loader as a backup until we get an answer on getting this to work with partial files | https://stackoverflow.com/questions/55268696/how-to-process-html-webpack-plugin-options-in-required-files | https://github.com/jantimon/html-webpack-plugin/issues/1179
          filename: `${event}.html`
      })
    }),
  ]
}



