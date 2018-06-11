/**
 *
 * Images Builder
 * @param {string} srcFilePath
 * @param {function} callback
 *
 */

const chalk = require('chalk');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

module.exports = (srcFilePath, callback) => {
	callback = callback || function () {};
	imagemin([srcFilePath ? srcFilePath : './src/images/*'], './dest/assets/images/', {
    plugins: [
			imageminJpegtran(),
			imageminPngquant({quality: '65-80'})
    ]
	}).then((srcFilesPath) => {
		srcFilesPath.forEach((srcFilePath) => {
			console.log(chalk.green('Output: ' + srcFilePath.path));
		});
		callback();
	});
};
