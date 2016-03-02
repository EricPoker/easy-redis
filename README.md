# easy-redis
============
Just write a config file,you can get one of redis connection with different topic.

## Installation

    npm install easy-redis --save
    
## Usage
    
    //use bluebird to promise redis package
    
    var redis = require('easy-redis');
    redis.init(`${__dirname}/redisConfig.json`);
    redis.getConnect('localhost').setAsync('test', 'oops').then((result) => {
        //dosomething
    })
    
    redisConfig.json contents as follow:
    {
        "localhost": [
            {
                "host": "127.0.0.1",
                "port": 6379
            },
            ...
        ],
        ...
    }
    
## Tests
    npm test

## Release History

* 0.1.0 Initial release