;(function (w, $, undefined) {
  'use strict';

  w.jqBoxSlider.registerAnimator('tile3d,tile', (function () {
    var adaptor = {}
      , supports3d = true
      , vendorPrefix = '';

    adaptor.configure = function (can3D, prefix) {
      supports3d = can3D;
      vendorPrefix = prefix;
    };

    adaptor.initialize = function ($box, $slides, settings) {
      // cache css and setup tile wrapper
      this._cacheOriginalCSS($box, 'box', settings);

      settings.tileGrid = this.calculateGrid($box, $slides, settings);
      settings.$tileWrapper = $('<div />');
      settings._slideFilter = function (index, settings) {
        return this.get(index) !== settings.$tileWrapper.get(0);
      }

      $box.append(settings.$tileWrapper);
      adaptor.applyStyling($box, $slides, settings);
    };

    adaptor.calculateGrid = function ($box, $slides, settings) {
      var height = $slides.first().outerHeight()
        , rows = (settings.tileRows || 8)
        , side = height / rows
        , cols = Math.ceil($box.width() / side);

      return {
          cols: cols
        , rows: rows
        , sideLength: side
        , height: height
      };
    };

    adaptor.applyStyling = function ($box, $slides, settings) {
      var imgURL = slideImageURL($slides.eq(settings.bsfaceindex || 0))
        , $frag = $()
        , fromLeft = 0
        , fromTop = 0
        , i = 0
        , j = 0;

      if ('fixed absolute relative'.indexOf($box.css('position')) === -1) {
        $box.css('position', 'relative');
      }

      $box.css({height: settings.tileGrid.height + 'px', overflow: 'hidden'});
      settings.$tileWrapper.css({
          position: 'absolute'
        , top: 0
        , left: 0
        , width: '100%'
        , height: '100%'
      });
      $slides.hide();

      // set up the tile grid with background images
      for (; i < settings.tileGrid.rows; ++i) {
        fromTop = i * settings.tileGrid.sideLength;

        for (j = 0; j < settings.tileGrid.cols; ++j) {
          fromLeft = j * settings.tileGrid.sideLength;
          $frag = $frag.add(createTile({
              fromTop: fromTop
            , fromLeft: j * settings.tileGrid.sideLength
            , imgURL: imgURL
            , side: settings.tileGrid.sideLength
            , supports3d: supports3d && settings.effect === 'tile3d'
            , boxWidth: $box.innerWidth()
            , boxHeight: $box.innerHeight()
          }));
        }
      }

      settings.$tileWrapper.html($frag);
    };

    adaptor.transition = function (settings) {
      var $tiles = settings.$tileWrapper.find('.bs-tile')
        , rowIntv = settings.rowOffset || 100
        , tileIntv = (
            (settings.speed - rowIntv * (settings.tileGrid.rows - 1)) /
            settings.tileGrid.cols
          )
        , imgSrc = slideImageURL(settings.$nextSlide)
        , nextFace = settings.nextFace || 'back'
        , faceClass = '.bs-tile-face-' + nextFace
        , tileSettings = {}
        , i = 0
        , angle;

      // select the correct face to flip
      if (nextFace === 'back') {
        tileSettings.nextFace = 'front';
        angle = 180;
      }
      else {
        tileSettings.nextFace = 'back';
        angle = 0;
      }

      $tiles.find(faceClass).css('background-image', 'url(' + imgSrc + ')');

      // first run through each row and set a timeout to offset the start of
      // that rows tiles animating
      for (; i < settings.tileGrid.rows; ++i) {
        (function () {
          var j = i * settings.tileGrid.cols
            , rowEnd = j + settings.tileGrid.cols
            , rowTimeout = i * rowIntv
            , timerIndex = 0;

          setTimeout(function () {
            // animate each tile in the current row
            for (; j < rowEnd; ++j) {
              (function () {
                var tileTimeout = timerIndex * tileIntv
                  , $tile = $tiles.eq(j);

                setTimeout(function () {
                  if (supports3d && settings.effect === 'tile3d') {
                    $tile.css(
                        vendorPrefix + 'transform'
                      , 'rotate3d(0,1,0,' + angle + 'deg)'
                    );
                  }
                  else {
                    $tile
                      .find('.bs-tile-face-' + tileSettings.nextFace)
                      .fadeOut(100, function () {
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

      return tileSettings;
    };

    adaptor.reset = function ($box, settings) {
      $box.children().show();

      if (settings.origCSS) {
        $box.css(settings.origCSS.box);
      }
    };

    // reset effect css and remove tile grid
    adaptor.destroy = function ($box, settings) {
      this.reset($box, settings);
      settings.$tileWrapper.remove();

      delete settings.nextface;
      delete settings.tileGrid;
      delete settings.$tileWrapper;
      delete settings._slideFilter;
    };

    adaptor.resize = function ($box, $slides, settings) {
      this.reset($box, settings);
      settings.tileGrid = this.calculateGrid($box, $slides, settings);
      delete settings.nextface;
      this.applyStyling($box, $slides, settings);
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
        .css({
            width: opts.side
          , height: opts.side
        })
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
          , backgroundSize: opts.boxWidth + 'px ' + opts.boxHeight + 'px'
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
