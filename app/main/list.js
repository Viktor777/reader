'use strict';

var React = require('react'),
    Post = require('./post'),
    reddit = require('../reddit');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            posts: []
        };
    },
    componentDidMount: function () {
        reddit.raw(this.props.url).listing({
            $subreddit: this.props.subreddit,
            $section: this.props.section,
            limit: this.props.limit,
            count: this.props.count
        }).then(this._onPosts.bind(this)).done();
    },
    render: function () {
        var posts = this.state.posts.map(function (post) {
            return (
                <Post data={post.data} />
            );
        });

        return (
            <div>
                {posts}
            </div>
        );
    },
    _onPosts: function (result) {
        console.log(result);
        this.setState({
            posts: result.data.children
        });
    }
});