'use strict';

var gulp    = require('gulp');
var karma   = require('karma').server;
var jshint  = require('gulp-jshint');
var stylish = require('jshint-stylish');

/**
 * Create function that will run karma on the source files
 * @param configFile
 * @returns {Function}
 */
function karmaTask(configFile)
{
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
function jsHintTask(sources)
{
    return function () {
        return gulp
            .src(sources)
            .pipe(jshint())
            .pipe(jshint.reporter(stylish))
            .pipe(jshint.reporter('fail'));
    };
}

// Export methods
module.exports = {
    karmaTask: karmaTask,
    jsHintTask: jsHintTask
};