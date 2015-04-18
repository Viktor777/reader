'use strict';

var React = require('react'),
    Main = require('./main/'),
    Sidebar = require('./sidebar/');

module.exports = React.createClass({
    render: function () {
        var sections = ['hot', 'new', 'top', 'controversial'];

        return (
            <div id="container" className="container">
                <Sidebar
                    subreddit={this.props.subreddit}
                    sections={sections}
                />
                <Main
                    subreddit={this.props.subreddit}
                    section={this.props.section && sections.indexOf(this.props.section) !== -1 ? this.props.section : 'hot'}
                />
            </div>
        );
    }
});