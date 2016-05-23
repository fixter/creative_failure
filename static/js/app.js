/**
 * Created by rayde on 1/12/2016.
 */
//var FlipClock = require('flipclock');
var moment = require('moment');
var falling = require('./falling.js');

var isAnimating = false, firstLoad = false;
var mainContent = $('#main-content');

window.mainContent = mainContent;
window.isAnimating = isAnimating;
window.firstLoad = firstLoad;

var transitions = require('./transitions');

transitions.configureIndexTransitions();
//window.mainContent.change(transitions.configureIndexTransitions());

$(window).on('popstate', function () {
    if (window.firstLoad) {
        /*
         Safari emits a popstate event on page load - check if firstLoad is true before animating
         if it's false - the page has just been loaded
         */
        var newPageArray = location.pathname.split('/'),
        //this is the url of the page to be loaded
            newPage = newPageArray[newPageArray.length - 1].replace('.html', '');
        console.log(window.isAnimating);
        if (!window.isAnimating) transitions.triggerAnimation(newPage, false, falling.falling);
    }
    window.firstLoad = true;
});


$(document).foundation();
if ($('#landing-container').length) {
    falling.falling();
}