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
      var rows = (settings.tileRows || 5)
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
          $wrapper.append(createTile({
              fromTop: fromTop
            , fromLeft: j * side
            , imgURL: imgURL 
            , side: side
          }));
        }
      }

      $wrapper.css({position: 'absolute', top: 0, left: 0});
      $box.css('position', 'relative').append($wrapper);
      $slides.hide();
      settings.$tileWrapper = $wrapper;
      settings.nextFace = 'back';
    };

    adaptor.reset = function ($box, settings) {};

    adaptor.transition = function (settings) {
      var $tiles = settings.$tileWrapper.find('.bs-tile')
        , intv = 20
        , imgSrc = slideImageURL(settings.$nextSlide)
        , faceClass = '.bs-tile-face-' + settings.nextFace
        , startat = 0;

      //if (settings.nextFace === 'back') {
      //  $tiles.css(vendorPrefix + 'transform', 'rotate3d(0,1,0,0deg)');
      //  startat = 150;
      //}
      
      //setTimeout(function () {
        $tiles.each(function (i, tile) {
          (function () {
            var to = i * intv
              , $tile = $(tile);

            $tile.find(faceClass).css('background-image', 'url(' + imgSrc + ')');
            setTimeout(function () {
              $tile.css(vendorPrefix + 'transform', 'rotate3d(0,1,0,180deg)');
            }, to);
          }());
        });
      //}, startat);

      settings.nextFace = settings.nextFace === 'back' ? 'front' : 'back';
    };

    adaptor.destroy = function ($box, settings) {};

    // locate the slides image and get it's url
    var slideImageURL = function ($slide) {
      return $slide.attr('src') || $slide.find('img').attr('src');
    };

    // creates a tile section
    var createTile = function (opts) {
      var $tileHolder = $(document.createElement('div'))
        , $tile = $(document.createElement('div'))
        , $front = $(document.createElement('div'))
        , back = document.createElement('div'); 

      $tileHolder
        .css({
            position: 'absolute'
          , top: opts.fromTop
          , left: opts.fromLeft
          , width: opts.side
          , height: opts.side
        })
        .css(vendorPrefix + 'perspective', 400);

      $tile
        .addClass('bs-tile')
        .css({width: opts.side, height: opts.side})
        .css(vendorPrefix + 'transform-style', 'preserve-3d')
        .css(vendorPrefix + 'transition', vendorPrefix + 'transform .4s')
        .appendTo($tileHolder);

      back.style[vendorPrefix + 'transform'] = 'rotateY(180deg)';
      back.className = 'bs-tile-face-back';

      $front
        .addClass('bs-tile-face-front')
        .css('backgroundImage', 'url(' + opts.imgURL + ')')
        .add(back)
        .css({
            width: opts.side
          , height: opts.side
          , backgroundPosition: -opts.fromLeft + 'px ' + -opts.fromTop + 'px'
          , position: 'absolute'
          , top: 0
          , left: 0
        })
        .css(vendorPrefix + 'backface-visibility', 'hidden')
        .appendTo($tile);

      return $tileHolder;
    };

    return adaptor;

  }()));

}(window, jQuery || Zepto));
