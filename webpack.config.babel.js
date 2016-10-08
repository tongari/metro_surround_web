import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackBuildNotifierPlugin from 'webpack-build-notifier';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import WebpackStrip from 'strip-loader';
import path from 'path';
import colors from 'colors';

colors.setTheme({
  custom: ['green', 'bold']
});

const PATH = {
  src: './src',
  dist: './dist'
};

const jsConfig = ((env)=> {
  const entry = {
    'app': `${PATH.src}/js/app.js`
  };
  const output = {
    path: `${PATH.dist}/js`,
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
      console.info('      ******************************************************************'.green);
      console.info('                      deploy start!!  '.custom);
      console.info('                      remove console.log  '.custom);
      console.info('      ******************************************************************'.green);
      jsModule.loaders.unshift(
        WebpackStrip.loader('console.log')
      );
    };

    return {
      loaders: [jsModule, cssModule]
    };
  })(env);

  const eslint = {
    configFile: '.eslintrc'
  };

  const plugins = [
    new WebpackBuildNotifierPlugin(),
    new CopyWebpackPlugin([
      {from: `${PATH.src}/html`, to: path.join(__dirname, 'dist')}
    ])
  ];

  return {entry, output, module, eslint, plugins}
})(process.env.NODE_ENV);

const cssConfig = {
  entry: {
    app: `${PATH.src}/css/app.css`
  },
  output: {
    path: `${PATH.dist}/css/`,
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
};

const htmlConfig = {
  output: {
    path: PATH.dist,
    filename: "[name].html"
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: `${PATH.src}/html/index.html`,
      filename: 'index.html'
    })
  ]
};

module.exports = [jsConfig];
