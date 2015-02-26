var gulp = require('gulp'),
    slim = require('gulp-slim'),
    stylus = require('gulp-stylus'),
    coffee = require('gulp-coffee'),
    livereload = require('gulp-livereload'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    connect = require('connect'),
    serveStatic = require('serve-static'),
    nib = require('nib');


gulp.task('stylus', function() {
    gulp.src('./styl/*.styl')
    	.pipe(stylus({use: nib(), compress: true}))
	    .on('error', console.log)
	    .pipe(gulp.dest('./public/css/'))
	    .pipe(livereload());
});


gulp.task('slim', function(){
	gulp.src('./*.slim')
		.pipe(slim({pretty: true}))
		.on('error', console.log)
		.pipe(gulp.dest('./public/'))
		.pipe(livereload());
});

gulp.task('coffee',function(){
	gulp.src('./coffee/*.coffee')
		.pipe(coffee({bare: true}))
		.on('error', console.log)
	   .pipe(gulp.dest('./public/js'))
	   .pipe(livereload());
});

gulp.task('concat', function(){
  gulp.task('coffee');
	gulp.src('./public/js/*.js')
		.pipe(concat('scripts.js'))
    .pipe(gulp.dest('./public/min/'))
		.pipe(livereload());
  gulp.task('styl');
	gulp.src('./public/css/*.css')
		.pipe(concat('styles.css'))
    .pipe(gulp.dest('./public/min/'))
		.pipe(livereload());
});

gulp.task('imagemin',function(){
	 gulp.src('./img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/img/'));
});


gulp.task('server', function() {
	connect()
		.use(require('connect-livereload')())
		.use(serveStatic(__dirname + '/public'))
	  .listen('3333');

	console.log('Сервер работает по адресу http://localhost:3333');
});

gulp.task('watch', function(){
  livereload.listen();
	gulp.watch('./styl/*.styl',['stylus']);
	gulp.watch('./*.slim',['slim']);
	gulp.watch('./coffee/*.coffee',['coffee']);
	gulp.watch(['./public/js/*.js','./public/css/*.css'],['concat']);
	gulp.watch('./img/**/*',['imagemin']);
  gulp.start('server');
});

gulp.task('default',['watch','stylus','slim','coffee','concat','imagemin']);
