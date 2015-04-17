'use strict';

var Snoocore = require('snoocore'),
    SCOPE = ['read'],
    TYPE = 'implicit';

module.exports = new Snoocore({
    userAgent: 'Reader',
    oauth: {
        type: TYPE,
        consumerKey: 'oKrPhmt6tvEfGUHRPi55KQl7Y8w',
        redirectUri: 'https://viktor777.github.io/reader/',
        scope: SCOPE
    }
});