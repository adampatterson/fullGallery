;(function ($, window, undefined) {
    'use strict';

    $.fn.fullGallery = function( images, options ) {
        var projectNmae = 'full-gallery';
        var that = this;
        var element = that.selector;
        var totalImages = images.length;

        if (images === undefined || images.length === 0) {
            $.error("No images were supplied for fullGallery");
        }

        var settings = $.extend({
            fade: '750',
            duration: '2000',
            controlls: true,
            autoPlay: true
        }, options );

        var Gallery = {
            init: function (images, settings) {
                this.handleSetup();
                this.bindEvents();
            },

            getState: {
                count: totalImages,
                first: 0,
                last: images.length - 1
            },

            bindEvents: function(){
                $(element + ' .left-control').click("click", $.proxy(this.handleSlide, this));
                $(element + ' .right-control').on("click", $.proxy(this.handleSlide, this));

                // If auto play
                if(settings.autoPlay) {
                    setInterval(function () {
                        Gallery.handleNext();
                    }, settings.duration);
                }
            },

            handleSetup: function() {
                $(element).attr('id', projectNmae);

                if ( settings.controlls ){
                    $(element).append( "<div class='overlay-controls left-control' data-control='previous'></div>" );
                    $(element).append( "<div class='overlay-controls right-control' data-control='next'></div>" );
                }

                $(element).append( "<div class='slideshow'></div>" );

                this.handleImages();
                this.setActiveImage();
            },

            handleImages: function(){
                $.each(images, $.proxy(function(value) {
                    $( element + ' .slideshow' )
                        .append( "<div class='slide' data-count='"+value+"' />");

                    $( element + ' .slideshow' )
                        .find("[data-count='" + value + "']")
                        .css({
                            "background":"url("+images[value]+")",
                            "background-repeat": "no-repeat",
                            "background-position": "center center",
                            "-webkit-background-size":"cover",
                            "-moz-background-size":"cover",
                            "-o-background-size":"cover",
                            "background-size":"cover",
                            "-webkit-transition": "opacity " + settings.fade + "ms ease-in-out",
                            "-moz-transition": "opacity " + settings.fade + "ms ease-in-out",
                            "-o-transition": "opacity " + settings.fade + "ms ease-in-out",
                            "transition": "opacity " + settings.fade + "ms ease-in-out"
                        });
                }, this) );
            },

            setActiveImage: function(){
                $( element + ' .slideshow' )
                    .find("[data-count='0']")
                    .addClass('active')
            },

            currentSlide: function(){
                return $(element + ' .active').data('count');
            },

            handleNext: function(){
                var intendedSlide = this.currentSlide() + 1;

                if ( this.currentSlide() == this.getState.last ){
                    intendedSlide = 0;
                }
                this.ImageState(intendedSlide);
            },

            handlePrevious: function(){
                var intendedSlide = this.currentSlide() - 1;
                
                if ( this.currentSlide() == 0 ){
                    intendedSlide = this.getState.last;
                }
                
                this.ImageState(intendedSlide);
            },

            handleSlide: function(that){
                if(that.currentTarget.className == 'overlay-controls left-control'){
                    var intendedSlide = this.currentSlide() - 1;

                    if ( this.currentSlide() == 0 ){
                        intendedSlide = this.getState.last;
                    }
                }else{
                    var intendedSlide = this.currentSlide() + 1;

                    if ( this.currentSlide() == this.getState.last ){
                        intendedSlide = 0;
                    }
                }

                this.ImageState(intendedSlide);
            },

            ImageState: function(intendedSlide){
                $( element + ' .slideshow' )
                    .find('[data-count="'+ this.currentSlide() +'"]')
                    .removeClass('active')

                $( element + ' .slideshow' )
                    .find('[data-count="'+ intendedSlide +'"]')
                    .addClass('active')
            }
        };

        // Kick it off
        Gallery.init(images, settings);

        /*
        return this.css({
            color: settings.color,
            backgroundColor: settings.backgroundColor
        });
        */
    };
}( jQuery ));