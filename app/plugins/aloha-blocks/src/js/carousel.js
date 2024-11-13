jQuery(document).ready(function($) {
	let $carousels = $(".aloha-carousel");
	$carousels.each(function() {
		let $carousel = $(this);

		let $slideWrapper = $carousel.find(".aloha-carousel-inner");
		let $slides = $slideWrapper.children(".aloha-carousel-slide");

		let $next = $carousel.find(".aloha-carousel-next");
		let $prev = $carousel.find(".aloha-carousel-prev");

		// initialize first slide
		next();

		var slideWidth = $slides.first().outerWidth(true);
		var scrollableWidth = $slideWrapper.width();

		$(window).resize(function() {
			// Reposition the current slide
			if ($(window).width() < 768) {
				$slideWrapper.css(
				"transform",
				`translateX(0px)`,
				);
			}
			else {
				$slideWrapper.css(
					"transform",
					`translateX(${translateX('<-')}px)`,
				);
	
				slideWidth = $slides.first().outerWidth(true);
				scrollableWidth = $slideWrapper.width();
	
				prev();
				$slideWrapper.css(
					"transform",
					`translateX(${translateX('<-')}px)`,
				);
			}
		});

		$next.on("click", function() {
			next();
			$slideWrapper.css(
				"transform",
				`translateX(${translateX('->')}px)`,
			);
		});

		$prev.on("click", function() {
			prev();
			$slideWrapper.css(
				"transform",
				`translateX(${translateX('<-')}px)`,
			);
		});

		function currTransDist() {
			return curr().index() * slideWidth;
		}

		function translateX(direction) {
			return currTransDist() * -1;
		}

		function next() {
			let $curr = curr();
			if (!$curr.length) {
				$slides.first().toggleClass('current');
			} else {
				$curr.toggleClass('current');
				let $next = $curr.next();
				if (!$next.length) {
					$slides.first().toggleClass('current');
				} else {
					$curr.next().toggleClass('current');
				}
			}
		}

		function prev() {
			let $curr = curr();
			if (!$curr.length) {
				$slides.last().toggleClass('current');
			} else {
				$curr.toggleClass('current');
				let $prev = $curr.prev();
				if (!$prev.length) {
					$slides.last().toggleClass('current');
				} else {
					$prev.toggleClass('current');
				}
			}
		}

		function curr() {
			return $slides.filter('.current');
		}
	});
});
