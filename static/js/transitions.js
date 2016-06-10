/**
 * Created by rayde on 4/9/2016.
 */
var API = require('./middleware/api');
var falling = require('./falling');

module.exports = {
    triggerAnimation: function (newSection, bool) {
        window.isAnimating = true;
        newSection = newSection == '' ? '' : newSection;
        var self = this;

        var section = $('<section class="cd-section overflow-hidden "' + newSection + '"></section>').appendTo(window.mainContent);
        section.load('/' + newSection + '?partial=true', function (event) {
            section.prev('.visible').removeClass('visible').end().addClass('visible').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                self.resetAfterAnimation(section);
                // either put faling.js in here
                self.configureIndexTransitions();
            });

            //if browser doesn't support transition
            if ($('.no-csstransitions').length > 0) {
                self.resetAfterAnimation(section);
            }
            if (newSection != window.location.pathname.split('/')[1] && bool) {
                //add the new page to the window.history
                //if the new page was triggered by a 'popstate' event, don't add it
                window.history.pushState({path: newSection}, '', newSection);
            }
            $(document).foundation();
        });
    },

    configureIndexTransitions: function () {
        var self = this;
        var indexPage = $('#landing-container');
        if (indexPage != null && indexPage.length) {
            $('.bottom-row').on('click', 'a', function (event) {
                event.preventDefault();
                var target = $(this);
                console.log(target);
                var sectionTarget = target.data('menu');

                if (!target.hasClass('selected') && !window.isAnimating) {
                    self.triggerAnimation(sectionTarget, true);
                }
                window.firstLoad = true;
            });
            var form = $('form');
            form.on('mousedown', 'input', function () {
                $(this).focus();
            });
            form.on('mousedown', 'textarea', function () {
                $(this).focus();
            })
        }

        var audioPage = $('#audio-container');
        if (audioPage != null && audioPage.length) {
            $('.top-bar-title').on('click', 'a', function (event) {
                event.preventDefault();
                var target = $(this);
                var sectionTarget = target.data('menu');
                if (!target.hasClass('selected') && !window.isAnimating) {
                    if (sectionTarget == 'index') {
                        self.homePageAnimation('', true, falling.falling);
                    }
                    else {
                        self.triggerAnimation(sectionTarget, true);
                    }
                }
                window.firstLoad = true;
            });
        }

        // this handles the image viewer on the design page.
        var closecover = $('#closecover');
        if (closecover != null && closecover.length) {
            // uses Google polyfill for dialog element in non-supporting browsers
            // (https://github.com/GoogleChrome/dialog-polyfill)
            function showImage (e) {
                e.preventDefault();
                coverimage.setAttribute("src", this.getAttribute("href"));
                coverimage.setAttribute("alt", this.querySelector("img").getAttribute("alt"));
                cover.showModal();
            }

            document.getElementById("closecover").onclick = function () {
                coverimage.setAttribute("src", "");
                cover.close();
            };
            var imglinks = document.getElementById("thumbs").getElementsByTagName('a'),
                cover = document.getElementById("cover"),
                coverimage = cover.getElementsByTagName("img")[0],
                testdialog = document.createElement("dialog");
            testdialog.setAttribute("open", "");
            if (!testdialog.open) {
                dialogPolyfill.registerDialog(cover);
            }
            for (var i = 0; i < imglinks.length; i++) {
                imglinks[i].onclick = showImage;
            }

        }
        // Run this every load. This helps scroll down on audio and design pages.
        $(function () {
            $('a[href*="#"]:not([href="#"])').click(function () {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 800);
                        return false;
                    }
                }
            });
        });
    },

    homePageAnimation: function (newSection, bool, falling) {
        window.isAnimating = true;
        newSection = newSection == '' ? '' : newSection;
        var self = this;

        var section = $('<section class="cd-home-section overflow-hidden "' + newSection + '"></section>').appendTo(window.mainContent);
        section.load('/' + newSection + '?partial=true', function (event) {
            section.prev('.visible').removeClass('visible').end().addClass('visible').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                self.resetAfterAnimation(section);
                // either put faling.js in here
                self.configureIndexTransitions();
            });

            //if browser doesn't support transition
            if ($('.no-csstransitions').length > 0) {
                self.resetAfterAnimation(section);
            }
            if (newSection != window.location.pathname.split('/')[1] && bool) {
                //add the new page to the window.history
                //if the new page was triggered by a 'popstate' event, don't add it
                if (newSection == '') {
                    window.history.pushState({path: '/'}, '', '/');
                }
                else {
                    window.history.pushState({path: newSection}, '', newSection);
                }
            }
            // or put falling.js in here.
            if (falling != null && $('#landing-container').length) {
                falling();
            }
            $(document).foundation();
        });
    },

    resetAfterAnimation: function (newSection) {
        //once the new section animation is over, remove the old section and make the new one scrollable
        console.log(newSection);
        if ($('.cd-home-section').length && !newSection.hasClass('cd-home-section')) {
            console.log('Should not have been called.');
            newSection.removeClass('overflow-hidden').prev('.cd-home-section').remove();
        }
        else {
            newSection.removeClass('overflow-hidden').prev('.cd-section').remove();
        }
        window.isAnimating = false;
    }
};