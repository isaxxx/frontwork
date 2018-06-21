const ejss = require('ejss');
const path = require('path');

/**
 *
 * HTML Builder
 * @param {string} srcFilePath
 * @param {bool} isProduction
 *
 */

module.exports = (srcFilePath, isProduction) => {

	ejss({
		src: './src/ejs/**/*.ejs',
    compression: isProduction,
    log: true
	});
  
};
