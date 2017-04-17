jQuery(function($) {
	var $container = $('#masonry-grid').masonry({
	        itemSelector : '.grid-item',
	        columnWidth : ''
	    });

		$container.imagesLoaded().progress(function() {
		    $container.masonry('layout');
		});

	$(document).ready(function(){
		$('.owl-carousel').owlCarousel({
			nav: true,
			navText: [
	            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
	            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        	],
        	lazyLoad: true,
		    responsive:{
		    	1024: {
		    		items: 4
		    	},
		        1400:{
		            items: 5
		        },
		    }
		});

		function moveScroller() {
		    var $anchor = $("#scroller-anchor");
		    var $scroller = $('.site-header');

		    var move = function() {
		        var st = $(window).scrollTop();
		        var ot = $anchor.offset().top;

		        // set the header fix
		        $scroller.css({
                    position: "fixed",
                    top: "0px"
                });

		        if (st > 68) {
		            $('.site-logo').hide();
		            $('#mainnav').css('float', 'left');
		            $('.menu-items').css('padding-top', '0');
		        } else {
		        	$('.site-logo').show();
		        	$('#mainnav').css('float', 'right');
		        	$('.menu-items').css('padding-top', '12px');
		        }
		    };
		    $(window).scroll(move);
		    move();
		}

		moveScroller();
	});
});
