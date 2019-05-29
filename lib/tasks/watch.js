/**
 *
 * Watch Task
 * @param {object} config
 *
 */

const browserSync = require('browser-sync');
const chalk = require('chalk');
const path = require('path');
const watch = require('watch');
const webpack = require('webpack');
const buildCSS = require('../build/css');
const buildHTML = require('../build/html');
const buildIconfont = require('../build/iconfont');
const buildImages = require('../build/images');
const buildJS = require('../build/js');
const buildStyleguide = require('../build/styleguide');
const buildWp = require('../build/wp');

module.exports = (config) => {
  return new Promise((resolve) => {
    // browser-sync
    browserSync.create('frontwork').init({
      server: './dest/',
      files: './dest/**/*',
      notify: false
    }, () => {
      resolve();
    });
  }).then(() => {
    return new Promise((resolve) => {
      // watch
      const watchOption = {
        interval: 1
      };
      watch.watchTree('./src/', watchOption, (srcFilePath) => {
        if (typeof srcFilePath === 'string') {
          if (srcFilePath.match(/^(src\/ejs\/).+\.ejs$/)) {
            buildHTML(config);
          } else if (srcFilePath.match(/^(src\/svg\/).+\.svg$/)) {
            buildIconfont(config);
          } else if (srcFilePath.match(/^(src\/images\/).+/)) {
            buildImages(config, srcFilePath);
          } else if (srcFilePath.match(/^(src\/scss\/).+\.(scss|css)$/)) {
            buildCSS(config).then(() => {
              return buildStyleguide(config);
            });
          } else if (srcFilePath.match(/^(src\/js\/vendor\/).+\.(jsx|js)$/)) {
            buildJS(config);
          }
        }
      });
      watch.watchTree('./dest/' + config.path.assets + '/', watchOption, (destFilePath) => {
        if (typeof srcFilePath === 'string') {
          buildWp(config, destFilePath);
        }
      });
      watch.watchTree(path.resolve(__dirname, '../assets/'), watchOption, (srcFilePath) => {
        if (typeof srcFilePath === 'string') {
          if (srcFilePath.match(/\.scss$/)) {
            buildCSS(config).then(() => {
              return buildStyleguide(config);
            });
          } else if (srcFilePath.match(/\.js$/)) {
            buildJS(config);
          }
        }
      });

      // webpack
      const webpackConfig = require(process.cwd() + '/src/webpack.conf.js');
      webpack(webpackConfig).watch({
        aggregateTimeout: 300,
        poll: 1000,
      }, (err, stats) => {
        if (err) {
          console.error(chalk.red(err));
        } else {
          console.log(stats.toString({
            colors: true
          }));
        }
      });

      resolve();
    });
  });
};
