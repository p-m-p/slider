;(function (w, $, undefined) {

  w.jqBoxSlider.registerAnimator('scrollVert', (function () {

    var adaptor = {}
      , boxHeight = 0;

    // setup slide and box css
    adaptor.initialize = function ($box, $slides, settings) {
      var width = $box.width()
        , height = boxHeight = $slides.eq(0).height();

      // cache original css for reset and destroy
      settings.origCSS = {
          box: {
              height: $box.css('height')
            , position: $box.css('position')
            , overflow: $box.css('overflow')
          }
        , slides: {
              position: $slides.css('position')
            , top: $slides.css('top')
            , left: $slides.css('left')
            , width: $slides.css('width')
            , height: $slides.css('height')
            , display: $slides.css('display')
          }
      };
        
      if ('static auto'.indexOf($box.css('position')) !== -1) {
        $box.css('position', 'relative');
      }
      
      // fix the box height and stop slide oveflow showing
      $box.css({height: boxHeight, overflow: 'hidden'});
      $slides
        .css({ // ensure all slides are same size and positioned
            position: 'absolute'
          , top: 0
          , left: 0
          , width: width
          , height: height
        })
        .filter(':gt(0)').hide(); // hide all but first slide
    };

    // slide current out of view and next into view
    adaptor.transition = function (settings) {
      var fromTop = settings.reverse ? boxHeight : -boxHeight;
      
      settings.$nextSlide // animate into position
        .css({top: fromTop + 'px', display: 'block'})
        .animate({top: '0px'}, settings.speed);
      settings.$currSlide.animate( // animate out of position
          {top: (settings.reverse ? -boxHeight : boxHeight) + 'px'}
        , settings.speed
      );
    };

    adaptor.destroy = function ($box, settings) {
      $box.children().css(settings.origCSS.slides);
      $box.css(settings.origCSS.box);
    };

    return adaptor;

  }()));

}(window, jQuery || Zepto));
