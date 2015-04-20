'use strict';

var React = require('react');

module.exports = React.createClass({
    handleClick: function (i) {
        var items = React.findDOMNode(this.refs.container)
            .children;

        Array.prototype.forEach.call(items, function (item, key) {

            if (key === i) {
                item.classList.add('current');
            } else {
                item.classList.remove('current');
            }
        });
    },
    render: function () {
        var base = '?/' + this.props.subreddit + '/',
            items = this.props.sections.map(function (item, i) {
                var href = base + item;

                return (
                    <li className={this.props.section === item ? 'current' : ''}>
                        <a href={href} data-rel="route" onClick={this.handleClick.bind(this, i)}>{item}</a>
                    </li>
                );
            }, this);

        return (
            <nav>
                <h3>Sections</h3>
                <ul ref="container">
                    {items}
                </ul>
            </nav>
        );
    }
});