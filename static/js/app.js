/**
 * Created by rayde on 1/12/2016.
 */
//var FlipClock = require('flipclock');
var moment = require('moment');
var falling = require('./falling.js');
var request = require('superagent');

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
        if (!window.isAnimating) {
            if (newPage == '') {
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

var calloutFadeOut = function (elem) {
    return function () {
        window.MotionUI.animateOut(elem, 'fade-out', function () {
            console.log('Transition finished.');
        });
    }
};

// Form submit.
$('form').on('formvalid.zf.abide', function (e, frm) {
    var phoneNumber = frm.find('#phone-number').val();
    request
        .post('/contact')
        .send({
            firstName: frm.find('#first-name').val(),
            lastName: frm.find('#last-name').val(),
            email: frm.find('#email').val(),
            subject: frm.find('#subject').val(),
            body: frm.find('#body').val(),
            phoneNumber: phoneNumber == '' || phoneNumber == null ? false : phoneNumber
        })
        .end(function (err, res) {
            frm.foundation('resetForm');
            if (err || !res.ok) {
                //failed email
                window.MotionUI.animateIn($('#failed-email'), 'fade-in', function () {
                    // set up fade out.
                    window.setTimeout(calloutFadeOut($('#failed-email')), 2000);
                });
            }
            else {
                window.MotionUI.animateIn($('#successful-email'), 'fade-in', function () {
                    // set up fade out
                    window.setTimeout(calloutFadeOut($('#successful-email')), 2000)
                });
            }
        });
}).on('submit', function (e) {
    e.preventDefault();
    console.log('I have hijacked it.');
});


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
