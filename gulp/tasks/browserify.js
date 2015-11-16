var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var config = require('../config').browserify;
var notify = require("gulp-notify");

gulp.task('browserify', function () {
    return browserify(config.src + 'app.jsx',{debug: true})
        .transform(babelify.configure({stage: 0}))
        .bundle()
        .on('error', handleErrors)
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.dest))
        .on('end', reportFinished);
});

function handleErrors () {
	var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
}

var reportFinished = function() {
	
}