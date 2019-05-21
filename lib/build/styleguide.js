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
  if (config.styleguide.watch) {
    return new Promise((resolve) => {
      let srcFilesPathPattern = ['./src/scss/**/*.scss'];
      if (config.styleguide.useFrontworkCSS) {
        srcFilesPathPattern.push(path.resolve(__dirname, '../assets/scss/') + '/**/*.scss');
      }
      resolve(srcFilesPathPattern);
    }).then((srcFilesPathPattern) => {
      return styleguideLite({
        src: srcFilesPathPattern,
        dest: './dest/' + config.path.assets + '/' + config.path.styleguide + '/',
        template: './src/templates/styleguide/index.ejs'
      });
    });
  } else {
    return new Promise();    
  }
};
