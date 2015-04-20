'use strict';

var React = require('react'),
    Content = require('../content'),
    Meta = require('../meta'),
    Replies = require('./replies');

module.exports = React.createClass({
    render: function () {
        var replies;

        if (this.props.data.replies) {
            replies = <Replies replies={this.props.data.replies} />;
        }

        return (
            <li>
                <Meta
                    timestamp={this.props.data.created_utc}
                    author={this.props.data.author}
                />
                <Content html={this.props.data.body_html} />
                {replies}
            </li>
        );
    }
});