const autoprefixer = require('autoprefixer');
const chalk = require('chalk');
const cpx = require('cpx');
const fs = require('fs-extra');
const glob = require('glob');
const sass = require('node-sass');
const path = require('path');
const postcss = require('postcss');

/**
 *
 * CSS Builder
 * @param {string} srcFilePath 	src file path
 * @param {bool} isProduction 	whether to production
 *
 */

module.exports = (srcFilePath, isProduction) => {

	if (srcFilePath) {
		if (srcFilePath.match(/^(src\/scss\/app\/).*/)) {
			if (path.basename(srcFilePath)[0] === '_') {
				getAppFilesPath().forEach((appFilePath) => {
					buildApp(appFilePath);
				});
				if (path.basename(srcFilePath) === '_config.scss') {
					buildLibCSS();
				}
			} else {
				buildApp(srcFilePath);
			}
		} else if (srcFilePath.match(/^(src\/scss\/vendor\/).*/)) {
			buildVendor(srcFilePath);
		}
	} else {
		const vendorFilesPath = glob.sync('./src/scss/vendor/*.css');
		getAppFilesPath().forEach((appFilePath) => {
			buildApp(appFilePath);
		});
		vendorFilesPath.forEach((vendorFilePath) => {
			buildVendor(vendorFilePath);
		});
		buildLibCSS();
	}

	// build app directory
	function buildApp (srcFilePath, isLib) {
		let destFilePath;
		if (isLib) {
			destFilePath = './dest/assets/css/lib.css';
		} else {
			destFilePath = getDestFilePath(srcFilePath);
		}
		sass.render({
			file: srcFilePath,
			outputStyle: isProduction ? 'compressed' : 'expanded',
			outFile: destFilePath,
			sourceMap: isProduction ? false : true,
			sourceMapEmbed: isProduction ? false : true,
			importer(url, prev, done) {
				if (url.match(/^frontwork\//)) {
					url = path.resolve(__dirname, '../assets/scss/') + '/' + url.replace(/^frontwork\//, '');
				} else if (url.match(/^~\//)) {
					url = process.cwd() + '/src/scss/app/' + url.replace(/^~\//, '');
				}
				return {
					file: url
				};
			}
		}, (err, result) => {
			if (err) {
				console.error(chalk.red(err.formatted));
			} else {
				postcss([ autoprefixer({
					remove: false,
					browsers: 'last 3 versions'
				}) ]).process(result.css, {
					from: srcFilePath,
					to: destFilePath,
					map: isProduction ? false : {
						inline: true
					}
				}).then((result) => {
					result.warnings().forEach(function (warn) {
						console.warn(warn.toString());
					});
					fs.outputFile(destFilePath, result.css, (err) => {
						console.log(chalk.green('Output: ' + destFilePath));
					});
				});
			}
		});
	}

	// build vendor directory
	function buildVendor (srcFilePath) {
		const destFilePath = getDestFilePath(srcFilePath);
		cpx.copy(srcFilePath, './dest/assets/css/', (err) => {
			if (err) {
				console.error(chalk.red(err));
			} else {
				console.log(chalk.green('Output: ' + destFilePath));
			}
		});
	}

	// build lib.css
	function buildLibCSS () {
		const libFilePath = path.resolve(__dirname, '../assets/scss/main.scss');
		buildApp(libFilePath, true);
	}

	// get app files path
	function getAppFilesPath () {
		return glob.sync('./src/scss/app/*.scss').filter((srcFilePath) => {
			return (path.basename(srcFilePath).charAt(0) !== '_');
		});
	}

	// get dest file path
	function getDestFilePath (srcFilePath) {
		return './dest/assets/css/' + path.basename(srcFilePath, '.scss').replace(/\.css$/, '') + '.css';
	}

};
