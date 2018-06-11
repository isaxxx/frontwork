/**
 *
 * exec
 * @param {object} param
 * @param {function} callback
 *
 */

const defaultParam = require('./command');
const pkg = require('../package.json');
const updateNotifier = require('update-notifier');

module.exports = (param, callback) => {
  param = Object.assign({}, defaultParam, param);
  return new Promise((resolve, reject) => {
    updateNotifier({pkg}).notify();
    resolve();
  })
  .then(() => {
    if (param.init) {
      require('./tasks/init')(param, callback);
    } else if (param.watch) {
      require('./tasks/watch')(param, callback);
    } else if (param.production) {
      require('./tasks/production')(param, callback);
    }
  });
};
