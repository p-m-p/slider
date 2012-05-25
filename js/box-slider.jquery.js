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

      $slides.each(function (i, el) {

        var $slide = $(el);

        if (i > 1) {
          $slide.hide();
        }
        if (i === 0) {
          $slide.addClass('front');
          $this.data('bscurrent', $slide);
        }
        if (i === 1) {
          $slide.addClass('top');
        }

      });

    });
    
  };


  // private
  var nextSlide = function (ev) {
    
    var $box = $(this).data('bsbox')
      , angle = $box.data('bsangle') + 90; 
    $box.data('bsangle', angle);
    $box.css('-webkit-transform', 'translateZ(-200px) rotateX(-' + angle + 'deg)');
    ev.preventDefault();

  };


  var prevSlide = function (ev) {

  }

  
  $.fn.boxSlider = function (m) {
    
    return methods.init.apply(this);
    
  };
  
}(window, jQuery));

