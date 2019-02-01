import gulp from 'gulp';
import gulpif from 'gulp-if';
// gulp-util 常用工具（函数集合）
import gutil from 'gulp-util';
import args from './util/args';

gulp.task('browser',(cb)=>{
  if(!args.watch) return cb();
  // 监听 app/**/*.js 文件变化的时候，启动 'scripts'任务
  gulp.watch('app/**/*.js',['scripts']);
  // 监听 app/**/*.ejs 文件变化的时候，启动'pages'任务
  gulp.watch('app/**/*.ejs',['pages']);
  // 监听 app/**/*.css 文件变化的时候，启动'css'任务
  gulp.watch('app/**/*.css',['css']);
});
