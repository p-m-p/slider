;(function () {

  window.Specs = (function () {

    var specs = {};

    specs.run = function ($box) {

      var env = jasmine.getEnv()
        , report = new jasmine.HtmlReporter;

      env.addReporter(report);

      describe('The showSlide method', function () {

        it('should not allow an out of upper bounds index', function () {
          $box.boxSlider('showSlide', 12);
          expect($box.data('bssettings').currIndex).not.toBe(12);
        });

        it('should not allow an out of lower bounds index', function () {
          $box.boxSlider('showSlide', -2);
          expect($box.data('bssettings').currIndex).not.toBe(-2);
        });

        it('should not allow a correct index', function () {
          $box.boxSlider('showSlide', 3);
          expect($box.data('bssettings').currIndex).not.toBe(3);
        });

      });

      describe('Option getter and setters', function () {

        it('should return the speed setting', function () {
          expect($box.boxSlider('option', 'speed')).toBe(800);
        });

        it('should update the speed setting', function () {
          $box.boxSlider('option', 'speed', 2000);
          expect($box.boxSlider('option', 'speed')).toBe(2000);
          expect($box.boxSlider('option', 'speed', 800)).toBe($box);
        });

      });

      describe('Play and pause toggle', function () {

        it('should stop playing when paused', function () {
          $box.boxSlider('playPause');
          expect($box.data('bssettings').autointv).toBeUndefined();
        });

        it('should start playing when played', function () {
          $box.boxSlider('playPause');
          expect(typeof $box.data('bssettings').autointv).toBe('number');
        });

      });

      describe('Before an after event callbacks', function () {

        it('should run the before event', function () {
          var complete = false;

          runs(function () {
            $box.boxSlider('option', 'onbefore', function ($s1, $s2) {
              complete = true;
            });
          });

          waitsFor(
              function () { return complete; }
            , 'Should have run onbefore'
            , 2500
          );
        });

        it('should run the after event', function () {
          var complete = false;

          runs(function () {
            $box.boxSlider('option', 'onafter', function ($s1, $s2) {
              complete = true;
            });
          });

          waitsFor(
              function () { return complete; }
            , 'Should have run onafter'
            , 2500
          );
        });

      });


      env.execute();

    };

    return specs;

  }());

}());
