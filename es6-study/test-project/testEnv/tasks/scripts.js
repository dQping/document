
import gulp from 'gulp';
// gulp-if 用于gulp语句中的if判断
import gulpif from 'gulp-if';
// gulp-concat 用于处理文件拼接
import concat from 'gulp-concat';
// webpack用于打包
import webpack from 'webpack';
// webpack-stream以文件流的形式处理
import gulpWebpack from 'webpack-stream';
// vinyl-named 用于对文件重命名做标志
import named from 'vinyl-named';
// gulp-livereload 用于热更新，文件修改后浏览器自动刷新
import livereload from 'gulp-livereload';
// gulp-plumber 用于处理文件信息流
import plumber from 'gulp-plumber';
// gulp-rename 用于对文件重命名
import rename from 'gulp-rename';
// gulp-uglify 处理压缩
import uglify from 'gulp-uglify';
// gulp-util 用于在命令行工具输出
import { log, colors } from 'gulp-util';
// args 用于对命令行参数进行解析
import args from './util/args';

// 对js进行处理
gulp.task('scripts', () => {
  return gulp.src(['app/js/index.js'])
    .pipe(plumber({
      errorHandle: function () {
        // 处理常规的错误逻辑
      }
    }))
    .pipe(named())  // 文件重命名
    .pipe(gulpWebpack({   // 使用babel-loader处理js
      module: {
        rules: [{
          test: /\.js$/,
          loader: 'babel-loader'
        }]
      }
    }), null, (err, stats) => {
      // 处理错误情况
      log(`Finished '${colors.cyan('script')}'`, stats.toString({
        chunks: false
      }))
    })
    .pipe(gulp.dest('server/public/js'))  // 指定编译文件生成路径
    .pipe(rename({
      // 备份并重命名编译后的文件
      basename: 'cp',
      extname: '.min.js'
    }))
    // 压缩备份文件
    .pipe(uglify({ compress: { properties: false }, output: { 'quote_keys': true } }))
    // 指定备份文件存放路径
    .pipe(gulp.dest('server/public/js'))
    // 监听文件
    .pipe(gulpif(args.watch, livereload()))
})
