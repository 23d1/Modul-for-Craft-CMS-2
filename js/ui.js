// .hasAttr Extentions
$.fn.hasAttr = function(name) {
    return this.attr(name) !== undefined;
};
$.fn.outerHTML = function() {
    return (!this.length) ? this : (this[0].outerHTML || (
        function(el) {
            var div = document.createElement('div');
            div.appendChild(el.cloneNode(true));
            var contents = div.innerHTML;
            div = null;
            return contents;
        })(this[0]));
}

$(document).ready(function() {
    /*** Global variables (beyond the theme settings) ***/
    // Base
    var viewportHeight = $(window).height();
    var viewportWidth = $(window).width();
    var docheight = $(document).height();
    // X-tra variables for misc. needs
    var footerheight = $('#footer').height();

    /*** Browser support detection ***/
    // Identify rusty rusty browsers
    function isCanvasSupported() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }


    /* ----- Do this when a page loads ----- */
    preinit();

    /* ----- smoothState.js Ajax ----- */
    $('#wrap').smoothState({
        debug: false,
        prefetch: false,
        repeatDelay: 500,
        cacheLength: 0,
        blacklist: '.no-ajax, form, .form-toggle, .submit',
        onBefore: function onBefore($anchor, $container) {
            $container.removeClass('has-styling');
        },
        onStart: {
            duration: 600,
            render: function render($container) {
                $container.addClass('is-exiting');
                hidemenu();
                addpageloader();
            }
        },
        onReady: {
            duration: 100,
            render: function render($container, $new) {
                $container.html($new);
                reinit();
            }
        },
        onAfter: function onAfter() {
            if ($('#block').attr('data-styling') == '1') {
                $('#wrap').addClass("has-styling");
            }
            $('#wrap').removeClass('is-exiting')
            resize();
            removepageloader();
        }
    });

    /*** Google Analytics on Ajax update ***/
    $(document).on('ajaxComplete', function(event, request, settings) {
        if (typeof ga == 'function') {
            ga('send', 'pageview', window.location.pathname);
        }
    });

    /*** Page-loading ***/
    function addpageloader() {
        $('#pageloader').fadeIn(400);
    }

    function removepageloader() {
        $('#pageloader').fadeOut(400);
    }

    /*** Pre-sizing ***/
    // Pre-size the images before they are loaded (to prevent loading flicker)
    function presize() {
        $('#content img').each(function() {
            if ($(this).hasClass('notme')) {
                // Escape
            } else {
                parentwidth = $(this).parent().width();
                imgwidth = $(this).attr('data-width');
                imgheight = $(this).attr('data-height');
                imgdim = imgwidth / imgheight;
                newheight = parentwidth / imgdim;
                newheight = Math.round(newheight);
                // Apply
                $(this).width(parentwidth);
                $(this).height(newheight);
            }
        });
    }

    // Setup mediaelements
    function setmediaelements() {
        var container = $('video.video,audio');
        container.mediaelementplayer({
            videoWidth: '100%',
            videoHeight: '100%',
            audioWidth: '100%',
            startVolume: 1,
            features: ['playpause', 'progress', 'tracks', 'volume', 'fullscreen'],
            videoVolume: 'horizontal',
            iPadUseNativeControls: true,
            iPhoneUseNativeControls: true,
            AndroidUseNativeControls: true
        });
    }

    // Setup background and inline videos
    function setinlinevideos() {
        $('#content .video-inline.cover').each(function(i) {
            video = $(this).find($('video'));
            width = video[0].videoWidth;
            height = video[0].videoHeight;
            padding = height / width * 100
            $(this).find('.video-padding').css("padding-bottom", padding + "%")
        });
    }

    // Set packery (all)
    function setpackery() {
        // Packery
        var container = $('.packery');
        container.packery({
            itemSelector: '.masonry-item',
            transitionDuration: 0
        });
    }

    function resize() {
        footerheight = $('#footer').height();
        footerheightadjust();
        resizeslideshows();
        setpackery();
        setmediaelements();
    }

    /* Scrollers */

    var bodyscrollpos = 0;
    var bodyoldscrollpos = 0;

    // When scrolling the window
    function bodyscrolling() {
        bodyscrollpos = $(window).scrollTop();
        docheight = $(document).height();
        if (bodyscrollpos < 0) {
            bodyscrollpos = 0;
        }
        // Archive the old pos
        bodyoldscrollpos = bodyscrollpos;
    }

    // Use this function to scroll to a y pos of the body. You can also insert a speed value.
    var maxspeed = 800;
    var minspeed = 400;
    var normdistance = 1000;

    function bodyscrollto(pos, s) {
        newspeed = s;
        docheight = $(document).height();

        distance = pos - bodyscrollpos;
        distance = Math.abs(distance);
        ratio = distance / normdistance;
        newspeed = newspeed * ratio;
        newspeed = Math.round(newspeed);
        if (newspeed > maxspeed) {
            newspeed = maxspeed;
        }

        newspeed = Math.round(newspeed / 10) * 10;
        pos = Math.round(pos);

        if (newspeed < minspeed) {
            newspeed = minspeed;
        }

        if (bodyscrollpos != pos) {
            $('body, html').animate({
                scrollTop: '' + pos + 'px'
            }, newspeed, 'easeInOutQuart', function() {
                // Animation complete.
            });

        }
    }

    function resizeslideshows() {
        $('.royalSlider.default-slideshow').each(function() {
            t = $(this);
            parentwidth = t.parent().width();
            parentheight = t.parent().height();
            // Grab first image info
            slideshow_firstimg_w = t.find('.rsImg').first().attr('data-rsw');
            slideshow_firstimg_h = t.find('.rsImg').first().attr('data-rsh');
            slideshow_dim = slideshow_firstimg_w / slideshow_firstimg_h;
            slideshow_w = t.parent().width();
            if (t.hasAttr("data-slideshow-viewportheight")) {
                slideshow_h = parentheight;
            } else {
                slideshow_h = slideshow_w / slideshow_dim;
            }
            // Apply
            t.width(parentwidth).height(slideshow_h);
            t.royalSlider('updateSliderSize', true);
        });
    }

    // Logic for #footer
    function footerheightadjust() {
        if ($('#footer').length) {
            footerpos = $('#footer').position().top;
            wrapbottom = $('#wrap').css('margin-bottom');
            wrapbottom = wrapbottom.replace('px', '');
            if ((footerpos + footerheight) < viewportHeight) {
                diff = viewportHeight - (footerpos + footerheight) - wrapbottom;
                $('#footer').css({
                    'padding-top': '' + diff + 'px'
                });
            } else {
                $('#footer').css({
                    'padding-top': '0px'
                });
            }
        }
    }

    function setslideshow() {
        // Reset slide ID
        slide_id = 0;

        clicksupport = false;
        dragsupport = false;

        slideshow_w = null;
        slideshow_h = null;

        // Default Slideshow
        $('.royalSlider.default-slideshow').each(function() {
            var default_slideshow = $(this);
            var slideroptions = {
                fullscreen: {
                    enabled: false,
                    nativeFS: true
                },
                autoPlay: {
                    // enabled: data_slideshow_autoplay,
                    pauseOnHover: false,
                    stopAtAction: false,
                    delay: 4000
                },
                addActiveClass: true,
                // controlNavigation: navType,
                autoScaleSlider: false,
                autoHeight: false,
                autoScaleSliderWidth: slideshow_w,
                autoScaleSliderHeight: slideshow_h,
                loop: false,
                loopRewind: true,
                // imageScaleMode: scale_mode,
                navigateByClick: true,
                sliderDrag: true,
                numImagesToPreload: 6,
                slidesSpacing: 0,
                imageScalePadding: 0,
                // arrowsNav: showNav,
                arrowsNavAutoHide: true,
                arrowsNavHideOnTouch: true,
                keyboardNavEnabled: false,
                fadeinLoadedSlide: true,
                globalCaption: false,
                globalCaptionInside: false,
                // transitionType: data_slideshow_transition,
                slideTransitionEasing: "easeInOutQuart",
                transitionSpeed: slideshow_speed,
                visibleNearby: {
                    // enabled: visible_nearby,
                    centerArea: 0.75,
                    center: true,
                    breakpoint: 650,
                    breakpointCenterArea: 0.8,
                    navigateByCenterClick: true
                },
                thumbs: {
                    appendSpan: false,
                    firstMargin: true,
                    paddingBottom: 4
                }
            };

            if (default_slideshow.length) {

                if (default_slideshow.hasAttr('data-slideshow-transition')) {
                    slideroptions.transitionType = default_slideshow.attr('data-slideshow-transition');
                } else {
                    slideroptions.transitionType = 'fade';
                }

                if (default_slideshow.hasAttr('data-slideshow-autoplay')) {
                    if (default_slideshow.attr('data-slideshow-autoplay') == '1') {
                        slideroptions.autoPlay.enabled = true;
                    } else {
                        slideroptions.autoPlay.enabled = false;
                    }
                } else {
                    slideroptions.autoPlay.enabled = false;
                }
                if (default_slideshow.hasAttr('data-slideshow-delay') && default_slideshow.attr('data-slideshow-delay') > 0) {
                    slideroptions.autoPlay.delay = default_slideshow.attr('data-slideshow-delay') * 1000;
                }

                if (default_slideshow.attr('data-slideshow-type') == 'visibleNearby') {
                    slideroptions.visibleNearby.enabled = true;
                    slideroptions.transitionType = 'move';
                    slideroptions.imageScaleMode = 'fit';
                    if (default_slideshow.hasAttr('data-slideshow-arrows')) {
                        if (default_slideshow.attr('data-slideshow-arrows') == '1') {
                            slideroptions.arrowsNav = true;
                        } else {
                            slideroptions.arrowsNav = false;
                        }
                    }
                    if (default_slideshow.hasAttr('data-slideshow-indicator')) {
                        slideroptions.controlNavigation = default_slideshow.attr('data-slideshow-indicator');
                    } else {
                        slideroptions.controlNavigation = 'none';
                    }
                } else {
                    slideroptions.visibleNearby.enabled = false;
                    slideroptions.imageScaleMode = 'fill';
                    if (default_slideshow.hasAttr('data-slideshow-arrows')) {
                        if (default_slideshow.attr('data-slideshow-arrows') == '1') {
                            slideroptions.arrowsNav = true;
                        } else {
                            slideroptions.arrowsNav = false;
                        }
                    }
                }

                if (default_slideshow.hasAttr('data-slideshow-autohide')) {
                    if (default_slideshow.attr('data-slideshow-autohide') == '1') {
                        slideroptions.arrowsNavAutoHide = true;
                    } else {
                        slideroptions.arrowsNavAutoHide = false;
                    }
                }

                if (default_slideshow.hasAttr('data-slideshow-indicator')) {
                    slideroptions.controlNavigation = default_slideshow.attr('data-slideshow-indicator');
                } else {
                    slideroptions.controlNavigation = 'none';
                }

                default_slideshow.royalSlider(slideroptions);

                slider = default_slideshow.data('royalSlider');
                slider.ev.on('rsAfterSlideChange', function(event) {
                    // triggers after slide change
                    slide_id = slider.currSlideId;
                    BackgroundCheck.refresh();
                });
                slider.ev.on('rsAfterContentSet', function(e, default_slideshow) {
                    // fires when every time when slide content is loaded and added to DOM
                    resizeslideshows();
                });

                default_slideshow.find('.rsArrowLeft .rsArrowIcn').html('<svg viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve"><use x="0" y="0" xlink:href="#arrowLeft" /></svg>');
                default_slideshow.find('.rsArrowRight .rsArrowIcn').html('<svg viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve"><use x="0" y="0" xlink:href="#arrowRight" /></svg>');

            }
        });

        resize();

    }

    // Royalslider img click
    // $('body').on('click', '.slideshow-holder', function (e) {
    //   e.preventDefault();
    //   slide = $(this).parent().parent();
    //
    //   slideoffset = slide.offset().top;
    //   slideheight = slide.height();
    //   slidecorrection = (viewportHeight - slideheight) / 2;
    //   if (slidecorrection < 0) {
    //     slidecorrection = 0;
    //   }
    //   position = slideoffset - slidecorrection;
    //   bodyscrollto(position, 600);
    // });

    // Menu toggle
    $('body').on('click', '#menu-btn, #menu-sandwich .menu-icon', function() {
        $('body').toggleClass('menu-open');
        setTimeout(function() {
            BackgroundCheck.refresh();
        }, 100);
        setTimeout(function() {
            BackgroundCheck.refresh();
        }, 300);
        setTimeout(function() {
            BackgroundCheck.refresh();
        }, 600);
    });
    $('body').on('click', '#menu-slide a', function() {
        hidemenu();
        //$('body').css('overflow', 'auto');
    });
    $('body').on('click', '#page-cover', function() {
        hidemenu();
        //$('body').css('overflow', 'auto');
    });

    // Hide toggle-menu when clicking item
    function hidemenu() {
        $("#sandwich").prop("checked", false);
        $('body').removeClass('menu-open');
    }

    // Set mobile
    function setmobile() {
        // Disable link hover states and enable thumb hover states
        $('body.mobile a').not('a.thumb').addClass('hover');
        $('body.mobile a.thumb').on('click', function(e) {
            'use strict';
            var link = $(this);
            if (link.hasClass('hover')) {
                return true;
            } else {
                link.addClass('hover');
                $('a').not(this).removeClass('hover');
                e.preventDefault();
                return false; //extra, and to make sure the function has consistent return points
            }
        });
    }

    function stickynav() {
        if (header_autohide) {
            var top, bottom = 0,
                doc = $(document),
                win = $(window),
                head = $("#header");
            top = Modernizr.touch ? 150 : 25, win.scroll(function() {
                var topdist = $(this).scrollTop();
                if (Math.abs(bottom - topdist) >= top && topdist > 0) {
                    if (topdist > bottom) {
                        var topoffset = doc.height() - (doc.scrollTop() + win.height());
                        topoffset > 50 ? head.addClass("is-hidden") : head.removeClass("is-hidden")
                    } else topdist > 50 ? head.removeClass("is-hidden") /*.addClass("is-small")*/ : head.removeClass("is-hidden") /*.removeClass("is-small")*/ ;
                    bottom = topdist
                }
            });
            BackgroundCheck.refresh();
        }
    }

    function slideobjects() {
        if (slide_objects) {
            $("#content div.hv-item").each(function() {
                var elemvisibility = visibility($(this))[1];
                0 === elemvisibility ? $(this).css("transform", "translate(0, 150px)") : 1 === elemvisibility && $(this).css("transform", "translate(0, -150px)"), new Waypoint.Inview({
                    element: $(this)[0],
                    enter: function(direction) {
                        $(this.element).css("transform", "translate(0, 0)");
                    },
                    exited: function(direction) {
                        "down" === direction ? $(this.element).css("transform", "translate(0, -150px)") : $(this.element).css("transform", "translate(0, 150px)");
                    }
                });
            });
        }
    }

    function visibility(element) {
        var windowsize = ($(window).width(), $(window).height()),
            width = element.width(),
            height = element.height(),
            bbox = element[0].getBoundingClientRect(),
            hpos = bbox.left - windowsize,
            hedge = bbox.left + width,
            vpos = bbox.top - windowsize,
            vedge = bbox.top + height;
        return [Math.max(0, Math.min((0 - hpos) / (hedge - hpos), 1)), Math.max(0, Math.min((0 - vpos) / (vedge - vpos), 1))]
    }

    // Check background image
    function checkbackground() {
        setTimeout(function() {
            if ($('.image-holder, .rsImg, .mejs-poster')[0]) {
                BackgroundCheck.init({
                    targets: '#logo, #header a, #menu-btn, #menu-sandwich',
                    images: '.img-fluid, .img-bg'
                });
            }
        }, 100);
        BackgroundCheck.refresh();
    }

    // Inits & re-inits
    // Trigger A$AP
    function preinit() {
        setmobile();
        stickynav();
        presize();
        setslideshow();
        resize();
        if ($('#block').attr('data-styling') == '1') {
            $('#wrap').addClass('has-styling');
        }
    }

    // Trigger on window ready
    function init() {
        slideobjects();
        setslideshow();
        setpackery();
        setmediaelements();
        setinlinevideos();
        resize();
        setTimeout(function() {
            checkbackground();
            resize();
        }, 100);
    }

    // Trigger after ajax injection
    function reinit() {
        setmobile();
        stickynav();
        presize();
        setslideshow();
        setpackery();
        setmediaelements();
        resize();
        setTimeout(function() {
            resize();
            checkbackground();
            setinlinevideos();
            slideobjects();
        }, 100);
    }

    // Resize event
    $(window).resize(function() {
        viewportHeight = $(window).height();
        viewportWidth = $(window).width();
        docheight = $(document).height();
        resize();
    });
    // Secure window resize on orientation change on mobile devices
    $(window).bind('orientationchange', function() {
        $(window).resize();
    });

    // When Window is Ready
    $(window).ready(function() {
        init();
        setTimeout(function() {
            $('#wrap').removeClass('is-entering');
        }, 100);
    });
    // When Window is fully loaded
    $(window).bind("load", function() {
        resize();
    });

    $(window).bind('orientationchange', function() {
        $(window).resize();
    });

    $(document).on('lazybeforeunveil', function() {
        resize();
        checkbackground();
        BackgroundCheck.refresh();
    });


});
