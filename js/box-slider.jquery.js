(function (w, $, undefined) {
  
  var methods = {};
  
  methods.init = function (opts) {
    
    return this.each(function () {
      
      var $this = $(this)
        , $next = $('.bs-next')
        , $prev = $('.bs-prev')
        , $slides = $this.find('.slide');

      $next.on('click', nextSlide);
      $prev.on('click', prevSlide);
      $next.add($prev).data('bsbox', $this);
      $this.data('bsangle', 0);
      $slides.eq(0).addClass('front');

    });
    
  };


  // private
  var nextSlide = function (ev) {
    
    var $box = $(this).data('bsbox')
      , $slides = $box.find('.slide')
      , data = $box.data()
      , angle = data.bsangle + 90
      , nextClass = nextSlideClass(angle)
      , currIndex = (data.bsfaceindex || 0);
      
    nextIndex = currIndex + 1 < $slides.length ? currIndex + 1 : 0;
    $slides.removeClass(
      "front back top bottom".replace(data.bscurrentface || "front", "")
    );
    $slides.eq(nextIndex).addClass(nextClass);
    
    $box.css(
        '-webkit-transform'
      , 'translateZ(-200px) rotateX(-' + angle + 'deg)'
    );
    
    if (angle === 360) {
      $box.css('-webkit-transform', 'translateZ(-200px)');
      angle = 0;
    }
    
    $box.data({
        bsangle: angle
      , bsfaceindex: nextIndex
      , bscurrentface: nextClass
    });
    ev.preventDefault();

  };


  var prevSlide = function (ev) {

  }
  
  
  var nextSlideClass = function (angle) {
    
    switch (angle) {
      case 360: return "front";
      case 270: return "bottom";
      case 180: return "back";
      case 90: return 'top';
    }
    
  };

  
  $.fn.boxSlider = function (m) {
    
    return methods.init.apply(this);
    
  };
  
  
}(window, jQuery));
