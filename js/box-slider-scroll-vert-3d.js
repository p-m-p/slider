;(function (w, $, undefined) {


  $.fn.boxSlider('registerAnimator', 'scrollVert3d', (function () {

    var api = {}
      , supports3D = false
      , vendorPrefix = '';


    api.configure = function (threeD, prefix) {
      supports3D = threeD;
      vendorPrefix = prefix;
    };

    api.setupCss = function ($box, $slides, settings) {
      var speed = (settings.speed / 1000) + 's'
        , $parent = $box.parent()
        , width = $parent.innerWidth()
        , height = $parent.innerHeight()
        , positioning = {
            position: 'absolute'
          , top: 0
          , left: 0
          , width: width
          , height: height
        };

      $slides.css(positioning);

      // ensure parent is positioned to hold the box
      if ('static auto'.indexOf($parent.css('position')) !== -1) {
        $parent.css('position', 'relative');
      }
      $box.css(positioning);

      if (supports3D) {
        // set the Z axis translation amount on the settings for this box
        settings.translateZ = height / 2;

        // set the parent as the 3D viewport
        $parent.css(vendorPrefix + 'perspective', settings.perspective);
        $parent.css('overflow', 'visible');

        // apply transforms before transition to stop initial animation
        $box.css(vendorPrefix + 'transform-style', 'preserve-3d');
        $box.css(
            vendorPrefix + 'transform'
          , 'translate3d(0, 0, -' + settings.translateZ + 'px)'
        );

        // wait half a second then apply transition for box rotation
        setTimeout(function () {
          $box.css(
              vendorPrefix + 'transition'
            , vendorPrefix + 'transform ' + speed
          );
        }, 500);
      }
    };

    api.showNextSlide = function (settings, $box, $slides, index, reverse) {
      var angle = settings.bsangle + (reverse ? 90 : -90)
        , currIndex = settings.bsfaceindex || 0
        , nextIndex = index
        , $currSlide
        , $nextSlide;

      if ( // already on selected slide or incorrect index
        nextIndex === currIndex ||
        nextIndex >= $slides.length ||
        nextIndex < 0
      ) { return; }
      else if (nextIndex == null) { // came from next button click
        if (reverse) {
          nextIndex = currIndex - 1 < 0 ? $slides.length - 1 : currIndex - 1;
        }
        else {
          nextIndex = currIndex + 1 < $slides.length ? currIndex + 1 : 0;
        }
      }

      $currSlide = $slides.eq(currIndex);
      $nextSlide = $slides.eq(nextIndex);

      if (typeof settings.onbefore === 'function') {
        settings.onbefore.call($box, $currSlide, $nextSlide);
      }
      
      $box.addClass('jbs-in-motion'); // stops user clunking through faces ------- FIXME: queue user clicks and keep rotating the box

      if (!supports3D) { // no 3D support just use a basic fade transition
        $slides
          .filter(function (index) { return currIndex !== index;})
          .hide();
        $currSlide.fadeOut(settings.speed);
        $nextSlide.fadeIn(settings.speed);
      }
      else {
        // correct angle if going from prev to next or vice versa
        if (angle === 0) {
          angle = reverse ? 360 : -360;
        }

        $slides // remove transform from all slides except current front face
          .filter(function (index) { return currIndex !== index;})
          .css(vendorPrefix + 'transform', 'none')
          .css('display', 'none');
        $nextSlide.css( // move next slide to the effective next face
            vendorPrefix + 'transform'
          , rotation(angle) + ' translate3d(0, 0,' + settings.translateZ + 'px)'
        ).css('display', 'block');

        $box.css( // rotate the box to show next face
            vendorPrefix + 'transform'
          , 'translate3d(0, 0, -' + settings.translateZ +
            'px) rotateX(' + angle + 'deg)'
        );

        // the box has gone full circle so start again from 0deg
        if (Math.abs(angle) === 360) {
          $box.css(
              vendorPrefix + 'transform'
            , 'translate3d(0, 0, -' + settings.translateZ + 'px)'
          );
          angle = 0;
        }
      }

      setTimeout( // remove the active flag class once transition is complete
          function () { 
            $box.removeClass('jbs-in-motion'); 
            if (typeof settings.onafter === 'function') {
              settings.onafter.call($box, $currSlide, $nextSlide);
            }
          }
        , settings.speed
      );
      // cache settings for next transition
      $box.data('bssettings', $.extend(settings, {
          bsangle: angle
        , bsfaceindex: nextIndex
      }));
    };

    // returns the correct face rotation based on the box's rotated angle
    var rotation = function (angle) {
      switch (angle) {
        case 360:
        case -360: return 'rotate3d(0, 1, 0, 0deg)'; // front
        case 90:
        case -270: return 'rotate3d(1, 0, 0, -90deg)'; // bottom
        case 180:
        case -180: return 'rotate3d(1, 0, 0, 180deg)'; // back
        case 270:
        case -90:  return 'rotate3d(1, 0, 0, 90deg)'; // top
      }
    };

    return api;

  }()));

}(window, jQuery));
