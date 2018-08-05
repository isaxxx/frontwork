/**
 *
 * Command
 * @return {object}
 *
 */

module.exports = require('yargs').usage('frontwork [options]').option('init', {
  default: false,
  type: 'bool',
  describe: 'whether to initialize.'
}).option('watch', {
  default: false,
  type: 'bool',
  describe: 'whether to watch the files.'
}).option('production', {
  default: false,
  type: 'bool',
  describe: 'whether to product.'
}).version().help('help').alias('version', 'v').alias('help', 'h').argv;
