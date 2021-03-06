
;(function($) {

   'use strict'

    var testMobile;
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    var testiPad;
    var isiPad = {
        iOS: function() {
            return navigator.userAgent.match(/iPad/i);
        },
        any: function() {
            return ( isiPad.iOS() );
        }
    };

    var sliderFix = function() {
    	$( ".slides-container .slide-item").addClass('sliderFix');
    	setTimeout(function(){$( ".slides-container .slide-item").removeClass('sliderFix');}, 200);
    }

	var heroSection = function() {
		// Background slideshow
		(function() {
			if ( $( "#slideshow" ).length ) {
				$('#slideshow').superslides({
					play: $('#slideshow').data('speed')
				});
			}
			$(document).on('init.slides', function() {
			    $('.loading-container').fadeOut(function() {
			        $(this).remove();
			    });
			});
		})();

		$(function() {
			$('.mainnav a[href*="#"], a.roll-button[href*="#"], .smoothscroll[href*="#"]').on('click',function (e) {
			    var target = this.hash;
			    var $target = $(target);

				if ( $target.length ) {
			    	e.preventDefault();
					$('html, body').stop().animate({
					     'scrollTop': $target.offset().top - 70
					}, 900, 'swing');

			        return false;
				}
			});
		});


	};

	var panelsStyling = function() {
		$(".panel-row-style").each( function() {
			if ($(this).data('hascolor')) {
				$(this).find('h1,h2,h3,h4,h5,h6,a,.fa, div, span').css('color','inherit');
			}
			if ($(this).data('hasbg') && $(this).data('overlay') ) {
				$(this).append( '<div class="overlay"></div>' );
				var overlayColor = $(this).data('overlay-color');
				$(this).find('.overlay').css('background-color', overlayColor );				
			}
		});
		$('.panel-grid .panel-widget-style').each( function() {
			var titleColor = $(this).data('title-color');
			var headingsColor = $(this).data('headings-color');
			if ( titleColor ) {
				$(this).find('.widget-title').css('color', titleColor );
			}
			if ( headingsColor ) {
				$(this).find('h1,h2,h3:not(.widget-title),h4,h5,h6,h3 a').css('color', headingsColor );
			}			
		});	
	};

	var scrolls = function() {
		testMobile = isMobile.any();
		if (testMobile == null) {
			$(".panel-row-style, .slide-item").parallax("50%", 0.3);
		}
	};

	var checkipad = function() {
		testiPad = isiPad.any();
		if (testiPad != null) {
			$(".slides-container .slide-item").css("background-attachment", "scroll");
		}
	};

	var rollAnimation = function() {
		$('.orches-animation').each( function() {
		var orElement = $(this),
			orAnimationClass = orElement.data('animation'),
			orAnimationDelay = orElement.data('animation-delay'),
			orAnimationOffset = orElement.data('animation-offset');

			orElement.css({
				'-webkit-animation-delay':  orAnimationDelay,
				'-moz-animation-delay':     orAnimationDelay,
				'animation-delay':          orAnimationDelay
			});

			orElement.waypoint(function() {
				orElement.addClass('animated').addClass(orAnimationClass);
			},{ triggerOnce: true, offset: orAnimationOffset });
		});
	};

	var goTop = function() {
		$(window).scroll(function() {
			if ( $(this).scrollTop() > 800 ) {
				$('.go-top').addClass('show');
			} else {
				$('.go-top').removeClass('show');
			}
		});

		$('.go-top').on('click', function() {
			$("html, body").animate({ scrollTop: 0 }, 1000);
			return false;
		});
	};

	var progressBar = function() {
		$('.progress-bar').on('on-appear', function() {
			$(this).each(function() {
				var percent = $(this).data('percent');

				$(this).find('.progress-animate').animate({
					"width": percent + '%'
				},3000);

				$(this).parent('.roll-progress').find('.perc').addClass('show').animate({
					"width": percent + '%'
				},3000);
			});
		});
	};

	var counter = function() {
		$('.roll-counter').on('on-appear', function() {
			$(this).find('.numb-count').each(function() {
				var to = parseInt($(this).attr('data-to')), speed = parseInt($(this).attr('data-speed'));
				$(this).countTo({
					to: to,
					speed: speed
				});
			});
		}); //counter
	};

	var detectViewport = function() {
		$('[data-waypoint-active="yes"]').waypoint(function() {
			$(this).trigger('on-appear');
		}, { offset: '90%', triggerOnce: true });

		$(window).on('load', function() {
			setTimeout(function() {
				$.waypoints('refresh');
			}, 100);
		});
	};

    var responsiveVideo= function(){
	  $(document).ready(function(){
	    $("body").fitVids();
	  });
    };

  	var removePreloader = function() {
    	$('.preloader').css('opacity', 0);
    	setTimeout(function(){$('.preloader').hide();}, 600);
  	}

    var videoButtons = function() {
    	testMobile = isMobile.iOS();
		$(window).on('load', function () {
			$('#wp-custom-header').fitVids();
			$('.fluid-width-video-wrapper + #wp-custom-header-video-button').find('i').removeClass('fa-play').addClass('fa-pause');
			$('.fluid-width-video-wrapper + #wp-custom-header-video-button').on('click',function () {
				$(this).find('i').toggleClass('fa-play fa-pause');
			});
			if (testMobile != null) {
				$('#wp-custom-header-video-button').css('opacity', '0');
				$('#wp-custom-header-video').prop('controls',true); 
			}	
		});
    }

	var headerClone = function() { 
	    var headerHeight = $('.site-header').outerHeight();
	    $('.header-clone').css('height',headerHeight);

		$(window).resize(function(){	
			var headerHeight = $('.site-header').outerHeight();
			$('.header-clone').css('height',headerHeight);
		});		
	}

	// Dom Ready
	$(function() {
		sliderFix();
		heroSection();
		headerFixed();
		counter();
		progressBar();
		detectViewport();
		responsiveMenu();
		responsiveVideo();
		rollAnimation();
		checkipad();
		panelsStyling();
		scrolls();
		goTop();
    	removeSliderTransition();
    	videoButtons();
    	headerClone();
		removePreloader();
   	});
})(jQuery);
