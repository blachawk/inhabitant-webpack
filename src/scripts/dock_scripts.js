"use strict";
import $ from "jquery";

console.log('js connected via webpack');

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
animatetopbar();


///////////
(function () {
    //CONFIRM JQUERY WORKS
    $('html').addClass('jq-enabled');

     //INITIATE BS4 TOOLTIPS | https://getbootstrap.com/docs/4.0/components/tooltips/
    //use css to disable them on mobile devices | https://stackoverflow.com/a/26689836/957186
    //$('[data-toggle="tooltip"]').tooltip();

     //DISABLE ALL ANCHORLINKS DURING DEVELOPMENT
     function disableLinks() {
        $('a').on('click', function (e) {
            e.preventDefault();
        });
    }
    disableLinks();


    
    function scrollbackup() {
        var scrollTop = $(".scroll-top-btn");
        $(window).scroll(function () {
    
            var topPos = $(this).scrollTop();
            if (topPos > 20) {
                $(scrollTop).fadeIn();
            } else {
                $(scrollTop).fadeOut();
            }
        }); // scroll END
    
        //Click event to scroll to top
        $(scrollTop).click(function () {
            $('html, body').animate({
                scrollTop: 0
            }, 400);
            return false;
        }); // click() scroll top EMD
    }
    
    scrollbackup();
    

})($);
