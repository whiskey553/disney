var $ = jQuery;
$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

jQuery(document).ready(function($) {
		var inViewEls = $('.viewable');

		$(window).on('resize scroll', function () {
				inViewEls.each(function () {
						if ($(this).isInViewport()) {
								$(this).addClass('in-viewport');
						} else {
								$(this).removeClass('in-viewport');
						}
				})
		})

		inViewEls.each(function () {
				if ($(this).isInViewport()) {
						$(this).addClass('in-viewport');
				} else {
						$(this).removeClass('in-viewport');
				}
		})

})

