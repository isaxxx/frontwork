const frontwork = require('../index');
const test = require('ava');

test('init task - case 001', (t) => {
  frontwork({
    init: true
  }).then(() => {
    t.pass();
  });
});

test('watch task - case 002', (t) => {
  frontwork({
    watch: true
  }).then(() => {
    t.pass();
  });
});

test('production task - case 003', (t) => {
  return frontwork({
    production: true
  }).then(() => {
    t.pass();
  });
});
