'use strict';

var React = require('react');

module.exports = React.createClass({
    render: function () {
        var base = '?/' + this.props.subreddit + '/',
            items = this.props.sections.map(function (item) {
            var href = base + item;

            return (
                <li>
                    <a href={href}>{item}</a>
                </li>
            );
        });

        return (
            <nav>
                <ul>
                    {items}
                </ul>
            </nav>
        );
    }
});