var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');


// Set location for JS files
var jsFiles = ['*.js', 'src/**/*.js'];

// Check JS for errors
gulp.task('style', function() {
  return gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', {
      verbose: true
    }))
    .pipe(jscs());
});

// Inject CSS and JS
gulp.task('inject', function() {
  var wiredep = require('wiredep').stream;
  var inject = require('gulp-inject');
  var options = {
    bowerJson: require('./bower.json'),
    directory: './public/lib',
    ignorePath: '../../public'
  };

  var injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'], {read: false});
  var injectOptions = {
    ignorePath: '/public'
  };

  return gulp.src('./src/views/partials/*.ejs')
    .pipe(wiredep(options))
    .pipe(inject(injectSrc, injectOptions))
    .pipe(gulp.dest('./src/views/partials'));
});

gulp.task('serve', ['style', 'inject'], function() {
  var options = {
    script: 'app.js',
    delayTime: 1,
    env: {
      'PORT': 3000
    },
    watch: jsFiles
  };

  return nodemon(options)
    .on('restart', function(ev) {
      console.log('Restarting....');
    });
});
