;(function (w, $, undefined) {

  w.jqBoxSlider.registerAnimator('tile3d,tile', (function () {

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

      // set up the tile grid with background images
      for (; i < rows; ++i) {
        fromTop = i * side;

        for (j = 0; j < cols; ++j) {
          fromLeft = j * side;
          $wrapper.append(createTile({
              fromTop: fromTop
            , fromLeft: j * side
            , imgURL: imgURL
            , side: side
            , supports3d: supports3d && settings.effect === 'tile3d'
          }));
        }
      }

      if ('absolute, relative'.indexOf($box.css('position')) === -1) {
        $box.css('position', 'relative');
      }

      // cache css and setup tile wrapper
      this._cacheOriginalCSS($box, 'box', settings);
      $wrapper.css({position: 'absolute', top: 0, left: 0});
      $slides.hide();
      $box.append($wrapper);

      // cache effect settings for the transition
      settings.tileGrid = {x: cols, y: rows};
      settings.$tileWrapper = $wrapper;
      settings._slideFilter = function (index, settings) {
        return this.get(index) !== settings.$tileWrapper.get(0);
      }
    };

    adaptor.transition = function (settings) {
      var $tiles = settings.$tileWrapper.find('.bs-tile')
        , rowIntv = settings.rowOffset || 100
        , tileIntv = (
            (settings.speed - rowIntv * (settings.tileGrid.y - 1)) /
            settings.tileGrid.x
          )
        , imgSrc = slideImageURL(settings.$nextSlide)
        , nextFace = settings.nextFace || 'back'
        , faceClass = '.bs-tile-face-' + nextFace
        , ret = {}
        , i = 0
        , angle;

      // select the correct face to flip
      if (nextFace === 'back') {
        ret.nextFace = 'front';
        angle = 180;
      }
      else {
        ret.nextFace = 'back';
        angle = 0;
      }

      $tiles.find(faceClass).css('background-image', 'url(' + imgSrc + ')');
      // first run through each row and set a timeout to offset the start of
      // that rows tiles animating
      for (; i < settings.tileGrid.y; ++i) {
        (function () {
          var j = rowStart = i * settings.tileGrid.x
            , rowEnd = rowStart + settings.tileGrid.x
            , rowTimeout = i * rowIntv
            , timerIndex = 0;

          setTimeout(function () {
            // animate each tile in the current row
            for (; j < rowEnd; ++j) {
              (function () {
                var tileTimeout =  timerIndex * tileIntv
                  , $tile = $tiles.eq(j);

                setTimeout(function () {
                  if (supports3d && settings.effect === 'tile3d') {
                    $tile.css(
                        vendorPrefix + 'transform'
                      , 'rotate3d(0,1,0,' + angle + 'deg)'
                    );
                  }
                  else {
                    $tile.find('.bs-tile-face-' + ret.nextFace).fadeOut(100, function () {
                      $tile.find(faceClass).fadeIn(300);
                    });
                  }
                }, tileTimeout);
              }());

              timerIndex += 1;
            }
          }, rowTimeout);
        }());
      }

      return ret;
    };

    // reset effect css and remove tile grid
    adaptor.destroy = function ($box, settings) {
      settings.$tileWrapper.remove();
      // show the hidden tiles
      $box.children().show();

      if (settings.origCSS) {
        $box.css(settings.origCSS.box);
        delete settings.tileRows;
        delete settings.rowOffset;
        delete settings.tileGrid;
        delete settings.$tileWrapper;
        delete settings._slideFilter;
      }
    };

    // locate the slides image and get it's url
    var slideImageURL = function ($slide) {
      return $slide.attr('src') || $slide.find('img').attr('src');
    };

    // creates a tile section
    var createTile = function (opts) {
      var $tileHolder = $(document.createElement('div'))
        , $tile = $(document.createElement('div'))
        , $front = $(document.createElement('div'))
        , $back = $(document.createElement('div'));

      // All browser styling
      $tileHolder
        .css({
            position: 'absolute'
          , top: opts.fromTop
          , left: opts.fromLeft
          , width: opts.side
          , height: opts.side
        });

      $tile
        .addClass('bs-tile')
        .css({width: opts.side, height: opts.side})
        .appendTo($tileHolder);

      $back.addClass('bs-tile-face-back');

      $front
        .addClass('bs-tile-face-front')
        .css('backgroundImage', 'url(' + opts.imgURL + ')')
        .add($back)
        .css({
            width: opts.side
          , height: opts.side
          , backgroundPosition: -opts.fromLeft + 'px ' + -opts.fromTop + 'px'
          , position: 'absolute'
          , top: 0
          , left: 0
        })
        .appendTo($tile);

      // 3D and non supported styling
      if (opts.supports3d) {
        $tileHolder.css(vendorPrefix + 'perspective', 400);
        $tile
          .css(vendorPrefix + 'transform-style', 'preserve-3d')
          .css(vendorPrefix + 'transition', vendorPrefix + 'transform .4s');
        $front.add($back).css(vendorPrefix + 'backface-visibility', 'hidden');
        $back.css(vendorPrefix + 'transform', 'rotateY(180deg)');
      }
      else {
        $back.css('display', 'none');
      }

      return $tileHolder;
    };

    return adaptor;

  }()));

}(window, jQuery || Zepto));
