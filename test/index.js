'use strict'
const redis = require('../index')();
const should = require('chai').should()

describe('index', function () {
    it('init', function () {
        redis.init(`${__dirname}/redisConfig.json`).should.equal(true);
    })
    it('getConnect', function () {
        //need start local redis server
        redis.init(`${__dirname}/redisConfig.json`);
        redis.getConnect('localhost').should.be.a('object');
    })
    it('set a value', function (done) {
        //need start local redis server
        redis.init(`${__dirname}/redisConfig.json`)
        redis.getConnect('localhost').setAsync('test', 'oops').then((result) => {
            result.should.equal('OK');
            done();
        })
    })
})