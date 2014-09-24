(function (w) {
  w.jqBoxSlider = w.jqBoxSlider || {};

  var sliders = []
    , throttle = 0;

  jqBoxSlider.responder = {
    watch: function ($slider) {
      sliders.push($slider);
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
    }
  };

  // XXX need to throttle the reset
  // XXX only listen when there are sliders in watch list
  $(w).on('resize', function () {
    clearTimeout(throttle);
    throttle = setTimeout(function () {
      $.each(sliders, function (i, $slider) {
        jqBoxSlider.resize($slider);
      });
    }, 500); // XXX
  });
}(this));
