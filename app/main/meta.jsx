'use strict';

var React = require('react');

module.exports = React.createClass({
    render: function () {
        var date = new Date(this.props.timestamp * 1000);

        return (
            <div className="meta">
                <span className="author">by <strong>{this.props.author}</strong></span> <time className="date" dateTime={date.toISOString()}>at <strong>{date.toLocaleString()}</strong></time>
            </div>
        );
    }
});