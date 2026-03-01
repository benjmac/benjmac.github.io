/** @type {import('webpack').Configuration} */
const isDev = process.env.NODE_ENV === 'development';
const path = require('path');
const webpack = require('webpack');

require('dotenv').config({path: '.env'});

const apiUrl = isDev ? process.env.API_URL_DEV : process.env.API_URL_PROD;
if (!apiUrl)
  throw new Error(
    `${isDev ? 'API_URL_DEV' : 'API_URL_PROD'} is not set in .env`,
  );

const turnstileKey = isDev
  ? process.env.TURNSTILE_KEY_DEV
  : process.env.TURNSTILE_KEY_PROD;
if (!turnstileKey)
  throw new Error(
    `${isDev ? 'TURNSTILE_KEY_DEV' : 'TURNSTILE_KEY_PROD'} is not set in .env`,
  );

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.tsx',
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devtool: isDev ? 'source-map' : false,
  watchOptions: {
    ignored: /node_modules/,
  },
  plugins: [
    new webpack.DefinePlugin({
      __API__: JSON.stringify(apiUrl),
      __TURNSTILE_KEY__: JSON.stringify(turnstileKey),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // Semantic UI CSS embeds fonts as data: URIs — skip resolving them
              url: {
                filter: (url) => !url.startsWith('data:'),
              },
            },
          },
          // postcss-loader runs Tailwind (scoped to chat widget via tailwind.config.js)
          // Safe on all CSS files — no-ops on files without @tailwind directives
          'postcss-loader',
        ],
      },
      {
        // Webpack 5 asset modules replace url-loader/file-loader
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 50000,
          },
        },
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
};
