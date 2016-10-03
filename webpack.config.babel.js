// import HtmlWebpackPlugin from 'html-webpack-plugin';
//import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackBuildNotifierPlugin from 'webpack-build-notifier';

module.exports = [
{
  entry: {
    'app': './src/js/app.js'
  },
  output: {
    path: './dist/js',
    filename: "[name].js"
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ['babel-loader','eslint-loader']
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css?modules']
      }
    ]
  },

  eslint: {
    configFile: './.eslintrc'
  },
  plugins: [
    new WebpackBuildNotifierPlugin()
  ]

}
// {
//   output: {
//     path: './dist',
//     filename: "[name].html"
//   },
//
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './src/html/index.html',
//       filename: 'index.html'
//     })
//   ]
// }
// {
//   entry: {
//     app: './src/css/app.css'
//   },
//   output: {
//     path: './dist/css/',
//     filename: '[name].css',
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.css$/,
//         loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
//       }
//     ]
//   },
//   plugins: [
//     new ExtractTextPlugin('[name].css')
//   ]
// }
];
