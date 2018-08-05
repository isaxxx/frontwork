/**
 *
 * HTML Builder
 * @param {object} config
 * @return {promise}
 *
 */

const ejss = require('ejss');

module.exports = (config) => {
  return new Promise((resolve) => {
    ejss({
      src: './src/ejs/**/*.ejs',
      dest: './dest/',
      data: './src/ejs-data.json',
      compression: config.isMinify,
      lint: './src/.htmlhintrc.json',
      log: true
    }, () => {
      resolve();
    });
  });
};
