var gulp = require('gulp');
var config = require('../config').root;

gulp.task('markup', function() {
  return gulp.src(config.src + 'index.html')
    .pipe(gulp.dest(config.dest));
});