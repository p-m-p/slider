;(function (w, $, undefined) {

  w.jqBoxSlider.registerAnimator('blindDown,blindLeft', (function () {

    var adaptor = {};

    // creates the blinds and sets up the content slider css
    adaptor.initialize = function ($box, $slides, settings) {
      var $wrapper = $(document.createElement('div'))
        , imgSrc = slideImageURL($slides.eq(0))
        , fromLeft
        , i = 0;
        
      settings.blindCount || (settings.blindCount = 10);
      settings.blindSpeed = settings.speed;
      settings.blindintv = settings.speed / settings.blindCount;
      settings.speed += settings.blindintv * settings.blindCount;
      settings.blindSize = $box.width() / settings.blindCount;
      this._cacheOriginalCSS($box, 'box', settings);
      this._cacheOriginalCSS($slides, 'slides', settings);

      for (; i < settings.blindCount; ++i) {
        fromLeft = (i * settings.blindSize);
        $(document.createElement('div'))
          .css({
              position: 'absolute'
            , top: '0px'
            , left: fromLeft + 'px'
            , width: settings.blindSize + 'px'
            , height: '100%'
            , backgroundImage: 'url(' + imgSrc + ')'
            , backgroundPosition: -fromLeft + 'px 0px'
          })
          .appendTo($wrapper);
      }
      
      $box.css('position', 'relative');
      $box.css({height: $slides.css('height'), overflow: 'hidden'});
      $slides.css({zIndex: 1, position: 'absolute', top: 0, left: 0});
      $wrapper
        .css({
            position: 'absolute'
          , top: '0px'
          , left: '0px'
          , width: '100%'
          , height: '100%'
          , zIndex: 2
        })
        .appendTo($box);

      settings.$blinds = $wrapper;
      settings._slideFilter = filterOutBlinds;

    };

    // moves the next slide behind the wall of blinds then 
    // animates the binds out of view
    adaptor.transition = function (settings) {
      var height = settings.$box.height()
        , $blinds = settings.$blinds.children();

      settings.$slides.hide();
      settings.$nextSlide.show();

      $blinds.each(function (i, el) {(function () {
        var delay = settings.blindintv * i
          , $el = $(el);
          
        setTimeout(function () {
          $el.animate(animateCSS(settings), settings.blindSpeed);
        }, delay);
      }());});
      
      setTimeout(function () {
        $blinds.css(resetCSS(settings));
      }, settings.speed);
    };
    
    // removes the blinds and resets plugin settings and css
    adaptor.destroy = function ($box, settings) {
      settings.$blinds.remove();
      $box.css(settings.origCSS.box);
      $box.children().css(settings.origCSS.slides);
      
      settings.speed = settings.blindSpeed;
      delete settings.blindCount;
      delete settings.blindSpeed;
      delete settings.blindintv;
      delete settings.$blinds;
      delete settings.blindSize;
    };
    
    // filters the blinds wrapper out of the content slides
    var filterOutBlinds = function (index, settings) {
      return this.get(index) !== settings.$blinds.get(0);
    };
    
    // locate the slides image and get it's url
    var slideImageURL = function ($slide) {
      return $slide.attr('src') || $slide.find('img').attr('src');
    }
    
    // returns the animation css for the blind effec
    var animateCSS = function (settings) {
      switch (settings.effect) {
        case 'blindDown': return {top: '100%'};
        case 'blindLeft': return {width: '0px'};
      }
    };
    
    var resetCSS = function (settings) {
      var css = {backgroundImage: 'url('+slideImageURL(settings.$nextSlide)+')'};
      
      switch (settings.effect) {
        case 'blindDown': css.top = '0px'; break;
        case 'blindLeft': css.width = settings.blindSize; break;
      }
      
      return css;
    };

    return adaptor;

  }()));

}(window, jQuery || Zepto));
