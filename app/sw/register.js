'use strict';

module.exports = function () {

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/reader/app/sw/index.js')
            .then(function (registration) {
                console.log('Registration succeeded.', registration);
            }).catch(function (error) {
                console.log('Registration failed.', error);
            });
    }
};