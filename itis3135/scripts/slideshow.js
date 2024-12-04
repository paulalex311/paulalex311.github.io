$(document).ready(function () {
    let slideIndex = 1;

    function showSlides(n) {
        let slides = $('.my-slides');
        let dots = $('.dot');

        if (n > slides.length) {
            slideIndex = 1; 
        }
        if (n < 1) { 
            slideIndex = slides.length; 
        }

        slides.hide();
        dots.removeClass('active');

        slides.eq(slideIndex - 1).show();
        dots.eq(slideIndex - 1).addClass('active');
    }

    showSlides(slideIndex);
    $('.next').click(function () {
        showSlides(slideIndex += 1);
    });

    $('.prev').click(function () {
        showSlides(slideIndex -= 1);
    });

    $('.dot').click(function () {
        const slideNum = $(this).attr('data-slide');
        showSlides(slideIndex = parseInt(slideNum));
    });
});