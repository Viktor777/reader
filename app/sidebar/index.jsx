'use strict';

var React = require('react'),
    Header = require('./header'),
    Menu = require('./menu/');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            opened: false
        };
    },
    handleClick: function () {
        this.setState({
            opened: !this.state.opened
        });
    },
    render: function () {
        return (
            <aside className={this.state.opened ? 'sidebar opened' : 'sidebar'}>
                <Header
                    subreddit={this.props.subreddit}
                />
                <Menu
                    sections={this.props.sections}
                    section={this.props.section}
                    subreddit={this.props.subreddit}
                />
                <button className="toggle" onClick={this.handleClick}>{this.state.opened ? 'Close' : 'Menu'}</button>
            </aside>
        );
    }
});