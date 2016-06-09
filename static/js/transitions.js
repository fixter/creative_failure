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
            form.on('mousedown', 'input', function(){
                $(this).focus();
            });
            form.on('mousedown', 'textarea', function(){
                $(this).focus();
            })
        }

        var audioPage = $('#audio-container');
        if(audioPage != null && audioPage.length){
            $('.top-bar-title').on('click', 'a', function(event){
               event.preventDefault();
                var target = $(this);
                var sectionTarget = target.data('menu');
                if(!target.hasClass('selected') && !window.isAnimating){
                    if(sectionTarget == 'index'){
                        self.homePageAnimation('', true, falling.falling);
                    }
                    else {
                        self.triggerAnimation(sectionTarget, true);
                    }
                }
                window.firstLoad = true;
            });
        }
    },

    homePageAnimation: function(newSection, bool , falling){
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
                if(newSection == ''){
                    window.history.pushState({path: '/'}, '', '/');
                }
                else {
                    window.history.pushState({path: newSection}, '', newSection);
                }
            }
            // or put falling.js in here.
            if(falling != null && $('#landing-container').length){
                    falling();
            }
            $(document).foundation();
        });
    },

    resetAfterAnimation: function(newSection) {
        //once the new section animation is over, remove the old section and make the new one scrollable
        console.log(newSection);
        if($('.cd-home-section').length && !newSection.hasClass('cd-home-section')){
            console.log('Should not have been called.');
            newSection.removeClass('overflow-hidden').prev('.cd-home-section').remove();
        }
        else {
            newSection.removeClass('overflow-hidden').prev('.cd-section').remove();
        }
		window.isAnimating =  false;
    }
};