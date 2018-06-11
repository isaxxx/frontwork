/**
 *
 * JavaScript Builder
 * @param {string} srcFilePath
 * @param {bool} isProduction
 *
 */

const babel = require('babel-core');
const chalk = require('chalk');
const cpx = require('cpx');
const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');
const webpack = require('webpack');

module.exports = (srcFilePath, isProduction) => {

	if (srcFilePath) {
		if (srcFilePath.match(/^(src\/js\/app\/).*/)) {
			buildApp(srcFilePath);
		} else if (srcFilePath.match(/^(src\/js\/vendor\/).*/)) {
			buildVendor(srcFilePath);
		}
	} else {
		const appFilesPath = glob.sync('./src/js/app/*.js');
		const vendorFilesPath = glob.sync('./src/js/vendor/*.js');
		appFilesPath.forEach((appFilePath) => {
			buildApp(appFilePath);
		});
		vendorFilesPath.forEach((vendorFilePath) => {
			buildVendor(vendorFilePath);
		});
		buildLibJS();
	}

	// build app directory
	function buildApp (srcFilePath) {
		const destFilePath = getDestFilePath(srcFilePath);
		babel.transformFile(srcFilePath, {
			comments: isProduction ? false : true,
			sourceMaps: isProduction ? false : 'inline',
			presets: ['babel-preset-env'],
			minified: isProduction ? true : false
		}, (err, result) => {
			if (err) {
				console.error(chalk.red(err));
			} else {
				fs.outputFile(destFilePath, result.code, () => {
					console.log(chalk.green('Output: ' + destFilePath));
				});
			}
		});
	}

	// build vendor directory
	function buildVendor (srcFilePath) {
		const destFilePath = getDestFilePath(srcFilePath);
		cpx.copy(srcFilePath, './dest/assets/js/', (err) => {
			if (err) {
				console.error(chalk.red(err));
			} else {
				console.log(chalk.green('Output: ' + destFilePath));
			}
		});
	}

	// build lib.js
	function buildLibJS () {
		const entryFilePath = path.resolve(__dirname, '../assets/js/main.js');
		const compiler = webpack({
			mode: isProduction ? 'production' : 'development',
			entry: entryFilePath,
			output: {
				path: process.cwd() + '/dest/assets/js/',
				filename: 'lib.js',
				library: 'Frontwork'
			},
			module: {
				rules: [
					{
						test: /\.js$/, 
						exclude: /node_modules/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: ['babel-preset-env']
							}
						}
					}
				]
			},
			devtool: isProduction ? false : 'inline-source-map'
		});
		compiler.run((err, stats) => {
			if (err) {
				console.error(chalk.red(err));
			} else {
				console.log(chalk.green('Output: ./dest/assets/js/lib.js'));
			}
		});
	}

	// get dest file path
	function getDestFilePath (srcFilePath) {
		return './dest/assets/js/' + path.basename(srcFilePath);
	}
	
};
