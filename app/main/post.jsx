'use strict';

var React = require('react'),
    Comments = require('./comments/'),
    Content = require('./content'),
    Meta = require('./meta'),
    decodeHTML = require('../utils/decodeHTML');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            opened: false,
            top: 0,
            showComments: false
        };
    },
    componentDidMount: function () {
        document.addEventListener('keyup', this.close, false);
    },
    componentWillUnmount: function () {
        document.removeEventListener('keyup', this.close, false);
    },
    open: function (event) {
        event.preventDefault();
        document.body.classList.add('no-scroll');
        this.setState({
            opened: true,
            top: window.pageYOffset || window.document.documentElement.scrollTop,
            showComments: true
        });
    },
    close: function (event) {

        if (event.type === 'click' || event.type === 'keyup' && event.keyCode === 27) {
            if (event.type === 'click') {
                event.preventDefault();
            }
            document.body.classList.remove('no-scroll');
            this.setState({
                opened: false,
                top: 0
            });
        }
    },
    render: function () {
        var id = 'post-' + this.props.data.id,
            linkLabel = !this.props.data.is_self ? this.props.data.domain : 'See on Reddit',
            comments = '';

        if (this.state.showComments) {
            comments = <Comments
                            subreddit={this.props.data.subreddit}
                            sort={this.props.section}
                            article={this.props.data.id}
                            number={this.props.data.num_comments}
                        />;
        }

        return (
            <article id={id} className={this.state.opened ? 'post opened' : 'post closed'} style={{top: this.state.top + 'px'}}>
                <div className="wrapper">
                    <h3>{decodeHTML(this.props.data.title)}</h3>
                    <Meta
                        timestamp={this.props.data.created_utc}
                        author={this.props.data.author}
                    />
                    <a href={this.props.data.permalink} className="link-more" onClick={this.open}>Read more</a>
                    <Content html={this.props.data.selftext_html} />
                    <a href={this.props.data.url} className="link-full" target="_blank">{linkLabel}</a>
                    <span className="comments-number">Comments: <strong>{this.props.data.num_comments}</strong></span>
                    {comments}
                    <button className={this.state.opened ? 'close opened' : 'close closed'} onClick={this.close}>Close</button>
                </div>
            </article>
        );
    }
});