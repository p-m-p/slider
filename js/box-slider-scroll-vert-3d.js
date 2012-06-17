;(function (w, $, undefined) {

  w.jqBoxSlider.registerAnimator('scrollVert3d', (function () {

    var api = {}
      , supports3D = false
      , vendorPrefix = '';

    // set local flags for 3D support and css vendor prefix
    api.configure = function (can3D, prefix) {
      supports3D = can3D;
      vendorPrefix = prefix;
    };

    // sets the box and slides initial state via css
    api.initialize = function ($box, $slides, settings) {
      var $parent = $box.parent()
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
      $box.css(positioning);

      // ensure parent is positioned to hold the box
      if ('static auto'.indexOf($parent.css('position')) !== -1) {
        $parent.css('position', 'relative');
      }

      if (supports3D) {
        // set the Z axis translation amount on the settings for this box
        settings.translateZ = height / 2;
        settings.bsangle = 0;

        // set the parent as the 3D viewport
        $parent.css(vendorPrefix + 'perspective', settings.perspective);
        $parent.css('overflow', 'visible');

        // apply transforms before transition to stop initial animation
        $box.css(vendorPrefix + 'transform-style', 'preserve-3d');
        $box.css(
            vendorPrefix + 'transform'
          , 'translate3d(0, 0, -' + settings.translateZ + 'px)'
        );

        // set front slide
        $slides.eq(0).css(
            vendorPrefix + 'transform'
          , 'rotate3d(0, 1, 0, 0deg) translate3d(0, 0, ' +
            settings.translateZ + 'px)'
        );

        // wait then apply transition for box rotation
        setTimeout(function () { api.reset($box, settings); }, 10);
      }
      else { // using fade hide all but first slide
        $slides.filter(':gt(0)').hide();
      }
    };

    // update the settings on an option change
    api.reset = function ($box, settings) {
      var speed = (settings.speed / 1000) + 's';

      $box.css(vendorPrefix + 'transition', vendorPrefix +'transform '+ speed);
    };

    // moves the slider to the next, prev or 'index' slide
    api.transition = function (settings) {
      var angle = settings.bsangle + (settings.reverse ? 90 : -90)

      if (!supports3D) { // no 3D support just use a basic fade transition
        settings.$slides.filter(function (index) {
          return settings.currIndex !== index; }
        ).hide();
        settings.$currSlide.fadeOut(s);
        settings.$nextSlide.fadeIn(s);
      }
      else {
        // correct angle if going from prev to next or vice versa
        if (angle === 0) {
          angle = settings.reverse ? 360 : -360;
        }

        settings.$slides // remove transform from all slides except current front face
          .filter(function (index) { return settings.currIndex !== index;})
          .css(vendorPrefix + 'transform', 'none')
          .css('display', 'none');
        settings.$nextSlide.css( // move next slide to the effective next face
            vendorPrefix + 'transform'
          , rotation(angle) + ' translate3d(0, 0,' + settings.translateZ + 'px)'
        ).css('display', 'block');

        settings.$box.css( // rotate the box to show next face
            vendorPrefix + 'transform'
          , 'translate3d(0, 0, -' + settings.translateZ +
            'px) rotate3d(1, 0, 0, ' + angle + 'deg)'
        );

        // the box has gone full circle so start again from 0deg
        if (Math.abs(angle) === 360) {
          settings.$box.css(
              vendorPrefix + 'transform'
            , 'translate3d(0, 0, -' + settings.translateZ + 'px)'
          );
          angle = 0;
        }
        
        return {bsangle: angle};
      }
    };

    // returns the correct face rotation based on the box's rotated angle
    var rotation = function (angle) {
      switch (angle) {
        case 360: case -360: return 'rotate3d(0, 1, 0, 0deg)'; // front
        case 90:  case -270: return 'rotate3d(1, 0, 0, -90deg)'; // bottom
        case 180: case -180: return 'rotate3d(1, 0, 0, 180deg)'; // back
        case 270: case -90:  return 'rotate3d(1, 0, 0, 90deg)'; // top
      }
    };

    return api;

  }()));

}(window, jQuery || Zepto));
