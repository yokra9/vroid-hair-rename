const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src2/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'static'),
  },
  devtool: 'source-map',
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          onlyCompileBundledFiles: true,
          configFile: path.resolve(__dirname, 'tsconfig.vue.json'),
        },
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
  ],
};
