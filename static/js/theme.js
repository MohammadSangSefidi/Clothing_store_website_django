'use strict';

// Cache
var body = $('body');
var mainSlider = $('#main-slider');
var imageCarousel = $('.img-carousel');
var partnersCarousel = $('#partners');
var testimonialsCarousel = $('#testimonials');
var topProductsCarousel = $('#top-products-carousel');
var featuredProductsCarousel = $('#featured-products-carousel');
var sidebarProductsCarousel = $('#sidebar-products-carousel');
var hotDealsCarousel = $('#hot-deals-carousel');
var owlCarouselSelector = $('.owl-carousel');
var isotopeContainer = $('.isotope');
var isotopeFiltrable = $('#filtrable a');
var toTop = $('#to-top');
var hover = $('.thumbnail');
var navigation = $('.navigation');
var superfishMenu = $('ul.sf-menu');
var priceSliderRange = $('#slider-range');

// Slide in/out with fade animation function
jQuery.fn.slideFadeToggle  = function(speed, easing, callback) {
    return this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);
};
//
jQuery.fn.slideFadeIn  = function(speed, easing, callback) {
    return this.animate({opacity: 'show', height: 'show'}, speed, easing, callback);
};
jQuery.fn.slideFadeOut  = function(speed, easing, callback) {
    return this.animate({opacity: 'hide', height: 'hide'}, speed, easing, callback);
};

