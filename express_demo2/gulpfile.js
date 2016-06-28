var gulp = require('gulp'),
    pump = require('pump'),
    del = require('del'),
    gulpSequence = require('gulp-sequence'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    $ = gulpLoadPlugins();

gulp.task('clean', function (cb) {
    'use strict';
    log('clean dir ' + $.util.colors.blue('\'build\''));
    del('./build/', cb);
});

gulp.task('html', function (cb) {
    log('process html task');
    pump([
        gulp.src('./public/views/**/*.html'),
        $.htmlmin({collapseWhitespace: true}),
        gulp.dest('./build/src/views')
    ], cb);
});

gulp.task('lint', function (cb) {
    log('process lint task');
    pump([
        gulp.src('./public/js/**/*.js'),
        $.jshint(),
        $.jshint.reporter('default')
    ], cb);
});

gulp.task('optimize', function (cb) {
    log('process optimize task');

    pump([
        gulp.src("./public/index.html"),
        $.useref({searchPath: './public'}),
        $.if('*.js', $.ngAnnotate()),
        $.if('*.js', $.uglify()),
        $.if('*.css', $.cleanCss()),
        gulp.dest('./build/src')
    ], cb);
});

gulp.task('build', function (cb) {
    'use strict';
    log('process build task');
    gulpSequence('lint', ['html', 'optimize'])(cb);
});

gulp.task('start', ['lint'], function (cb) {
    $.nodemon({
        script: './bin/www',
        ext: 'js css',
        env: {
            'NODE_ENV': 'dev'
        }
    }).on('start', function () {
        log('start node server');
    })
});

gulp.task('product', ['build'], function (cb) {
    $.nodemon({
        script: './bin/www',
        ext: 'js css',
        delayTime: 1,
        env: {
            'NODE_ENV': 'build'
        }
    }).on('start', function () {
        log('start node server');
    }).on('stop', function () {
        log('server stopped')
    })
});


function log(msg) {
    'use strict';
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}