/**
 *
 * Production Task
 * @param {object} config
 *
 */

const rimraf = require('rimraf');
const buildCSS = require('../build/css');
const buildHTML = require('../build/html');
const buildIconfont = require('../build/iconfont');
const buildImages = require('../build/images');
const buildJS = require('../build/js');
const buildStyleguide = require('../build/styleguide');
const buildWp = require('../build/wp');

module.exports = (config) => {
  return new Promise((resolve) => {
    rimraf('./dest/', () => {
      resolve();
    });
  }).then(() => {
    return buildHTML(config);
  }).then(() => {
    return buildIconfont(config);
  }).then(() => {
    return buildCSS(config);
  }).then(() => {
    return buildJS(config);
  }).then(() => {
    return buildImages(config);
  }).then(() => {
    return buildStyleguide(config);
  }).then(() => {
    return buildWp(config);
  });
};
