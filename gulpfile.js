var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    reactify = require('reactify'),
    rename = require('gulp-rename'),
    paths = {
        scripts: 'app/**/*.{js,jsx}',
        images: 'images/*.{png,jpg,gif}',
        test: [
            'gulpfile.js', 'app/**/*.{jsx,js}'
        ]
    };

gulp.task('js', function() {
    gulp.src('./app/index.jsx')
        .pipe(browserify({
            debug: true,
            transform: ['reactify'],
            extensions: ['.js', '.jsx']
        }))
        .on('error', function (error) {
            console.log(error.toString());
            this.emit('end');
        })
        .pipe(rename('reader.min.js'))
        .pipe(gulp.dest('./assets/build'));
});

gulp.task('test', function () {
    gulp.src(paths.test)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['js']);
});

gulp.task('default', ['js']);