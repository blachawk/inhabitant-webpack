"use strict";
import $ from "jquery";

//////
//JQ- Test
function testjs() {
    console.log('js connected via webpack');
    $('html').addClass('jq-enabled');
}

/////////////////////////////////////////
//DETECT IF CSS3 ANIMATIONS ARE SUPPORTED
function animatetopbar() {
    var root = document.getElementsByTagName('html')[0];
    var animation = false;
    var elem = document.createElement('div');

    if (elem.style.animationName !== undefined) {
        animation = true;
        //IF CLASS NAME EXSIT ON HTML TAG...

        if (document.querySelector('.inhabitant') !== null) {
            //IF SO ADD THE CUSTOM ANIMATION CLASS NAME
            root.className += " " + "css3animation";
        }
    }
}

//////////////////////////////////////////////////////
//JQ- DEV MODE - DISABLE ALL ANCHORLINKS DURING DEVELOPMENT
function disableLinks() {
    $('a').on('click', function (e) {
        e.preventDefault();
    });
}


////////////////////
//JQ - RUN BS4 JS ACTIONS
function bs4actions() {
    //INITIATE BS4 TOOLTIPS | https://getbootstrap.com/docs/4.0/components/tooltips/
    //use css to disable them on mobile devices | https://stackoverflow.com/a/26689836/957186
    $('[data-toggle="tooltip"]').tooltip();
}

////////////////
//JQ - SCROLL TOP BTN
function scrollbackup() {
    
    //GET AND FADE ELEMENT
    var scrollTop = $(".scroll-top-btn");
    $(window).scroll(function () {
        var topPos = $(this).scrollTop();
        if (topPos > 20) {
            $(scrollTop).fadeIn();
        } else {
            $(scrollTop).fadeOut();
        }
    });

    //SCROLL PAGE
    $(scrollTop).click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 400);
        return false;
    });
}

/////////////////
//RUN ALL SCRIPTS
(function () {
    testjs()
    animatetopbar();
    //disableLinks();
    scrollbackup();
    bs4actions();
})($);