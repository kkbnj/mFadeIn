/*!
 * jQuery mFadeIn v1.0
 * Copyright 2016 maam.inc
 * Contributing Author: Hiroki Homma
 * Require for jQuery v1.7 or above
 */
(function($) {
  $.fn.mFadeIn = function(options) {
    var default_options = {
          duration: 260,
          time_window: 24,
        },

        params = $.extend({}, default_options, options),

        $target = $(this),
        $img = $('img', $target),
        $canvas = $('<canvas>'),
        ctx,
        width = $img.width(),
        height = $img.height();

    var draw = function(progress) {
      var grad = ctx.createLinearGradient(0, 0, width, width),
          wid = params.time_window / 100,
          start = progress * (1 + wid) / 100 - wid,
          end = start + wid;

      if(start < 0) start = 0;
      if(end > 1) end = 1;



      ctx.restore();
      ctx.save();

      ctx.clearRect(0, 0, width, height);

      ctx.beginPath();

      grad.addColorStop(start, 'rgba(255, 255, 255, 1)');

      grad.addColorStop(end, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = grad;

      ctx.rect(0, 0, width, height);
      ctx.fill();

      ctx.globalCompositeOperation = 'destination-in';

      ctx.drawImage($img[0], 0, 0);
    }

    var init = function() {
      $target.css({
        width: width,
        height: height,
        overflow: 'hidden',
      });


      var img = new Image();

      img.src = $img.attr('src');

      img.onload = function() {
        var i;
        width = $img.width();
        height = $img.height();

        $target.css({
          width: width,
          height: height
        });

        ctx = $canvas[0].getContext('2d');
        $canvas[0].width = width;
        $canvas[0].height = height;

        $img.after($canvas);
        $img.remove();

        ctx.save();

        for(i = 1; i <= 100; i++) {
          (function(i) {
            setTimeout(function() {
              draw(i);
            }, params.duration / 100 * i);
          })(i);
        }
      }
    }

    init();
  }
})(jQuery);
