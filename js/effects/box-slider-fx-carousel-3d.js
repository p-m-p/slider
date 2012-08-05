;(function (w, $, undefined) {
  
  w.jqBoxSlider.registerAnimator('carousel3d', (function () {

    var adaptor = {}
      , vp = '';

    adaptor.configure = function (has3d, prefix) {
      vp = prefix
    };

    adaptor.initialize = function ($box, $slides, settings) {
      $box
        .css(vp + 'transform-style', 'preserve-3d')
        .css(vp + 'perspective', settings.perspective || 1000)
        .css({position: 'absolute', top: '0px', left: '0px', width: $slides.width(), height: $slides.height()})
        .parent().css({overflow: 'visible', position: 'relative'});
      $slides.css({position: 'absolute', top: '0px', left: '0px'});

      $slides.each(function (i, el) {
        var $s = $(el);

        $s.css(
            vp + 'transform'
          , 'translate3d(' + (i === 0 ? 0 : ($box.width() / 2) + i * 50) + 'px, 0px, ' + (i === 0 ? 0 : -$box.height() * 0.5) + 'px) rotate3d(0,1,0,' + (i === 0 ? 0 : -75 + i * 5) + 'deg)'
        );
      });
    };

    return adaptor;

  }()));

}(window, jQuery || Zepto));
