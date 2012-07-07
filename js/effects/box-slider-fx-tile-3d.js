;(function (w, $, undefined) {

  w.jqBoxSlider.registerAnimator('tile3d', (function () {

    var adaptor = {}
      , supports3d = true
      , vendorPrefix = '';

    adaptor.configure = function (can3D, prefix) {
      supports3d = can3D;
      vendorPrefix = prefix;
    };

    adaptor.initialize = function ($box, $slides, settings) {
      var rows = (settings.tileRows || 10)
        , side = $box.height() / rows
        , cols = Math.ceil($box.width() / side)
        , imgURL = slideImageURL($slides.eq(0))
        , $wrapper = $(document.createElement('div'))
        , fromLeft = 0
        , fromTop = 0
        , i = 0
        , j = 0;

      for (; i < rows; ++i) {
        fromTop = i * side;

        for (j = 0; j < cols; ++j) {
          fromLeft = j * side;

          $(document.createElement('div'))
            .css({
                position: 'absolute'
              , top: fromTop + 'px'
              , left: fromLeft + 'px'
              , width: side + 'px'
              , height: side + 'px'
              , backgroundImage: 'url(' + imgURL + ')'
              , backgroundPosition: -fromLeft + 'px ' + -fromTop + 'px'
            })
            .appendTo($wrapper);
        }
      }

      $wrapper.css({position: 'absolute', top: 0, left: 0});
      $box.css('position', 'relative').append($wrapper);
    };

    adaptor.reset = function ($box, settings) {};

    adaptor.transition = function (settings) {};

    adaptor.destroy = function ($box, settings) {};

    // locate the slides image and get it's url
    var slideImageURL = function ($slide) {
      return $slide.attr('src') || $slide.find('img').attr('src');
    }

    return adaptor;

  }()));

}(window, jQuery || Zepto));