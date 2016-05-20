var gulp 			= require('gulp');
var clean 			= require('gulp-clean');
var concat 			= require('gulp-concat');
var ngdocs 			= require('gulp-ngdocs');
var uglify 			= require('gulp-uglify');
var runSequence 	= require('run-sequence');
var browserSync 	= require('browser-sync')
var reload			= browserSync.reload;
var inject 			= require('gulp-inject');
var rename			= require('gulp-rename');
var plumber			= require('gulp-plumber');
var del 			= require('del');
var header = require('gulp-header');
var pkg = require('./package.json');

var banner = ['/**',
  ' * Azgard <%= pkg.version %>',
  ' * (c) 2016 <%= pkg.author.name %>',
  ' * License: <%= pkg.license %>',
  ' */',
  ''].join('\n');


// Distribution Build Directory
var prodBuild = 'build/';
var devBuild  = 'dev/'	

// Vendor Scripts

var vendorJS = [
				'bower_components/angular/angular.min.js',
				'bower_components/angular-route/angular-route.min.js',
				];

// Application Scripts

var appJS = [
				'app/js/app.js',
				'app/js/modules.js',
				'app/js/config.js',
				'app/js/**/*.js',
				
			];




/// /////////////////////////////////
/// MAIN TASKS
/// ////////////////////////////////



/// /////////////////
/// JS TASKS
/// ////////////////

gulp.task('compile:app-js', function() {
	return gulp.src(appJS)
	.pipe(concat('azgard.app.js'))
	.pipe(gulp.dest('dev/js/'))
	.pipe(reload({stream:true}));
});

gulp.task('compile:vendor-js', function() {
	return gulp.src(vendorJS)
	.pipe(concat('azgard.vendor.js'))
	.pipe(gulp.dest('dev/js/'))
	.pipe(reload({stream:true}));
});



// Compile all dev tasks

gulp.task('compile:dev', ['compile:app-js', 'compile:vendor-js']);


gulp.task('browser-sync-dev', function(){
	browserSync({
		server:{
			baseDir: "./dev"
		}
	});
});

/// //////////////////////
/// Dependency Injection
/// //////////////////////

gulp.task('dev-inject', ['compile:dev'], function() {
	var target = gulp.src('./app/index.html');
	var appcss = gulp.src('./dev/style/style.css', {read: false});
	var vendorcss = gulp.src('./dev/style/*.vendor.css', {read: false});
	
	var vendorstreamJS = gulp.src(['./dev/**/*.vendor.js'], {read: false});
	var appstreamJS = gulp.src(['./dev/**/*.app.js'], {read: false});

	return target.pipe(inject(series(vendorcss, appcss), {ignorePath:'dev/',}))
	.pipe(inject(series(vendorstreamJS, appstreamJS), {ignorePath:'dev/',}))
	.pipe(gulp.dest('dev/'))
});

gulp.task('watch:dev', function(){

	gulp.watch('app/js/**/*.js',['compile:app-js']);

})

gulp.task('serve:dev', function(cb)  {
	runSequence('dev:cleanfolder', 'dev-inject', 'watch:dev', 'browser-sync-dev', cb);
});


gulp.task('dev:cleanfolder', function() {
	return del([
		devBuild + '**'
	]);
});

gulp.task('build:prod', function() {
	return gulp.src(appJS)
	.pipe(concat('azgard.js'))
	.pipe(gulp.dest('build/'))
	.pipe(plumber())
	.pipe(uglify())
	.pipe(header(banner, { pkg: pkg }))
    .pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest('build/'))
});


