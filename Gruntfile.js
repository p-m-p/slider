module.exports = function (grunt) {
  grunt.initConfig({
    uglify: {
      all: {
        files: {
          'js/box-slider-all.jquery.min.js': [
              'js/box-slider.jquery.js'
            , 'js/effects/*'
          ]
        }
      },
      blinds: {
        files: {
          'js/box-slider-blinds.jquery.min.js': [
              'js/box-slider.jquery.js'
            , 'js/effects/box-slider-fx-blinds.js'
          ]
        }
      },
      fade: {
        files: {
          'js/box-slider-fade.jquery.min.js': [
              'js/box-slider.jquery.js'
            , 'js/effects/box-slider-fx-fade.js'
          ]
        }
      },
      scroll3d: {
        files: {
          'js/box-slider-scroll-3d.jquery.min.js': [
              'js/box-slider.jquery.js'
            , 'js/effects/box-slider-fx-scroll-3d.js'
          ]
        }
      },
      scroll: {
        files: {
          'js/box-slider-scroll.jquery.min.js': [
              'js/box-slider.jquery.js'
            , 'js/effects/box-slider-fx-scroll.js'
          ]
        }
      },
      tile: {
        files: {
          'js/box-slider-tile.jquery.min.js': [
              'js/box-slider.jquery.js'
            , 'js/effects/box-slider-fx-tile-3d.js'
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['uglify']);
};
