const webpack = require('webpack');
const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = {
  mode: 'development',
  entry: './src/index.jsx',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'scripts.dev.js',
    publicPath: '/static/zt_react/',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  devServer: {
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-2'],
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS
        ],
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'svgs/[name].[ext]',
          },
        },
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]',
          },
        },
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
          },
        },
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        API_BASE_URL: JSON.stringify('http://localhost:8000'),
        ENVIRONMENT: JSON.stringify('dev'),
        SUBDIRECTORY: JSON.stringify('/app/'),
        DEBUG: true,
        FAKE_UPLOAD: true,
      },
    }),
    new BundleTracker({ filename: './webpack-stats.dev.json' }),
  ],
  optimization: {
    minimizer: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
};
