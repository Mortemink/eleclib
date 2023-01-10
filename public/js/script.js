$(function() {
    $('.slider__inner').slick({
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 2000,
    });

    $('.top__inner').slick({
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: '<button class="slick-arrow slick-prev"><img src="images/slider/slide-left.svg" alt=""></button>',
        nextArrow: '<button class="slick-arrow slick-next"><img src="images/slider/slide-right.svg" alt=""></button>',
        responsive: [
                {
                breakpoint: 811,
                settings: {
                slidesToShow: 3,
                }
            },
                {
                breakpoint: 545,
                settings: {
                slidesToShow: 2,
                }
            },
                {
                breakpoint: 411,
                settings: {
                slidesToShow: 1,
                }
              },
          ]
    });

    $('.bestsellers__inner').slick({
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: '<button class="slick-arrow slick-prev"><img src="images/slider/slide-left.svg" alt=""></button>',
        nextArrow: '<button class="slick-arrow slick-next"><img src="images/slider/slide-right.svg" alt=""></button>',
        responsive: [
            {
            breakpoint: 811,
            settings: {
            slidesToShow: 3,
            }
        },
            {
            breakpoint: 545,
            settings: {
            slidesToShow: 2,
            }
        },
            {
            breakpoint: 411,
            settings: {
            slidesToShow: 1,
            }
          },
      ]
    });

    $('.hot__inner').slick({
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: '<button class="slick-arrow slick-prev"><img src="images/slider/slide-left.svg" alt=""></button>',
        nextArrow: '<button class="slick-arrow slick-next"><img src="images/slider/slide-right.svg" alt=""></button>',
        responsive: [
            {
            breakpoint: 811,
            settings: {
            slidesToShow: 3,
            }
        },
            {
            breakpoint: 545,
            settings: {
            slidesToShow: 2,
            }
        },
            {
            breakpoint: 411,
            settings: {
            slidesToShow: 1,
            }
          },
      ]
    });

   
    $('.header__menu-btn').on('click', function(){
        $('.header__menu > ul').slideToggle();
    });

    $('.header__drop-down.drop-down').on('click', function(){
        $(this).children('.drop-down__list').toggleClass("active");
    });
    
    $('.fantasy__inner, .fantastic__inner, .adventure__inner, .mystic__inner, .new__inner, .popular__inner').slick({
        arrows: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: '<button class="slick-arrow slick-prev"><img src="images/slider/slide-left.svg" alt=""></button>',
        nextArrow: '<button class="slick-arrow slick-next"><img src="images/slider/slide-right.svg" alt=""></button>',
        responsive: [
                {
                breakpoint: 811,
                settings: {
                slidesToShow: 3,
                }
            },
                {
                breakpoint: 545,
                settings: {
                slidesToShow: 2,
                }
            },
                {
                breakpoint: 411,
                settings: {
                slidesToShow: 1,
                }
              },
          ]
    });

});