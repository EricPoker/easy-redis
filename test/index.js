'use strict'
const redis = require('../index')(`${__dirname}/redisConfig.json`);
const should = require('chai').should()

describe('index', function() {
    it('getConnect', function() {
        //need start local redis server
        redis.getConnect('localhost').should.be.a('object');
    })
    it('set a value', function(done) {
        //need start local redis server
        redis.getConnect('localhost').setAsync('test', 'oops').then((result) => {
            result.should.equal('OK');
            done();
        })
    })
    it('with a env opts', function(done) {
        let opts = {
            env: 'dev'
        }
        let env_redis = require('../index')(`${__dirname}/redisConfig.json`, opts);
        env_redis.getConnect('localhost').setAsync('test', 'oops').then((result) => {
            result.should.equal('OK');
            done();
        })
    })
    // it('with a return_buffer opts', function(done) {
    //     let opts = {
    //         env: 'dev',
    //         return_buffer: true
    //     }
    //     let env_redis = require('../index')(`${__dirname}/redisConfig.json`, opts);
    //     env_redis.getConnect('localhost').setAsync('test', new Buffer('oops')).then(() => {
    //         env_redis.getConnect('localhost').getAsync('test').then((result) => {
    //             console.log(result);
    //         // result.should.be.an.instanceOf(Buffer);
    //         done();
    //     })
    //     })
    // })
})