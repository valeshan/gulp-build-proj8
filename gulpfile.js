"use strict";

//******* DEPENDENCIES *******//

const   gulp = require('gulp');
const uglify = require('gulp-uglify');
const   maps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const sass   = require('gulp-sass');
const rename = require('gulp-rename');
const cssmin = require('gulp-cssmin');
const del = require('del');
const imagemin = require('gulp-imagemin');


//******** JS *******//

gulp.task('concatScripts', function(){
  return gulp.src(['./js/circle/*.js', './js/global.js'])
        .pipe(maps.init())
        .pipe(concat('./all.js'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('./js'))
});

gulp.task('scripts', ['concatScripts'], function(){
  return gulp.src('./js/all.js')
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest('./dist/scripts'))
});

//******** CSS *******//

gulp.task('compileSass', function(){
  return gulp.src('./sass/global.scss')
        .pipe(maps.init())
        .pipe(sass())
        .pipe(maps.write('./'))
        .pipe(gulp.dest('./css'))
})

gulp.task('styles', ['compileSass'], function(){
  return gulp.src('./css/global.css')
        .pipe(cssmin())
        .pipe(rename('all.min.css'))
        .pipe(gulp.dest('./dist/styles'))
});

//****** IMAGES ******//

gulp.task('images', function(){
  return gulp.src(['./images/*.jpg', './images/*.png'])
         .pipe(imagemin())
         .pipe(gulp.dest('./dist/content'))
});


//******* CLEAN *****//

gulp.task('clean', function(){
  del('dist/*')
})

//****** BUILD ******//

gulp.task('build',['clean', 'scripts', 'styles', 'images'], function(){
  return gulp.src(["index.html", './css/global.css.map', './js/all.js.map'], {base: './'})
        .pipe(gulp.dest('dist'))
})

gulp.task('default', ['clean'], function(){
  gulp.start('build')
})
