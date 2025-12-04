$(document).ready(function() {
	const showcase = new Swiper('.showcase__container', {
		slidesPerView: 1,
		loop: true,

		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		}
	})

	$('.pritok__grid').hover(
		function() {
			$('.pritok__grid').addClass('compressed')
			$(this).addClass('expanded')
		},
		function() {
			$('.pritok__grid').removeClass('compressed expanded')
		}
	)

	var init1 = false
	var swiper1
	function swiperHow() {
		if (window.innerWidth < 1500) {
			if (!init1) {
				init1 = true
				swiper1 = new Swiper('.pritok__slider', {
					slidesPerView: 1,
					spaceBetween: 10,
					loop: true,
					pagination: {
						el: '.swiper-pagination',
						type: 'bullets',
						clickable: true
					},

					breakpoints: {
						992: {
							slidesPerView: 3
						}
					}
				})
			}
		} else if (init1) {
			swiper1.destroy()
			init1 = false
		}
	}

	swiperHow()
	window.addEventListener('resize', swiperHow)

	const newsmain = new Swiper('.main-news__slider', {
		slidesPerView: 1,
		spaceBetween: 20,

		navigation: {
			nextEl: '.main-news__next',
			prevEl: '.main-news__prev'
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		},
		breakpoints: {
			767: {
				slidesPerView: 2
			}
		}
	})

	$('.mask').each((i, element) => {
		const mask = IMask(element, { mask: '+{7} (000) 000-00-00' })
	})

	$('.footer__nav--label').on('click', function() {
		$(this).toggleClass('active')
		$(this).next().toggleClass('active')
	})

	if (window.innerWidth > 991) {
		$('.menu__item.dropdown').hover(
			function() {
				$(this).addClass('is-open')
			},
			function() {
				$(this).removeClass('is-open')
			}
		)
	}

	$('.header__catalog--top').on('click', function() {
		$('.header-catalog').toggleClass('active')
		$('body').toggleClass('hidden')
	})

	$('.search-country .header-search__container input').on('input', function() {
		const query = $(this).val().toLowerCase()

		$('.search-country__nav li').each(function() {
			const text = $(this).text().toLowerCase()
			if (text.includes(query)) {
				$(this).show()
			} else {
				$(this).hide()
			}
		})
	})

	$('.search-country').each(function() {
		const $block = $(this)
		const $input = $block.find('.header-search__container input')
		const $container = $block.find('.header-search__container')
		const $clear = $block.find('.header-search__clear')
		const $listItems = $block.find('.search-country__nav li')

		$input.on('keyup', function() {
			const query = $(this).val().toLowerCase()

			$container.toggleClass('has-value', query.length > 0)

			$listItems.each(function() {
				const text = $(this).text().toLowerCase()
				$(this).toggle(text.includes(query))
			})
		})

		$clear.on('click', function() {
			$input.val('').trigger('keyup')
			$input.focus()
		})
	})

	$('.header').each(function() {
		const $block = $(this)
		const $input = $block.find('.header-search__container input')
		const $container = $block.find('.header-search__container')
		const $clear = $block.find('.header-search__clear')
		const $searchContent = $block.find('.header-search-content')
		const $searchWrap = $block.find('.header-search')

		function updateClasses() {
			const query = $input.val().toLowerCase()
			const hasValue = query.length > 0

			$container.toggleClass('has-value', hasValue)
			$searchContent.toggleClass('active', hasValue)
			$searchWrap.toggleClass('border', hasValue)
		}

		$input.on('keyup', updateClasses)

		updateClasses()

		$clear.on('click', function() {
			$input.val('').trigger('keyup')
			$input.focus()
		})
	})

	$('.header-top__country').on('click', function() {
		$('.search-country').addClass('active')
		$('body').addClass('hidden')
		$('.overhidden').addClass('active')
	})

	
	$('.search-country__close').on('click', function() {
		$('.search-country').removeClass('active')
		$('body').removeClass('hidden')
		$('.overhidden').removeClass('active')
	})

	$('.header-search').on('click', function() {
		$(this).addClass('active')
		$('.overhidden').addClass('active')
	})



	$('.overhidden').on('click', function() {
		$('.search-country').removeClass('active')
		$('body').removeClass('hidden')
		$('.overhidden').removeClass('active')
		$('.header-search-content').removeClass('active')
		$('.header-search').removeClass('active')
	})

})
