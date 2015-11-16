/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

var gulp  = require('gulp');
var config= require('../config');

gulp.task('watch', ['browserSync'], function() {
  gulp.watch(config.less.src + '*.less', ['less']);
  gulp.watch(config.root.src + '*.html', ['markup']);
  gulp.watch([config.browserify.src + '*.jsx', config.browserify.src + '/**/*.jsx'], ['build']);
});
