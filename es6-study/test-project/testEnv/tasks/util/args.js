// 处理命令行参数
import yargs from 'yargs';  

const args = yargs
  .option('production', {
      // 是否是boolean类型
      boolean: true, 
      // 默认值
      default: false,
      // 生产环境压缩js代码
      describe: 'min all scripts'  
  })
  .option('watch', {
    boolean: true,
    default: false,
    // 监听所有文件的改动
    describe: 'watch all files'
  })
  .option('verbose', {
      // verbose 是否详细输出命令行执行的日志
      boolean: true,
      default: false,
      describe: 'log'
  })
  .option('sourcemaps', {
      // 强制生成文件映射
    describe: 'force the creation of sourcemaps'
  })
  .option('port', {
      // 服务器端口
      string: true,
      default: 3000,
      describe: 'server port'
  })
  // 对输入的命令行内容以字符串进行解析
  .argv
  
  export default args;