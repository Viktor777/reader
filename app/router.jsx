'use strict';

var React = require('react'),
    Container = require('./container'),
    isSupported = require('./utils/isSupported'),
    history = window.history;

module.exports = React.createClass({
    getInitialState: function() {
        return {
            query: window.location.search
        };
    },
    onPopState: function () {
        this.setState({
            query: window.location.search
        });
    },
    handleClick: function (event) {
        var el = event.target;

        if (el.nodeName === 'A' && el.dataset.rel === 'route' && isSupported.history()) {
            event.preventDefault();
            history.pushState(null, null, el.href);
            this.setState({
                query: window.location.search
            });
        }
    },
    componentDidMount: function () {
        document.addEventListener('click', this.handleClick, false);

        if (isSupported.history()) {
            window.addEventListener('popstate', this.onPopState);
        }
    },
    componentWillUnmount: function () {
        document.removeEventListener('click', this.handleClick);

        if (isSupported.history()) {
            window.removeEventListener('popstate', this.onPopState);
        }
    },
    render: function () {
        var params = this.parse();

        return !params[0] ? this.home() : this.subreddit(params[0], params[1]);
    },
    home: function () {
        return (
            <article className="home">
                <h1>Welcome to Reader for service Reddit!</h1>
                <p>
                    You can read subreddit by making a request in format: &#63;/&lt;subreddit_name&gt;.
                </p>
            </article>
        );
    },
    subreddit: function (subreddit, section) {
        return (
            <Container
                subreddit={subreddit}
                section={section}
            />
        );
    },
    parse: function () {
        var p;

        if (!this.state.query) {
            return [];
        }
        p = this.state.query.trim()
            .match(/^\?\/(\w+)\/?(\w+)?\/?$/);

        if (!p) {
            return [];
        }

        return p.slice(1);
    }
});