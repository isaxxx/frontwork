/**
 *
 * JavaScript Builder
 * @param {object} config
 * @return {promise}
 *
 */

const chalk = require('chalk');
const webpack = require('webpack');

module.exports = (config, isWatch = false) => {
  return new Promise((resolve, reject) => {
    const webpackConfig = require(process.cwd() + '/src/webpack.conf.js');
    if (isWatch) {
      webpack(webpackConfig).watch({
        aggregateTimeout: 300,
        poll: 1000,
      }, (err, stats) => {
        if (err) {
          reject(err);
        } else {
          console.log(stats.toString({
            colors: true
          }));
          resolve();
        }
      });
    } else {
      webpack(webpackConfig).run((err, stats) => {
        if (err) {
          reject(err);
        } else {
          console.log(stats.toString({
            colors: true
          }));
          resolve();
        }
      });
    }
  }).catch((err) => {
    console.error(chalk.red(err));
  });
};
