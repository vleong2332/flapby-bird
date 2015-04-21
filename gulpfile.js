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
gulp.task('build', ['jshint', 'sass', 'html', 'scripts', 'vendor', 'styles', 'images', 'fonts']);


/* Development Tasks */
gulp.task('jshint', function() {
	return gulp.src('site/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});
gulp.task('concat', function() {
	return gulp.src(['site/js/main.js', 'site/js/plugins.js'])
		.pipe(concat('all.js'))
		.pipe(gulp.dest('site/js'));
});
gulp.task('sass', function() {
	return gulp.src('site/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('site/css'));
});
gulp.task('refresh', function() {
	livereload.reload();
});

/* WATCHING */
gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('site/js/*.js', ['jshint', 'concat', 'refresh']);
	gulp.watch('site/scss/*.scss', ['sass', 'refresh']);
	gulp.watch('site/scss/*/*', ['sass', 'refresh']);
	gulp.watch('site/*.html', ['refresh']);
});



/* Deployment Tasks */
gulp.task('html', function() {
	gulp.src('site/*.html')
		.pipe(minifyHTML())
		.pipe(gulp.dest('build/'));
});
gulp.task('scripts', function() {
	return browserify('./site/js/all.js')
		.bundle()
		.pipe(source('all.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest('build/js'));
});
gulp.task('styles', function() {
	gulp.src('site/css/*.css')
		.pipe(concat('main.css'))
		.pipe(uglifycss())
		.pipe(gulp.dest('build/css'));
});
gulp.task('images', function() {
	gulp.src('site/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('build/img'));
});
gulp.task('fonts', function() {
	gulp.src('site/fonts/*')
		.pipe(gulp.dest('build/fonts'));
});
gulp.task('vendor', function() {
	gulp.src('site/js/vendor/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('build/js/vendor'));
});