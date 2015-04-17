'use strict';

var swRegister = require('./sw/register'),
    React = require('react'),
    queryParser = require('./utils/query-parser'),
    params = queryParser(),
    Sidebar = require('./sidebar'),
    List = require('./main/list'),
    count = 0,
    LIMIT = 25,
    URL = 'https://www.reddit.com/r/$subreddit/$section',
    sections = ['hot', 'new', 'top', 'controversial'];

swRegister();

if (Array.isArray(params)) {
    React.render(<Sidebar
        subreddit={params[0]}
    />, document.getElementById('sidebar'));
    React.render(<List
        count={count}
        limit={LIMIT}
        subreddit={params[0]}
        section={params[1] && sections.indexOf(params[1]) !== -1 ? params[1] : 'hot'}
        url={URL}
    />, document.getElementById('main'));
}