'use strict'

const browserify = require('browserify')
const changed = require('gulp-changed')
const cleanCss = require('gulp-clean-css')
const concat = require('gulp-concat')
const dotenv = require('dotenv')
const gulp = require('gulp')
const htmlMin = require('gulp-htmlmin')
const runSequence = require('run-sequence')
const sass = require('gulp-sass')
const server = require('gulp-server-livereload')
const size = require('gulp-size')
const source = require('vinyl-source-stream')
const sourcemaps = require('gulp-sourcemaps')

dotenv.load({ silent: true })

const config = require('./config')

const buildFolder = './build/'
const scriptsFolder = './app/scripts/'
const stylesFolder = './app/styles/'
const stylesExtensions = '.@(sa|sc|c)ss'

const markup = {
  mainFile: './app/index.html',
  destFilename: 'index.html',
}

const scripts = {
  mainFile: scriptsFolder + 'index.jsx',
  watch: scriptsFolder + '**/*.js*',
  destFilename: 'app.js',
}

const styles = {
  sources: [
    stylesFolder + '**/*' + stylesExtensions,
  ],
  destFilename: 'styles.css',
}

const fonts = {
  sources: [
    './app/assets/fonts/**/*.ttf',
    './node_modules/font-awesome/fonts/*',
  ],
  destFolder: buildFolder + 'fonts/',
}

const images = {
  sources: [
    './app/assets/images/**/*.jpg',
    './app/assets/images/**/*.png',
    './app/assets/images/**/*.svg',
  ],
  destFolder: buildFolder + 'images/',
}

const sounds = {
  sources: './app/assets/sounds/**/*.mp3',
  destFolder: buildFolder + 'sounds/',
}

gulp.task('markup', function() {
  return gulp.src(markup.mainFile)
    .pipe(htmlMin({ collapseWhitespace: true }))
    .pipe(gulp.dest(buildFolder))
    .pipe(size({ title: 'html' }))
})

gulp.task('scripts', function() {
  return browserify({ debug: true })
    .add(scripts.mainFile)
    .transform('babelify', { presets: ['react', 'es2015'] })
    .transform('envify')
    .bundle()
    .pipe(source(scripts.destFilename))
    .pipe(gulp.dest(buildFolder))
    .pipe(size({ title: 'javascript' }))
})

gulp.task('styles', function() {
  let compileSass = sass()
    .on('error', sass.logError)

  return gulp.src(styles.sources)
    .pipe(sourcemaps.init())
    .pipe(compileSass)
    .pipe(cleanCss())
    .pipe(concat(styles.destFilename))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(buildFolder))
    .pipe(size({ title: 'css' }))
})

gulp.task('fonts', function() {
  return gulp.src(fonts.sources)
    .pipe(changed(fonts.destFolder))
    .pipe(gulp.dest(fonts.destFolder))
    .pipe(size({ title: 'fonts' }))
})

gulp.task('images', function() {
  return gulp.src(images.sources)
    .pipe(changed(images.destFolder))
    .pipe(gulp.dest(images.destFolder))
    .pipe(size({ title: 'images' }))
})

gulp.task('sounds', function() {
  return gulp.src(sounds.sources)
    .pipe(changed(sounds.destFolder))
    .pipe(gulp.dest(sounds.destFolder))
    .pipe(size({ title: 'sounds' }))
})

gulp.task('serve', function() {
  gulp.src(buildFolder)
    .pipe(server({
      port: config.server.port,
      fallback: markup.destFilename,
      livereload: true,
      open: true,
    }))
})

gulp.task('assets', ['markup', 'scripts', 'styles', 'fonts', 'images', 'sounds'])

gulp.task('watch-markup', gulp.watch.bind(gulp, markup.mainFile, ['markup']))
gulp.task('watch-scripts', gulp.watch.bind(gulp, scripts.watch, ['scripts']))
gulp.task('watch-styles', gulp.watch.bind(gulp, styles.sources, ['styles']))
gulp.task('watch-fonts', gulp.watch.bind(gulp, fonts.sources, ['fonts']))
gulp.task('watch-images', gulp.watch.bind(gulp, images.sources, ['images']))
gulp.task('watch-sounds', gulp.watch.bind(gulp, sounds.sources, ['sounds']))

gulp.task('watch', function(callback) {
  runSequence(['watch-scripts', 'watch-styles', 'watch-fonts', 'watch-images', 'watch-sounds'], callback)
})

gulp.task('default', function(callback) {
  runSequence('assets', 'serve', 'watch', callback)
})
