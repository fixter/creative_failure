/**
 * Created by rayde on 1/12/2016.
 */
var React = require('react');
var ReactDom = require('react-dom');
var HelloWorldApp = require('./components/HelloWorld.react');
var FlipClock = require('flipclock');
var moment = require('moment');

$(document).foundation();

//Do a tmp countdown to ross collier soundfest 2016
var now = moment();
console.log(now);
var sf = moment(new Date(2016, 3, 3));
console.log(sf);
var diff = sf.diff(now, 'seconds');
console.log(diff);
var countdownClock = $('.countdown-timer').FlipClock( diff, {
    countdown: true,
    clockFace: 'DailyCounter'
});

//HelloWorldApp Component should be deleted. It is here just to make sure things work.
//ReactDom.render(<HelloWorldApp/>, document.getElementById('react-container'));

