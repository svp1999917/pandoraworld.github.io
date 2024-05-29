(function ($) {
    "use strict";

    window.umggr_video_slick = {       

        slidesCount : $('.video-slider .slider-gr-slide').length,
        dots : true,
        draggable : true,

        initializeSlide(slideIndex) {
            var slideEmbed = $('.umg-gr-display-layout-fullscreen-slider .slider-gr-slide[data-slick-index="' + slideIndex + '"] .slide-embed');
            // if the slide has already been loaded up, fade in, otherwise lazy-load the src
            var slideEmbedPlayer = $(slideEmbed).find('iframe.player');
            if (slideEmbedPlayer.attr('src')) {
                slideEmbedPlayer.fadeIn();
            } else {
                umggr_video_slick.loadYouTubeiFrame(slideIndex);
            }
        },

        clearLoader(slideId) {
            $('.umg-gr-display-layout-fullscreen-slider .slider-gr-slide[data-slide-id="' + slideId + '"] .slide-loader').hide();
            $('.umg-gr-display-layout-fullscreen-slider .slider-gr-slide[data-slide-id="' + slideId + '"] .slide-embed').css('opacity', '1');
        },

        loadYouTubeiFrame(slideIndex) {
            var slide = $('.umg-gr-display-layout-fullscreen-slider .slider-gr-slide[data-slick-index="' + slideIndex + '"] .slide-embed iframe.player');
            slide.attr('src', slide.attr('src-lazy'));
            // slide.attr('onload', slide.attr('onload-lazy'));
        },

        init() {
            // check the number of slides and remove dot if more than five. This prevents excess of dots being displayed.
            if (umggr_video_slick.slidesCount > 5) {
                umggr_video_slick.dots = false;
            }
            if (UMGGR_Video_Shortcode.fullscreen == 'true' || UMGGR_Video_Shortcode.fullscreen == '1') {
                umggr_video_slick.dots = false;
                umggr_video_slick.draggable = false;
            }

            // triggers when the slider initializes
            $(".video-slider").bind('slickInitialized', function(event, slick){
                umggr_video_slick.initializeSlide(0); // starting slide
            });

            var stdVideoSliderSettings = {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: umggr_video_slick.dots,
                draggable: umggr_video_slick.draggable
            }

            if (typeof window.UMGGR_Video_Slick_Slider_Option != "undefined") {
                var mergedVideoSliderSettings = {...stdVideoSliderSettings, ...window.UMGGR_Video_Slick_Slider_Option};
            } else {
                var mergedVideoSliderSettings = stdVideoSliderSettings;
            }

            $('.video-slider').not('.slick-initialized').slick(mergedVideoSliderSettings).on("beforeChange", function(event, slick, currentSlide, nextSlide) {
                // load the next slide
                umggr_video_slick.initializeSlide(nextSlide);
                var currentSlideElem = $('.umg-gr-display-layout-fullscreen-slider .slider-gr-slide[data-slick-index="'+currentSlide+'"]');
                jQuery(currentSlideElem).find('.slide-embed iframe.player').fadeOut();

                $('iframe').each(function(){
                    $(this)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
                });
            }).trigger('slickInitialized');

            if (UMGGR_Video_Shortcode.disable_cookies) {
              $('[data-fancybox]').fancybox({
                media : {
                  youtube : {
                    url: "//www.youtube-nocookie.com/embed/$4"
                  }
                }
              });
            }
            // if dots are hidden, use this class to set the arrow navigation to overlay the video
            if (!umggr_video_slick.dots) {
                $('.video.home .slick-arrow').addClass('-is-dots-hidden');
            }
        }
    }
    $(document).ready(function () {

        umggr_video_slick.init();

        $('iframe.player').on('load', function() {
            umggr_video_slick.clearLoader($(this).data('slide-id'));
        });

    });
})(jQuery);
