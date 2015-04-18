'use strict';

var React = require('react'),
    Container = require('./container'),
    search = window.location.search;

module.exports = React.createClass({
    render: function () {
        var query = this.parse();

        return !query[0] ? this.home() : this.subreddit(query[0], query[1]);
    },
    home: function () {
        return <h1>Welcome to Reader for service Reddit!</h1>;
    },
    subreddit: function (subreddit, section) {
        return <Container
            subreddit={subreddit}
            section={section}
        />;
    },
    parse: function () {
        var q;

        if (!search) {
            return [];
        }
        q = search.trim().match(/^\?\/(\w+)\/?(\w+)?\/?$/);

        if (!q) {
            return [];
        }

        return q.slice(1);
    }
});