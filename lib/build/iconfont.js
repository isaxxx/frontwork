/**
 *
 * Iconfont Builder
 * @param {function} callback
 *
 */

const iconfontGen = require('iconfont-gen');
const path = require('path');

module.exports = (callback) => {
	iconfontGen({
    templateInput: path.resolve(__dirname, '../assets/scss/core/templates/iconfont.ejs')
  }, callback);
};
