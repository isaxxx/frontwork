const ejss = require('ejss');
const path = require('path');

/**
 *
 * HTML Builder
 * @param {string} srcFilePath  src file path
 * @param {bool} isProduction   whether to production
 *
 */

module.exports = (srcFilePath, isProduction) => {

  let isAllBuild = false;

  if (!srcFilePath) {
    isAllBuild = true;
  } else if (srcFilePath && (path.basename(srcFilePath)[0] === '_' || path.extname(srcFilePath) === '.json')) {
    isAllBuild = true;
  }

	ejss({
		src: isAllBuild ? './src/ejs/**/*.ejs' : srcFilePath
	});

  // add isProduction
  
};
