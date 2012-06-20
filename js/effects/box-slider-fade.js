;(function (w, $, undefined) {

  w.jqBoxSlider.registerAnimator('fade', (function () {

    var adaptor = {};

    // setup slide and box css
    adaptor.initialize = function ($box, $slides, settings) {
      settings.origCSS = {
          box: {position: $box.css('position')}
        , slides: {
              position: $slides.css('position')
            , top: $slides.css('top')
            , left: $slides.css('left')
            , display: $slides.css('display')
          }
      };

      if ('static auto'.indexOf($box.css('position')) !== -1) {
        $box.css('position', 'relative');
      }

      $slides
        .css({ position: 'absolute', top: 0, left: 0 })
        .filter(':gt(0)').hide();
    };

    // fade current out and next in
    adaptor.transition = function (settings) {
      settings.$nextSlide.fadeIn(settings.speed);
      settings.$currSlide.fadeOut(settings.speed);
    };

    // reset the original css
    adaptor.destroy = function ($box, settings) {
      $box.children().css(settings.origCSS.slides);
      $box.css(settings.origCSS.box);
    };

    return adaptor;

  }()));

}(window, jQuery || Zepto));
