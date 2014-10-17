;(function (w, $, undefined) {

  w.jqBoxSlider.registerAnimator('blindDown,blindLeft', (function () {
    var adaptor = {};

    // creates the blinds and sets up the content slider css
    adaptor.initialize = function ($box, $slides, settings) {
      settings.blindCount = settings.blindCount || 10;
      settings.blindSpeed = settings.speed;
      settings.blindintv = settings.speed / settings.blindCount;
      settings.speed += settings.blindintv * settings.blindCount; // XXX WAT??
      this._cacheOriginalCSS($box, 'box', settings);
      this._cacheOriginalCSS($slides, 'slides', settings);

      settings.$blinds = $('<div />').appendTo($box);
      adaptor.applyStyling($box, $slides, settings);
      settings._slideFilter = filterOutBlinds;
    };

    adaptor.applyStyling = function ($box, $slides, settings) {
      var imgSrc = slideImageURL($slides.eq(settings.bsfaceindex || 0))
        , $frag = $()
        , i = 0;

      settings.blindSize = $box.width() / settings.blindCount;

      for (; i < settings.blindCount; ++i) {
        $frag = $frag.add(createBlind(
            $slides
          , settings.blindSize
          , imgSrc
          , (i * settings.blindSize)
        ));
      }

      $box.css('position', 'relative');
      $box.css({height: $slides.innerHeight(), overflow: 'hidden'});
      $slides.css({zIndex: 1, position: 'absolute', top: 0, left: 0});
      settings.$blinds
        .css({
            position: 'absolute'
          , top: '0px'
          , left: '0px'
          , width: '100%'
          , height: '100%'
          , zIndex: 2
        })
        .html($frag);
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
        $blinds.css( resetCSS(settings) );
      }, settings.speed);
    };

    // removes the blinds and resets plugin settings and css
    adaptor.destroy = function ($box, settings) {
      settings.$blinds.remove();
      // XXX slide filter needs to be applied and slides should then be
      // passed into this function
      adaptor.reset($box, $box.children(), settings);

      settings.speed = settings.blindSpeed;
      delete settings.blindCount;
      delete settings.blindSpeed;
      delete settings.blindintv;
      delete settings.$blinds;
      delete settings.blindSize;
    };

    adaptor.reset = function ($box, $slides, settings) {
      var origCSS = settings.origCSS;

      if (origCSS) {
        settings.$blinds.empty();
        $box.css(origCSS.box);
        $slides.css(origCSS.slides);
      }
    };

    adaptor.resize = function ($box, $slides, settings) {
      adaptor.reset($box, $slides, settings);

      setTimeout(function () {
        adaptor.applyStyling($box, $slides, settings);
      }, 10);
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

    var createBlind = function ($slides, width, src, leftPos) {
      var boxWidth = $slides.innerWidth()
        , boxHeight = $slides.innerHeight();

      return $(document.createElement('div')).css({
          position: 'absolute'
        , top: '0px'
        , left: leftPos + 'px'
        , width: width + 'px'
        , height: '100%'
        , backgroundImage: 'url(' + src + ')'
        , backgroundPosition: -leftPos + 'px 0px'
        , backgroundSize: boxWidth + 'px '  + boxHeight + 'px'
      });
    };

    return adaptor;
  }()));

}(window, jQuery || Zepto));
