/* global $ */
'use strict';

// Swab the deck!
gulp.task('clean', function() {
  return $.del.sync('dist/**/*');
});
