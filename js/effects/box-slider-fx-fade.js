;(function (w, $, undefined) {
  w.jqBoxSlider.registerAnimator('fade', (function () {
    var adaptor = {};

    // setup slide and box css
    adaptor.initialize = function ($box, $slides, settings) {
      adaptor._cacheOriginalCSS($box, 'box', settings);
      adaptor._cacheOriginalCSS($slides, 'slides', settings);
      adaptor.applyStyling($box, $slides, settings);
    };

    adaptor.applyStyling = function ($box, $slides, settings) {
      if ('static inherit'.indexOf($box.css('position')) !== -1) {
        $box.css('position', 'relative');
      }

      $box.css({
          height: $slides.innerHeight()
        , overflow: 'hidden'
      });
      $slides
        .css({ position: 'absolute', top: 0, left: 0 })
        .not(':eq(' + (settings.bsfaceindex || 0) + ')')
        .hide();
    };

    // fade current out and next in
    adaptor.transition = function (settings) {
      settings.$nextSlide.fadeIn(settings.speed);
      settings.$currSlide.fadeOut(settings.speed);
    };

    // reset the original css
    adaptor.destroy = function ($box, settings) {
      adaptor.reset($box, $box.children(), settings);
    };

    adaptor.reset = function ($box, $slides, settings) {
      $slides.css(settings.origCSS.slides);
      $box.css(settings.origCSS.box);
    };

    adaptor.resize = function ($box, $slides, settings) {
      adaptor.reset($box, $slides, settings);
      adaptor.applyStyling($box, $slides, settings);
    };

    return adaptor;
  }()));
}(window, jQuery || Zepto));
