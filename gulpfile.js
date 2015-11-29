//TODO add less support
//TODO add sass support
//TODO add jade support
//TODO add ziping of dist
//TODO add css inliner
//TODO add sourcemaps for minified files
//TODO add file size compare during minification process
//TODO add converting images to base64

var gulp = require('gulp');
var browserSync = require('browser-sync');
var del = require('del');
var concat = require('gulp-concat');

var paths = {
    scripts: ['./src/js/**/*.js'],
    styles: ['./src/css/**/*.css'],
    html: ['./src/*.html'],
    images: ['./src/img/**/*.*'],
    extras: ['./src/crossdomain.xml', './src/humans.txt', './src/robots.txt', './src/favicon.ico']
};

// static server
gulp.task('serve', function () {
    browserSync({
        logLevel: 'silent',
        port: 9000,
        server: {
            baseDir: 'src'
        }
    });
});

// changes of static files
gulp.task('watch', function () {
    gulp.watch([
        paths.html,
        paths.scripts,
        paths.styles,
        paths.images
    ]).on('change', browserSync.reload);
});

// changes of static css files for prefixes
gulp.task('watchcss', function () {
    gulp.watch([paths.styles], ['autoprefix']);
});

// autoprefixer
gulp.task('autoprefix', function () {
    var autoprefixer = require('gulp-autoprefixer');
    var browsersArr = ['last 2 version', '> 1%', 'ie > 8'];

    return gulp.src(paths.styles)
        .pipe(autoprefixer({
            browsers: browsersArr,
            cascade: false
        }))
        .pipe(gulp.dest('./src/css/'));
});

// compress images using tinypng.com
//TODO create api-key changing
gulp.task('tinypng', function () {
    var tinypng = require('gulp-tinypng');
    return gulp.src(paths.images)
        .pipe(tinypng('wglUzGPbSzt-a-DMRCwd5mztAaKJJwB9'))
        .pipe(gulp.dest('dist'));
});

// pack js and css in html files, minify all html/js/css
gulp.task('minifyall', function () {
    var useref = require('gulp-useref');
    var uglify = require('gulp-uglify');
    var minifyCss = require('gulp-minify-css');
    var minifyHtml = require('gulp-minify-html');
    var gulpIf = require('gulp-if');

    return gulp.src(paths.html)
        .pipe(useref())
        .pipe(gulpIf('*.html', minifyHtml()))
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});

// clean dist directory
gulp.task('clean', function () {
    del('dist');
});

gulp.task('clean-one', function () {
    del('dist/css');
    del('dist/js');
    del('dist/scripts');

    var minifyHtml = require('gulp-minify-html');

    return gulp.src('dist/*.html')
        .pipe(minifyHtml())
        .pipe(gulp.dest('dist'));
});

gulp.task('useref', function () {
    var useref = require('gulp-useref');

    var options = {
        compress: false
    };

    return gulp.src(paths.html)
        .pipe(useref()).pipe(gulp.dest('dist'));
});

gulp.task('onefile', ['useref'], function () {
    var inlinesource = require('gulp-inline-source');

    var options = {
        compress: true
    };

    return gulp.src('./dist/*.html')
        .pipe(inlinesource(options))
        .pipe(gulp.dest('./dist'));
});

// compress images
gulp.task('imagemin', function () {
    var imagemin = require('gulp-imagemin');
    var pngquant = require('imagemin-pngquant');

    return gulp.src('./src/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(imagemin({
            optimizationLevel: 7,
            progressive: true,
            interlaced: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist'));
});

// less watch and compile
gulp.task('less', function () {
    var less = require('gulp-less');
    gulp.src('./src/css/less/**/*.less')
        .pipe(less())
        .pipe(concat('main-less.css'))
        .pipe(gulp.dest('./src/css'));
});

// changes of in less files
gulp.task('watchless', function () {
    gulp.watch(['./src/css/less/**/*.less'], ['less']);
});

gulp.task('default', ['serve', 'watch', 'watchcss', 'watchless']);
gulp.task('production-one', ['clean', 'onefile', 'clean-one', 'tinypng']); //use with "inline" parameter in index.html
gulp.task('production-min', ['clean', 'minifyall', 'imagemin']); //or 'tinypng' for image compressing

// var paths = {
//  scripts: ['app/scripts/**/*.js'],
//  html: ['app/index.html', '!app/test.html'],
//  dist: ['dist/']
// };

// gulp.task('default', function(){
//  gulp.src(paths.scripts.concat(paths.html))
//  .pipe(gulp.dest(paths.dist));
// });
