/* global environment, path, $, config */
'use strict';

global.config = {};
config.PROJECT_ROOT = path.join(__dirname, '..');
config.DIST = path.join(config.PROJECT_ROOT, 'dist');

var envAssets = require('./environment/' + environment);

var bowerFiles = $.mainBowerFiles();
var vendorAssetsOther = [];
if (bowerFiles === null) { bowerFiles = []; }

config.VENDOR_ASSETS = bowerFiles.concat(vendorAssetsOther, envAssets.vendor);

config.assets = {
  src: [
    path.join(config.PROJECT_ROOT, 'src/**/*.{png,jpg,ttf,html,ico,svg}'),
    path.join(config.PROJECT_ROOT, 'src/CNAME'),
    path.join(config.PROJECT_ROOT, 'src/sitemap.xml')
  ],
  dest: config.DIST
};

config.assetsData = {
  src: path.join(config.PROJECT_ROOT, '/src/data/**/*.*'),
  dest: config.DIST
};

config.assetsVendor = {
  src: config.VENDOR_ASSETS,
  dest: config.DIST
};

config.build = {
  src: config.PROJECT_ROOT + '',
  dest: config.DIST
};

config.clean = {
  src: config.PROJECT_ROOT + '/dist/**/*'
};

config.js = {
  src: config.PROJECT_ROOT + '/src/js/site.js',
  dest: path.join(config.DIST, 'js'),
  inject: {
    options: {
      transform: function() {
        var configContents = require(path.join(config.PROJECT_ROOT, 'src/config/environment', environment + '.js'));
        return '.constant(\'CONFIG\', ' + $.tosource(configContents) + ')';
      },
      starttag: '// injectconfig',
      endtag: '// endinject'
    }
  },
  webpackOptions: require(config.PROJECT_ROOT + '/webpack.config.js'),
};

config.lint = {
  src: [
    config.PROJECT_ROOT + '/src/**/*.js',
    config.PROJECT_ROOT + '/gulp/**/*.js',
    config.PROJECT_ROOT + '/gulpfile.js',
    config.PROJECT_ROOT + '/webpack.config.js'
  ],
  reporter: 'jshint-stylish'
};

config.sass = {
  src: config.PROJECT_ROOT + '/src/css/global.scss',
  dest: path.join(config.DIST, 'css'),
  filter: '**/*.css',

  inject: {
    src: [path.join(config.PROJECT_ROOT, 'src/**/*.scss')],
    options: {
      transform: function (filepath) {
        return '@import "' + filepath + '";';
      },
      starttag: '// inject:scss',
      endtag: '// endinject',
      addRootSlash: false
    }
  },

  options: {
    style: 'expanded',
    errLogToConsole: true,
    includePaths: [
      path.join(config.PROJECT_ROOT, '/src/app'),
      path.join(config.PROJECT_ROOT, '/src/assets/stylesheets'),
      path.join(config.PROJECT_ROOT, '/bower_components/foundation/scss'),
      require('node-bourbon').includePaths
    ]
  }
};

config.serve = {
  browserSyncOptions: {
    server: {
      baseDir: config.DIST,
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  }
};

config.watch = {
  assets: {
    task: 'assets',
    src: path.join(config.PROJECT_ROOT, '/src/**/*.{png,jpg,html,ttf,ico,svg}')
  },
  assetsData: {
    task: 'assets:data',
    src: config.assetsData.src
  },
  assetsVendor: {
    task: 'assets:vendor',
    src: config.PROJECT_ROOT + '/bower_components/*.{css,js}'
  },
  js: {
    task: 'js',
    src: config.PROJECT_ROOT + '/src/**/*.js'
  },
  lint: {
    task: 'lint',
    src: config.lint.src
  },
  sass: {
    task: 'sass',
    src: config.PROJECT_ROOT + '/src/**/*.scss'
  },
};

module.exports = config;
