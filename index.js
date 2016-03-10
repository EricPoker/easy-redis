'use strict'
/**
 * module dependencies
 */
const fs = require('fs');
const redis = require('./lib/redis');
let config;

module.exports = EasyRedis;

function EasyRedis(filePath, opts) {
    if (!(this instanceof EasyRedis)) {
        return new EasyRedis(filePath, opts);
    }
    init(filePath, opts);
}

function init (filePath, opts) {
    let exists = fs.existsSync(filePath);
    if (exists) {
        let _opts = opts || {};
        let env = _opts.env || null;
        config = env ? require(filePath)[env] : require(filePath);
        if ((typeof config) === 'object') {
            return true
        }
    }
    return false;
}

EasyRedis.prototype.getConnect = function (name) {
    return redis.getInstance(name, config);
}