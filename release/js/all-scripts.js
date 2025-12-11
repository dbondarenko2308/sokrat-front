$(document).ready(function () {
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

	$(function() {
		function initMenu() {
			if (window.innerWidth > 991) {
				$('.menu__item.dropdown')
					.off('click')
					.off('mouseenter mouseleave')
					.hover(
						function() {
							$(this).addClass('is-open')
						},
						function() {
							$(this).removeClass('is-open')
						}
					)
			} else {
				$('.menu__item.dropdown')
					.off('mouseenter mouseleave')
					.off('click')
					.on('click', function(e) {
						e.preventDefault()
						$(this).toggleClass('is-open')
					})
			}
		}

		initMenu()
		$(window).on('resize', initMenu)
	})

	$('.header__catalog--top').on('click', function() {
		$(this).toggleClass('active')
		$('.header-catalog').toggleClass('active')
		$('.header').toggleClass('fixed')
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

	let lastScroll = 0
	const $header = $('.header')

	$(window).on('scroll', function() {
		let currentScroll = $(this).scrollTop()

		if (currentScroll > lastScroll && currentScroll > 50) {
			$header.removeClass('scroll')
		} else if (currentScroll < lastScroll && currentScroll > 50) {
			$header.addClass('scroll')
		}

		if (currentScroll <= 50) {
			$header.removeClass('scroll')
		}

		lastScroll = currentScroll
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

	$('.header__burger').on('click', function() {
		$(this).toggleClass('active')
		$('.header-mobile').toggleClass('active')
		$('body').toggleClass('menu')

		const svg = $(this).find('svg')

		if ($(this).hasClass('active')) {
			svg.html(`
  <path d="M15 15L5 5M15 5L5 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    `)
		} else {
			svg.html(`
  <path d="M4.16797 14.1667H15.8346M4.16797 10H15.8346M4.16797 5.83334H15.8346" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    `)
		}
	})

	$('.header-top__country').on('click', function() {
		$('.search-country').addClass('active')
		$('body').addClass('hidden')
		$('.overhidden').addClass('active')

		$('.header-mobile').removeClass('active')
		const burger = $('.header__burger')
		burger.removeClass('active')
		$('body').removeClass('menu')

		burger.find('svg').html(`
    <path d="M4.16797 14.1667H15.8346M4.16797 10H15.8346M4.16797 5.83334H15.8346" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  `)
	})

	$('.search-country__close').on('click', function() {
		$('.search-country').removeClass('active')
		$('body').removeClass('hidden')
		$('.overhidden').removeClass('active')
	})

	$('.header-search').on('click', function() {
		$(this).addClass('active')
		$('.overhidden').addClass('active')
		$('.header-mobile').removeClass('active')
		const burger = $('.header__burger')
		burger.removeClass('active')
		$('body').removeClass('menu')

		burger.find('svg').html(`
    <path d="M4.16797 14.1667H15.8346M4.16797 10H15.8346M4.16797 5.83334H15.8346" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  `)
	})

	$('.overhidden').on('click', function() {
		$('.search-country').removeClass('active')
		$('body').removeClass('hidden')
		$('.overhidden').removeClass('active')
		$('.header-search-content').removeClass('active')
		$('.header-search').removeClass('active')
	})

	$.fancybox.defaults.touch = false
	$.fancybox.defaults.closeExisting = true

	const $button = $('.down-up')
	const bottomOffset = 20

	$button.on('click', function() {
		$('html, body').animate({ scrollTop: 0 }, 600)
	})

	$(window).on('scroll resize', function() {
		const scrollTop = $(window).scrollTop()
		const windowHeight = $(window).height()
		const windowWidth = $(window).width()
		let footerTop

		if (windowWidth < 991) {
			footerTop = $('.footer').offset().top - 160
		} else {
			footerTop = $('.footer').offset().top - 160
		}

		if (scrollTop > 200) {
			$button.addClass('show')
		} else {
			$button.removeClass('show')
		}

		if (windowWidth < 991) {
			const stopPoint = footerTop - windowHeight + bottomOffset + 300
			if (scrollTop > stopPoint) {
				$button.addClass('active').css({
					top: footerTop + 220 + 'px',
					bottom: 'auto'
				})
			} else {
				$button.removeClass('active').css({
					top: 'auto',
					bottom: '55px'
				})
			}
		}
	})

	if ($('.filter__price--slider').length) {
		$('.filter__price--slider').each(function() {
			let $range = $(this)
			let parent = $(this).parent()
			let $inputFrom = parent.find('.filter__price--low')
			let $inputTo = parent.find('.filter__price--high')
			let instance
			let min = $inputFrom.data('min')
			let max = $inputTo.data('max')
			let from = $range.data('from')
			let to = $range.data('to')

			$range.ionRangeSlider({
				skin: 'round',
				type: 'double',
				onStart: updateInputs,
				onChange: updateInputs,
				onFinish: updateInputsWT
			})

			instance = $range.data('ionRangeSlider')

			function updateInputs(data) {
				from = data.from
				to = data.to

				if (data.from === data.min || data.from === '') {
					$inputFrom.prop('value', '')
					$inputFrom.prop('placeholder', data.min)
				} else {
					$inputFrom.prop('value', from)
					$inputFrom.prop('placeholder', '')
				}

				if (data.to === data.max || data.to === '') {
					$inputTo.prop('value', '')
					$inputTo.prop('placeholder', data.max)
				} else {
					$inputTo.prop('value', to)
					$inputTo.prop('placeholder', '')
				}
			}

			function updateInputsWT(data) {
				from = data.from
				to = data.to

				if (data.from === data.min || data.from === '') {
					$inputFrom.prop('value', '')
					$inputFrom.prop('placeholder', data.min)
				} else {
					$inputFrom.prop('value', from)
					$inputFrom.prop('placeholder', '')
				}

				if (data.to === data.max || data.to === '') {
					$inputTo.prop('value', '')
					$inputTo.prop('placeholder', data.max)
				} else {
					$inputTo.prop('value', to)
					$inputTo.prop('placeholder', '')
				}

				$inputFrom.trigger('keyup')
				$inputTo.trigger('keyup')
			}

			$inputFrom.on('change', function() {
				var val = $(this).prop('value')
				if (val < min) {
					val = min
				} else if (val > to) {
					val = to
				}

				instance.update({
					from: val
				})
				$(this).prop('value', val)
			})

			$inputTo.on('change', function() {
				var val = $(this).prop('value')
				if (val < from) {
					val = from
				} else if (val > max) {
					val = max
				}
				instance.update({
					to: val
				})

				$(this).prop('value', val)
			})
		})
	}

	$('.filter__top').on('click', function() {
		$(this).toggleClass('active')
		$(this).next('.filter__body').toggleClass('active')
	})

	$('.filter__mobile').on('click', function() {
		$('.filter').addClass('active')
	})

	$('.filter__head--close').on('click', function() {
		$('.filter').removeClass('active')
	})

	$('.listing__hit a').on('click', function() {
		$(this).addClass('active')
		$(this).next().addClass('active')
	})

	$('.listing__hit--close').on('click', function() {
		$(this).removeClass('active')
		$(this).prev().removeClass('active')
	})

	$('.card__srav').on('click', function() {
		$(this).toggleClass('active')
	})

	$('.card__like').on('click', function() {
		$(this).toggleClass('active')

		return false
	})

	$('.card-popup__like').on('click', function() {
		$(this).toggleClass('active')

		return false
	})

	$('.card-popup__srav').on('click', function() {
		$(this).toggleClass('active')

		return false
	})

	$('.listing__sort--info').on('click', function() {
		$('.listing__sort--dropdown').toggleClass('active')
	})

	$('.listing__sort--item').on('click', function() {
		$('.listing__sort--dropdown').removeClass('active')
	})

	$('[data-card-popup-tab]').on('click', function() {
		if (!$(this).hasClass('active')) {
			var index = $(this).index()
			$(this).addClass('active').siblings().removeClass('active')
			$('[data-card-popup-item]')
				.removeClass('active')
				.eq(index)
				.addClass('active')
		}
		return false
	})
})


//------------------- map contants -----------------------------

callMap('map', 16);
});