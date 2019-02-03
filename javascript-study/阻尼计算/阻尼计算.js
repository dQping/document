/**
 * 设置阻尼计算
 * @param  {number} value 数值
 * @return {[number]}       计算值
 */
 function damping(value) {
    var step = [20, 40, 60, 80, 100];
    var rate = [0.5, 0.4, 0.3, 0.2, 0.1];

    var scaleedValue = value;
    var valueStepIndex = step.length;

    while (valueStepIndex--) {
        if (value > step[valueStepIndex]) {
            scaleedValue = (value - step[valueStepIndex]) * rate[valueStepIndex];
            for (var i = valueStepIndex; i > 0; i--) {
                scaleedValue += (step[i] - step[i - 1]) * rate[i - 1];
            }
            scaleedValue += step[0] * 1;
            break;
        }
    }

    return scaleedValue;
};