jQuery(document).ready(function () {
    // Prevent empty links
    // ---------------------------------------------------------------------------------------
    $('a[href=#]').click(function (event) {
        event.preventDefault();
    });
    // Sticky header/menu
    // ---------------------------------------------------------------------------------------
    if ($().sticky) {
        $('.header.fixed').sticky({topSpacing:0});
        //$('.header.fixed').on('sticky-start', function() { console.log("Started"); });
        //$('.header.fixed').on('sticky-end', function() { console.log("Ended"); });
    }
    // SuperFish menu
    // ---------------------------------------------------------------------------------------
    if ($().superfish) {
        superfishMenu.superfish();
    }
    $('ul.sf-menu a').click(function () {
        body.scrollspy('refresh');
    });
    // Fixed menu toggle
    $('.menu-toggle').on('click', function () {
        if (navigation.hasClass('opened')) {
            navigation.removeClass('opened').addClass('closed');
        } else {
            navigation.removeClass('closed').addClass('opened');
        }
    });
    $('.menu-toggle-close').on('click', function () {
        if (navigation.hasClass('opened')) {
            navigation.removeClass('opened').addClass('closed');
        } else {
            navigation.removeClass('closed').addClass('opened');
        }
    });
    // Smooth scrolling
    // ----------------------------------------------------------------------------------------
    $('.sf-menu a, .scroll-to').click(function () {

        $('.sf-menu a').removeClass('active');
        $(this).addClass('active');
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, {
            duration: 1200,
            easing: 'easeInOutExpo'
        });
        return false;
    });
    // BootstrapSelect
    // ---------------------------------------------------------------------------------------
    if ($().selectpicker) {
        $('.selectpicker').selectpicker();
    }
    // prettyPhoto
    // ---------------------------------------------------------------------------------------
    if ($().prettyPhoto) {
        $("a[data-gal^='prettyPhoto']").prettyPhoto({
            theme: 'dark_square'
        });
    }
    // Scroll totop button
    // ---------------------------------------------------------------------------------------
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1) {
            toTop.css({bottom: '15px'});
        } else {
            toTop.css({bottom: '-100px'});
        }
    });
    toTop.click(function () {
        $('html, body').animate({scrollTop: '0px'}, 800);
        return false;
    });
    // Add hover class for correct view on mobile devices
    // ---------------------------------------------------------------------------------------
    hover.hover(
        function () {
            $(this).addClass('hover');
        },
        function () {
            $(this).removeClass('hover');
        }
    );
    // Sliders
    // ---------------------------------------------------------------------------------------
    if ($().owlCarousel) {
        var owl = $('.owl-carousel');
        owl.on('changed.owl.carousel', function(e) {
            // update prettyPhoto
            if ($().prettyPhoto) {
                $("a[data-gal^='prettyPhoto']").prettyPhoto({
                    theme: 'dark_square'
                });
            }
        });
        // Main slider
        if (mainSlider.length) {
            mainSlider.owlCarousel({
                //items: 1,
                autoplay: false,
                autoplayHoverPause: true,
                loop: true,
                margin: 0,
                dots: true,
                nav: true,
                navText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ],
                responsiveRefreshRate: 100,
                responsive: {
                    0: {items: 1},
                    479: {items: 1},
                    768: {items: 1},
                    991: {items: 1},
                    1024: {items: 1}
                }
            });
        }
        // Top products carousel
        if (topProductsCarousel.length) {
            topProductsCarousel.owlCarousel({
                autoplay: false,
                loop: true,
                margin: 30,
                dots: false,
                nav: true,
                navText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ],
                responsive: {
                    0: {items: 1},
                    479: {items: 2},
                    768: {items: 3},
                    991: {items: 4},
                    1024: {items: 5},
                    1280: {items: 6}
                }
            });
        }
        // Featured products carousel
        if (featuredProductsCarousel.length) {
            featuredProductsCarousel.owlCarousel({
                autoplay: false,
                loop: true,
                margin: 30,
                dots: false,
                nav: true,
                navText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ],
                responsive: {
                    0: {items: 1},
                    479: {items: 1},
                    768: {items: 2},
                    991: {items: 3},
                    1024: {items: 4}
                }
            });
        }
        // Sidebar products carousel
        if (sidebarProductsCarousel.length) {
            sidebarProductsCarousel.owlCarousel({
                autoplay: false,
                loop: true,
                margin: 30,
                dots: true,
                nav: false,
                navText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ],
                responsive: {
                    0: {items: 1},
                    479: {items: 1},
                    768: {items: 1},
                    991: {items: 1},
                    1024: {items: 1}
                }
            });
        }
        // Partners carousel
        if (partnersCarousel.length) {
            partnersCarousel.owlCarousel({
                autoplay: false,
                loop: true,
                margin: 30,
                dots: false,
                nav: true,
                navText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ],
                responsive: {
                    0: {items: 1},
                    479: {items: 2},
                    768: {items: 3},
                    991: {items: 4},
                    1024: {items: 5},
                    1280: {items: 6}
                }
            });
        }
        // Testimonials carousel
        if (testimonialsCarousel.length) {
            testimonialsCarousel.owlCarousel({
                autoplay: true,
                loop: true,
                margin: 0,
                dots: true,
                nav: false,
                navText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ],
                responsive: {
                    0: {items: 1},
                    479: {items: 1},
                    768: {items: 1},
                    991: {items: 1},
                    1024: {items: 1},
                    1280: {items: 1}
                }
            });
        }
        // Images carousel
        if (imageCarousel.length) {
            imageCarousel.owlCarousel({
                autoplay: false,
                loop: true,
                margin: 0,
                dots: true,
                nav: true,
                navText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ],
                responsiveRefreshRate: 100,
                responsive: {
                    0: {items: 1},
                    479: {items: 1},
                    768: {items: 1},
                    991: {items: 1},
                    1024: {items: 1}
                }
            });
        }
    }
    // countdown
    // ---------------------------------------------------------------------------------------
    if ($().countdown) {
        var austDay = new Date();
        austDay = new Date(austDay.getFullYear() + 1, 1 - 1, 26);
        $('#dealCountdown1').countdown({until: austDay});
        $('#dealCountdown2').countdown({until: austDay});
        $('#dealCountdown3').countdown({until: austDay});
    }
    // Google map
    // ---------------------------------------------------------------------------------------
    if (typeof google === 'object' && typeof google.maps === 'object') {
        if ($('#map-canvas').length) {
            var map;
            var marker;
            var image = 'assets/img/icon-google-map.png'; // marker icon
            google.maps.event.addDomListener(window, 'load', function () {
                var mapOptions = {
                    scrollwheel: false,
                    zoom: 12,
                    center: new google.maps.LatLng(40.9807648, 28.9866516) // map coordinates
                };

                map = new google.maps.Map(document.getElementById('map-canvas'),
                    mapOptions);
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(41.0096559,28.9755535), // marker coordinates
                    map: map,
                    icon: image,
                    title: 'Hello World!'
                });
            });
        }
    }
    // Price range / need jquery ui
    // ---------------------------------------------------------------------------------------
    if ($.ui) {
        if ($(priceSliderRange).length) {
            $(priceSliderRange).slider({
                range: true,
                min: 0,
                max: 500,
                values: [75, 300],
                slide: function (event, ui) {
                    $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
                }
            });
            $("#amount").val(
                "$" + $("#slider-range").slider("values", 0) +
                " - $" + $("#slider-range").slider("values", 1)
            );
        }
    }
    // Shop categories widget slide in/out
    // ---------------------------------------------------------------------------------------
    $('.shop-categories .arrow').click(
        function () {

            $(this).parent().parent().find('ul.children').removeClass('active');
            $(this).parent().parent().find('.fa-angle-up').addClass('fa-angle-down').removeClass('fa-angle-up');
            if ($(this).parent().find('ul.children').is(":visible")) {
                //$(this).find('.fa-angle-up').addClass('fa-angle-down').removeClass('fa-angle-up');
                //$(this).parent().find('ul.children').removeClass('active');
            }
            else {
                $(this).find('.fa-angle-down').addClass('fa-angle-up').removeClass('fa-angle-down');
                $(this).parent().find('ul.children').addClass('active');
            }
            $(this).parent().parent().find('ul.children').each(function () {
                if (!$(this).hasClass('active')) {
                    $(this).slideFadeOut();
                }
                else {
                    $(this).slideFadeIn();
                }
            });
        }
    );
    $('.shop-categories ul.children').each(function () {
        if (!$(this).hasClass('active')) {
            $(this).hide();
        }
    });
});

