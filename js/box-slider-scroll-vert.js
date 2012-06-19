;(function (w, $, undefined) {

  w.jqBoxSlider.registerAnimator('scrollVert', (function () {

    var adaptor = {}
      , boxHeight = 0;

    // setup slide and box css
    adaptor.initialize = function ($box, $slides, settings) {
      var width = $box.width()
        , height = boxHeight = $slides.eq(0).height();
        
      if ('static auto'.indexOf($box.css('position')) !== -1) {
        $box.css('position', 'relative');
      }
      
      $box.css({height: boxHeight, overflow: 'hidden'});
      $slides
        .css({
            position: 'absolute'
          , top: 0
          , left: 0
          , width: width
          , height: height
        })
        .filter(':gt(0)').hide();
        
      $slides.eq(1).css('top', -height + 'px');
    };

    // fade current out and next in
    adaptor.transition = function (settings) {
      var fromTop = settings.reverse ? boxHeight : -boxHeight;
      
      settings.$nextSlide
        .css({top: fromTop + 'px', display: 'block'})
        .animate({top: '0px'}, settings.speed);
      settings.$currSlide.animate(
          {top: (settings.reverse ? -boxHeight : boxHeight) + 'px'}
        , settings.speed
      );
    };

    return adaptor;

  }()));

}(window, jQuery || Zepto));