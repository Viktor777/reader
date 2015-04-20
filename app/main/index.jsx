'use strict';

var React = require('react'),
    InfiniteScroll = require('react-infinite-scroll')(React),
    Post = require('./post'),
    reddit = require('../reddit'),
    LIMIT = 25,
    URL = 'https://www.reddit.com/r/$subreddit/$section';

module.exports = React.createClass({
    getInitialState: function() {
        return {
            hasMore: true,
            items: [],
            after: null,
            page: 0
        };
    },
    loadMore: function () {
        reddit.raw(URL).listing({
            $subreddit: this.props.subreddit,
            $section: this.props.section + '.json',
            limit: LIMIT,
            count: this.state.page * LIMIT,
            after: this.state.after
        }).then(this.onPosts).done();
    },
    componentWillReceiveProps: function (nextProps) {

        if (this.props.subreddit !== nextProps.subreddit || this.props.section !== nextProps.section && this.state.page) {
            document.body.classList.remove('no-scroll');
            this.setState({
                items: [],
                page: 0,
                after: null,
                hasMore: true
            });
        }
    },
    render: function () {
        var section = this.props.section,
            posts = this.state.items.map(function (post) {
                return (
                    <Post
                        data={post.data}
                        section={section}
                    />
                );
            });

        return (
            <main className="main">
                <InfiniteScroll
                    loader={<div className="loader">Loading ...</div>}
                    loadMore={this.loadMore}
                    hasMore={this.state.hasMore}>
                    {posts}
                </InfiniteScroll>
            </main>
        );
    },
    onPosts: function (slice) {
        this.setState({
            items: this.state.items.concat(slice.children),
            hasMore: !!slice.after,
            after: slice.after,
            page: this.state.page ? this.state.page + 1 : 1
        });
    }
});