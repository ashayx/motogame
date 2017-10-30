/**
 * 计时器
 * 用于游戏中的按秒计时
 */
class Timer extends egret.Timer {
    private beginTimeStamp:number = 0;
    private beginTime:number = 0;
    public currentTime:number = 0;
    private timerFunc:Function = null;
    private endTime:number = 0;
    private thisObj:any = null;
    private  decimalPoint:number = 0;

    /**
     * 创建一个计时器
     * @param beginTime 开始时间（以秒为单位）
     * @param endTime 结束时间（以秒为单位）
     * @param timerFunc 计时方法
     * @param thisObj this对象
     */
    public constructor(beginTime:number = 0, endTime:number = 0, decimalPoint:number = 2, timerFunc:Function = null, thisObj:any = null) {
        // 200毫秒执行一次
        super(50, -1);

        this.currentTime = beginTime;
        this.thisObj = thisObj;
        this.timerFunc = timerFunc;
        this.beginTime = beginTime;
        this.endTime = endTime;
        this.decimalPoint = decimalPoint;
        this.addEventListener(egret.TimerEvent.TIMER, this.timeTimerFunc, this);
    }

    /**
     * 启动此计时器
     */
    public start() {
        // 获取当前时间的时间戳
        this.beginTimeStamp = new Date().getTime();
        super.start();
    }

    private timeTimerFunc():void {

        let durationTime:number = (Math.abs((this.beginTimeStamp - new Date().getTime()) / 1000));

        let time:string = "";
        if (this.endTime < 0) {
            time = durationTime.toString();
        } else if (this.beginTime > this.endTime) {
            time = (this.beginTime - durationTime).toString();
        } else {
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

    }

}