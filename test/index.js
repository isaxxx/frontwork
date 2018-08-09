const test = require('ava');
const rimraf = require('rimraf');
const frontwork = require('../index');

test('init task - case 001', (t) => {
  return new Promise((resolve) => {
    rimraf('./src/', () => {
      resolve();
    });
  }).then(() => {
    return frontwork({
      init: true,
      watch: false,
      production: false
    });
  }).then(() => {
    t.pass();
  });
});
