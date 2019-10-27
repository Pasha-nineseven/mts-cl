$(document).ready(function() {
	flexibility(document.documentElement);
	//HEADER FIXED
	var header = $('.page-header'),
    scroll = $(window).scrollTop();
    if (scroll >= 100) header.addClass('fixed');
	else header.removeClass('fixed');
	
	// Create the measurement node
	var scrollDiv = document.createElement("div");
	scrollDiv.className = "scrollbar-measure";
	
	//MENU-MOBILE
    $('body').on('click','.js-menu-btn', function(e){
		e.preventDefault();
		if($(this).hasClass("active")){
			$(this).removeClass('active');
			$('.menu-mobile').removeClass('active');
			$('.menu-mobile__bg').fadeOut();
			document.body.removeChild(scrollDiv);
			setTimeout(function (){
				$('body').removeAttr("style");
				$( 'body' ).removeClass('fixed');
				$('.page-header').removeAttr("style");
			}, 400);
		} else{
			$(this).addClass('active');
			$('.menu-mobile').addClass('active');
			$('.menu-mobile__bg').fadeIn();
			// Get the scrollbar width
			document.body.appendChild(scrollDiv);
			var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
			//scroll-detect
			var ifHasScroll = $('body').hasVerticalScrollBar();
			if (ifHasScroll) {
				
				$('body').addClass('fixed');
				$('body').css('padding-right',scrollbarWidth);
				$('.page-header').css('padding-right',scrollbarWidth);
			}
		}
		
	});
	$('body').on('click','.menu-mobile__bg', function(e){
		e.preventDefault();
		$('.menu-btn').removeClass('active');
		$('.menu-mobile').removeClass('active');
		$(this).fadeOut();
		document.body.removeChild(scrollDiv);
		setTimeout(function (){
			$('body').removeAttr("style");
			$( 'body' ).removeClass('fixed');
			$('.page-header').removeAttr("style");
		}, 400);
	});


	//MAIN SLIDER
	if ($('.main-slider').length>0) {
		$('.main-slider').slick({
			// infinite: false,
			slidesToShow: 1,
			fade: true,
			lazyLoad: 'progressive',
			dots:false,
			useTransform:true,
			equalizeHeight: false,
			"accessibility": false,
			adaptiveHeight: false,
			nextArrow: $('.main-slider__right'),
  			prevArrow: $('.main-slider__left'),
  			responsive: [
			    {
			      	breakpoint: 768,
			      	settings: {
				        infinite: false,
						slidesToShow: 1,
						fade: true,
						lazyLoad: 'progressive',
						useTransform:true,
						"accessibility": false,
						nextArrow: $('.main-slider__right'),
			  			prevArrow: $('.main-slider__left'),
			  			dots:false,
			  			arrows:true,
			    	}
			    },
		    ]
		});
	}


	//CLIENTS SLIDER
	if ($('.clients__slider').length>0) {
		$('.clients__slider').slick({
			// infinite: false,
			slidesToShow: 5,
			slideToScroll:1,
			lazyLoad: 'progressive',
			dots:false,
			useTransform:true,
			equalizeHeight: false,
			"accessibility": false,
			adaptiveHeight: true,
			arrows:true,
  			responsive: [
			    {
			      	breakpoint: 1024,
			      	settings: {
				        slidesToShow: 4,
						slideToScroll:1,
			    	}
			    },
		    ]
		});
	}

});

$(window).scroll(function(){
    var header = $('.page-header'),
    scroll = $(window).scrollTop();

    if (scroll >= 100) header.addClass('fixed');
    else header.removeClass('fixed');
});

// functions
(function($) {
    $.fn.hasVerticalScrollBar = function() {
        return this.get(0) ? parseInt( this.get(0).scrollHeight ) > parseInt( this.innerHeight() ) : false;
    };
})(jQuery);

// links pages
// $('body').append(
// 	'<div style="position: fixed; z-index: 1005; bottom: 0; right: 0; background: #fff; border: solid 1px #828286; width: 200px;"> \
// 		<a href="javascript:void(0);" style="float: right;background:#ccc; color:#000; padding: 5px 10px; text-decoration: none; font-size: 16px" onclick="$(this).parent().hide()">Close X</a> \
// 	<style> \
// 		#pages { padding: 10px 20px 0 50px; font-size: 18px; } \
// 		#pages a { text-decoration: none; } \
// 		#pages li { margin: 5px 0; } \
// 	</style> \
// 	<ol id="pages"> \
// 		<li><a href="about.html">About</a></li> \
// 		<li><a href="index.html">Index</a></li> \
// 	</ol> \
// </div>');
