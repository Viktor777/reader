'use strict';

var React = require('react'),
    decodeHTML = require('../utils/decodeHTML');

module.exports = React.createClass({
    render: function () {
        return (
            <div className="content" dangerouslySetInnerHTML={{
                __html: decodeHTML(this.props.html)
            }}></div>
        );
    }
});