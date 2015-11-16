var gulp = require('gulp');
var less = require('gulp-less');
var config = require('../config').less;

gulp.task('less', function () {
	return gulp.src(config.src + 'main.less')
	.pipe(less())
	.pipe(gulp.dest(config.dest));
});