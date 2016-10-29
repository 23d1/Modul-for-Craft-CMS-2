// .hasAttr Extentions
$.fn.hasAttr = function (name) {
  return this.attr(name) !== undefined;
};
$.fn.outerHTML = function(){
  return (!this.length) ? this : (this[0].outerHTML || (
  function(el){
    var div = document.createElement('div');
    div.appendChild(el.cloneNode(true));
    var contents = div.innerHTML;
    div = null;
    return contents;
  })(this[0]));
}

$(document).ready(function () {
	/*** Global variables (beyond the theme settings) ***/
	// Base
	var viewportHeight = $(window).height();
  var viewportWidth = $(window).width();
  var docheight = $(document).height();
	// X-tra variables for misc. needs
	var imagefadespeed = image_loaded_fade_speed;
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
            }
        },
        onReady: {
            duration: 100,
            render: function render($container, $new) {
                $container.html($new);
                reinit();
            }
        },
        onAfter: function onAfter () {
            if ($('#block').attr('data-styling') == '1') {
                $('#wrap').addClass("has-styling");
            }
            $('#wrap').removeClass('is-exiting')
            resize();
        }
  });

  /*** Google Analytics on Ajax update ***/
  $(document).on('ajaxComplete', function (event, request, settings) {
    if (typeof ga == 'function' ) {
      ga('send', 'pageview', window.location.pathname);
    }
  });

  /*** Pre-loading ***/
  // Pre-resize the images before they are loaded (to prevent loading flicker)
  function prepreloading() {
    $('#content img').each(function () {
      if (!$(this).hasClass('ready')) {
        if ($(this).hasClass('notme')) {
          // Escape
        } else if ($(this).hasClass('reverse')) {
          parentheight = $(this).parent().height();
          imgwidth = $(this).attr('data-width');
          imgheight = $(this).attr('data-height');
          imgdim = imgwidth / imgheight;
          newwidth = parentheight * imgdim;
          newwidth = Math.round(newwidth);
          // Apply
          $(this).width(newwidth);
          $(this).height(parentheight);
          $(this).fadeTo(0, 0);
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
          $(this).fadeTo(0, 0);
        }
      }
    });
  }

  // Image preloading
  function preloadimages() {

    // Add spinner if
    $('#content img').each(function (i) {
      if ($(this).hasClass('notme')) {
        // Escape
      } else {
        var pt = $(this).parent();
        var t = $(this);
        setTimeout(function () {
          if (pt.hasClass('bing')) {
            // Escape
            //t.fadeTo(0, 1);
          } else {
            pt.prepend('<div class="slide-spinn">&nbsp;</div>');
            t.addClass('bong');
            pt.css({'background': 'rgba(127, 127, 127, 0.1)'})
          }
        }, 600);
      }
    });

    // Preload
    $('#content img').imgpreload({
      each: function () {
        // Selectors
        var t = $(this);
        var tp = $(this).parent();
        var tpp = $(this).parent().parent();
        var tppp = $(this).parent().parent().parent();

        if ($(this).hasClass('notme')) {
          // Escape
        } else {
          if (tpp.hasClass('thumb')) {
            tpp.addClass('ready');
          }

          t.addClass('ready');
          tp.addClass('ready');

          bgcolor = 'transparent';

          // Force color
          // ... & Hide circle loader
          if (tp.hasClass('row-img')) {
            // IF row item = keep bg color
            tp.addClass('bing').find('.slide-spinn').fadeTo(0, 0, function () {
              $(this).remove();
            });
          } else {
            // Set color
            if (tp.hasClass('bleed')) {
              tp.addClass('bing').css({
                'background': 'transparent'
              }).find('.slide-spinn').fadeTo(0, 0, function () {
                $(this).remove();
              });
            } else {
              tp.addClass('bing').css({
                'background': '' + bgcolor + ''
              }).find('.slide-spinn').fadeTo(0, 0, function () {
                $(this).remove();
              });
            }
          }

          // Fade in loaded images
          if (t.hasClass('reverse')) {
            if (t.hasClass('bong')) {
              $(this).css({
                'height': '100%',
                'width': 'auto'
              }).fadeTo(imagefadespeed, 1);
            } else {
              $(this).css({
                'height': '100%',
                'width': 'auto'
              }).fadeTo(0, 1);
            }
          } else {
            if (t.hasClass('bong')) {
              $(this).css({
                'width': '100%',
                'height': 'auto'
              }).fadeTo(imagefadespeed, 1);
            } else {
              $(this).css({
                'width': '100%',
                'height': 'auto'
              }).fadeTo(0, 1);
            }
          }

          resize();

        }

      },
      all: function () {
        // Executes when all images are loaded
        resize();
        imagefadespeed = image_loaded_fade_speed;
        $('.slide-spinn').remove();
      }
    });


    $('body .royalSlider .rsImg').imgpreload({
      each: function () {
        // Executes on each slideshow image load
        resize();
      },
      all: function () {
        // Executes when all slideshow images are loaded
        resize();
      }
    });
    /*
    // Preload thumb hover images (if any)
      // Fill array with all hover images so we can preload them
    var hover_thumb_src_array = [];
    var arraycount = 0;
    $('.module .thumb .image-holder img').each(function(i){
      if ($(this).hasAttr('data-hoversrc')) {
        hs = $(this).attr('data-hoversrc');
        if (hs) {
          hover_thumb_src_array[arraycount] = hs;
          arraycount++;
        }
      }
    });
    // Now preload thumb hover images
    $.imgpreload(hover_thumb_src_array, {
      each: function() {
        // Executes after each image
      },
      all: function() {
        // Executes when all images are loaded
      }
    });
    */
  }

	// Setup mediaelements
	function setmediaelements() {
		var container = 	$('video,audio');
		container.mediaelementplayer({
			videoWidth: '100%',
			videoHeight: '100%',
			audioWidth: '100%',
			startVolume: 1,
			features: ['playpause', 'progress', 'tracks', 'volume', 'fullscreen'],
			videoVolume: 'horizontal', iPadUseNativeControls: true, iPhoneUseNativeControls: true, AndroidUseNativeControls: true
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

    if (bodyscrollpos < 0) {
      bodyscrollpos = 0;
    }

    // Archive the old pos
    bodyoldscrollpos = bodyscrollpos;
  }

  // Bundle bind scrollers
  function bindScrollers() {
    $(window).bind('scroll', bodyscrolling);
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
      if (t.hasAttr("data-slideshow-viewportheight") && $(window).width() <= 768) {
        slideshow_h = 55+'vh';
      } else if (t.hasAttr("data-slideshow-viewportheight")) {
        slideshow_h = parentheight;
        // slideshow_h = 50+'vh';
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
        slideTransitionEasing:"easeInOutQuart",
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
          slideroptions.arrowsNav = false;
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
  			});

        default_slideshow.find('.rsArrowLeft .rsArrowIcn').html('<svg viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve"><use x="0" y="0" xlink:href="#arrowLeft" /></svg>');
        default_slideshow.find('.rsArrowRight .rsArrowIcn').html('<svg viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve"><use x="0" y="0" xlink:href="#arrowRight" /></svg>');

  		}
    });

    resize();

	}

  // Menu toggle
  $('body').on('click', '#menu-btn', function() {
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
    $('body').removeClass('menu-open');
    //$('body').css('overflow', 'auto');
  });
  $('body').on('click', '#page-cover', function() {
    $('body').removeClass('menu-open');
    //$('body').css('overflow', 'auto');
  });

  // Hide toggle-menu when clicking item
  function hidemenu() {
    $('body').removeClass('menu-open');
  }

  // Set mobile
  function setmobile() {
    // Disable link hover states and enable thumb hover states
    $('body.mobile a').not('a.thumb').addClass('hover');
    $('body.mobile a.thumb').on('click', function (e) {
      'use strict';
      var link = $(this);
      if (link.hasClass('hover')) {
        return true;
      }
      else {
       link.addClass('hover');
       $('a').not(this).removeClass('hover');
       e.preventDefault();
       return false; //extra, and to make sure the function has consistent return points
      }
    });
  }

  // Check background image
  function checkbackground() {
    if( $('.img-fluid')[0] || $('.img-bg')[0] ) {
      BackgroundCheck.init({
          targets: '#logo, #menu-btn',
          images: 'img, .img-bg'
      });
    }
    BackgroundCheck.refresh();
  }

	// Inits & re-inits
	// Trigger A$AP
	function preinit() {
    setmobile();
    prepreloading();
    preloadimages();
    bindScrollers();
		setslideshow();
    checkbackground();
    resize();
    if ($('#block').attr('data-styling') == '1') {
      $('#wrap').addClass('has-styling');
    }
	}

	// Trigger on window ready
	function init() {
		setslideshow();
		setpackery();
		setmediaelements();
    checkbackground();
		resize();
		setTimeout(function () {
			resize();
		}, 100);
	}

  // Trigger after ajax injection
	function reinit() {
    setmobile();
		setslideshow();
		setpackery();
		setmediaelements();
    prepreloading();
    preloadimages();
    bindScrollers();
    checkbackground();
		resize();
		setTimeout(function () {
			resize();
		}, 100);
	}

  // Resize event
  $(window).resize(function () {
    viewportHeight = $(window).height();
    viewportWidth = $(window).width();
    docheight = $(document).height();
    resize();
  });
	// Secure window resize on orientation change on mobile devices
	$(window).bind('orientationchange', function () {
		$(window).resize();
	});

	// When Window is Ready
	$(window).ready(function () {
		init();
    setTimeout(function () {
			$('#wrap').removeClass('is-entering');
		}, 100);
	});
	// When Window is fully loaded
	$(window).bind("load", function() {
		resize();
	});

	$(window).bind('orientationchange', function () {
    $(window).resize();
  });

});
