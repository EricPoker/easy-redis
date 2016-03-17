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

    static getInstance(instanceId, config, opts) {
        let redisConfig = config;
        instanceId = instanceId ? instanceId.toString() : ''
        instanceId = instanceId.toLowerCase();
        let conf = dispatcher.rand(redisConfig[instanceId]);
        let return_buffers = opts.return_buffer || false;
        
        if(!conf) {
            console.log('dont have this key!');
            return false
        }
        
        let ikey = conf.host + ':' + conf.port,
            instance
        if (!instances[ikey]) {
            instance = redis.createClient(conf.port, conf.host, {
                'no_ready_check': true,
                'return_buffers': return_buffers
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
