var gulp   = require('gulp'),
	uglify = require('gulp-uglify');

gulp.task('default', function() {
	// Place code for your default task here
	gulp.src('site/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('site/minjs'));
});