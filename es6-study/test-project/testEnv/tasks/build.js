import gulp from 'gulp';
// gulp-sequence 用于规定处理任务的顺序
import gulpSequence from 'gulp-sequence';

// ['browser','serve'] server 一定要放在最后执行
gulp.task('build',gulpSequence('clean','css','pages','scripts',['browser','serve']));
