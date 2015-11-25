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

// static server
gulp.task('serve', function() {
    browserSync({
        logLevel: 'silent',
        port: 9000,
        server: {
            baseDir: 'src'
        }
    });
});

// changes of static files
gulp.task('watch', function() {
    gulp.watch([
        './src/*.html',
        './src/js/**/*.js',
        './src/css/**/*.css',
        './src/img/**/*.*'
    ]).on('change', browserSync.reload);
});

// changes of static css files for prefixes
gulp.task('watchcss', function() {
    gulp.watch([
        './src/css/**/*.css'
    ], ['autoprefix']);
});

// autoprefixer
gulp.task('autoprefix', function() {
    var autoprefixer = require('gulp-autoprefixer');
    var browsersArr = ['last 1 version', '> 1%', 'ie > 8'];

    return gulp.src('./src/css/**/*.css')
        .pipe(autoprefixer({
            browsers: browsersArr,
            cascade: false
        }))
        .pipe(gulp.dest('./src/css/'));
});

// compress images using tinypng.com
//TODO create api-key changing
gulp.task('tinypng', function() {
    var tinypng = require('gulp-tinypng');
    return gulp.src('./src/img/*')
        .pipe(tinypng('wglUzGPbSzt-a-DMRCwd5mztAaKJJwB9'))
        .pipe(gulp.dest('dist'));
});

// pack js and css in html files, minify all html/js/css
gulp.task('minifyall', function() {
    var useref = require('gulp-useref');
    var uglify = require('gulp-uglify');
    var minifyCss = require('gulp-minify-css');
    var minifyHtml = require('gulp-minify-html');
    var gulpIf = require('gulp-if');

    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.html', minifyHtml()))
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});

// clean dist directory
gulp.task('clean', function() {
    var del = require('del');
    del('dist');
})

gulp.task('clean-one', function() {
    var del = require('del');
    del('dist/css');
    del('dist/js');
    del('dist/scripts');

    var minifyHtml = require('gulp-minify-html');

    return gulp.src('dist/*.html')
        .pipe(minifyHtml())
        .pipe(gulp.dest('dist'));
})

gulp.task('useref', function() {
    var useref = require('gulp-useref');

    var options = {
        compress: false
    };

    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
})

gulp.task('onefile', ['useref'], function() {
    var del = require('del');

    var inlinesource = require('gulp-inline-source');

    var options = {
        compress: true
    };

    return gulp.src('./dist/*.html')
        .pipe(inlinesource(options))
        .pipe(gulp.dest('./dist'));
})

// compress images
gulp.task('imagemin', function() {
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

gulp.task('default', ['serve', 'watch', 'watchcss']);
gulp.task('production-one', ['clean', 'onefile', 'imagemin']);
gulp.task('production-min', ['clean', 'minifyall', 'imagemin']);
//or 'tinypng' for image compressing

// var paths = {
//  scripts: ['app/scripts/**/*.js'],
//  html: ['app/index.html', '!app/test.html'],
//  dist: ['dist/']
// };

// gulp.task('default', function(){
//  gulp.src(paths.scripts.concat(paths.html))
//  .pipe(gulp.dest(paths.dist));
// });

// var paths = {
//  scripts: ['scripts/**/*.js', '!scripts/libs/**/*.js'],
//  libs: ['scripts/libs/jquery/dist/jquery.js', 'scripts/libs/underscore/underscore.js', 'scripts/backbone/backbone.js'],
//  styles: ['styles/**/*.css'],
//  html: ['index.html', '404.html'],
//  images: ['images/**/*.png'],
//  extras: ['crossdomain.xml', 'humans.txt', 'manifest.appcache', 'robots.txt', 'favicon.ico'],
// };
