/**
 *
 * init task
 *
 */

const chalk = require('chalk');
const cpx = require('cpx');
const fs = require('fs');
const path = require('path');

module.exports = (param) => {

  fs.access('./src/', (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        cpx.copy(path.resolve(__dirname, '../template/src/') + '/**/*', './src', (err) => {
          if (err) {
            console.error(chalk.red(err));
          }
        });
      } else {
        console.error(chalk.red(err));
      }
    } else {
      console.error(chalk.red('Error: src directory exist'));
    }
  });

};
