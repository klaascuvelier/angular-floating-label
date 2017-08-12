'use strict';

var gulp = require('gulp');
var karma = require('karma').server;
var eslint = require('gulp-eslint');

/**
 * Create function that will run karma on the source files
 * @param configFile
 * @returns {Function}
 */
function karmaTask(configFile) {
    return function (done) {
        karma.start({
            configFile: configFile,
            singleRun: true
        }, done);
    };
}

/**
 * Create function that will run jshint on the source files
 * @param sources
 * @returns {Function}
 */
function lintTask(sources) {
    return function () {
        return gulp
            .src(sources)
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
    };
}

// Export methods
module.exports = {
    karmaTask: karmaTask,
    lintTask: lintTask
};
