(function (w, $, undefined) {

  // internals
  var methods = {} // plugin's external method api
    // gets set to false during vendor detection if not supported
    , supports3D = true
    , defaults = {
        speed: 800
      , timeout: 5000
      , autoScroll: false
      , before: null
      , after: null
      , slideClass: '.slide'
      , controls: true
      , perspective: 1000
      , pauseOnHover: false
    };

  methods.init = function (opts) {
    var settings = $.extend({}, defaults, opts);

    return this.each(function () {
      var $this = $(this)
        , $slides = $this.find(settings.slideClass);

      setupControls($this, settings);
      $slides.css(setBoxCss($this, settings));
      $slides.eq(0).css(
          vendorPrefix + 'transform'
        , 'rotate3d(0, 1, 0, 0deg) translate3d(0, 0, ' +
          settings.translateZ + 'px)'
      );

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

  // event listener for a next button
  var nextSlideListener = function (ev) {
    var $box = $(this).data('bsbox')

    // only go forward if not im motion
    if (!$box.hasClass('jbs-in-motion')) {
      showNextSlide($box, undefined, ev.data.reverse);
    }

    ev.preventDefault();
  };

  var playPause = function (ev) {
    var $this = $(this)
      , $box = $this.data('bsbox');

    pauseOnHover.call($box, undefined);
    $this.toggleClass('paused');
    ev.preventDefault();
  };

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


  var showNextSlide = function ($box, index, reverse) {
    // ------------------------------------------------------------------------- TODO: check 3d is supported and if not fallback to fade transition
    var settings = $box.data('bssettings')
      , $slides = $box.find(settings.slideClass)
      , angle = settings.bsangle + (reverse ? 90 : -90)
      , currIndex = settings.bsfaceindex || 0
      , nextIndex = index;

    // correct angle if going from prev to next or vice versa
    if (angle === 0) {
      angle = reverse ? 360 : -360;
    }

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

    $slides // remove transform from all slides except current front face
      .filter(function (index) { return currIndex !== index;})
      .css(vendorPrefix + 'transform', 'none')
      .css('display', 'none');
    $slides.eq(nextIndex).css( // move next slide to the effective top face
        vendorPrefix + 'transform'
      , rotation(angle) + ' translate3d(0, 0,' + settings.translateZ + 'px)'
    ).css('display', 'block');
    $box.addClass('jbs-in-motion'); // stops user clunking through faces ------- FIXME: queue user clicks and keep rotating the box
    $box.css( // rotate the box to show next face
        vendorPrefix + 'transform'
      , 'translate3d(0, 0, -' + settings.translateZ +
        'px) rotateX(' + angle + 'deg)'
    );
    setTimeout( // remove the active flag class once transition is complete
        function () { $box.removeClass('jbs-in-motion'); }
      , settings.speed
    );

    // the box has gone full circle so start again from 0deg
    if (Math.abs(angle) === 360) {
      $box.css(
          vendorPrefix + 'transform'
        , 'translate3d(0, 0, -' + settings.translateZ + 'px)'
      );
      angle = 0;
    }

    // cache settings for next rotation
    $box.data('bssettings', $.extend(settings, {
        bsangle: angle
      , bsfaceindex: nextIndex
    }));
  };


  // sets the 3d css properties for the box and it's container
  var setBoxCss = function ($box, settings) {
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

    // set the Z axis translation amount on the settings for this box
    settings.translateZ = height / 2;

    // ensure parent is positioned to hold the box
    if ('static auto'.indexOf($parent.css('position')) !== -1) {
      $parent.css('position', 'relative');
    }
    $parent.css(vendorPrefix + 'perspective', settings.perspective);
    $parent.css('overflow', 'visible');

    // apply transforms before transition to stop initial animation
    $box.css(vendorPrefix + 'transform-style', 'preserve-3d');
    $box.css(
        vendorPrefix + 'transform'
      , 'translate3d(0, 0, -' + settings.translateZ + 'px)'
    );
    $box.css(positioning);
    // wait half a second then apply transition for box rotation
    setTimeout(function () {
      $box.css(
          vendorPrefix + 'transition'
        , vendorPrefix + 'transform ' + speed
      );
    }, 500);

    return positioning; // reuse this for the slides
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


  // set the correct vendor prefix for the css properties
  var vendorPrefix = (function () {
    var bs = document.body.style;
    //console.dir(bs);

    if ('webkitTransition' in bs) {
      return '-webkit-';
    }

    if ('MozTransition' in bs) {
      return '-moz-';
    }

    supports3D = false;
  }());


  $.fn.boxSlider = function (m) {
    if (typeof m === 'string' && typeof methods[m] === 'function') {
      return methods[m].apply(this, Array.prototype.slice.call(arguments, 1));
    }

    return methods.init.apply(this, arguments);
  };

}(window, jQuery));
