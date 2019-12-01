/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');
require('babel-polyfill');

const config = env => {
  const envPath =
    env.ENVIRONMENT === 'dev'
      ? path.join(__dirname, '.env.development')
      : path.join(__dirname, '.env');

  const fileEnv = dotenv.config({ path: envPath }).parsed;

  return {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
      path: path.resolve(__dirname, '..', 'application', 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    plugins: [
      new webpack.DefinePlugin({
        [`process.env.FB_APP_ID`]: JSON.stringify(`${fileEnv.FB_APP_ID}`)
      })
    ]
  };
};

module.exports = config;
