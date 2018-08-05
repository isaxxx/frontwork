/**
 *
 * Init Task
 *
 */

const chalk = require('chalk');
const cpx = require('cpx');
const fs = require('fs');
const path = require('path');

module.exports = () => {
  return new Promise((resolve, reject) => {
    fs.access('./src/', (err) => {
      if (err) {
        if (err.code === 'ENOENT') {
          resolve();
        } else {
          reject(err);
        }
      } else {
        reject('Error: src directory exist');
      }
    });
  }).then(() => {
    return new Promise((resolve, reject) => {
      cpx.copy(path.resolve(__dirname, '../templates/src/') + '/**/{*,.*}', './src', (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }).catch((err) => {
    console.error(chalk.red(err));
  });
};
