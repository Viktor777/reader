'use strict';

var React = require('react'),
    reddit = require('./reddit');

module.exports = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function () {
        reddit('/r/$subreddit/about.json').get({
            $subreddit: this.props.subreddit
        }).then(this._onInfo.bind(this)).done();
    },
    render: function () {
        return (
            <header>
                <h1>{this.state.title}</h1>
                <p>
                    {this.state.public_description}
                </p>
            </header>
        );
    },
    _onInfo: function (result) {
        console.log(result);
        this.setState(result.data);
    }
});