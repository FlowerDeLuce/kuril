var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    concat = require('gulp-concat'),
    brow_sync = require('browser-sync'),
    uglify = require('gulp-uglifyjs'),
    sourcemaps = require('gulp-sourcemaps'),
    cssnext = require('postcss-cssnext'),
    assets = require('postcss-assets'),
    precss = require('precss'),
    babel = require('gulp-babel');


gulp.task('post-css', function () { // post css
    var processors = [
        precss({
            parser: 'postcss-scss'
        }),
        cssnext,
        assets({
            loadPaths: ['dist/fonts/', 'dist/img/', 'dist/img_clients/'],
            basePath: 'dist/',
            relative: true
        })

    ];

    return gulp.src('dev/css/*{.css,.scss}')
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('brow_sync', function () { // browser sync
    brow_sync.init({
        server: 'dist'
    });
    brow_sync.watch('dist/**/*.*').on('change', brow_sync.reload);
});


gulp.task('watch', function () {
    gulp.watch('dev/css/*{.css,.scss}', ['post-css']);
    gulp.watch('dev/*.html', ['asset_html']);
    gulp.watch('dev/js/**/*.js', ['js']);
    gulp.watch('dev/**/*.{{.png,.jpg,.jpeg,.gif}}', ['accet_img'])

});

gulp.task('asset_html', function () {
    return gulp.src('dev/*.html')
        .pipe(gulp.dest('dist'));

});

gulp.task('asset_img', function () {
    return gulp.src('dev/**/*{.png,.jpg,.jpeg,.gif}')
        .pipe(gulp.dest('dist'));

});

gulp.task('asset_font', function () {
    return gulp.src('dev/font/**/*.*')
        .pipe(gulp.dest('dist/fonts'));

});


gulp.task('js', function () {
    return gulp.src('dev/js/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('bild.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));

});


gulp.task('default', ['asset_font', 'post-css', 'asset_html', 'js', 'asset_img', 'brow_sync', 'watch']);


