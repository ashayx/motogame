var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EUtil = (function () {
    function EUtil() {
    }
    EUtil.tear = function (obj, playTimes, callback) {
        var _this = this;
        if (playTimes === void 0) { playTimes = 1; }
        var partArr;
        var box;
        if (EUtil.tearCfg[obj.hashCode.toString()] && EUtil.tearCfg[obj.hashCode.toString()] != null) {
            box = EUtil.tearCfg[obj.hashCode.toString()].box;
            partArr = EUtil.tearCfg[obj.hashCode.toString()].partArr;
        }
        else {
            box = new egret.Sprite;
            box.width = obj.width;
            box.height = obj.height;
            box.scaleX = obj.scaleX;
            box.scaleY = obj.scaleY;
            box.rotation = obj.rotation;
            box.anchorOffsetX = obj.anchorOffsetX;
            box.anchorOffsetY = obj.anchorOffsetY;
            box.x = obj.x;
            box.y = obj.y;
            partArr = [];
            for (var y = 0, h = 0; y < obj.height; y += h) {
                h = Math.ceil(1 + Math.ceil(Math.random() * 5));
                if (y + h > obj.height)
                    h = obj.height - y;
                var rt = new egret.RenderTexture;
                rt.drawToTexture(obj, new egret.Rectangle(0, y, obj.width, h));
                var part = new egret.Bitmap(rt);
                part.y = y;
                part.filters = [];
                box.addChild(part);
                partArr.push(part);
            }
            EUtil.tearCfg[obj.hashCode.toString()] = {};
            EUtil.tearCfg[obj.hashCode.toString()].box = box;
            EUtil.tearCfg[obj.hashCode.toString()].partArr = partArr;
        }
        var func = function () {
            var index = obj.parent.getChildIndex(obj);
            obj.parent.addChildAt(box, index);
            obj.parent.removeChild(obj);
            var nowTime = 1;
            var checkFunc = function () {
                if (playTimes > 0 && nowTime++ > playTimes) {
                    egret.Tween.removeTweens(box);
                    box.parent.addChildAt(obj, index);
                    box.parent.removeChild(box);
                    if (callback)
                        callback();
                    return;
                }
            };
            var duration = 100 + Math.random() + 200;
            egret.Tween.get(box, { "loop": true })
                .call(checkFunc)
                .wait(100)
                .call(function () {
                var _loop_1 = function (i) {
                    var parObj = partArr[i];
                    egret.Tween.removeTweens(parObj);
                    egret.Tween.get(parObj)
                        .to({ "x": parObj.x - 50 + Math.random() * 100, "alpha": .2 + Math.random() * .8 }, duration * .15)
                        .call(function (parObj) {
                        if (Math.random() > .5)
                            return;
                        var cfarr = [];
                        for (var i_1 = 0; i_1 < 20; i_1++) {
                            cfarr.push(Math.random());
                        }
                        parObj.filters.push(new egret.ColorMatrixFilter(cfarr));
                    }, _this, [parObj])
                        .to({ "x": parObj.x - 20 + Math.random() * 40, "alpha": .3 + Math.random() * .7 }, duration * .2)
                        .to({ "x": parObj.x - 10 + Math.random() * 20, "alpha": .3 + Math.random() * .7 }, duration * .1)
                        .call(function () {
                        parObj.filters = [];
                    })
                        .to({ "x": parObj.x, "alpha": parObj.alpha, "scaleX": parObj.scaleX, "scaleY": parObj.scaleY }, duration);
                };
                for (var i = 0; i < partArr.length; i++) {
                    _loop_1(i);
                }
            })
                .wait(duration / 2)
                .to({ "alpha": box.alpha * .5 }, 50)
                .wait(50)
                .to({ "alpha": box.alpha }, 50)
                .wait(duration)
                .call(checkFunc)
                .wait(duration * 5);
        };
        if (!obj.parent || obj.parent == null)
            obj.once(egret.Event.ADDED_TO_STAGE, func, this);
        else
            func();
    };
    EUtil.tearCfg = {};
    return EUtil;
}());
__reflect(EUtil.prototype, "EUtil");
