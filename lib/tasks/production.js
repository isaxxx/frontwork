/**
 *
 * production task
 *
 */

const rimraf = require('rimraf');
const buildCSS = require('../build/css');
const buildHTML = require('../build/html');
const buildIconfont = require('../build/iconfont');
const buildImages = require('../build/images');
const buildJS = require('../build/js');
const buildStyleguide = require('../build/styleguide');

module.exports = () => {

  const targetFile = false;
  const isMinify = true;

  rimraf('./dest/', () => {
    buildHTML(targetFile, isMinify);
    buildIconfont(() => {
      buildCSS(targetFile, isMinify);
    });
    buildImages(targetFile);
    buildJS(targetFile, isMinify);
    buildStyleguide();
  });
  
};
