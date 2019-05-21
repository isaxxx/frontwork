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
const imageminWebp = require('imagemin-webp');
const path = require('path');
const fs = require('fs');

module.exports = (config, srcFilePath) => {

  /**
   *
   * getSrcFilesPath
   * @param {string} srcFilesPathPattern
   * @return {array}
   *
   */

  const getSrcFilesPath = (srcFilesPathPattern) => {
    return glob.sync(srcFilesPathPattern).filter((srcFilePath) => {
      if (!fs.statSync(srcFilePath).isDirectory()) {
        return srcFilePath;
      }
    });
  };

  /**
   *
   * getDestDirectoryPath
   * @param {string} srcFilePath
   * @return {string}
   *
   */

  const getDestDirectoryPath = (srcFilePath) => {
    const dirName = path.dirname(srcFilePath).replace('./src/images', '');
    return './' + path.join('./dest/' + config.path.assets + '/' + config.path.images, dirName, '/');
  };

  return new Promise((resolve) => {
    const srcFilesPath = getSrcFilesPath(srcFilePath ? './' + srcFilePath : './src/images/**/{*,.*}');
    resolve(srcFilesPath);
  }).then((srcFilesPath) => {
    if (srcFilesPath.length) {
      const processing = [];
      srcFilesPath.forEach((srcFilePath) => {
        const destDirectoryPath = getDestDirectoryPath(srcFilePath);
        processing.push(new Promise((resolve, reject) => {
          if (srcFilePath.match(/\.(jpg|png|gif|svg)$/)) {
            imagemin([srcFilePath], destDirectoryPath, {
              plugins: [
                imageminGifsicle(),
                imageminMozjpeg({
                  quality: config.imageminQuality.mozjpeg
                }),
                imageminPngquant({
                  quality: config.imageminQuality.pngquant
                }),
                imageminSvgo()
              ]
            }).then((filesPath) => {
              filesPath.forEach((filePath) => {
                console.log(chalk.green('Output: ' + './' + filePath.path));
              });
              if (path.extname(srcFilePath).match(/\.(jpg|png)$/)) {
                imagemin([srcFilePath], destDirectoryPath, {
                  plugins: [
                    imageminWebp({
                      quality: config.imageminQuality.webp
                    })
                  ]
                }).then((filesPath) => {
                  filesPath.forEach((filePath) => {
                    console.log(chalk.green('Output: ' + './' + filePath.path));
                  });
                  resolve();
                });
              } else {
                resolve();
              }
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
