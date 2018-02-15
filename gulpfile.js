"use strict";

//******* DEPENDENCIES *******//

const gulp     = require('gulp');
const uglify   = require('gulp-uglify');
const cssmin   = require('gulp-cssmin');
const imagemin = require('gulp-imagemin');
const concat   = require('gulp-concat');
const maps     = require('gulp-sourcemaps');
const sass     = require('gulp-sass');
const rename   = require('gulp-rename');
const del      = require('del');
const livereload = require('gulp-livereload');
const connect = require('gulp-connect');
const browserSync = require('browser-sync').create();
const runSeq = require('run-sequence').use(gulp);

//******** JS *******//

gulp.task('concatScripts', function(){
  return gulp.src(['./js/circle/*.js', './js/global.js'])
        .pipe(concat('./all.js'))
        .pipe(gulp.dest('./js'))
});

gulp.task('scripts', ['concatScripts'], function(){
  return gulp.src('./js/all.js')
        .pipe(maps.init())
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('./dist/scripts'))
});

//******** CSS *******//

gulp.task('compileSass', function(){
  return gulp.src('./sass/global.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'))

})

gulp.task('styles', ['compileSass'], function(){
  return gulp.src('./css/global.css')
        .pipe(maps.init())
        .pipe(cssmin())
        .pipe(rename('all.min.css'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('./dist/styles'))
        .pipe(browserSync.stream())
});


//****** IMAGES ******//

gulp.task('images', function(){
  return gulp.src(['./images/*.jpg', './images/*.png'])
         .pipe(imagemin())
         .pipe(gulp.dest('./dist/content'))
});


//****** INDEX ******//

gulp.task('index', function(){
  return gulp.src('index.html')
         .pipe(gulp.dest('./dist'))
})


//******* CLEAN *****//

gulp.task('clean', function(){
  del('dist/*');
});


//****** BUILD ******//

gulp.task('build',['clean'], function(){
  return runSeq('clean',['scripts', 'styles', 'images']);
})

//****** WATCH & SERVE *******//

gulp.task('default', function(){
  gulp.start(['build']);
  browserSync.init({ server: { baseDir: "./" } });
  gulp.watch('./sass/**/*.scss', ['styles']);
  connect.server({port:3000});
})
