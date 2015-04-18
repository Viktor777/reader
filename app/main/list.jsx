'use strict';

var React = require('react'),
    InfiniteScroll = require('react-infinite-scroll')(React),
    Post = require('./post'),
    reddit = require('../reddit');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            hasMore: true,
            items: [],
            after: null
        };
    },
    loadMore: function (page) {
        reddit.raw(this.props.url).listing({
            $subreddit: this.props.subreddit,
            $section: this.props.section + '.json',
            limit: this.props.limit,
            count: this.props.count + (page - 1) * this.props.limit,
            after: this.state.after
        }).then(this._onPosts.bind(this)).done();
    },
    render: function () {
        var posts = this.state.items.map(function (post) {
            return (
                <Post data={post.data} />
            );
        });

        return (
            <InfiniteScroll
                loader={<div className="loader">Loading ...</div>}
                loadMore={this.loadMore}
                hasMore={this.state.hasMore}>
                {posts}
            </InfiniteScroll>
        );
    },
    _onPosts: function (slice) {
        this.setState({
            items: this.state.items.concat(slice.children),
            hasMore: !!slice.children.length,
            after: slice.after
        });
    }
});