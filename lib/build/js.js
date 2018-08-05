/**
 *
 * JavaScript Builder
 * @param {object} config
 * @return {promise}
 *
 */

const chalk = require('chalk');
const cpx = require('cpx');
const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
let webpackConfig = require(process.cwd() + '/src/webpack.conf.js');

module.exports = (config) => {
  return new Promise((resolve, reject) => {
    // app
    webpackConfig = Object.assign({
      mode: config.isMinify ? 'production' : 'development',
      devtool: config.isMinify ? false : 'inline-source-map',
      resolve: {
        alias: {
          frontwork: path.resolve(__dirname, '../assets/js/')
        }
      },
      entry: process.cwd() + '/src/js/app/app.js',
      output: {
        path: process.cwd() + '/dest/' + config.path.assets + '/' + config.path.js + '/',
        filename: 'app.js'
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
          },
          // lint
          {
            enforce: 'pre',
            test: /\.js$/,
            exclude: [
              /node_modules/,
              /lib/
            ],
            use: {
              loader: 'eslint-loader',
              options: {
                configFile: process.cwd() + '/src/.eslintrc.json'
              }
            }
          }
        ]
      }
    }, webpackConfig);
    if (glob.sync(webpackConfig.entry).length) {
      webpack(webpackConfig).run((err, stats) => {
        if (err) {
          reject(err);
        } else {
          console.log(stats.toString({
            colors: true
          }));
          console.log(chalk.green('Output: ' + './dest/' + config.path.assets + '/' + config.path.js + '/' + webpackConfig.output.filename));
          resolve();
        }
      });
    } else {
      resolve();
    }
  }).then(() => {
    // vendor
    const vendorFilesPath = glob.sync('./src/js/vendor/*.js');
    if (vendorFilesPath.length) {
      const processing = [];
      vendorFilesPath.forEach((vendorFilePath) => {
        processing.push(new Promise((resolve, reject) => {
          cpx.copy(vendorFilePath, './dest/' + config.path.assets + '/' + config.path.js + '/', (err) => {
            if (err) {
              reject(err);
            } else {
              console.log(chalk.green('Output: ' + './dest/' + config.path.assets + '/' + config.path.js + '/' + path.basename(vendorFilePath)));
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
};
