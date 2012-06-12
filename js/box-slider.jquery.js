(function (w, $, undefined) {

  // internals
  var methods = {} // plugin's external method api
    // gets set to false during vendor detection if not supported
    , supports3D = true
    , slideAnimators = {}
    , defaults = {
        speed: 800
      , timeout: 5000
      , autoScroll: false
      , slideClass: '.slide'
      , controls: true
      , perspective: 1000
      , pauseOnHover: false
    };

  methods.init = function (opts) {
    var settings = $.extend({}, defaults, opts);

    if (typeof settings.slideAnimator !== 'object') {
      settings.slideAnimator = methods.slideAnimator('scrollVert3d');
    }

    return this.each(function () {
      var $this = $(this)
        , $slides = $this.find(settings.slideClass);

      // don't initialise if one or less slides found
      if ($slides.length <= 1) {
        return;
      }

      setupControls($this, settings);
      settings.slideAnimator.setupCss($this, $slides, settings);

      if (supports3D) { // ------------------------------------------------------- FIXME move to animation adaptor
        $slides.eq(0).css(
            vendorPrefix + 'transform'
          , 'rotate3d(0, 1, 0, 0deg) translate3d(0, 0, ' +
            settings.translateZ + 'px)'
        );
      }
      else {
        $slides.filter(':gt(0)').hide();
      }

      if (settings.autoScroll) {
        settings.autointv = setInterval(function () {
          showNextSlide($this);
        }, settings.timeout);

        if (settings.pauseOnHover) {
          $this.on('hover', pauseOnHover);
        }
      }

      $this.data('bssettings', $.extend(settings, {bsangle: 0}));
    });
  };

  // show the slide at the given index
  methods.showSlide = function (index) {
    index = parseInt(index, 10);
    return this.each(function () { showNextSlide($(this), index); });
  };

  // registers and configures a slide animator
  methods.registerAnimator = function (name, animator) {
    slideAnimators[name] = animator;
    if (typeof animator.configure === 'function') {
      animator.configure(supports3D, vendorPrefix);
    }
  };

  // returns a slide animation adaptor
  methods.slideAnimator = function (animator) {
    if (typeof slideAnimators[animator] === 'object') {
      return slideAnimators[animator];
    }
    throw new Error('The slide animator ' + animator + ' has not been registered');
  };


  // Event listeners for controls ----------------------------------------------

  // event listener for a next button
  var nextSlideListener = function (ev) {
    var $box = $(this).data('bsbox')

    // only go forward if not im motion
    if (!$box.hasClass('jbs-in-motion')) {
      showNextSlide($box, undefined, ev.data.reverse);
    }

    ev.preventDefault();
  };

  // event listener for play pause button
  var playPause = function (ev) {
    var $this = $(this)
      , $box = $this.data('bsbox');

    pauseOnHover.call($box, undefined);
    $this.toggleClass('paused');
    ev.preventDefault();
  };

  // event listener for pause on hover
  var pauseOnHover = function (ev) {
    var $box = $(this)
      , settings = $box.data('bssettings');

    if (settings.autointv != null) {
      settings.autointv = clearInterval(settings.autointv);
    }
    else {
      $box.data('bssettings', $.extend(settings, {
        autointv: setInterval(function () {
          showNextSlide($box);
        }, settings.timeout)
      }));
    }
  };


  // Internals -----------------------------------------------------------------

  // initialise controls for $box
  var setupControls = function ($box, settings) {
    var $controls = $();

    if (settings.next != null) {
      $controls = $controls.add($(settings.next).on(
          'click'
        , { reverse: false }
        , nextSlideListener
      ));
    }

    if (settings.prev != null) {
      $controls = $controls.add($(settings.prev).on(
          'click'
        , { reverse: true }
        , nextSlideListener
      ));
    }

    if (settings.pause != null) {
      $controls = $controls.add($(settings.pause).on('click', playPause));
    }

    $controls.data('bsbox', $box);
  };

  // moves the slider to the next or previous slide
  var showNextSlide = function ($box, index, reverse) {
    var settings = $box.data('bssettings')
      , $slides = $box.find(settings.slideClass)

    settings.slideAnimator.showNextSlide(settings, $box, $slides, index, reverse);
  };


  // sets the 3d css properties for the box and it's container
  var setupCss = function ($box, $slides, settings) {
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

  // set the correct vendor prefix for the css properties
  var vendorPrefix = (function () {
    var bs = document.body.style;

    if ('webkitTransition' in bs) {
      return '-webkit-';
    }

    if ('MozTransition' in bs) {
      return '-moz-';
    }

    supports3D = false;
    return '';
  }());


  $.fn.boxSlider = function (m) {
    if (typeof m === 'string' && typeof methods[m] === 'function') {
      return methods[m].apply(this, Array.prototype.slice.call(arguments, 1));
    }

    return methods.init.apply(this, arguments);
  };

}(window, jQuery));
