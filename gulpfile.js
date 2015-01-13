'use strict';

var gulp        = require('gulp');
var gulpTest    = require('./gulp/test');
var gulpBuild   = require('./gulp/build');


var config = {
    paths: {
        karmaConfigFile: __dirname + '/test/karma.conf.js',
        jsSources: [ './src/floating-label.module.js', './src/floating-label.directive.js' ],
        lessSources: [ './src/*.less' ],

        dist: './dist/',
        jsOutputFile: 'floating-label.js',
        cssOutputFile: 'floating-label.css'
    }
};

gulp.task('jshint', gulpTest.jsHintTask(config.paths.jsSources));

gulp.task('karma', gulpTest.karmaTask(config.paths.karmaConfigFile));

gulp.task('test', ['jshint', 'karma']);

gulp.task('scripts', ['test'], gulpBuild.scriptsTask(
    config.paths.jsSources,
    config.paths.jsOutputFile,
    config.paths.dist
));

gulp.task('styles', gulpBuild.stylesTask(
    config.paths.lessSources,
    config.paths.cssOutputFile,
    config.paths.dist
));

gulp.task('build', ['test', 'styles', 'scripts']);

gulp.task('default', ['build']);
