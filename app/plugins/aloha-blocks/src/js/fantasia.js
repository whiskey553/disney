/**
 * Private variables
 */
let $aosElements = [];
let initialized = false;

/**
 * Default options
 */
let options = {
  menuHeight: 0,
};

var $ = jQuery;


	// When the page is loaded...
jQuery(document).ready(function ($) {
    // Get all of the animation items
    var entranceItems = $('[data-animation-entrance]');
    var exitItems = $('[data-animation-exit]');
    var pageAnimItems = $.merge(entranceItems, exitItems);
    pageAnimItems = $.unique(pageAnimItems);

    $.fn.calculateAnchorExit = function () {
        // get the element it's anchored to
        var element = document.getElementById(
            $(this).data('animationExitAnchor')
        );
        var anchorTop = $(element).offset().top;
        var anchorBottom = anchorTop + $(element).height();

        return anchorBottom;
    };

    $.fn.getDefaultExitAnchor = function () {
        var previous = $(this).prev();
        var anchorTop = $(previous).offset().top;
        var anchorBottom = anchorTop + $(previous).height();

        return anchorBottom;
    };

    $.fn.calculateAnchorEntrance = function () {
        var element = document.getElementById(
            $(this).data('animationEntranceAnchor')
        );
        var anchorTop = $(element).offset().top;

        return anchorTop;
    };

    $.fn.getDefaultEntranceAnchor = function () {
        var anchorTop = $(this).offset().top;
        var anchorBottom = anchorTop + $(this).height();
        var mid = anchorTop + (anchorBottom - anchorTop) / 2;
        return mid;
    };

    $.fn.isInViewport = function () {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();

        var viewportTop = $(window).scrollTop() + settings.menuHeight;
        var viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    // If the viewport bottom is greater than the anchor
    $.fn.triggerEntranceAnimation = function () {
        var viewportBottom = $(window).scrollTop() + $(window).height();
        return viewportBottom > $(this).prop('entranceAnchorPosition');
    };

    // If the viewport top is greater than the anchor
    $.fn.triggerExitAnimation = function () {
        var viewportTop = $(window).scrollTop() + settings.menuHeight;
        return viewportTop > $(this).prop('exitAnchorPosition');
    };

    $.fn.triggerReverseExit = function () {
        if ($(this).data('animationExit')) {
            var viewportTop = $(window).scrollTop() + settings.menuHeight;
            return $(this).prop('exitAnchorPosition') > viewportTop;
        }
    };

    $.fn.triggerReverseEntrance = function () {
        if ($(this).data('animationEntrance')) {
            var viewportBottom = $(window).scrollTop() + $(window).height();
            return viewportBottom < $(this).prop('entranceAnchorPosition');
        }
    };

    $.fn.playEntranceAnimation = function () {
        $(this).css('visibility', 'visible');
        $(this).css('animation-direction', 'normal');
        $(this).addClass('aos-animate-entrance');
        $(this).on('animationend', function () {
            $(this).prop('entrancePlayed', true);
            $(this).removeClass('aos-animate-entrance');
            $(this).css('opacity', '1');
        });
    };

    $.fn.playEntranceAnimationReverse = function () {
        $(this).css('animation-direction', 'reverse');
        $(this).addClass('aos-animate-entrance');

        $(this).on('animationend', function () {
            $(this).prop('entrancePlayed', false);
            $(this).removeClass('aos-animate-entrance');
            $(this).css('opacity', '0');
        });
    };

    $.fn.playExitAnimation = function () {
        $(this).css('animation-direction', 'normal');
        $(this).addClass('aos-animate-exit');
        $(this).on('animationend', function () {
            $(this).prop('exitPlayed', true);
            $(this).removeClass('aos-animate-exit');
            $(this).css('opacity', '0');
        });
    };

    $.fn.playExitAnimationReverse = function () {
        $(this).css('visibility', 'visible');
        $(this).css('animation-direction', 'reverse');
        $(this).addClass('aos-animate-exit');

        $(this).on('animationend', function () {
            $(this).prop('exitPlayed', false);
            $(this).removeClass('aos-animate-exit');
            $(this).css('opacity', '1');
        });
    };

    // Recalculate element positions when changing the size of the window
    $.fn.calculateElementPositions = function () {
        if (
            $(this).data('animationExit') &&
            $(this).data('animationExitAnchor')
        ) {
            var exitAnchorPosition = $(this).calculateAnchorExit();
            $(this).prop('exitAnchorPosition', exitAnchorPosition);
        } else if (
            $(this).data('animationExit') &&
            !$(this).data('animationExitAnchor')
        ) {
            var defaultAnchor = $(this).getDefaultExitAnchor();
            $(this).prop('exitAnchorPosition', defaultAnchor);
        }

        if (
            $(this).data('animationEntrance') &&
            $(this).data('animationEntranceAnchor')
        ) {
            var entranceAnchorPosition = $(this).calculateAnchorEntrance();
            $(this).prop('entranceAnchorPosition', entranceAnchorPosition);
            $(this).css('visibility', 'hidden');
        } else if (
            $(this).data('animationEntrance') &&
            !$(this).data('animationEntranceAnchor')
        ) {
            var defaultEntranceAnchor = $(this).getDefaultEntranceAnchor();
            $(this).prop('entranceAnchorPosition', defaultEntranceAnchor);
            $(this).css('visibility', 'hidden');
        }

        $(this).prop('entrancePlayed', false);
        $(this).prop('exitPlayed', false);
    };

    $(pageAnimItems).each(function (i, item) {
        $(item).prop('entrancePlayed', false);
        $(item).prop('exitPlayed', false);

        $(item).prop('exitAnchorPosition', 0);
        $(item).prop('entranceAnchorPosition', 0);
        // calculate the anchor for the exit if it has an exit
        if (
            $(item).data('animationExit') &&
            $(item).data('animationExitAnchor')
        ) {
            var exitAnchorPosition = $(item).calculateAnchorExit();
            $(item).prop('exitAnchorPosition', exitAnchorPosition);
        }
        // If there is no exit anchor specified... make it the previous element on the DOM
        else if (
            $(item).data('animationExit') &&
            !$(item).data('animationExitAnchor')
        ) {
            var defaultAnchor = $(this).getDefaultExitAnchor();
            $(item).prop('exitAnchorPosition', defaultAnchor);
        }

        if (
            $(item).data('animationEntrance') &&
            $(item).data('animationEntranceAnchor')
        ) {
            var entranceAnchorPosition = $(item).calculateAnchorEntrance();
            $(item).prop('entranceAnchorPosition', entranceAnchorPosition);
            $(item).css('visibility', 'hidden');
        } else if (
            $(item).data('animationEntrance') &&
            !$(item).data('animationEntranceAnchor')
        ) {
            var defaultEntranceAnchor = $(item).getDefaultEntranceAnchor();
            $(item).prop('entranceAnchorPosition', defaultEntranceAnchor);
            $(item).css('visibility', 'hidden');
        }
    });

    var resizeTimer;

    $(window).on('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            pageAnimItems.each(function () {
                $(this).calculateElementPositions();
            });
        }, 250);
    });

    $(window).on('resize scroll', function () {
        pageAnimItems.each(function () {
            // Recalculate the element top & element bottom
            if (
                $(this).data('animationEntrance') &&
                $(this).triggerEntranceAnimation() &&
                !$(this).prop('entrancePlayed')
            ) {
                $(this).playEntranceAnimation();
            }
            if (
                $(this).data('animationExit') &&
                $(this).triggerExitAnimation() &&
                $(this).prop('exitPlayed') == false
            ) {
                $(this).playExitAnimation();
            }
            if (
                $(this).triggerReverseExit() &&
                $(this).prop('exitPlayed') &&
                !$(this).is(':animated')
            ) {
                $(this).playExitAnimationReverse();
            }
            if (
                $(this).triggerReverseEntrance() &&
                $(this).prop('entrancePlayed') &&
                !$(this).is(':animated')
            ) {
                $(this).playEntranceAnimationReverse();
            }
        });
    });
});


