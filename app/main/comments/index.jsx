'use strict';

var React = require('react'),
    Content = require('../content'),
    Item = require('./item'),
    reddit = require('../../reddit');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            comments: []
        };
    },
    componentDidMount: function () {
        reddit('/r/$subreddit/comments/article.json').get({
            article: this.props.article,
            context: 0,
            $subreddit: this.props.subreddit,
            showedits: false,
            showmore: false,
            sort: this.props.sort
        }).then(this.onComments).done();
    },
    render: function () {
        var comments = this.state.comments.map(function (comment) {
                return (
                    <Item data={comment.data} />
                );
            }),
            loader;

        if (!this.state.comments.length && this.props.number) {
            loader = <li className="loader">Loading ...</li>;
        }

        return (
            <ol className="comments">
                {loader}
                {comments}
            </ol>
        );
    },
    onComments: function (result) {
        this.setState({
            comments: result[1] ? result[1].data.children : []
        });
    }
});