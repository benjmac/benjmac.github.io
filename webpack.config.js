/** @type {import('webpack').Configuration} */
const isDev = process.env.NODE_ENV === 'development'
const path = require('path')

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
}
