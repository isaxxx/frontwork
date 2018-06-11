const frontwork = require('../index');
const test = require('ava');

test('test', (t) => {
  return new Promise((resolve, reject) => {
		return resolve(t.pass());
	});
});
