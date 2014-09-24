(function (w) {
  w.jqBoxSlider = w.jqBoxSlider || {};

  var sliders = []
    , throttle = 0
    , isWatching = false;

  jqBoxSlider.responder = {
    isWatching: function () {
      return isWatching;
    },

    watch: function ($slider) {
      sliders.push($slider);

      if (!isWatching) {
        $(w).on('resize', onResize);
      }
    },

    stopWatching: function ($slider) {
      var index = -1;

      $.each(sliders, function (i, $s) {
        if ($s === $slider) {
          index = i;
          return false;
        }
      });

      if (i !== -1) {
        sliders.splice(index, 1);
      }

      if (sliders.length === 0) {
        $(w).off('resize', onResize);
        isWatching = false;
      }
    }
  };

  var onResize = function () {
    clearTimeout(throttle);
    throttle = setTimeout(function () {
      $.each(sliders, function (i, $slider) {
        jqBoxSlider.resize($slider);
      });
    }, 20);
  };

}(this));
