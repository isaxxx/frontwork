/**
 *
 * CSS Builder
 * @param {object} config
 * @return {promise}
 *
 */

const autoprefixer = require('autoprefixer');
const comments = require('postcss-discard-comments');
const chalk = require('chalk');
const cpx = require('cpx');
const fs = require('fs-extra');
const glob = require('glob');
const sass = require('node-sass');
const sassLint = require('sass-lint');
const path = require('path');
const postcss = require('postcss');

module.exports = (config) => {
  return new Promise((resolve) => {
    // lint
    const result = sassLint.lintFiles(null, {}, './src/.sass-lint.yml');
    sassLint.outputResults(result);
    resolve();
  }).then(() => {
    // app
    const appFilesPath = glob.sync('./src/scss/app/*.scss');
    if (appFilesPath.length) {
      const processing = [];
      appFilesPath.filter((appFilePath) => {
        return (path.basename(appFilePath).charAt(0) !== '_');
      }).forEach((appFilePath) => {
        processing.push(new Promise((resolve, reject) => {
          const destFilePath = './dest/' + config.path.assets + '/' + config.path.css + '/' + path.basename(appFilePath, '.scss') + '.css';
          sass.render({
            file: appFilePath,
            outputStyle: config.isMinify ? 'compressed' : 'expanded',
            outFile: destFilePath,
            sourceMap: config.isMinify ? false : true,
            sourceMapEmbed: config.isMinify ? false : true,
            importer(url) {
              if (url.match(/^frontwork\//)) {
                url = path.resolve(__dirname, '../assets/scss/') + '/' + url.replace(/^frontwork\//, '');
              } else if (url.match(/^~\//)) {
                url = process.cwd() + '/src/scss/' + url.replace(/^~\//, '');
              }
              return {
                file: url
              };
            }
          }, (err, result) => {
            if (err) {
              reject(err.formatted);
            } else {
              postcss([comments({
                remove: (comment) => {
                  return comment[1] === '=';
                }
              }), autoprefixer({
                remove: false,
                browsers: config.browsers
              })]).process(result.css, {
                from: appFilePath,
                to: destFilePath,
                map: config.isMinify ? false : {
                  inline: true
                }
              }).then((result) => {
                result.warnings().forEach((warn) => {
                  reject(warn.toString());
                });
                fs.outputFile(destFilePath, result.css, (err) => {
                  if (err) {
                    reject(err);
                  } else {
                    console.log(chalk.green('Output: ' + destFilePath));
                    resolve();
                  }
                });
              });
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
};
