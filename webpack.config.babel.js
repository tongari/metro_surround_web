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
    // filename:  (env === 'prod') ? '[name].min.js': "[name].js"
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
      loaders: ['style', 'css?modules']
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

    return {
      loaders: [rp, jsModule, cssModule]
    };
  })(env);

  const eslint = {
    configFile: '.eslintrc'
  };

  const plugins = [
    new WebpackBuildNotifierPlugin(),
    new CopyWebpackPlugin([
      {from: `${PATH.src}/html`, to: path.join(__dirname, 'dist')},
      {from: `${PATH.src}/img`, to: path.join(__dirname, 'dist/img')},
      {from: `${PATH.src}/img`, to: path.join(__dirname, 'dist/images')},
    ])
  ];

  return {entry, output, module, eslint, plugins}
})(process.env.NODE_ENV);

// const cssConfig = ((env)=>{
//   const entry = {
//     app: `${PATH.src}/css/index.css`,
//     child: `${PATH.src}/css/child/index.css`
//   };
//   const output = {
//     path: `${PATH.dist}/css/`,
//     publicPath: '',
//     filename: '[name].css',
//   };
//   const cssPath = (env === 'prod') ? '/img/': './../img/';
//   const module = {
//     loaders: [
//       {
//         test: /\.css$/,
//         loader: ExtractTextPlugin.extract('style-loader','css-loader')
//       },
//       { test: /\.(jpe?g|png|gif)$/i, loaders: [ `file-loader?limit=10000&name=${cssPath}[name].[ext]`] }
//     ]
//   };
//   const plugins = [
//     new ExtractTextPlugin('[name].css')
//   ];
//
//   return {entry, output, module, plugins}
// })(process.env.NODE_ENV);

// const htmlConfig = ((env) => {
//
//   const output = {
//     path: PATH.dist,
//     filename: "[name].html"
//   };
//
//   const plugins = [
//     new HtmlWebpackPlugin({
//       template: `${PATH.src}/html/index.html`,
//       filename: 'index.html'
//     })
//   ];
//
//   return {output, plugins}
// })(process.env.NODE_ENV);
//
// const copyHtmlConfig = ((env) => {
//
//   const entry = {
//     'index': `${PATH.src}/html/index.html`
//   };
//
//   const output = {
//     path: PATH.dist,
//     filename: "[name].html"
//   };
//
//   const modules = {
//     test: /\.html?$/,
//     loaders:['string-replace','html-loader'],
//     query: {
//       search: '{ENV_SUFFIX}',
//       replace: (env === 'prod') ? '.min': ""
//     }
//   };
//
//   const plugins = [
//     new CopyWebpackPlugin([
//       {from: `${PATH.src}/html`, to: path.join(__dirname, 'dist')}
//     ])
//   ];
//
//   return {entry, output, modules, plugins}
// })(process.env.NODE_ENV);

module.exports = [jsConfig];
