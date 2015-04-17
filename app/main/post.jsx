'use strict';

var React = require('react');

module.exports = React.createClass({
    render: function () {
        var id = 'post-' + this.props.data.id;

        return (
            <article id={id}>
                <h3>{this.props.data.title}</h3>
                <p>
                    {this.props.data.selftext}
                </p>
                <a href={this.props.data.permalink}>Read more</a>
            </article>
        );
    }
});