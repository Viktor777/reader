'use strict';

var history = window.history;

module.exports = {
    history: function () {
        return history && history.pushState;
    }
};