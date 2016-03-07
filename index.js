'use strict'
/**
 * module dependencies
 */
const fs = require('fs');
const redis = require('./lib/redis');
let config;

module.exports = EasyRedis;

function EasyRedis(filePath) {
    if (!(this instanceof EasyRedis)) {
        return new EasyRedis(filePath);
    }
    init(filePath);
}

function init (filePath) {
    let exists = fs.existsSync(filePath);
    if (exists) {
        config = require(filePath);
        if ((typeof config) === 'object') {
            return true
        }
    }
    return false;
}

EasyRedis.prototype.getConnect = function (name) {
    return redis.getInstance(name, config);
}