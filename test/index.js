'use strict'
const redis = require('../index')(`${__dirname}/redisConfig.json`);
const should = require('chai').should()

describe('index', function () {
    it('getConnect', function () {
        //need start local redis server
        redis.getConnect('localhost').should.be.a('object');
    })
    it('set a value', function (done) {
        //need start local redis server
        redis.getConnect('localhost').setAsync('test', 'oops').then((result) => {
            result.should.equal('OK');
            done();
        })
    })
})