var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 计时器
 * 用于游戏中的按秒计时
 */
var Timer = (function (_super) {
    __extends(Timer, _super);
    /**
     * 创建一个计时器
     * @param beginTime 开始时间（以秒为单位）
     * @param endTime 结束时间（以秒为单位）
     * @param timerFunc 计时方法
     * @param thisObj this对象
     */
    function Timer(beginTime, endTime, decimalPoint, timerFunc, thisObj) {
        if (beginTime === void 0) { beginTime = 0; }
        if (endTime === void 0) { endTime = 0; }
        if (decimalPoint === void 0) { decimalPoint = 2; }
        if (timerFunc === void 0) { timerFunc = null; }
        if (thisObj === void 0) { thisObj = null; }
        var _this = 
        // 200毫秒执行一次
        _super.call(this, 50, -1) || this;
        _this.beginTimeStamp = 0;
        _this.beginTime = 0;
        _this.currentTime = 0;
        _this.timerFunc = null;
        _this.endTime = 0;
        _this.thisObj = null;
        _this.decimalPoint = 0;
        _this.currentTime = beginTime;
        _this.thisObj = thisObj;
        _this.timerFunc = timerFunc;
        _this.beginTime = beginTime;
        _this.endTime = endTime;
        _this.decimalPoint = decimalPoint;
        _this.addEventListener(egret.TimerEvent.TIMER, _this.timeTimerFunc, _this);
        return _this;
    }
    /**
     * 启动此计时器
     */
    Timer.prototype.start = function () {
        // 获取当前时间的时间戳
        this.beginTimeStamp = new Date().getTime();
        _super.prototype.start.call(this);
    };
    Timer.prototype.timeTimerFunc = function () {
        var durationTime = (Math.abs((this.beginTimeStamp - new Date().getTime()) / 1000));
        var time = "";
        if (this.endTime < 0) {
            time = durationTime.toString();
        }
        else if (this.beginTime > this.endTime) {
            time = (this.beginTime - durationTime).toString();
        }
        else {
            time = (this.endTime - durationTime).toString();
        }
        time = parseFloat(time).toFixed(this.decimalPoint);
        if (this.decimalPoint > 0 && time.substring(time.length - 1) == "0") {
            time = time.substring(0, time.length - 1) + "1";
        }
        if (this.currentTime.toString() != time.toString()) {
            this.currentTime = parseFloat(time);
            this.timerFunc.call(this.thisObj);
        }
        //console.log("当前计时时间：" + this.currentTime);
    };
    return Timer;
}(egret.Timer));
__reflect(Timer.prototype, "Timer");
