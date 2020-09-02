var uglifyjs = require('uglify-es'); // can be a git checkout
var gulp = require('gulp');                                     // or another module (such as `uglify-es` for ES6 support)
var composer = require('gulp-uglify/composer');
var pump = require('pump');
var zip = require('gulp-zip');
var gulpCopy = require('gulp-copy');
var sourceFiles = [
                      'app/*',
                   'appugly/*',
                   'audio/*',
                     'contentscripts/*',
                   'contentscriptsugly/*',
                   'css/*',
                   'dist/*',
                   'dist/*/*',
                   'fonts/*',
                   'fonts/*/*',
                   'html/*',
                   'images/*',
                   'images/*/*',
                        'js/*',
                   'jsugly/*',
                   'lib/*',
                   'lib/*/*',
                   'lib/*/*/*',
                   'manifest.json'                   
                ];
// var destination = 'D:\\Dropbox\\Dropbox\\MerchWizard Shared\\Apps\\KDP Wizard\\Live';
var destination = 'D:\\Dropbox\\Dropbox\\MerchWizard Shared\\Apps\\Infringinator\Test';
// var destination = 'D:\\Dropbox\\MerchWizard Shared\\Apps\\KDP Wizard\\Test';
 
var minify = composer(uglifyjs, console);
 
gulp.task('compress', function (cb) {
  // the same options as described above
  var options = {};

  // gulp.src(['js/*.js', '!js/richTextDescription.js', '!js/background.js']).pipe(gulp.dest('jsugly'));
  // gulp.src(['app/*.json']).pipe(gulp.dest('appugly'));
 
  pump([
      gulp.src('contentscripts/*.js'),
      minify(options),
      gulp.dest('contentscriptsugly')
    ],
  );

  pump([
    
    gulp.src('app/*.js'),
    minify(options),
    gulp.dest('appugly')
    ]
  );

  // pump([
  //   gulp.src(['js/richTextDescription.js', 'js/background.js']),
  //   minify(options),
  //   gulp.dest('jsugly')
  // ],
  // cb
  // );

});

gulp.task('zip', () =>
      gulp.src(['./**', 
              '!*.zip', 
              '!.chromestore/', 
              '!app/**', 
              '!app/',
              '!contentscripts/**', 
              '!contentscripts/', 
              '!js/**', 
              '!js/', 
              '!node_modules/**',
              '!node_modules/',
              '!.git/**',
              '!gulpfile.js',
              '!package-lock.json' ])
        .pipe(zip('Infringinator1.0.zip'))
        .pipe(gulp.dest('.chromestore'))
);

gulp.task('deploy', () =>
    gulp.src(sourceFiles)
        .pipe(gulpCopy(destination, { prefix: 0 }))
);
