'use strict';

var React = require('react'),
    Header = require('./header'),
    Menu = require('./menu');

module.exports = React.createClass({
    render: function () {
        return (
            <aside class="sidebar">
                <Header
                    subreddit={this.props.subreddit}
                />
                <Menu
                    sections={this.props.sections}
                    subreddit={this.props.subreddit}
                />
            </aside>
        );
    }
});