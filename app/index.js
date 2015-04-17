'use strict';

var React = require('react'),
    queryParser = require('./utils/query-parser'),
    params = queryParser(),
    Sidebar = require('./sidebar'),
    List = require('./main/list'),
    count = 0,
    LIMIT = 25,
    URL = 'https://www.reddit.com/r/$subreddit/$section',
    reddit = require('./reddit');

if (Array.isArray(params)) {
    React.render(<Sidebar subreddit={params[0]} />, document.getElementById('sidebar'));
    React.render(<List
        count={count}
        limit={LIMIT}
        subreddit={params[0]}
        section={params[1] || 'hot'}
        url={URL}
    />, document.getElementById('main'));
}