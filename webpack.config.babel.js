import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackBuildNotifierPlugin from 'webpack-build-notifier';
import WebpackStrip from 'strip-loader';

const jsConfig = ((env)=> {
  const entry = {
    'app': './src/js/app.js'
  };
  const output = {
    path: './dist/js',
    filename: "[name].js"
  };
  const module = ((env)=> {
    const jsModule = {
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loaders: ['babel-loader','eslint-loader']
    };
    const cssModule = {
      test: /\.css$/,
      loaders: ['style', 'css?modules']
    };

    if(env === 'prod'){
      jsModule.loaders.unshift(
        WebpackStrip.loader('console.log')
      );
    };

    return {
      loaders: [jsModule, cssModule]
    };
  })(env);

  const eslint = {
    configFile: './.eslintrc'
  };

  const plugins = [
    new WebpackBuildNotifierPlugin()
  ];

  return {entry, output, module, eslint, plugins}
})(process.env.NODE_ENV);

const cssConfig = {
  output: {
    path: './dist',
    filename: "[name].html"
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/html/index.html',
      filename: 'index.html'
    })
  ]
}

const htmlConfig = {
  entry: {
    app: './src/css/app.css'
  },
  output: {
    path: './dist/css/',
    filename: '[name].css',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
}

module.exports = [jsConfig, cssConfig];
