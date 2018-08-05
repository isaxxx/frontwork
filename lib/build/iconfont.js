/**
 *
 * Iconfont Builder
 * @param {object} config
 * @return {promise}
 *
 */

const iconfontGen = require('iconfont-gen');
const path = require('path');

module.exports = (config) => {
  return new Promise((resolve) => {
    iconfontGen({
      src: './src/svg/*.svg',
      dest: './dest/' + config.path.assets + '/' + config.path.fonts + '/',
      name: 'iconfont',
      templateInput: path.resolve(__dirname, '../assets/scss/core/templates/iconfont.ejs'),
      templateOutput: './src/scss/app/_iconfont.scss',
      log: true
    }, () => {
      resolve();
    });
  });
};
