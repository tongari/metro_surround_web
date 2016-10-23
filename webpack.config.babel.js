import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackBuildNotifierPlugin from 'webpack-build-notifier';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import WebpackStrip from 'strip-loader';
import path from 'path';
import colors from 'colors';


/**
 * option
 */
colors.setTheme({
  custom: ['green', 'bold']
});

const PATH = {
  src: './src',
  dist: './dist'
};


/**
 * js compile
 * @type {{entry, output, module, eslint, postcss, plugins, resolve}}
 */
const jsConfig = ((env)=> {
  const entry = {
    'app': [
      `${PATH.src}/css/foundation/sanitaize.css`,
      `${PATH.src}/css/foundation/base.css`,
      `${PATH.src}/js/app.jsx`
    ]
  };
  const output = {
    path: `${PATH.dist}/js`,
    filename: "[name].js"
  };
  const module = ((env)=> {

    const rp = {
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader:'string-replace',
      query: {
        search: '{JS_PATH}',
        replace: (env === 'prod') ? '/': "../"
      }
    };
    const jsModule = {
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loaders: ['babel-loader','eslint-loader']
    };

    const cssModule = {
      test: /\.css$/,
      // loaders: ['style', 'css?modules']
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]!postcss-loader')
    };

    if(env === 'prod'){
      console.log('      ******************************************************************'.green);
      console.log('                      deploy start!!  '.custom);
      console.log('                      remove console.log  '.custom);
      console.log('      ******************************************************************'.green);
      jsModule.loaders.unshift(
        WebpackStrip.loader('console.log')
      );
    };

    const svgModule = {
      test: /\.(png|svg)$/i, loaders: [ 'url?name=[path][name].[ext]' ]
    };

    return {
      loaders: [rp, svgModule, jsModule, cssModule]
    };
  })(env);

  const eslint = {
    configFile: '.eslintrc'
  };

  const postcss = ((webpack) => {
    let config = [];
    config = config.concat([
      require('postcss-import')({ addDependencyTo: webpack }),
      require('postcss-cssnext')({
        browsers: ['last 2 versions']
      })
    ]);
    return config;
  })(webpack);

  const plugins = [
    new WebpackBuildNotifierPlugin(),
    new CopyWebpackPlugin([
      {from: `${PATH.src}/html`, to: path.join(__dirname, 'dist')},
      {from: `${PATH.src}/asset/img`, to: path.join(__dirname, 'dist/img')}
    ]),
    new ExtractTextPlugin('[name].css')
  ];

  const resolve = {
    extensions: ['', '.js', '.jsx']
  }

  return {entry, output, module, eslint, postcss, plugins, resolve}
})(process.env.NODE_ENV);


/**
 * css compile
 * @type {{entry, output, module, plugins, postcss}}
 */
/*
const cssConfig = ((env)=>{
  const entry = {
    app: `${PATH.src}/js/app.js`,
  };
  const output = {
    path: `${PATH.dist}/css/`,
    filename: '[name].css',
  };

  const module = {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader','css-loader!postcss-loader')
      }
    ]
  };
  const plugins = [
    new ExtractTextPlugin('[name].css'),
    new WebpackBuildNotifierPlugin()
  ];

  const postcss = ((webpack) => {
    let config = [];
    config = config.concat([
      require('postcss-import')({ addDependencyTo: webpack }),
      require('postcss-cssnext')({
        browsers: ['last 2 versions']
      })
    ]);
    return config;
  })(webpack);

  return {entry, output, module, plugins, postcss}
})(process.env.NODE_ENV);
*/

module.exports = [jsConfig];
