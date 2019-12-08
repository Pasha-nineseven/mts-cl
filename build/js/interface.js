// Number.prototype.formatMoney = function(c, d, t){
//     var n = this,
//         c = isNaN(c = Math.abs(c)) ? 2 : c,
//         d = d == undefined ? "." : d,
//         t = t == undefined ? "," : t,
//         s = n < 0 ? "-" : "",
//         i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
//         j = (j = i.length) > 3 ? j % 3 : 0;
//     return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
// };


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
  			autoplay: true, 
    		autoplaySpeed: 14000,
  			speed: 500,
  			cssEase: 'ease-in-out',
  			pauseOnHover:false,
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
	
	if ($('#contacts-map').length>0) {
		ymaps.ready(initializeDefaultMap);
	}


	//TABS
    $(".tab_content").hide();
    $("ul.tabs li:first").addClass("active").show();
    $(".tab_content:first").show();
    //Событие по клику
    $(".tabs-horizontal__item").click(function(e) {
    	e.preventDefault();
        $(".tabs-horizontal__item").removeClass("active");
        $(this).addClass("active");
        $(".tab_content").hide();
        var activeTab = $(this).find("a").attr("href");
        $(activeTab).fadeIn();
    });


    //TABS
    $(".tab_content-vert").hide();
    $('.tab_container_vert').each(function (index, value){
	  	$(this).find('.tab_content-vert:first').show();
	  	$(this).find('.tabs-vert li:first').addClass("active").show();
	});
    //Событие по клику
    $(".tabs-vertical__item").click(function(e) {
    	e.preventDefault();
        $(this).parents('.tabs-vert').find(".tabs-vertical__item").removeClass("active");
        $(this).addClass("active");
        $(this).parents('.tab_content-wrapper').find(".tab_content-vert").hide();
        var activeTab = $(this).find("a").attr("href");
        $(activeTab).fadeIn();
	});
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
	var myMap = new ymaps.Map("contacts-map", {
		center:[53.92671475,27.61556353524928],
		zoom: 13,
		controls: []
	}, {
		suppressMapOpenBlock: true
	}); 
			
	var myPlacemark = new ymaps.Placemark([53.92671475,27.61556353524928],{
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

//SLIDER-RANGE
function syncDefaultValues() {
	$('.slider-range').each(function() {
	  	var val = $(this).attr('data-val');
	  	$(this).parent().find('.slider-str-val').html(val);
	});
}
  
function updateTotalPrice() {
	$('.sliders-container').each(function() {
	  	var total = 0;
  
	  	$(this).find('.slider-lines [data-key]').each(function () {
			var key = $(this).attr('data-key');
			var val = $(this).attr('data-val');
			var coef = $("[name=\""+key+"\"]").val();
			total += coef * val;
	  	});
  
	  	$(this).find('#totalPrice').html(total.formatMoney(2, '.', ' '));
	});
}
$(function() {
	$( ".slider-range" ).each(function(){
		var curr_slide=$(this).slider({
			min: parseInt($(this).attr("data-min")),
			max: parseInt($(this).attr("data-max")),
			value: parseInt($(this).attr("data-val")), 
			step: parseFloat($(this).attr("data-step")),
			animate: 400,
			range: "min",
			slide: function( event, ui ) {
                $(this).parent().find('.slider-str-val').html(ui.value);
                $(this).attr('data-val', ui.value);
                var key = $(this).attr('data-key');
                //updateTotalPrice();
            }
		});
	})
	.slider("pips", {
		rest: "label",
		// suffix: "Гб",
	});


	var valTag = '.ui-slider-pip-label';
	var countLablesOnLine = 5;
	$('.platform-view__item').each(function() {
		var all = $(this).find(valTag).length;
		if(all <= countLablesOnLine) {
			$(this).find(valTag).show();
			return;
		}

		var step = parseInt((all+countLablesOnLine) / countLablesOnLine);
		var i = 0;
		var stepCount = 1;
		$(this).find(valTag).each(function() {
			if(i-- < 1 && ++stepCount <= countLablesOnLine) {
				$(this).addClass("bigboss").show();
				i = step;
			}
		});
		$(this).find(valTag+":last-child").addClass("bigboss").show();
	});

	$(valTag+":not(.bigboss) .ui-slider-label").html("");
});

$(function() {
	$('.mobile-selector').change(function(){
        $('.tab_content').hide();
        var tVal = ($(this).val());
        $('#' + tVal).show();
    });

	$('.mobile-selector-vertical').change(function(){
        $(this).parents('.tab_content').find('.tab_content-vert').hide();
        var tVal_vert = ($(this).val());
        $('#' + tVal_vert).show();
	});
	if(location.hash) {
		$(".tab_container .tab_content").hide();
		$(location.hash).show();

		$(".tabs-horizontal__item.active").removeClass("active");
		$(".tabs-horizontal__link[href=\""+location.hash+"\"]").parent().addClass("active");

		$('html, body').animate({
			scrollTop: $(location.hash).offset().top
		}, 500);
	}
});

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
		<li><a href="cloud.html">Cloud</a></li> \
		<li><a href="calculator.html">Calculator</a></li> \
	</ol> \
</div>');
