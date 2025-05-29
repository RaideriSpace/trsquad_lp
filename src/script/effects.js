// Efeito de Parallax da imagem central
$(document).ready(function() {
    const $parallaxContainer = $('.parallax-img-wrapper');
    const $parallaxImg = $('.centerImg');

    if ($parallaxContainer.length && $parallaxImg.length) {
        const maxHorizontalMovement = $parallaxImg.width() - $parallaxContainer.width();

        $(window).on('scroll', function() {
            const scroll = $(window).scrollTop();
            const windowHeight = $(window).height();

            const containerOffsetTop = $parallaxContainer.offset().top; 
            const containerHeight = $parallaxContainer.outerHeight();

            let progress = 0;

            if (scroll + windowHeight > containerOffsetTop && scroll < containerOffsetTop + containerHeight + windowHeight) {

                progress = (scroll + windowHeight - containerOffsetTop) / (containerHeight + windowHeight);

                progress = Math.max(0, Math.min(1, progress));

                const translateX = -progress * maxHorizontalMovement;

                $parallaxImg.css('transform', `translateX(${translateX}px)`);
            } else if (scroll + windowHeight <= containerOffsetTop) {
                $parallaxImg.css('transform', `translateX(0px)`);

            } else if (scroll >= containerOffsetTop + containerHeight) {
                const translateX = -maxHorizontalMovement;
                $parallaxImg.css('transform', `translateX(${translateX}px)`);
            }
        });
    }
});

// Efeito de aparecer com o scroll

$(window).on("scroll", function () {
    $(".feature-box").each(function () {
        if ($(this).offset().top < $(window).scrollTop() + $(window).height() - 100) {
            $(this).addClass("animate__animated animate__fadeInUp").removeClass("hidden-on-load");
        }
    });
});