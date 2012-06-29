;(function (w, $, undefined) {

  w.jqBoxSlider.registerAnimator('blind', (function () {

    var adaptor = {};

    adaptor.initialize = function ($box, $slides, settings) {
      var wrapper = document.createElement('div')
        , imgSrc = $slides.eq(0).find('img').attr('src')
        , blinds = []
        , blindSize = $box.width() / 10
        , fromLeft
        , i = 0;

      for (; i < 10; ++i) {
        fromLeft = (i * blindSize);
        blinds[i] = document.createElement('div');
        blinds[i].style.position = 'absolute';
        blinds[i].style.top = '0px';
        blinds[i].style.left = fromLeft + 'px';
        blinds[i].style.width = blindSize + 'px';
        blinds[i].style.height = '100%';
        blinds[i].style.backgroundImage = 'url(' + imgSrc + ')';
        blinds[i].style.backgroundPosition = -fromLeft + 'px 0px';
        wrapper.appendChild(blinds[i]);
      }
      
      $box.css('position', 'relative');
      $box.css('height', $slides.css('height'));
      $slides.css({zIndex: 1, position: 'absolute', top: 0, left: 0});
      wrapper.style.position = 'absolute';
      wrapper.style.top = '0px';
      wrapper.style.left = '0px';
      wrapper.style.width = '100%';
      wrapper.style.height = '100%';
      wrapper.style.zIndex = 2;
      $box.append(wrapper);

      settings.blinds = wrapper;
      settings._slideFilter = filterOutBlinds;

    };

    adaptor.transition = function (settings) {
      var intv = settings.speed / 10
        , height = settings.$box.height()
        , $blinds = $(settings.blinds).children();

      settings.$slides.hide();
      settings.$nextSlide.show();

      $blinds.each(function (i, el) {
        var delay = intv * i
          , $el = $(el); 

        (function () {
          setTimeout(function () {
            $el.animate({top: height}, settings.speed); 
          }, delay);
        }());
      });
      
      setTimeout(function () {
        $blinds.css({
            backgroundImage: 'url(' + settings.$nextSlide.find('img').attr('src') + ')'
          , top: 0
        });
      }, settings.speed * 2);
    };
    
    // filters the blinds wrapper out of the content slides
    var filterOutBlinds = function (index, settings) {
      return this.get(index) !== settings.blinds;
    };

    return adaptor;

  }()));

}(window, jQuery || Zepto));
