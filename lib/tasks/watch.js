/**
 *
 * watch task
 *
 */

const browserSync = require('browser-sync');
const path = require('path');
const watch = require('watch');
const buildCSS = require('../build/css');
const buildHTML = require('../build/html');
const buildIconfont = require('../build/iconfont');
const buildImages = require('../build/images');
const buildJS = require('../build/js');

module.exports = () => {

	browserSync.create('frontwork').init({
		server: './dest/',
		files: './dest/**/*',
		notify: false
	});

	const watchOption = {
		interval: 1
	};

	watch.watchTree('./src/', watchOption, (file, current, prev) => {
		if (typeof file === 'string') {
			if (file.match(/^(src\/ejs\/).+\.(ejs|json)$/)) {
				buildHTML(file);
			} else if (file.match(/^(src\/svg\/).+\.(svg|ejs)$/)) {
				buildIconfont();
			} else if (file.match(/^(src\/images\/).+\.(png|jpg|jpeg|gif|ico|svg|)$/)) {
				buildImages(file);
			} else if (file.match(/^(src\/scss\/).+\.(scss|css)$/)) {
				buildCSS(file);
			} else if (file.match(/^(src\/js\/).+\.js$/)) {
				buildJS(file);
			}
		}
	});

	watch.watchTree(path.resolve(__dirname, '../assets/'), watchOption, (file, current, prev) => {
		const targetFile = false;
		if (typeof file === 'string') {
			if (file.match(/\.(scss|css)$/)) {
				buildCSS(targetFile);
			} else if (file.match(/\.js$/)) {
				buildJS(targetFile);
			}
		}
	});

};
