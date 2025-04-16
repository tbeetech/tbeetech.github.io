$(document).ready(function() {

	
	/* Navigation burger onclick side navigation show */
	$('.burger-container').on('click', function(e) {
		e.preventDefault();
		$('.mobile-menu').toggleClass('active');
		$(this).toggleClass('change');
		
		// Toggle body scroll
		if ($('.mobile-menu').hasClass('active')) {
			$('body').css('overflow', 'hidden');
		} else {
			$('body').css('overflow', 'auto');
		}
	});

	// Close mobile menu when menu items are clicked
	$('.mobile-navigation__ul a').on('click', function() {
		$('.mobile-menu').removeClass('active');
		$('.burger-container').removeClass('change');
		$('body').css('overflow', 'auto');
	});




	
	$('#contact').on('click', ()=> {
		$('.main-navigation').toggle('fast');
	})		
	$('#about').on('click', ()=> {
		$('.main-navigation').toggle('fast');
	})	
	$('#home').on('click', ()=> {
		$('.main-navigation').toggle('fast');
	})	






	/* About me slider */
	$('.about-me-slider').slick({
		slidesToShow: 1,
		prevArrow: '<span class="span-arrow slick-prev"><</span>',
		nextArrow: '<span class="span-arrow slick-next">></span>'
	});

	/* Blog slider */
	$('.blog-slider').slick({
		slidesToShow: 2,
		prevArrow: '<span class="span-arrow slick-prev"><</span>',
		nextArrow: '<span class="span-arrow slick-next">></span>',
		responsive: [
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1
			}
		}
		]
	});
	
	/* Project tabs functionality */
	$('.category-tab').on('click', function() {
		const category = $(this).data('category');
		
		// Update active tab
		$('.category-tab').removeClass('active');
		$(this).addClass('active');
		
		// Show corresponding category
		$('.project-category').removeClass('active');
		$('#' + category).addClass('active');
	});
	
	/* Navbar scroll effect */
	$(window).scroll(function() {
		if ($(this).scrollTop() > 50) {
			$('.site-navigation').addClass('scrolled');
		} else {
			$('.site-navigation').removeClass('scrolled');
		}
	});
	
	/* Smooth scrolling for anchor links */
	$('a[href*="#"]').on('click', function(e) {
		e.preventDefault();
		
		$('html, body').animate(
			{
				scrollTop: $($(this).attr('href')).offset().top - 80,
			},
			500,
			'linear'
		);
	});
	
	/* Initialize particles.js */
	if (typeof particlesJS !== 'undefined') {
		particlesJS("particles-js", {
			"particles": {
				"number": {
					"value": 100,
					"density": {
						"enable": true,
						"value_area": 800
					}
				},
				"color": {
					"value": ["#c18f59", "#ffffff", "#2c78f6"]
				},
				"shape": {
					"type": ["circle", "triangle", "polygon"],
					"stroke": {
						"width": 0,
						"color": "#000000"
					},
					"polygon": {
						"nb_sides": 6
					}
				},
				"opacity": {
					"value": 0.3,
					"random": true,
					"anim": {
						"enable": true,
						"speed": 1,
						"opacity_min": 0.1,
						"sync": false
					}
				},
				"size": {
					"value": 3,
					"random": true,
					"anim": {
						"enable": true,
						"speed": 2,
						"size_min": 0.1,
						"sync": false
					}
				},
				"line_linked": {
					"enable": true,
					"distance": 150,
					"color": "#c18f59",
					"opacity": 0.2,
					"width": 1
				},
				"move": {
					"enable": true,
					"speed": 1.5,
					"direction": "none",
					"random": true,
					"straight": false,
					"out_mode": "out",
					"bounce": false,
					"attract": {
						"enable": true,
						"rotateX": 600,
						"rotateY": 1200
					}
				}
			},
			"interactivity": {
				"detect_on": "canvas",
				"events": {
					"onhover": {
						"enable": true,
						"mode": "grab"
					},
					"onclick": {
						"enable": true,
						"mode": "push"
					},
					"resize": true
				},
				"modes": {
					"grab": {
						"distance": 140,
						"line_linked": {
							"opacity": 0.8
						}
					},
					"bubble": {
						"distance": 400,
						"size": 40,
						"duration": 2,
						"opacity": 8,
						"speed": 3
					},
					"repulse": {
						"distance": 200,
						"duration": 0.4
					},
					"push": {
						"particles_nb": 4
					},
					"remove": {
						"particles_nb": 2
					}
				}
			},
			"retina_detect": true
		});
	}

	/* Back to top button */
	const backToTopButton = document.getElementById('back-to-top');
	
	if (backToTopButton) {
		// Show button after scrolling down 300px
		window.addEventListener('scroll', function() {
			if (window.scrollY > 300) {
				backToTopButton.classList.add('visible');
			} else {
				backToTopButton.classList.remove('visible');
			}
		});
		
		// Scroll to top when clicked
		backToTopButton.addEventListener('click', function() {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		});
	}
	
	/* Add logo highlight animation */
	$('.logo-container').append('<div class="logo-highlight"></div>');
	
	/* Add hover effects to navigation items */
	$('.main-navigation__ul a').hover(
		function() {
			$(this).find('i').css('transform', 'translateY(-3px)');
		},
		function() {
			$(this).find('i').css('transform', 'translateY(0)');
		}
	);
});



