/**
 *
 * JavaScript Builder
 * @param {object} config
 * @return {promise}
 *
 */

const chalk = require('chalk');
const cpx = require('cpx');
const glob = require('glob');
const path = require('path');
const webpack = require('webpack');

module.exports = (config) => {
  return new Promise((resolve, reject) => {
    // vendor
    const vendorFilesPath = glob.sync('./src/js/vendor/*.js');
    if (vendorFilesPath.length) {
      const processing = [];
      vendorFilesPath.forEach((vendorFilePath) => {
        processing.push(new Promise((resolve, reject) => {
          cpx.copy(vendorFilePath, './dest/' + config.path.assets + '/' + config.path.js + '/', (err) => {
            if (err) {
              reject(err);
            } else {
              console.log(chalk.green('Output: ' + './dest/' + config.path.assets + '/' + config.path.js + '/' + path.basename(vendorFilePath)));
              resolve();
            }
          });
        }));
      });
      return Promise.all(processing);
    } else {
      return new Promise((resolve) => {
        resolve();
      });
    }
  }).catch((err) => {
    console.error(chalk.red(err));
  });
};
