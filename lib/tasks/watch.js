/**
 *
 * Watch Task
 * @param {object} config
 *
 */

const browserSync = require('browser-sync');
const path = require('path');
const watch = require('watch');
const buildCSS = require('../build/css');
const buildHTML = require('../build/html');
const buildIconfont = require('../build/iconfont');
const buildImages = require('../build/images');
const buildJS = require('../build/js');
const buildStyleguide = require('../build/styleguide');

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
              if (config.styleguide.watch) {
                buildStyleguide(config);
              }
            });
          } else if (srcFilePath.match(/^(src\/js\/).+\.js$/)) {
            buildJS(config);
          }
        }
      });
      watch.watchTree(path.resolve(__dirname, '../assets/'), watchOption, (srcFilePath) => {
        if (typeof srcFilePath === 'string') {
          if (srcFilePath.match(/\.scss$/)) {
            buildCSS(config).then(() => {
              if (config.styleguide.watch) {
                buildStyleguide(config);
              }
            });
          } else if (srcFilePath.match(/\.js$/)) {
            buildJS(config);
          }
        }
      });
      resolve();
    });
  });
};
