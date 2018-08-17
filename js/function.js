/*!
 *
 * Evgeniy Ivanov - 2018
 * busforward@gmail.com
 * Skype: ivanov_ea
 *
 */

var TempApp = {
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    resized: false,
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    touchDevice: function() { return navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i); }
};

function isLgWidth() { return $(window).width() >= TempApp.lgWidth; } // >= 1200
function isMdWidth() { return $(window).width() >= TempApp.mdWidth && $(window).width() < TempApp.lgWidth; } //  >= 992 && < 1200
function isSmWidth() { return $(window).width() >= TempApp.smWidth && $(window).width() < TempApp.mdWidth; } // >= 768 && < 992
function isXsWidth() { return $(window).width() < TempApp.smWidth; } // < 768
function isIOS() { return TempApp.iOS(); } // for iPhone iPad iPod
function isTouch() { return TempApp.touchDevice(); } // for touch device

$(document).ready(function() {

    if (isIOS()) {
        $(function(){$(document).on('touchend', 'a', $.noop)});
    }

	if ('flex' in document.documentElement.style) {
		if (navigator.userAgent.search(/UCBrowser/) > -1) {
			document.documentElement.setAttribute('data-browser', 'not-flex');
		} else {		
			document.documentElement.setAttribute('data-browser', 'flexible');
		}
	} else {
		document.documentElement.setAttribute('data-browser', 'not-flex');
	}

    $('[data-scrollTo]').click( function(){ 
        var scroll_el = $(this).attr('href'); 
        if ($(scroll_el).length != 0) {
            $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
        }
        return false;
    });

    $('.chats__slider').slick({
        fade: true
    });
    $('.control__slider').slick({
        fade: true
    });
    $('.control__revSlide').slick({
        adaptiveHeight: true,
    });

    $('.teachers__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        draggable: false,
        infinite: false,
        adaptiveHeight: true,
        asNavFor: '.teachers__tumbs',
    });

    $('.teachers__tumbs').slick({
        slidesToShow: 5,
        infinite: false,
        asNavFor: '.teachers__slider',
        vertical: true,
        focusOnSelect: true,
        nextArrow: '<span class="teachers__next">ещё <i class="icon-next"></i></span>',
        prevArrow: '<span class="teachers__prev"><i class="icon-prev"></i></span>',
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    arrows: true,
                    vertical: false,
                    nextArrow: '<span class="teachers__next"><i class="icon-next"></i></span>',
                    prevArrow: '<span class="teachers__prev"><i class="icon-prev"></i></span>',
                }
            }
        ]
    });

    $('.thems__link').on('mouseenter', function() {
        $('.thems__drop').toggleClass('show');
    });

    $('.thems__link').on('mouseleave', function() {
        $('.thems__drop').removeClass('show');
    });

    $('.thems__close').on('click', function() {
        $('.thems__drop').removeClass('show');
    });

    $('.control__swichItem').on('click', function() {
        var wrapId = $(this).data('slider');
        if (wrapId == '#revGraduates') {
            var slider = $('#slideGraduates');
        }
        if (wrapId == '#revParent') {
            var slider = $('#slideParent');
        }
        $('.control__swichItem').removeClass('active');
        $(this).addClass('active');

        $('.control__wrap').removeClass('active');
        $(wrapId).addClass('active');
        slider.slick('setPosition', 0);
        slider.find('.slick-slide').height('auto');
        slider.find('.slick-list').height('auto');
        slider.slick('setOption', null, null, true);
    });

    if (isXsWidth()) {
        $('.control__revText').on('click', function() {
            var slider = $('.control__revSlide');
            if ($(this).hasClass('open')) {
                $('html, body').animate({ scrollTop: $(this).offset().top - $('.control__revPhoto').innerHeight() - 20 }, 0);
            }
            $(this).toggleClass('open');
            slider.find('.slick-slide').height('auto');
            slider.find('.slick-list').height('auto');
            slider.slick('setOption', null, null, true);
        });
    }

    checkOnResize();
    dzToggl();
    VK.Widgets.Group("vk_groups", {mode: 3, no_cover: 1, width: "auto"}, 124303372);

});

$(window).resize(function(event) {
    var windowWidth = $(window).width();
    if (TempApp.resized == windowWidth) { return; }
    TempApp.resized = windowWidth;

	checkOnResize();
});

function checkOnResize() {
    fontResize();

    if (isXsWidth()) {
        $('.dz__left').insertBefore('.dz__togle');
    } else {
        $('.dz__left').insertBefore('.dz__right');
    }
}

function dzToggl() {
    var item = $('.dz__togleItem');
    var count = item.length;
    var current = 1;
    item.each(function(index, el) {
        $(this).attr('data-toggler-index', $(this).index());
    });
    $('.dz__arrow').on('click', function() {
        
        if ($(this).hasClass('dz__prev')) {
            if (current > 1) {
                current--;
            }
        }

        if ($(this).hasClass('dz__next')) {
            if (current < count) {
                current++;
            }
        }

        $('[data-toggler-index='+current+'] a').trigger('click');

    });
}

function fontResize() {
    var windowWidth = $(window).width();
    if (windowWidth >= 768) {
    	var fontSize = windowWidth/19.05;
    } else if (windowWidth < 768) {
    	var fontSize = windowWidth/5;
    }
	$('body').css('fontSize', fontSize + '%');
}

$(function () {
    if ($(".js_youtube")) {
        $(".js_youtube").each(function () {
            $(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');

            $(this).append($('<i class="video__play icon-play"></i>'));

        });

        $('.video__play, .video__prev').on('click', function () {
            var videoId = $(this).closest('.js_youtube').attr('id');
            var iframe_url = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&autohide=1";
            if ($(this).data('params')) iframe_url += '&' + $(this).data('params');

            var iframe = $('<iframe/>', {
                'frameborder': '0',
                'src': iframe_url,
            })

            $(this).closest('.video__wrapper').append(iframe);

        });
    }

});


