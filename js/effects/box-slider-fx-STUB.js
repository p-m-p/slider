;(function (w, $, undefined) {

  w.jqBoxSlider.registerAnimator('', (function () {

    var adaptor = {};

    adaptor.configure = function (can3D, prefix) {};

    adaptor.initialize = function ($box, $slides, settings) {};

    adaptor.reset = function ($box, settings) {};

    adaptor.transition = function (settings) {};

    adaptor.destroy = function ($box, settings) {};

    return adaptor;

  }()));

}(window, jQuery || Zepto));
