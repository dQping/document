function setTimer(callback, timeout, param) {
    var args = Array.prototype.slice.call(arguments, 2);
    var _cb = function () {
        callback.apply(null, args);
    }
    return setInterval(_cb, timeout);
}