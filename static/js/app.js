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
window.iframeLoaded = false;

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
var contactClose = function () {
    return function () {
        $('#contact-form').foundation('close');
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
            if (err || !res.ok || res.body['error'] != null) {
                //failed email

                var errMessage = res.body != null && res.body['error'] != null ? res.body['error'] : 'Email failed. Please try again later.';
                $('#failed-message').html(errMessage);
                window.MotionUI.animateIn($('#failed-email'), 'fade-in', function () {
                    // set up fade out.
                    window.setTimeout(calloutFadeOut($('#failed-email')), 1500);
                    window.setTimeout(function () {
                        return function () {
                            $('#failed-message').html('');
                        }
                    }, 1500)
                });
            }
            else {
                window.MotionUI.animateIn($('#successful-email'), 'fade-in', function () {
                    // set up fade out
                    window.setTimeout(calloutFadeOut($('#successful-email')), 1500);
                    window.setTimeout(contactClose(), 1500);
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

if ($('#audio-container').length) {
    window.setTimeout(function () {
        if ($('#audio-container').length) {
            window.MotionUI.animateOut($('.sc-text'), 'fade-out', function () {
                console.log('Sound Cloud Player revealed.');
            });
        }
    }, 500);
}