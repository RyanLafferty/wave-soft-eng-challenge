const debug = process.env.NODE_ENV = "development";
const webpack = require('webpack');
const path = require('path');


module.exports = {
  context: __dirname + "/src",
  devtool: "inline-sourcemap",
  entry: "./index.js",
  cache: true,
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
        }
      },
      {
        test:/\.css$/,
        use:['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'url-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      }
    ]
  },
  output: {
    path: __dirname + "/public/",
    filename: "app.min.js"
  },
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    // TEMP - used for testing
    proxy: {
      "/payment": "http://localhost:8080",
      "/record": "http://localhost:8080"
    }
  }, 
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
};