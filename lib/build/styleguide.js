/**
 *
 * Styleguide builder
 * @param {object} config
 * @return {promise}
 *
 */

const path = require('path');
const styleguideLite = require('styleguide-lite');

module.exports = (config) => {
  return new Promise((resolve) => {
    let srcFilesPathPattern = ['./src/scss/**/*.scss'];
    if (config.styleguide.useFrontworkCSS) {
      srcFilesPathPattern.push(path.resolve(__dirname, '../assets/scss/') + '/**/*.scss');
    }
    styleguideLite({
      src: srcFilesPathPattern,
      dest: './dest/' + config.path.assets + '/' + config.path.styleguide + '/',
      template: './src/templates/styleguide/index.ejs',
      assets: './dest/' + config.path.assets + '/',
      log: true
    }, () => {
      resolve();
    });
  });
};
