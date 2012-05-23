(function (w, $, undefined) {
  
  var methods = {};
  
  methods.init = function (opts) {
    
    return this.each(function () {
      
      $(this).addClass("show-top");
      
    });
    
  };
  
  $.fn.boxSlider = function (m) {
    
    return methods.init.apply(this);
    
  };
  
}(window, jQuery));

