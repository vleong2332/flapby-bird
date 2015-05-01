var gulp       = require('gulp'),
	bourbon    = require('node-bourbon'),
	bower      = require('gulp-bower'),
	browserify = require('browserify'),
	buffer     = require('vinyl-buffer'),
	concat     = require('gulp-concat'),
	connect    = require('gulp-connect'),
	jshint     = require('gulp-jshint'),
	imagemin   = require('gulp-imagemin'),
	livereload = require('gulp-livereload'),
	minifyHTML = require('gulp-minify-html'),
	neat       = require('node-neat'),
	rename     = require('gulp-rename'),
	sass       = require('gulp-sass'),
	source     = require('vinyl-source-stream'),
	uglify     = require('gulp-uglify'),
	uglifycss  = require('gulp-uglifycss');


gulp.task('default', ['watch']);
gulp.task('build', ['jshint', 'sass', 'html', 'scripts', 'vendor', 'styles', 'images', 'fonts']);

/* WATCHING */
gulp.task('watch', function() {
	livereload.listen();
	gulp.watch(['site/js/*.js', 'site/game/js/**/*'], ['jshint', 'game-scripts', 'concat', 'refresh']);
	gulp.watch(['site/scss/*.scss', 'site/scss/*/*', 'site/game/css/*.css'], ['sass', 'refresh']);
	gulp.watch(['site/*.html', 'site/game/*.html'], ['refresh']);
});


/* Development Tasks */
gulp.task('jshint', function() {
	return gulp.src(['site/js/*.js', 'site/game/js/**/*', '!site/game/js/bundled.js'])
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


/* Deployment Tasks */
gulp.task('html', function() {
	return gulp.src('site/*.html')
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
gulp.task('game-scripts', function() {
	return browserify('./site/game/js/main.js')
		.bundle()
		.pipe(source('bundled.js'))
		.pipe(buffer())
		.pipe(gulp.dest('./site/game/js'))
});
gulp.task('styles', function() {
	return gulp.src('site/css/*.css')
		.pipe(concat('main.css'))
		.pipe(uglifycss())
		.pipe(gulp.dest('build/css'));
});
gulp.task('images', function() {
	return gulp.src('site/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('build/img'));
});
gulp.task('fonts', function() {
	return gulp.src('site/fonts/*')
		.pipe(gulp.dest('build/fonts'));
});
gulp.task('vendor', function() {
	return gulp.src('site/js/vendor/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('build/js/vendor'));
});