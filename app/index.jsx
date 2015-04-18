'use strict';

var swRegister = require('./sw/register'),
    React = require('react'),
    Router = require('./router');

swRegister();
React.render(
    <Router />,
    document.body
);