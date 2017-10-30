class CommonUtil {
    public static ISDEBUGGING: boolean = false;

    public static buttonTap(btnObj: egret.DisplayObject, callback: Function, thisObj?: any, param?: any[]): void {
        if (RES.hasRes("buttonSound"))
            playSound("buttonSound");

        btnObj.touchEnabled = false;
        egret.Tween.removeTweens(btnObj);
        egret.Tween.get(btnObj)
            .to({"scaleX": btnObj.scaleX - .2, "scaleY": btnObj.scaleY - .2}, 100)
            .to({"scaleX": btnObj.scaleX, "scaleY": btnObj.scaleY}, 200)
            .call(() => {
                if (param)
                    callback.apply(thisObj, param);
                else
                    callback();
            })
    }

    public static isExcellent(): boolean {
        // console.log(egret.Capabilities.os);

        if ((egret.Capabilities.os == "iOS" || egret.Capabilities.os == "Windows PC" || egret.Capabilities.os == "Mac OS") && egret.Capabilities.renderMode == "webgl")
            return true;
        return false;
    }

    public static sortRandomArray(arr: Array<any>): void {
        arr.sort(function () {
            return 0.5 - Math.random();
        });
        arr.sort(function () {
            return 0.5 - Math.random();
        });
        arr.sort(function () {
            return 0.5 - Math.random();
        });
        arr.sort(function () {
            return 0.5 - Math.random();
        });
    }
}


declare let $: any;
declare let wx: any;
declare let soundManager: any;
declare let wxCom: any;
declare let audioBtnShowFunc: Function;
declare let audioBtnHideFunc: Function;
declare let playSound: (reskey: string, times?: number, callback?: Function) => egret.SoundChannel;

playSound = (soundName: string, times?: number, callback?: Function): egret.SoundChannel => {
    if (!RES.hasRes(soundName)) return;
    if (soundManager.mute) return;
    if (times == undefined || times == null) times = 1;

    try {
        let sc: egret.SoundChannel = RES.getRes(soundName).play(0, times);
        if (callback && callback != null)
            sc.addEventListener(egret.Event.SOUND_COMPLETE, callback, null);

        return sc;
    } catch (e) {
        console.info(e);
    }
};