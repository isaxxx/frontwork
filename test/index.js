const frontwork = require('../index');
const test = require('ava');

test('test sample', (t) => {
  return new Promise((resolve, reject) => {
		return resolve(t.pass());
	});
});
