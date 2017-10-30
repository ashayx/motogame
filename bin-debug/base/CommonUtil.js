var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CommonUtil = (function () {
    function CommonUtil() {
    }
    CommonUtil.buttonTap = function (btnObj, callback, thisObj, param) {
        if (RES.hasRes("buttonSound"))
            playSound("buttonSound");
        btnObj.touchEnabled = false;
        egret.Tween.removeTweens(btnObj);
        egret.Tween.get(btnObj)
            .to({ "scaleX": btnObj.scaleX - .2, "scaleY": btnObj.scaleY - .2 }, 100)
            .to({ "scaleX": btnObj.scaleX, "scaleY": btnObj.scaleY }, 200)
            .call(function () {
            if (param)
                callback.apply(thisObj, param);
            else
                callback();
        });
    };
    CommonUtil.isExcellent = function () {
        // console.log(egret.Capabilities.os);
        if ((egret.Capabilities.os == "iOS" || egret.Capabilities.os == "Windows PC" || egret.Capabilities.os == "Mac OS") && egret.Capabilities.renderMode == "webgl")
            return true;
        return false;
    };
    CommonUtil.sortRandomArray = function (arr) {
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
    };
    CommonUtil.ISDEBUGGING = false;
    return CommonUtil;
}());
__reflect(CommonUtil.prototype, "CommonUtil");
playSound = function (soundName, times, callback) {
    if (!RES.hasRes(soundName))
        return;
    if (soundManager.mute)
        return;
    if (times == undefined || times == null)
        times = 1;
    try {
        var sc = RES.getRes(soundName).play(0, times);
        if (callback && callback != null)
            sc.addEventListener(egret.Event.SOUND_COMPLETE, callback, null);
        return sc;
    }
    catch (e) {
        console.info(e);
    }
};