var counta = 0;

$(window).scroll(function(e){


	/* Onscroll number counter */
	var statisticNumbers = $('.single-count');
	if(statisticNumbers.length) {
		var oTop = statisticNumbers.offset().top - window.innerHeight;
		if (counta == 0 && $(window).scrollTop() > oTop) {
			$('.count').each(function() {
				var $this = $(this),
				countTo = $this.attr('data-count');
				$({
					countNum: $this.text()
				}).animate({
					countNum: countTo
				},

				{
					duration: 2000,
					easing: 'swing',
					step: function() {
						$this.text(Math.floor(this.countNum));
					},
					complete: function() {
						$this.text(this.countNum);
					}
				});
			});
			counta = 1;
		}
	}
	
	/* Fade in animation for elements when scrolling */
	$('.fade-in').each(function() {
		var position = $(this).offset().top;
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		
		if (scroll + windowHeight > position) {
			$(this).addClass('visible');
		}
	});

});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		
		// Close mobile menu if open
		if (document.querySelector('.mobile-menu.active')) {
			toggleMobileMenu();
		}
		
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			window.scrollTo({
				top: target.offsetTop - 80,
				behavior: 'smooth'
			});
		}
	});
});

// Mobile menu toggle
function myFunction(x) {
	x.classList.toggle("change");
	toggleMobileMenu();
}

function toggleMobileMenu() {
	const mobileMenu = document.querySelector('.mobile-menu');
	mobileMenu.classList.toggle('active');
	
	// Prevent scrolling when menu is open
	if (mobileMenu.classList.contains('active')) {
		document.body.style.overflow = 'hidden';
	} else {
		document.body.style.overflow = 'auto';
	}
}

// Sticky header
window.addEventListener('scroll', function() {
	const header = document.querySelector('.site-navigation');
	const backToTop = document.getElementById('back-to-top');
	
	if (window.scrollY > 50) {
		header.classList.add('scrolled');
		if (backToTop) backToTop.classList.add('visible');
	} else {
		header.classList.remove('scrolled');
		if (backToTop) backToTop.classList.remove('visible');
	}
});

// Back to top button
if (document.getElementById('back-to-top')) {
	document.getElementById('back-to-top').addEventListener('click', function() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});
}

// Fade in animations
const fadeElements = document.querySelectorAll('.fade-in');

function checkFade() {
	fadeElements.forEach(element => {
		const elementTop = element.getBoundingClientRect().top;
		const windowHeight = window.innerHeight;
		
		if (elementTop < windowHeight - 100) {
			element.classList.add('visible');
		}
	});
}

// Initial check and scroll listener
window.addEventListener('load', checkFade);
window.addEventListener('scroll', checkFade);

// Project category tabs
const categoryTabs = document.querySelectorAll('.category-tab');
const projectCategories = document.querySelectorAll('.project-category');

categoryTabs.forEach(tab => {
	tab.addEventListener('click', function() {
		// Remove active class from all tabs
		categoryTabs.forEach(tab => tab.classList.remove('active'));
		
		// Add active class to clicked tab
		this.classList.add('active');
		
		// Hide all project categories
		projectCategories.forEach(category => {
			category.classList.remove('active');
		});
		
		// Show selected category
		const targetCategory = document.getElementById(this.dataset.category);
		if (targetCategory) {
			targetCategory.classList.add('active');
		}
	});
});

// Initialize particles.js if it exists
if (typeof particlesJS !== 'undefined') {
	particlesJS('particles-js', {
		particles: {
			number: { value: 80, density: { enable: true, value_area: 800 } },
			color: { value: '#c18f59' },
			shape: { type: 'circle' },
			opacity: { value: 0.5, random: false },
			size: { value: 3, random: true },
			line_linked: { enable: true, distance: 150, color: '#c18f59', opacity: 0.4, width: 1 },
			move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
		},
		interactivity: {
			detect_on: 'canvas',
			events: {
				onhover: { enable: true, mode: 'grab' },
				onclick: { enable: true, mode: 'push' },
				resize: true
			}
		},
		retina_detect: true
	});
}