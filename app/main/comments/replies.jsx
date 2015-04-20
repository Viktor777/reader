'use strict';

var React = require('react'),
    Content = require('../content'),
    Meta = require('../meta');

module.exports = React.createClass({
    render: function () {
        return renderReplies(this.props.replies);
    }
});

function renderReplies(replies) {
    replies = replies.data.children.map(function (reply) {
        var replies;

        if (reply.data.replies) {
            replies = renderReplies(reply.data.replies);
        }

        return (
            <li>
                <Meta
                    timestamp={reply.data.created_utc}
                    author={reply.data.author}
                />
                <Content html={reply.data.body_html} />
                {replies}
            </li>
        );
    });

    return (
        <ul className="replies">
            {replies}
        </ul>
    );
}