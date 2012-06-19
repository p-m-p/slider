;(function (w, $, undefined) {

  w.jqBoxSlider.registerAnimator('fade', (function () {

    var adaptor = {};

    // setup slide and box css
    adaptor.initialize = function ($box, $slides, settings) {
      $box.css('position', 'relative');
      $slides
        .css({ position: 'absolute', top: 0, left: 0 })
        .filter(':gt(0)').hide();
    };

    // fade current out and next in
    adaptor.transition = function (settings) {
      settings.$nextSlide.fadeIn(settings.speed);
      settings.$currSlide.fadeOut(settings.speed);
    };

    return adaptor;

  }()));

}(window, jQuery || Zepto));
