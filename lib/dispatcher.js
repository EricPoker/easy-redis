var crc = require('crc')

module.exports.dispatch = function(uid, servers) {
    var idx = Math.abs(parseInt(crc.crc32(uid.toString()), 16)) % servers.length
    return servers[idx]
}

function rand(min, max) {
    if (min < 0) {
        return 0
    }

    if (min > max) {
        max = min
    }

    return min + Math.round(Math.random() * (max - min));
}

module.exports.rand = function(servers) {
    if (!servers instanceof Array) {
        return false
    }

    var idx = rand(0, servers.length - 1)
    return servers[idx]
}