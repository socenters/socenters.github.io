
var $portfolioItems       = $('#portfolio-items'),
    $filtrable            = $('#filtrable'),
    isMobile              = false,
    flexslider_id;


(function( $ ) {
    "use strict";

    $(function() {



        /*====================================================================================*/
        /*  MOBILE DETECT                                                                     */
        /*====================================================================================*/

            if (navigator.userAgent.match(/Android/i) ||
                navigator.userAgent.match(/webOS/i) ||
                navigator.userAgent.match(/iPhone/i) ||
                navigator.userAgent.match(/iPad/i)||
                navigator.userAgent.match(/iPod/i) ||
                navigator.userAgent.match(/BlackBerry/i)) {
                isMobile = true;
            }


        /*====================================================================================*/
        /*  PRELOADER                                                                         */
        /*====================================================================================*/

            $("body").queryLoader2({
                percentage        : true,
                barHeight         : 5,
                minimumTime       : 200,
                barColor          : "#ffc600",
                backgroundColor   : "#ffffff",
                completeAnimation : "fade",
            });

            jQuery(window).load(function(){
                $('#load').fadeOut().remove();
            });



        /*====================================================================================*/
        /*  ADD NECESSARY CLASS                                                               */
        /*====================================================================================*/

            if (isMobile == true) {
                $('body').addClass('mobile');
                $('.animated').removeClass('animated');
            }

            $('.menu li:first').addClass('current');

            if ($('#wrapper').length) {
                $('.nav').addClass('fixed');
                $('.nav').next().css({'margin-top' : '80px'})
            }



        /*====================================================================================*/
        /*  NAVIGATION                                                                        */
        /*====================================================================================*/


            $(window).scroll(function () {
                if ($('#wrapper').length) return false;
                if ($(window).scrollTop() > 100) {
                    $('.nav').addClass('fixed');
                } else {
                    $('.nav').removeClass('fixed');
                }
            });


            $('.scroll').click(function(event) {
                var href = $(this).attr('href'),
                    offsetTop = $(href).offset().top-80;
                $('html, body').stop().animate({scrollTop: offsetTop}, 1500);
                return false;
            });



            /*------------------------------------------
                responsive menu
            ------------------------------------------*/

                $('.menu').before($('<div class="mobile-btn"><i class="icon-align-justify"></i></div>'));
                $('.menu').clone().removeClass().addClass('mobile-menu').appendTo("#nav");

                $('.mobile-btn, .mobile-menu a').click(function() {
                    $('.mobile-menu').toggle();
                });

                $(window).resize(function() {
                    if ($('.mobile-btn').css('display') == 'none') {
                        $('.mobile-menu').removeAttr('style');
                    }
                });



            /*------------------------------------------
               menu scroll
            ------------------------------------------*/

                if ($('#wrapper').length) {
                    $('#nav').removeAttr('id');
                }

                var $menuItems = $("#nav a"),
                    topMenuHeight = $('#nav').outerHeight(),
                    lastId,
                    fromTop,
                    cur,
                    scrollItems = $menuItems.map(function() {
                        var item = $($(this).attr("href"));
                        if (item.length) return item;
                    });


                // click nav
                $menuItems.on('click', function(e) {
                    var href      = $(this).attr("href"),
                        offsetTop = $(href).offset().top - topMenuHeight+30 + 'px';

                    $('html, body').stop().animate({scrollTop: offsetTop}, 1500, 'easeOutCubic');
                    e.preventDefault();
                });


                // add current menu class "current"
                $(window).scroll(function(){
                    fromTop = $(this).scrollTop() + topMenuHeight + 100,

                    cur = scrollItems.map( function() {
                        if ($(this).offset().top < fromTop) return this;
                    });

                    cur = cur[cur.length-1];
                    var id = cur && cur.length ? cur[0].id : "";

                    if (lastId !== id) {
                       lastId = id;
                       $menuItems.parent().removeClass("current").end().filter("[href=#"+id+"]").parent().addClass("current");
                    }
                });



        /*====================================================================================*/
        /*  FN TO ALLOW AN EVENT TO FIRE AFTER ALL IMAGES ARE LOADED                          */
        /*====================================================================================*/

            $.fn.imagesLoaded = function () {

                var $imgs = this.find('img[src!=""]'),
                    noImg = $.Deferred();

                // if there's no images, just return an already resolved promise
                if (!$imgs.length) {return noImg.resolve().promise();}

                // for each image, add a deferred object to the array which resolves when the image is loaded
                var dfds = [];
                $imgs.each(function(){
                    var dfd = $.Deferred();
                    dfds.push(dfd);
                    var img = new Image();
                    img.onload = function(){dfd.resolve();}
                    img.src = this.src;
                });

                // return a master promise object which will resolve when all the deferred objects have resolved
                // IE - when all the images are loaded
                return $.when.apply($,dfds);
            }



        /*====================================================================================*/
        /* HOME PAGE                                                                          */
        /*====================================================================================*/

            function home_page_size() {

                var homeWidth = $(window).width(),
                    homeHeight = $(window).height(),
                    homeWidth2 = $('.home-wrapper').outerWidth();

                $('.home-wrapper').parent().css({'width' : homeWidth + 'px', 'height' : homeHeight + 'px'});
                $('.home-content').css({'height' : homeHeight + 'px', 'width' : homeWidth2 +'px'});

            }

            home_page_size();
            $(window).bind('resize', function () {
                home_page_size();
            });



        /*====================================================================================*/
        /*  FLEXIBLE VIDEO                                                                    */
        /*====================================================================================*/

            // $(".flexible-video").fitVids();



        /*====================================================================================*/
        /*  ANIMATE CONTENT                                                                   */
        /*====================================================================================*/



            if (isMobile == false) {
                $('*[data-animated]').addClass('animated');
            }


            function animated_contents() {
                $(".animated:appeared").each(function (i) {
                    var $this    = $(this),
                        animated = $(this).data('animated');

                    setTimeout(function () {
                        $this.addClass(animated);
                    }, 50 * i);

                    $('.progress-bar .bar').each(function (i) {
                        var pogresBar = $this.data('width');
                        $this.css({'width' : pogresBar});
                    });
                });
            }

            animated_contents();
            $(window).scroll(function () {
                animated_contents();
            });



        /*====================================================================================*/
        /*  FLEXSLIDER                                                                        */
        /*====================================================================================*/

            if ($('.flexslider').length) {
                $('.flexslider').each(function() {
                    flexslider_id = $(this).attr('id');
                    $('#' + flexslider_id).flexslider({
                        animation      : "fade",
                        slideshowSpeed : 7000,
                        animationSpeed : 1000,
                        controlNav     : false,
                        prevText       : "",
                        nextText       : "",
                        start: function(e) {
                            $('#' + flexslider_id).removeClass('loader');
                        },
                    });
                });
            }


            if ($('.slide').length) {
                $('.slide').each(function() {
                    var sliderId = $(this).attr('id');
                    $('#' + sliderId).flexslider({
                        smoothHeight   : true,
                        animation      : "slide",
                        slideshowSpeed : 7000,
                        animationSpeed : 1000,
                        directionNav   : false,
                    });
                });
            }

        /*====================================================================================*/
        /*  PARALAX                                                                           */
        /*====================================================================================*/

            $(window).bind('load', function() {
                parallaxInit();
            });

            function parallaxInit() {

                if (isMobile == true  ) return false;
                $('.parallax').each(function() {
                    var paralax_id = $(this).attr('id');
                    $('#' + paralax_id).parallax("1%", 0.6);
                });

            }

            parallaxInit();





            /* Overlay Full Widyh */

            function fullWidthOverlay() {
                var containerWidth = $('.parallax .container').width(),
                    windowWidth    = $(window).width();

                $('.parallax .overlay').css({
                    'width': windowWidth,
                    'margin-left': '-' + (windowWidth - containerWidth) / 2 + 'px'
                });

            }

            fullWidthOverlay();

            $(window).resize(function() {
                fullWidthOverlay();
            });



        /*====================================================================================*/
        /*  ANIMATE STATS NUMBER                                                              */
        /*====================================================================================*/

            function number(num, content, target, duration) {
                if (duration) {
                    var count    = 0;
                    var speed    = parseInt(duration / num);
                    var interval = setInterval(function(){
                        if(count - 1 < num) {
                            target.html(count);
                        }
                        else {
                            target.html(content);
                            clearInterval(interval);
                        }
                        count++;
                    }, speed);
                } else {
                    target.html(content);


                }
            }

            function stats(duration) {
                jQuery('.stats .num').each(function() {
                    var container = jQuery(this);
                    var num       = container.attr('data-num');
                    var content   = container.attr('data-content');
                    number(num, content, container, duration);
                });
            }

            if (isMobile == false) {
                var $i = 1;
                $('.stats').appear().on('appear', function() {
                    if ($i === 1) { stats(300); }
                    $i++;
                });
            }



        /*====================================================================================*/
        /*  IMAGE HOVER                                                                   */
        /*====================================================================================*/

            $(".portfolio-items a").hover( function () {
                var mt = $(this).find('p').outerHeight();

                $(this).find('img').stop().animate({'opacity': 0.1}, 100);
                $(this).find('p').stop().animate({'opacity': 1, 'top': '50%', 'margin-top': '-' + mt/2 + 'px'}, 300, function() {
                    $(this).find('span').stop().animate({'opacity': 1, 'top':0}, 300);
                });
            }, function () {
                $(this).find('img').stop().animate({'opacity': 1});
                $(this).find('p').stop().animate({'opacity': 0, 'top': '90%'}, 300, function() {
                    $(this).removeAttr('style');
                    $(this).find('span').removeAttr('style');
                });
            });


            $(".team-member").hover( function () {
                var socialWidth = $(this).find('.social').outerWidth()/2;
                $(this).find('.social').css({'margin-left': '-' + socialWidth + 'px', 'left' : '50%'});
                $(this).find('.social').stop().animate({'bottom': 0}, 300);
                $(this).find('img').stop().animate({'top': '-40px'}, 300);
            }, function () {
                $(this).find('.social').stop().animate({'bottom': '-40px'},300);
                $(this).find('img').stop().animate({'top': 0}, 300);
            });



        /*====================================================================================*/
        /* ALERT BOX
        /*====================================================================================*/

            $('.alert-close').livequery( 'click', function() {
                $(this).parent().animate({'opacity' : '0'}, 300).slideUp(300);
                return false;;
            });



        /*====================================================================================*/
        /*  TOOGLE                                                                            */
        /*====================================================================================*/

            $('.toggle > p').on('click', function() {
                $(this).toggleClass('active').next().slideToggle();
            });



        /*====================================================================================*/
        /*  ACCORDION                                                                         */
        /*====================================================================================*/

            $(".accordion > p").on('click', function() {
                if( $(this).next("div").is(":visible") ) {
                    $(this).removeClass('active').next("div").slideToggle();
                } else {
                    $(this).parent().parent().find(".accordion > div").slideUp("slow").end().find('.accordion > p').removeClass('active');
                    $(this).addClass('active').next("div").slideToggle();
                }
            });



        /*====================================================================================*/
        /*  TABS                                                                              */
        /*====================================================================================*/

            $('ul.tab').each(function(){

                var active,
                    content,
                    links = $(this).find('a');

                active = $(links.filter('[href="'+location.hash+'"]')[0] || links[0]);

                active.addClass('current');
                content = $(active.attr('href'));

                links.not(active).each(function () {
                    $($(this).attr('href')).hide();
                });


                $(this).on('click', 'a', function(e){

                    active.removeClass('current');
                    content.slideToggle();

                    active = $(this);
                    content = $($(this).attr('href'));

                    active.addClass('current');
                    content.slideToggle();

                    e.preventDefault();
                });

            });



    });

}(jQuery));
