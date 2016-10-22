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
    'app': `${PATH.src}/js/app.jsx`
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

    const svgModule = {
      // test: /\.svg$/, loader: 'svg-loader'
      test: /\.(png|svg)$/i, loaders: [ 'url?name=[path][name].[ext]' ]
    };

    return {
      loaders: [rp, svgModule, jsModule, cssModule]
    };
  })(env);

  const eslint = {
    configFile: '.eslintrc'
  };

  const plugins = [
    new WebpackBuildNotifierPlugin(),
    new CopyWebpackPlugin([
      {from: `${PATH.src}/html`, to: path.join(__dirname, 'dist')},
      {from: `${PATH.src}/asset/img`, to: path.join(__dirname, 'dist/img')}
    ])
  ];

  const resolve = {
    extensions: ['', '.js', '.jsx']
  }

  return {entry, output, module, eslint, plugins, resolve}
})(process.env.NODE_ENV);

const cssConfig = ((env)=>{
  const entry = {
    app: `${PATH.src}/css/index.css`,
  };
  const output = {
    path: `${PATH.dist}/css/`,
    filename: '[name].css',
  };

  const cssLoaderQuery = {
    modules: true,
    sourceMap: (env === 'prod') ? true : false,
    localIdentName: '[name]-[local]-[hash:base64:5]',
    importLoaders: 1
  };
  const module = {
    loaders: [
      {
        test: /\.css$/,
        // loader: ExtractTextPlugin.extract([`css?${cssLoaderQuery}`, 'postcss'])
        loader: ExtractTextPlugin.extract('style-loader','css-loader!postcss-loader')
      }
    ]
  };
  const plugins = [
    new ExtractTextPlugin('[name].css')
  ];

  const postcss = (() => {
    let config = [];
    config = config.concat([
      require('postcss-cssnext')({ browsers: [
        'last 2 versions'
      ]})
    ]);

    return config;
  })();

  return {entry, output, module, plugins, postcss}
})(process.env.NODE_ENV);


module.exports = [jsConfig, cssConfig];
