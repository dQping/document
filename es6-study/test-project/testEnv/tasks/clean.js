import gulp from 'gulp';
// del 用于删除
import del from 'del';
import args from './util/args';

// 清空文件
gulp.task('clean',()=>{
  return del(['server/public','server/views','server/css'])
})
