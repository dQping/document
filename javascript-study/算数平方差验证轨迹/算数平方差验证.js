
// 例如用于验证移动端滑动验证是否人为拖动
// 计算数组数据的算数平方差的平均数
function verify(arr) {
    // arr为拖动时y轴的移动距离
    var average = arr.reduce(sum) / arr.length;
    var deviations = arr.map(
      function (x) {
        return (x - average)
      }
    );
    var stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length);
    return (stddev !== 0 ? true : false) // 简单验证下拖动轨迹，为零时表示Y轴上下没有波动，可能非人为操作
  }