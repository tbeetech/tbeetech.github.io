$(document).ready(function() {

	
	// Smooth scrolling for navigation links
	$('.main-navigation__ul a').on('click', function(e) {
		e.preventDefault();
		const target = $($(this).attr('href'));
		const headerOffset = 80;
		
		if (target.length) {
			const targetPosition = target.offset().top - headerOffset;
			$('html, body').animate({
				scrollTop: targetPosition
			}, 800, 'easeInOutExpo');
		}
	});

	// Ensure proper section highlighting in navigation
	$(window).on('scroll', function() {
		const scrollPosition = $(window).scrollTop();
		
		$('.main-navigation__ul a').each(function() {
			const target = $($(this).attr('href'));
			if (target.length) {
				if (target.offset().top <= scrollPosition + 200 && 
					target.offset().top + target.height() > scrollPosition) {
					$('.main-navigation__ul a').removeClass('active');
					$(this).addClass('active');
				}
			}
		});
	});






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
	
	/* Project tabs functionality with enhanced animation */
	$('.category-tab').on('click', function() {
        const category = $(this).data('category');
        
        if ($(this).hasClass('active')) return; // Prevent re-clicking active tab
        
        // Update active tab state
        $('.category-tab').removeClass('active');
        $(this).addClass('active');
        
        // Smooth transition between categories
        $('.project-category.active').fadeOut(300, function() {
            $(this).removeClass('active');
            
            // Show new category with fade effect
            $('#' + category)
                .addClass('active')
                .css('opacity', 0)
                .show()
                .animate({ opacity: 1 }, 300);
        });
        
        // Trigger fade-in animations for new category content
        setTimeout(() => {
            $('#' + category).find('.fade-in').each(function(index) {
                $(this).css({
                    'animation': 'fadeInUp 0.5s ease forwards',
                    'animation-delay': (index * 0.1) + 's'
                });
            });
        }, 300);
    });
    
    /* Enhanced scroll animations */
    function animateOnScroll() {
        $('.fade-in').each(function() {
            const elementTop = $(this).offset().top;
            const windowBottom = $(window).scrollTop() + $(window).height();
            
            if (windowBottom > elementTop + 100) {
                $(this).addClass('visible');
            }
        });
    }

    // Run on page load and scroll
    animateOnScroll();
    $(window).scroll(_.throttle(animateOnScroll, 100));
    
    /* Improved navbar scroll effect */
    $(window).scroll(_.throttle(function() {
        if ($(this).scrollTop() > 50) {
            $('.site-navigation').addClass('scrolled');
        } else {
            $('.site-navigation').removeClass('scrolled');
        }
    }, 100));
	
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

// Set copyright year dynamically
$(document).ready(function() {
  const year = new Date().getFullYear();
  $('#copyright-year').text(year);
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

// Mobile menu functionality
$(document).ready(function() {
    // Toggle mobile menu
    $('.burger-container').click(function() {
        $(this).toggleClass('change');
        $('.mobile-menu').toggleClass('active');
        $('body').toggleClass('menu-open');
    });

    // Handle navigation clicks
    $('.main-navigation__ul a, .mobile-navigation__ul a').on('click', function(e) {
        e.preventDefault();
        const target = $(this).attr('href');
        
        // Close mobile menu if open
        $('.mobile-menu').removeClass('active');
        $('.burger-container').removeClass('change');
        $('body').removeClass('menu-open');
        
        // Smooth scroll to section
        if (target.startsWith('#')) {
            const $targetSection = $(target);
            if ($targetSection.length) {
                const offset = $targetSection.offset().top;
                $('html, body').animate({
                    scrollTop: offset
                }, 1000);
            }
        } else {
            window.location.href = target;
        }
    });

    // Close menu when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.mobile-menu, .burger-container').length && $('.mobile-menu').hasClass('active')) {
            $('.mobile-menu').removeClass('active');
            $('.burger-container').removeClass('change');
            $('body').removeClass('menu-open');
        }
    });
});

/* Active section highlighting */
$(window).scroll(_.throttle(function() {
        const scrollPosition = $(window).scrollTop() + 100;
        
        $('section').each(function() {
            const sectionTop = $(this).offset().top;
            const sectionId = $(this).attr('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + $(this).height()) {
                $('.main-navigation__ul a, .mobile-navigation__ul a').removeClass('active');
                $('a[href="#' + sectionId + '"]').addClass('active');
            }
        });
    }, 100));


// Promo Countdown Timer
function startPromoCountdown() {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 2); // 2 days from now
    
    function updateCountdown() {
        const now = new Date();
        const difference = endDate - now;
        
        if (difference <= 0) {
            const promoBar = document.querySelector('.promo-announcement');
            if (promoBar) {
                promoBar.style.display = 'none';
                document.querySelector('.site-navigation').style.marginTop = '0';
            }
            return;
        }
        
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        
        const countdownElement = document.getElementById('promoCountdown');
        if (countdownElement) {
            countdownElement.textContent = 
                `${days}d ${hours}h ${minutes}m ${seconds}s remaining`;
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Email Form Handler
function initEmailForm() {
    const form = document.getElementById('emailForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Animate submit button
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Create mailto link
            setTimeout(() => {
                const mailtoLink = `mailto:tobirammar@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
                window.location.href = mailtoLink;
                
                // Reset form and button
                form.reset();
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            }, 1000);
        });
        
        // Add input animation handlers
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }
}

// Service Carousel
function initServiceCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    function showNextItem() {
        items[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % items.length;
        items[currentIndex].classList.add('active');
    }

    setInterval(showNextItem, 3000); // Change item every 3 seconds
}

$(document).ready(function() {
    // Initialize service carousel
    initServiceCarousel();
    
    // Start promo countdown
    startPromoCountdown();
    
    // Smooth scroll for navigation
    $('.mobile-navigation__ul a, .main-navigation__ul a').on('click', function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 800);
            
            // Close mobile menu if open
            if ($('.mobile-menu').hasClass('active')) {
                toggleMobileMenu();
            }
        }
    });
    
    // Enhanced mobile navigation
    $('.burger-container').on('click', function(e) {
        e.preventDefault();
        toggleMobileMenu();
    });
    
    // Mobile menu item click handling
    $('.mobile-navigation__ul a').on('click', function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        
        if (target.length) {
            toggleMobileMenu(); // Close mobile menu
            
            setTimeout(() => {
                $('html, body').animate({
                    scrollTop: target.offset().top - 70
                }, 800, 'easeInOutExpo');
            }, 300);
        }
    });
    
    // Initialize email form
    initEmailForm();
});

// Enhanced mobile navigation handling
function handleMobileNavClick(e) {
    e.preventDefault();
    const href = $(this).attr('href');
    const targetSection = $(href);
    
    if (targetSection.length) {
        // First close the mobile menu
        $('.mobile-menu').removeClass('active');
        $('.burger-container').removeClass('change');
        $('body').css({
            'overflow': 'visible',
            'position': 'static',
            'width': 'auto',
            'height': 'auto'
        });
        
        // Then scroll to section
        setTimeout(() => {
            const headerOffset = 70;
            const elementPosition = targetSection.offset().top;
            const offsetPosition = elementPosition - headerOffset;
            
            $('html, body').animate({
                scrollTop: offsetPosition
            }, {
                duration: 800,
                easing: 'easeInOutExpo'
            });
        }, 300);
    }
}

$(document).ready(function() {
    // Remove any existing click handlers from mobile nav links
    $('.mobile-navigation__ul a').off('click');
    
    // Add new click handler
    $('.mobile-navigation__ul a').on('click', handleMobileNavClick);
    
    // Initialize all components when DOM is ready
    initBackToTop();
    initSmoothScroll();
    initProjectTabs();
    initServiceCarousel();
    initEmailForm();
});

// Back to top functionality
function initBackToTop() {
    const backToTop = $('#back-to-top');
    
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            backToTop.fadeIn();
        } else {
            backToTop.fadeOut();
        }
    });
    
    backToTop.click(function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 800);
    });
}

// Smooth scrolling for all anchor links
function initSmoothScroll() {
    $('a[href*="#"]:not([href="#"])').click(function(e) {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && 
            location.hostname === this.hostname) {
            
            e.preventDefault();
            const target = $(this.hash);
            const targetOffset = target.length ? target.offset().top - 80 : 0;
            
            $('html, body').animate({
                scrollTop: targetOffset
            }, 800);
            
            return false;
        }
    });
}

// Project tabs functionality
function initProjectTabs() {
    $('.category-tab').click(function() {
        const category = $(this).data('category');
        
        // Handle active states
        $('.category-tab').removeClass('active');
        $(this).addClass('active');
        
        // Smooth transition between categories
        $('.project-category.active').fadeOut(300, function() {
            $(this).removeClass('active');
            
            $(`#${category}`)
                .addClass('active')
                .css('opacity', 0)
                .show()
                .animate({ opacity: 1 }, 300);
                
            // Trigger animations for new content
            $(`#${category} .fade-in`).each(function(index) {
                $(this)
                    .css({
                        'animation': 'fadeInUp 0.5s ease forwards',
                        'animation-delay': `${index * 0.1}s`
                    });
            });
        });
    });
}

// Service carousel functionality
function initServiceCarousel() {
    let currentItem = 0;
    const items = $('.carousel-item');
    const totalItems = items.length;
    
    function showNextItem() {
        items.eq(currentItem).removeClass('active');
        currentItem = (currentItem + 1) % totalItems;
        items.eq(currentItem).addClass('active');
    }
    
    // Change item every 3 seconds
    setInterval(showNextItem, 3000);
}

// Email form handling
function initEmailForm() {
    $('#emailForm').submit(function(e) {
        e.preventDefault();
        
        // Add your email form submission logic here
        const email = $('#email').val();
        const subject = $('#subject').val();
        const message = $('#message').val();
        
        // Basic validation
        if (!email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // You can add your form submission code here
        console.log('Form submitted:', { email, subject, message });
    });
}

// Email validation helper
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}