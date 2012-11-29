module.exports = function (grunt) {
  grunt.initConfig({
    min: {
      dist: {
        src: ['js/box-slider.jquery.js', 'js/effects/*'],
        dest: 'js/box-slider-all.jquery.min.js'
      }
    }
  });
};
