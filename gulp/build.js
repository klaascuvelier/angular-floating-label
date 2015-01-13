'use strict';

var gulp            = require('gulp');
var concat          = require('gulp-concat');
var less            = require('gulp-less');
var autoprefixer    = require('gulp-autoprefixer');

/**
 * Creates function for gulp task which will concatenate js sources files into 1 dist file
 * @param sources
 * @param output
 * @param dist
 * @returns {Function}
 */
function scriptsTask(sources, output, dist)
{
    return function ()
    {
        return gulp
            .src(sources)
            .pipe(concat(output))
            .pipe(gulp.dest(dist));
    };
}

/**
 * Creates function for gulp task which will concatenate less files, compile them to css and prefix them
 * @param sources
 * @param output
 * @param dist
 * @returns {Function}
 */
function stylesTask(sources, output, dist)
{
    return function ()
    {
        return gulp
            .src(sources)
            .pipe(concat(output))
            .pipe(less())
            .pipe(autoprefixer('last 2 version', 'ie 9', 'ie 10', 'ie 11'))
            .pipe(gulp.dest(dist));
    };
}

module.exports = {
    scriptsTask: scriptsTask,
    stylesTask: stylesTask
};