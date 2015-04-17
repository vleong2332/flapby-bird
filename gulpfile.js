var gulp       = require('gulp'),
	uglify     = require('gulp-uglify'),
	livereload = require('gulp-livereload'),
	jshint     = require('gulp-jshint'),
	sass       = require('gulp-sass'),
	imagemin   = require('gulp-imagemin'),
	bower      = require('gulp-bower'),
	concat     = require('gulp-concat'),
	connect    = require('gulp-connect'),
	minifyHTML = require('gulp-minify-html'),
	rename     = require('gulp-rename'),
	bourbon    = require('node-bourbon'),
	neat       = require('node-neat'),
	buffer     = require('vinyl-buffer'),
	source     = require('vinyl-source-stream'),
	browserify = require('browserify'),
	uglifycss  = require('gulp-uglifycss');


gulp.task('default', ['jshint', 'sass', 'watch']);

/* Development Tasks */
gulp.task('jshint', function() {
	return gulp.src('site/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});
gulp.task('sass', function() {
	return gulp.src('site/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('site/css'))
		.pipe(livereload());
});
gulp.task('watch', function() {
	gulp.watch('site/js/*.js', ['jshint']);
	gulp.watch('site/scss/*.scss', ['sass']);
});
gulp.task('livereload', function() {
	livereload.listen();
	livereload.changed('site/index.html');
});


/* Deployment Tasks */
gulp.task('build', ['jshint', 'sass', 'html', 'scripts', 'styles', 'images']);
gulp.task('html', function() {
	gulp.src('site/*.html')
		.pipe(minifyHTML())
		.pipe(gulp.dest('build/'));
});
gulp.task('scripts', function() {
	return browserify('./site/js/main.js')
		.bundle()
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest('build/js'));
});
gulp.task('styles', function() {
	gulp.src('site/css/*.css')
		.pipe(concat('styles.css'))
		.pipe(uglifycss())
		.pipe(gulp.dest('build/css'));
});
gulp.task('images', function() {
	gulp.src('site/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('build/img'));
});