jQuery(window).load(function () {
    // Preloader
    $('#status').fadeOut();
    $('#preloader').delay(200).fadeOut(200);
    // Isotope
    if ($().isotope) {
        isotopeContainer.isotope({ // initialize isotope
            itemSelector: '.isotope-item' // options...
            //,transitionDuration: 0 // disable transition
        });
        isotopeFiltrable.click(function () { // filter items when filter link is clicked
            var selector = $(this).attr('data-filter');
            isotopeFiltrable.parent().removeClass('current');
            $(this).parent().addClass('current');
            isotopeContainer.isotope({filter: selector});
            return false;
        });
        isotopeContainer.isotope('reLayout'); // layout/reLayout
    }
    // Scroll to hash
    if (location.hash != '') {
        var hash = '#' + window.location.hash.substr(1);
        if (hash.length) {
            body.delay(0).animate({
                scrollTop: jQuery(hash).offset().top
            }, {
                duration: 1200,
                easing: "easeInOutExpo"
            });
        }
    }
    // OwlSliders
    if ($().owlCarousel) {
        // Hot deal carousel
        // must initialized after counters
        if (hotDealsCarousel.length) {
            hotDealsCarousel.owlCarousel({
                autoplay: false,
                loop: true,
                margin: 30,
                dots: true,
                nav: false,
                navText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ],
                responsive: {
                    0: {items: 1},
                    479: {items: 1},
                    768: {items: 1},
                    991: {items: 1},
                    1024: {items: 1}
                }
            });
        }
    }
    // Refresh owl carousels/sliders
    owlCarouselSelector.trigger('refresh');
    owlCarouselSelector.trigger('refresh.owl.carousel');
});

jQuery(window).resize(function () {
    // Refresh owl carousels/sliders
    owlCarouselSelector.trigger('refresh');
    owlCarouselSelector.trigger('refresh.owl.carousel');
    // Refresh isotope
    if ($().isotope) {
        isotopeContainer.isotope('reLayout'); // layout/relayout on window resize
    }
    if ($().sticky) {
        $('.header.fixed').sticky('update');
    }
});

jQuery(window).scroll(function () {
    // Refresh owl carousels/sliders
    owlCarouselSelector.trigger('refresh');
    owlCarouselSelector.trigger('refresh.owl.carousel');
    if ($().sticky) {
        $('.header.fixed').sticky('update');
    }
});