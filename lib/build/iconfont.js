/**
 *
 * Iconfont Builder
 * @param {object} config
 * @return {promise}
 *
 */

const iconfontGen = require('iconfont-gen');

module.exports = (config) => {
  if (config.iconfont.use) {
    return iconfontGen({
      src: './src/svg/*.svg',
      dest: './dest/' + config.path.assets + '/' + config.path.fonts + '/',
      name: 'iconfont',
      templateInput: './src/templates/iconfont/index.ejs',
      templateOutput: './src/scss/app/_iconfont.scss'
    });
  } else {
    return new Promise();
  }
};
