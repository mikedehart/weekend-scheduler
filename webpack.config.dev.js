const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, './dist');
const APP_DIR = path.resolve(__dirname, './src');

const config = {
   mode: 'development',
   entry: {
     main: APP_DIR + '/index.js'
   },
   output: {
     filename: 'bundle.js',
     path: BUILD_DIR,
     publicPath: '/'
   },
   devtool: 'eval-source-map',
   devServer: {
     inline: true,
     contentBase: BUILD_DIR,
     port: 9000,
   },
   module: {
    rules: [
     {
       test: /(\.css|.scss)$/,
       exclude: /node_modules/,
       use: [{
           loader: "style-loader" // creates style nodes from JS strings
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
           cacheDirectory: true,
           presets: ['react', 'env'], // Transpiles JSX and ES6
           plugins: ['transform-class-properties', 'transform-object-rest-spread', 'transform-es2015-destructuring']
         }
       }]
     }
    ],
  },
  resolve: {
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx']
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
  ],
  };

module.exports = config;