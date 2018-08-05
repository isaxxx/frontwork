/**
 *
 * Exec
 * @param {object} param
 *
 */

const defaultParam = require('./command');
const pkg = require('../package.json');
const updateNotifier = require('update-notifier');

module.exports = (param) => {
  return new Promise((resolve) => {
    updateNotifier({pkg}).notify();
    resolve();
  }).then(() => {
    param = Object.assign(defaultParam, param);
    if (param.init) {
      const initTask = require('./tasks/init');
      return initTask();
    } else {
      let config = require(process.cwd() + '/src/.frontwork.conf.js');
      config = Object.assign({
        path: {
          assets: 'assets',
          css: 'css',
          js: 'js',
          images: 'images',
          fonts: 'fonts',
          styleguide: 'styleguide'
        },
        browsers: 'last 3 versions',
        styleguide: {
          useFrontworkCSS: true,
          watch: true
        },
        isMinify: true
      }, config);
      if (param.production) {
        const productionTask = require('./tasks/production');
        return productionTask(config);
      } else if (param.watch) {
        const watchTask = require('./tasks/watch');
        return watchTask(config);
      }
    }
  });
};
