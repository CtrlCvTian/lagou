const gulp = require('gulp')

const server = require('gulp-webserver') //实时监听localhost

// const watch = require('gulp-watch')

const sass = require('gulp-sass')

const webpack = require('webpack-stream')

const proxy = require('http-proxy-middleware')

// gulp与webpack区别：gulp是一个自动化任务执行工具，webpack,模块打包工具

gulp.task('server', () => {
  return gulp.src('./dev')
    .pipe(
      server({
        host: 'localhost',
        port: 8080,
        livereload: true,
        directoryListing: {
          enable: true,
          path: './dev/html'
        },
        middleware: [
          proxy('/api', {
            target: 'http://localhost:3000',
            // changeOrigin: true
          })
        ]
      })
    )
})

gulp.task('scss', () => {
  return gulp.src('./src/styles/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dev/styles'))
})

// commonjs：JS模块化开发
gulp.task('js', () => {
  return gulp.src('./src/scripts/*.js')
    .pipe(
      webpack({
        // webpack v4 要求定义配置模式：development, production
        mode: 'development',
        //入口
        entry: './src/scripts/app.js', //规定了入口文件
        // 出口
        output: {
          filename: 'app.js'
        },
        // loader
        module: {
          rules: [
            {
              test: /\.html$/, //在scripts中凡是以html结尾的，都用string-loader加载器对html文件进行解析成字符串
              use: 'string-loader'
            }
          ]
        }
      })
    )
    .pipe(gulp.dest('./dev/scripts'))
})
//文件修改，就会进行重新编译放在dev文件夹中
gulp.task('watchother', () => {
  gulp.watch('./src/*.html', () => {
    gulp.start('copyhtml')
  })

  gulp.watch('./src/scripts/**/*', () => {
    gulp.start('js')
  })

  gulp.watch('./src/styles/**/*', () => {
    gulp.start('scss')
  })
})

gulp.task('copyhtml', () => {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest('./dev/'))
})

gulp.task('copylibs', () => {
  return gulp.src('./src/libs/**/*')
    .pipe(gulp.dest('./dev/libs/'))
})

gulp.task('copyassets', () => {
  return gulp.src('./src/static/**/*')
    .pipe(gulp.dest('./dev/static/'))
})

gulp.task('default', ['copyhtml', 'copylibs', 'copyassets', 'scss', 'js', 'server', 'watchother'], () => {
  console.log('server is running at localhost:8080.')
})