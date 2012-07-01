;(function (w, $, undefined) {

  w.jqBoxSlider.registerAnimator('scrollVert,scrollHorz', (function () {

    var adaptor = {};

    // setup slide and box css
    adaptor.initialize = function ($box, $slides, settings) {
      var width = $box.width()
        , height = $slides.eq(0).height();

      // cache original css for reset and destroy
      adaptor._cacheOriginalCSS($box, 'box', settings);
      adaptor._cacheOriginalCSS($slides, 'slides', settings);
        
      if ('static inherit'.indexOf($box.css('position')) !== -1) {
        $box.css('position', 'relative');
      }
      
      // fix the box height and stop slide oveflow showing
      $box.css({height: height, overflow: 'hidden'});
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
      var offsets = calcPositions(
          settings.$box
        , settings.effect === 'scrollVert'
        , settings.reverse
      );
      
      settings.$nextSlide // animate into position
        .css($.extend(offsets.next, {display: 'block'}))
        .animate(offsets.anim, settings.speed);
      settings.$currSlide.animate( // animate out of position
          offsets.curr
        , settings.speed
      );
    };

    // reset the original css
    adaptor.destroy = function ($box, settings) {
      $box.children().css(settings.origCSS.slides);
      $box.css(settings.origCSS.box);
    };
    
    // gets the next and current slide positions for the animation
    var calcPositions = function ($box, isVert, reverse) {
      var offs = { curr: {}, next: {} };
      
      if (isVert) {
        offs.next.top = (reverse ? $box.height() : -$box.height()) + 'px';
        offs.curr.top = -parseInt(offs.next.top, 10) + 'px';
        offs.anim = {top: '0px'};
      }
      else {
        offs.next.left = (reverse ? -$box.width() : $box.width()) + 'px';
        offs.curr.left = -parseInt(offs.next.left, 10) + 'px';
        offs.anim = {left: '0px'};
      }
      
      return offs;
    };

    return adaptor;

  }()));

}(window, jQuery || Zepto));
