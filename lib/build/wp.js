/**
 *
 * WordPress Builder
 * @param {object} config
 * @return {promise}
 *
 */

const chalk = require('chalk');
const cpx = require('cpx');
const fs = require('fs');

module.exports = (config, destFilePath) => {

  /**
   *
   * getWpDirectoryPath
   * @param {string} destFilePath
   * @return {string}
   *
   */

  const getWpDirectoryPath = (destFilePath) => {
    const globStats = globBase('./src');
    const extName = path.extname(destFilePath);
    const fileName = path.basename(destFilePath, extName);
    const dirName = path.dirname(destFilePath).replace(globStats.base + '/wp', '');
    return './' + path.join('./dest', dirName, '/');
  };


  /**
   *
   * getDestFilesPath
   * @param {string} destFilesPathPattern
   * @return {array}
   *
   */

  const getDestFilesPath = (destFilesPathPattern) => {
    return glob.sync(destFilesPathPattern).filter((destFilePath) => {
      if (!fs.statSync(destFilePath).isDirectory()) {
        return destFilePath;
      }
    });
  };

  if (config.wp.useSync) {
    if (!destFilePath) {
      return new Promise((resolve, reject) => {
        cpx.copy('.dest/' + config.path.assets + '/**/{*,.*}', './wp/wp-content/themes/' + config.wp.theme + '/' + config.path.assets, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }).catch((err) => {
        console.error(chalk.red(err));
      });
    } else {
      return new Promise((resolve) => {
        const destFilesPath = getDestFilesPath('./' + destFilePath);
        resolve(destFilesPath);
      }).then((destFilesPath) => {
        if (destFilesPath.length) {
          const processing = [];
          destFilesPath.forEach((destFilePath) => {
            const wpDirectoryPath = getWpDirectoryPath(destFilePath);
            processing.push(new Promise((resolve, reject) => {
              cpx.copy(destFilePath, './wp/wp-content/themes/' + config.wp.theme + '/' + config.path.assets + '/' + wpDirectoryPath, (err) => {
                if (err) {
                  reject(err);
                } else {
                  console.log(chalk.green('Copying: ' + './wp/wp-content/themes/' + config.wp.theme + '/' + config.path.assets +  path.basename(wpDirectoryPath)));
                  resolve();
                }
              });
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
    }
  } else {
    return new Promise();
  }
};
