var gulp = require('gulp');
var del = require('del');
var config = require('../config').root;
 
gulp.task('clean', function () {
    return del([config.dest]);
});