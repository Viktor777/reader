'use strict';

module.exports = function (html) {
    var t = document.createElement('textarea');

    t.innerHTML = html;

    return t.value;
};