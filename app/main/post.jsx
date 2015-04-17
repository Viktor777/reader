'use strict';

var React = require('react');

module.exports = React.createClass({
    render: function () {
        return (
            <article id="post-{this.props.data.id}">
                <h3>{this.props.data.title}</h3>
                <p>
                    {this.props.data.selftext}
                </p>
                <a href="{this.props.data.permalink}">Read more</a>
            </article>
        );
    }
});