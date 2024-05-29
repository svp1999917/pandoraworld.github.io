(function ($) {
    "use strict";

    var slideWrapper = $(".slider-gr-container"),
        iframes = slideWrapper.find('.embed-player');        

    // Initialize
    slideWrapper.on("init", function(slick){
        slick = $(slick.currentTarget);
        setTimeout(function(){
            playPauseVideo(slick,"play");
        }, 1000);
        resizePlayer(iframes, 16/9);
    });

    slideWrapper.on("beforeChange", function(event, slick) {
        slick = $(slick.$slider);
        playPauseVideo(slick,"pause");
    });

    slideWrapper.on("afterChange", function(event, slick) {
        slick = $(slick.$slider);
        playPauseVideo(slick,"play");
    });

    // Check if we have at least one video in the slider and if so make sure the non-video slides have the appropriate resposnive height sizing to keep the carousel neat and tidy!
    if ($('.slider-gr-slide.video').length !== 0 || $('.slider-gr-slide.youtube').length !== 0 || $('.slider-gr-slide.youtube-sound').length !== 0) {
        $('.slider-gr-slide:not(.video):not(.youtube):not(.youtube-sound) .slide-image').addClass('mixed-content');
        $('.slider-gr-slide:not(.video):not(.youtube):not(.youtube-sound) .slide-content').addClass('mixed-content');
    }

    // POST commands to YouTube or Vimeo API
    function postMessageToPlayer(player, command){
        if (player == null || command == null) return;
        player.contentWindow.postMessage(JSON.stringify(command), "*");
    }

    // When the slide is changing
    function playPauseVideo(slick, control){
        var currentSlide, slideType, startTime, player, video;
  
        currentSlide = slick.find(".slick-current");       
        slideType = (currentSlide.length > 0 ? currentSlide.attr("class").split(" ")[1] : '');
        player = (currentSlide.length > 0 ? currentSlide.find("iframe").get(0) : null);
        startTime = (currentSlide.length > 0 ? currentSlide.data("video-start") : 0);
        
        if (slideType === "vimeo") {
            switch (control) {
                case "play":
                    if ((startTime != null && startTime > 0 ) && !currentSlide.hasClass('started')) {
                        currentSlide.addClass('started');
                        postMessageToPlayer(player, {
                            "method": "setCurrentTime",
                            "value" : startTime
                        });
                    }
                    postMessageToPlayer(player, {
                        "method": "play",
                        "value" : 1
                    });
                    break;
                case "pause":
                    postMessageToPlayer(player, {
                        "method": "pause",
                        "value": 1
                    });
                    break;
            }
        } else if (slideType === "youtube-sound") {
            switch (control) {
                case "play":
                    postMessageToPlayer(player, {
                        "event": "command",
                        //"func": "mute"
                    });
                    postMessageToPlayer(player, {
                        "event": "command",
                        "func": "playVideo"
                    });
                    break;
                case "pause":
                    postMessageToPlayer(player, {
                        "event": "command",
                        "func": "pauseVideo"
                    });
                    break;
            }
        }  else if (slideType === "youtube") {
            switch (control) {
                case "play":
                    postMessageToPlayer(player, {
                        "event": "command",
                        "func": "mute"
                    });
                    postMessageToPlayer(player, {
                        "event": "command",
                        "func": "playVideo"
                    });
                    break;
                case "pause":
                    postMessageToPlayer(player, {
                        "event": "command",
                        "func": "pauseVideo"
                    });
                    break;
            }
        } else if (slideType === "video") {
            video = currentSlide.find('video').get(0);

            // Load the video source based on the inital screen width
            if ($(window).width() < 800){
                var getVideoSrc = currentSlide.find('video').data('videoMobileSrc');
            } else {
                var getVideoSrc = currentSlide.find('video').data('videoSrc');
            }
            
            if (video != null) {
                video.src = getVideoSrc
                currentSlide.find('video source').attr('src', '' + getVideoSrc + '');
                video.load();
                if (control === "play"){
                    video.play();
                } else {
                    video.pause();
                }
            }
        }
    }

    // Resize player
    function resizePlayer(iframes, ratio) {
        if (!iframes[0]) return;
        
        var win = $(".slider-gr-container"),
        width = win.width(),
        playerWidth,
        height = win.height(),
        playerHeight,
        ratio = ratio || 16/9;
  
        iframes.each(function(){
            var current = $(this);
            if (width / ratio < height) {
                playerWidth = Math.ceil(height * ratio);
                current.width(playerWidth).height(height).css({
                    left: (width - playerWidth) / 2,
                    top: 0
                });
            } else {
                playerHeight = Math.ceil(width / ratio);
                current.width(width).height(playerHeight).css({
                    left: 0,
                    top: (height - playerHeight) / 2
                });
            }
        });
    }

    // Resize event
    $(window).on("resize.slickVideoPlayer", function(){  
        resizePlayer(iframes, 16/9);
    });

})(jQuery);// JavaScript Document