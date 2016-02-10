/**
 * Created by rayde on 1/12/2016.
 */

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var del = require('del');

var sassPaths = [
    'bower_components/foundation-sites/scss',
    'bower_components/motion-ui/src'
];

var reactPath = './static/js/app.js';

gulp.task('clean', function(done){
   del(['build'], done);
});

gulp.task('sass', function() {
    return gulp.src('static/scss/app.scss')
        .pipe(plugins.sass({
                includePaths: sassPaths
            })
            .on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest('static/build'));
});

gulp.task('react', function() {
    browserify(reactPath)
        .transform(reactify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('static/build'));
});

gulp.task('watch', function(){
    gulp.watch(['static/**/*.scss'], ['sass']);
    gulp.watch(['static/**/*.js', '!static/build/*.js'], ['react']);
});

gulp.task('default', ['watch', 'sass', 'react']);
