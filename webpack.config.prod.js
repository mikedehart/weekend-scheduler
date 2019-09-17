const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, './dist');
const APP_DIR = path.resolve(__dirname, './src');

const config = {
  mode: 'production',
  entry: {
    main: APP_DIR + '/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR,
  },
  module: {
    rules: [
    {
      test: /(\.css|.scss)$/,
      exclude: /node_modules/,
      use: [{
          loader: "universal-style-loader" // creates style nodes from JS strings
      }, {
          loader: "css-loader" // translates CSS into CommonJS
      }, {
          loader: "sass-loader" // compiles Sass to CSS
      }]
    },
    {
      test: /\.(jsx|js)?$/,
      exclude: /node_modules/,
      use: [{
        loader: "babel-loader",
        options: {
          cacheDirectory: false,
          presets: ['react', 'env'], // Transpiles JSX and ES6
          plugins: ['transform-class-properties']
        }
      }]
    }],
  },
  resolve: {
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx']
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new MomentLocalesPlugin(),
    new UglifyJsPlugin({
      sourceMap: false,
      uglifyOptions: {
        compress: true
      }
    }), // Minify JS
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ],
};

module.exports = config;