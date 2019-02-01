import gulp from 'gulp';
import gulpif from 'gulp-if';
// gulp-live-server 用于启动服务器
import liveserver from 'gulp-live-server';
import args from './util/args';

gulp.task('serve',(cb)=>{
  // 不是处于监听状态，执行回调并返回
  if(!args.watch) return cb();

  // 处于监听下，创建服务器
  // 在--harmony命令行下，去执行脚本 server/bin/www
  var server = liveserver.new(['--harmony','server/bin/www']);
  server.start();

  // 监听 js 和 ejs 的修改，做浏览器自动刷新
  gulp.watch(['server/public/**/*.js','server/views/**/*.ejs','server/css/**/*.css'],function(file){
    // 通知服务器做相应处理
    server.notify.apply(server,[file]);
  })

  // 监听需要重启服务器的文件，比如路由、入口文件
  gulp.watch(['server/routes/**/*.js','server/app.js'],function(){
    // 重启服务器
    server.start.bind(server)()
  });
})
