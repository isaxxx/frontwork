/**
 *
 * styleguide task
 *
 */

const path = require('path');
const styleguideLite = require('styleguide-lite');

module.exports = () => {

	styleguideLite({
		src: [
			path.resolve(__dirname, '../assets/scss/') + '/**/*.scss',
			'./src/scss/app/*.scss'
		],
    template: path.resolve(__dirname, '../assets/scss/core/templates/styleguide.ejs')
	});
  
};
