/**
 * Created by rayde on 1/12/2016.
 */
var React = require('react');
var ReactDom = require('react-dom');
var HelloWorldApp = require('./components/HelloWorld.react');
var FlipClock = require('flipclock');

$(document).foundation();

//Do a tmp countdown to ross collier soundfest 2016
var countdownClock = $('.countdown-timer').FlipClock(new Date(2016, 4, 3), {
    countdown: true,
    clockFace: 'DailyCounter'
});

//HelloWorldApp Component should be deleted. It is here just to make sure things work.
//ReactDom.render(<HelloWorldApp/>, document.getElementById('react-container'));

