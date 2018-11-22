var syntax        = 'scss'; // Syntax: sass or scss;

var gulp          = require('gulp'),
		gutil         = require('gulp-util' ),
		sass          = require('gulp-sass'),
		browserSync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require("gulp-notify"),
		concatCss     = require('gulp-concat-css'),
		del 					= require('del'),
		runSequence 	= require('run-sequence'),
		babel 				= require('gulp-babel');

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		open: false, //without opening http://localhost:3000/
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('styles', function() {
	return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});

gulp.task('components_style', function() {
	return gulp.src([
		'app/components/animate.css/animate.min.css',
		'app/components/bootstrap/dist/css/bootstrap-reboot.min.css',
		'app/components/bootstrap/dist/css/bootstrap-grid.min.css',
		])
	.pipe(concatCss('components.css'))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});

gulp.task('js', function() {
	return gulp.src([
		'app/js/modules.js',
		'app/js/report-form.js',
		'app/js/utm_parameters.js',
		'app/js/common.js', // Always at the end
		])
	.pipe(concat('scripts.min.js'))
	.pipe(babel())
	.pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('app/scripts/'))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('components_script', function() {
	return gulp.src([
		'app/components/jquery/dist/jquery.min.js',
		'app/components/wow/dist/wow.min.js',
		])
	.pipe(concat('components.min.js'))
	.pipe(gulp.dest('app/scripts/'))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('phpmailer', () => {
    return gulp.src('vendor/phpmailer/phpmailer/src/**')
        .pipe(gulp.dest('app/libruaries/phpmailer/src/'));
});

gulp.task('clean', del.bind(null, ['app/css', 'app/scripts', 'app/images', 'app/libruaries', 'dist']));
gulp.task('extras', () => {
  return gulp.src([
    'app/**/*.*',
    '!app/scss/**/*.*',
    '!app/components/**/*.*',
    '!app/js/**/*.*',
    '!app/img/**/*.*',
    'app/*.php',
    'app/*.html',
    'app/*.**'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('watch', ['styles', 'components_style', 'js', 'components_script', 'phpmailer', 'browser-sync'], function() {
	gulp.watch('app/'+syntax+'/**/*.'+syntax+'', ['styles']);
	gulp.watch(['components/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/*.html', browserSync.reload)
});

gulp.task('default', ['watch']);

gulp.task('build', () => {
  return new Promise(resolve => {
    runSequence(['clean'], ['styles', 'components_style', 'js', 'components_script', 'phpmailer'], ['extras'], resolve);
  });
});
