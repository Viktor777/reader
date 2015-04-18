'use strict';

var React = require('react'),
    List = require('./list'),
    LIMIT = 25,
    URL = 'https://www.reddit.com/r/$subreddit/$section';

module.exports = React.createClass({
    render: function () {
        return (
            <main className="main">
                <List
                    limit={LIMIT}
                    subreddit={this.props.subreddit}
                    section={this.props.section}
                    url={URL}
                />
            </main>
        );
    }
});