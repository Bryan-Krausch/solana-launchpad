const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv').config({ path: __dirname + '/.env' })
const isDevelopment = process.env.NODE_ENV !== 'production'
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
  entry: path.join(__dirname, "src", "index.tsx"),
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.png', '.jpg'],
    fallback: {
        "fs": false,
        "tls": false,
        "net": false,
        "path": false,
        "zlib": false,
        "http": false,
        "https": false,
        "stream": false,
        "crypto": false,
        "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
      } 
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [/node_modules/],
        use: {
            loader: "babel-loader"
        }
    },
    {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader'
        }
    },
    {
      test: /\.css$/,
      use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
      ],
    },
    {
        test: /\.html$/,
        exclude: [/node_modules/, require.resolve('./public/index.html')],
        use: {
            loader: 'file-loader',
        },
    },
    {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        loader: 'file-loader'
      },
    ]   
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
      favicon: "./public/favicon.ico",
      filename: "index.html",
      manifest: "./public/manifest.json",
    }),
    new webpack.DefinePlugin({
        'process.env': JSON.stringify(dotenv.parsed),
        'process.env.NODE_ENV': JSON.stringify(isDevelopment ? 'development' : 'production'),
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin()
  ],
}