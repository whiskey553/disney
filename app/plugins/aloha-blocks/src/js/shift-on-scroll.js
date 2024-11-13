jQuery(window).ready(function($) {
	let $containers = $('.horizontally-shift-on-scroll');

	if (!$containers.length) return;

	// Remove functionality if medium and under
	if ($(window).width() < 768) return;

	$(window).on('load scroll resize', function () {
		$containers.each(function () {
			let $container = $(this);
			const viewportOffset = getViewportOffset($container);

			if (viewportOffset.top > 400) return;

			if (viewportOffset.top > 0) {
				$container.scrollLeft(viewportOffset.top / 2);
			} else {
				$container.scrollLeft(viewportOffset.top / 2 + viewportOffset.top / 2);
			}
		})
	})

	function getViewportOffset($e) {
		var $window = $(window),
			scrollLeft = $(window).scrollLeft(),
			scrollTop = $(window).scrollTop(),
			rect = $e[0].getBoundingClientRect(),
			offset = $e.offset();
		return {
			left: offset.left - scrollLeft,
			top: offset.top - scrollTop,
			bottom: Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - offset.top + scrollTop - rect.height,
			right: Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - offset.left + scrollLeft - rect.width
		};
	}

	function getDocHeight() {
			var D = document;
			return Math.max(
					D.body.scrollHeight, D.documentElement.scrollHeight,
					D.body.offsetHeight, D.documentElement.offsetHeight,
					D.body.clientHeight, D.documentElement.clientHeight
			);
	}
})
