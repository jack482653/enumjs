const PROP_POSTFIX = '_PROP';

function Enum() {}

/**
 * Define Enum property
 * @param {string} key key
 * @param {string} value value
 * @param {object} otherProps (optional) other properties
 */
Enum.prototype.defineEnumProperty = function(key, value, otherProps = {}) {
  Object.defineProperty(this, key, {
    configurable: false,
    writable: false,
    enumerable: true,
    value: value,
  });
  Object.defineProperty(this, `${key}${PROP_POSTFIX}`, {
    configurable: false,
    writable: false,
    enumerable: true,
    value: {...otherProps, value},
  });
}

/**
 * Get enum keys
 * @returns {Array} array of keys
 */
Enum.prototype.keys = function() {
  return Object.keys(this)
    .filter((key) => typeof this[key] !== 'function')
    .filter((key) => !key.endsWith(PROP_POSTFIX))
    .sort((key1, key2) => this[key1] - this[key2]);
}

/**
 * @private
 * Get prop keys of enum
 * @returns {Array} array of enum prop keys
 */
Enum.prototype.propKeys = function() {
return Object.keys(this)
  .filter((key) => typeof this[key] !== 'function')
  .filter((key) => key.endsWith(PROP_POSTFIX))
  .sort((key1, key2) => this[key1] - this[key2]);
}

/**
 * get values of enum
 * @returns {Array} array of values
 */
 Enum.prototype.values = function() {
  return this.keys().map((key) => this[key]);
}

/**
 * get array of props of enum
 * @returns {Array} array of props
 */
Enum.prototype.props = function() {
  return this.propKeys().map((key) => this[key]);
}

/**
 * Get prop by value
 * @param {string} value value
 * @returns {object} prop
 */
Enum.prototype.getProp = function(value) {
  const key = this.getKeyByValue(value);
  return this[`${key}${PROP_POSTFIX}`];
}

/**
 * @private
 * get corresponding key accroding value
 * @param {*} value value
 * @returns {string} corresponding key
 */
Enum.prototype.getKeyByValue = function(value) {
  return this.keys().find((key) => this[key] === value);
}

module.exports = Enum;