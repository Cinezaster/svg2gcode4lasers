var drFrankenstyle = require('dr-frankenstyle');
var gulp = require('gulp');
 
gulp.task('css', function() {
  return drFrankenstyle()
    .pipe(gulp.dest('./src/less'));
});