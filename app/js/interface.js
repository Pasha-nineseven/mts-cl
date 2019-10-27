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
				        adaptiveHeight: true,
			    	}
				},
				{
					breakpoint: 600,
					settings: {
						adaptiveHeight: true,
						arrows:false,
						dots:true,
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
				{
					breakpoint: 850,
					settings: {
					  	slidesToShow: 3,
					  	slideToScroll:1,
					},
				},
				{
					breakpoint: 768,
					settings: {
					  	slidesToShow: 2,
						slideToScroll:1,
						arrows:false,
						dots:true,
					},
				},
				{
					breakpoint: 400,
					settings: {
					  	slidesToShow: 1,
						slideToScroll:1,
						arrows:false,
						dots:true,
					},		
			  	},
		    ]
		});
	}

	//FS
    if ($('.fs').length>0) {
    	$('.fs').styler();
    }

	//POPUP-INLINE
    $(".js-popup-inline").fancybox({
        speed : 330,
        transitionEffect: "slide", 
        animationEffect: "zoom-in-out", 
        infobar: false,
        buttons: [
            "close"
		],
		beforeShow: function() {
			document.body.appendChild(scrollDiv);
			var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
			//scroll-detect
			var ifHasScroll = $('body').hasVerticalScrollBar();
			if (ifHasScroll) {
				$('.page-header').css('padding-right',scrollbarWidth);
			}
		},
		afterClose: function() {
			$('.page-header').removeAttr("style");
		},
    });

	initItemsSlider();
	ymaps.ready(initializeDefaultMap);
});

$(window).scroll(function(){
    var header = $('.page-header'),
    scroll = $(window).scrollTop();

    if (scroll >= 100) header.addClass('fixed');
    else header.removeClass('fixed');
});


$(window).resize(function () {
	initItemsSlider();
});

// functions
function initItemsSlider() {
	var $items = $('.list');
	if($(window).width() < 750) {
		$items.not('.slick-initialized').slick({
			slidesToShow: 2,
			slideToScroll:1,
			lazyLoad: 'progressive',
			dots:true,
			useTransform:true,
			equalizeHeight: false,
			"accessibility": false,
			adaptiveHeight: false,
			arrows:false,
		});
	} else{
		if($items.hasClass('slick-initialized')) {
			$items.slick("unslick");
		}
	}
}

function initializeDefaultMap() {
    if ($('#contacts-map').length>0) {

        var myMap = new ymaps.Map("contacts-map", {
            center:[53.899888,27.566757],
            zoom: 13,
            controls: []
        }, {
            suppressMapOpenBlock: true
        }); 
                
        var myPlacemark = new ymaps.Placemark([53.899888,27.566757],{
                // balloonContentBody: 'Адрес',
            },{
            iconLayout: 'default#image',
            iconImageHref: "img/content/label.png", 
            iconImageSize: [40,51],
            iconImageOffset: [-20, -51]
        }); 


        myMap.controls.add(new ymaps.control.ZoomControl({options: { position: { right: 10, top: 90 }}}));
        myMap.behaviors.disable('scrollZoom');

        myMap.geoObjects.add(myPlacemark);
    }
}

(function($) {
    $.fn.hasVerticalScrollBar = function() {
        return this.get(0) ? parseInt( this.get(0).scrollHeight ) > parseInt( this.innerHeight() ) : false;
    };
})(jQuery);

// links pages
$('body').append(
	'<div style="position: fixed; z-index: 1005; bottom: 0; right: 0; background: #fff; border: solid 1px #828286; width: 200px;"> \
		<a href="javascript:void(0);" style="float: right;background:#ccc; color:#000; padding: 5px 10px; text-decoration: none; font-size: 16px" onclick="$(this).parent().hide()">Close X</a> \
	<style> \
		#pages { padding: 7px 20px 0 25px;} \
		#pages a { text-decoration: none; } \
		#pages li { margin: 5px 0; } \
	</style> \
	<ol id="pages"> \
		<li><a href="index.html">Index</a></li> \
		<li><a href="partners.html">Partners</a></li> \
		<li><a href="contact.html">Contacts</a></li> \
	</ol> \
</div>');
