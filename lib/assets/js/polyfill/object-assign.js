/**
 *
 * Object.assign Polyfill
 *
 */

'use strict';

if (!Object.assign) {
  Object.defineProperty(Object, 'assign', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: (...arg) => {
      if (arg[0] === undefined || arg[0] === null) {
        throw new TypeError('Cannot convert first argument to object');
      }
      const union = Object(arg[0]);
      for (let i = 1; i < arg.length; i++) {
        const unit = arg[i];
        if (unit === undefined || unit === null) {
          continue;
        }
        const keys = Object.keys(unit);
        keys.forEach((key) => {
          const desc = Object.getOwnPropertyDescriptor(unit, key);
          if (desc !== undefined && desc.enumerable) {
            union[key] = unit[key];
          }
        });
      }
      return union;
    }
  });
}
