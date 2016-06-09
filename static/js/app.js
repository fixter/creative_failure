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
        if (!window.isAnimating){
            if(newPage == ''){
                transitions.homePageAnimation(newPage, false, falling.falling);
            }
            else {
                transitions.triggerAnimation(newPage, false);
            }
        }
    }
    window.firstLoad = true;
});


$(document).foundation();
if ($('#landing-container').length) {
    falling.falling();
}

$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 800);
        return false;
      }
    }
  });
});

// uses Google polyfill for dialog element in non-supporting browsers
// (https://github.com/GoogleChrome/dialog-polyfill)

function showImage(e) {
	e.preventDefault();
	coverimage.setAttribute("src", this.getAttribute("href"));
	coverimage.setAttribute("alt", this.querySelector("img").getAttribute("alt"));
	cover.showModal();
}
document.getElementById("closecover").onclick = function() {
	coverimage.setAttribute("src", "");
	cover.close();
}
var imglinks = document.getElementById("thumbs").getElementsByTagName('a'),
cover = document.getElementById("cover"),
coverimage = cover.getElementsByTagName("img")[0];
testdialog=document.createElement("dialog");
testdialog.setAttribute("open", "");
if (!testdialog.open) {
	dialogPolyfill.registerDialog(cover);
}
for (var i=0; i<imglinks.length; i++) {
	imglinks[i].onclick = showImage;
}
