;(function (w, $, undefined) {

  w.jqBoxSlider.registerAnimator('showHide', (function () {

    var adaptor = {};

    adaptor.initialize = function ($box, $slides, settings) {
      $slides.filter(':gt(0)').hide();
    };

    adaptor.transition = function (settings) {
      settings.$nextSlide.fadeIn(settings.speed);
      settings.$currSlide.fadeOut(settings.speed);
    };

    return adaptor;

  }()));

}(window, jQuery || Zepto));
