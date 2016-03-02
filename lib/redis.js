'use strict'
let bluebird = require('bluebird');
let redis = require('redis');
let dispatcher = require('./dispatcher.js');
let instances = {};
let ENV = process.env.NODE_ENV || 'dev';
bluebird.promisifyAll(redis);

class Redis {
    constructor() {
    }

    static getInstance(instanceId, config) {
        let redisConfig = config;
        instanceId = instanceId ? instanceId.toString() : ''
        instanceId = instanceId.toLowerCase();
        let conf = dispatcher.rand(redisConfig[instanceId]);
        
        if(!conf) {
            console.log('dont have this key!');
            return false
        }
        
        let ikey = conf.host + ':' + conf.port,
            instance
        if (!instances[ikey]) {
            instance = redis.createClient(conf.port, conf.host, {
                'no_ready_check': true
            })
            instance.on('error', function (err) {
                console.error(err.stack)
            })

            instances[ikey] = instance
        }

        return instances[ikey]
    }
}

module.exports = Redis;
