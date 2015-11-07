var gulp = require('gulp');
var babel = require('gulp-babel');
var fs = require('fs');
var del = require('del');
var vinyl = require('vinyl-paths');

gulp.task('clean', function () {
    return gulp.src('dist/*')
        .pipe(vinyl(del));
});

gulp.task('babel', ['clean'], function () {
    return gulp.src('src/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('exec', ['babel'], function () {
    var styles = require('./dist/index');
    var typography = styles.typography;
    var color = styles.color;
    var defaultTheme = styles.defaultTheme;
    var jsString =
        `exports.typography = JSON.parse('${JSON.stringify(typography)}');
exports.color = JSON.parse('${JSON.stringify(color)}');
exports.defaultTheme = JSON.parse('${JSON.stringify(defaultTheme)}');
`;
    fs.writeFileSync('./dist/styles.js', jsString)
});

gulp.task('default', ['babel', 'exec']);

gulp.watch('src/*.js', ['default']);