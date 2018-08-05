/**
 *
 * Images Builder
 * @param {object} config
 * @param {string} srcFilePath
 * @return {promise}
 *
 */

const chalk = require('chalk');
const cpx = require('cpx');
const glob = require('glob');
const imagemin = require('imagemin');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');
const path = require('path');

module.exports = (config, srcFilePath) => {
  return new Promise((resolve) => {
    const srcFilesPath = glob.sync(srcFilePath ? srcFilePath : './src/images/*');
    resolve(srcFilesPath);
  }).then((srcFilesPath) => {
    if (srcFilesPath.length) {
      const processing = [];
      srcFilesPath.forEach((srcFilePath) => {
        processing.push(new Promise((resolve, reject) => {
          if (srcFilePath.match(/\.(jpg|png|gif|svg)$/)) {
            imagemin([srcFilePath], './dest/assets/images/', {
              plugins: [
                imageminGifsicle(),
                imageminMozjpeg({
                  quality: 80
                }),
                imageminPngquant({
                  quality: '65-80'
                }),
                imageminSvgo()
              ]
            }).then((filesPath) => {
              filesPath.forEach((filePath) => {
                console.log(chalk.green('Output: ' + './' + filePath.path));
              });
              resolve();
            });
          } else {
            cpx.copy(srcFilePath, './dest/' + config.path.assets + '/' + config.path.images + '/', (err) => {
              if (err) {
                reject(err);
              } else {
                console.log(chalk.green('Output: ' + './dest/' + config.path.assets + '/' + config.path.images + '/' + path.basename(srcFilePath)));
                resolve();
              }
            });
          }
        }));
      });
      return Promise.all(processing);
    } else {
      return new Promise((resolve) => {
        resolve();
      });
    }
  }).catch((err) => {
    console.error(chalk.red(err));
  });
};
