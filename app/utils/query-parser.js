'use strict';

var location = window.location;

module.exports = function () {
    var q;

    q = location.search.substring(1).split('&');

    if (!q[0] || q[0].charAt(0) !== '/') {
        return null;
    }
    q[0] = q[0].substring(1);

    return q;
};