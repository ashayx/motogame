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
var Page = (function (_super) {
    __extends(Page, _super);
    function Page() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStageFunc, _this);
        return _this;
    }
    Page.prototype.onAddToStageFunc = function () {
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
        this.x = this.anchorOffsetX = this.width / 2;
        this.y = this.anchorOffsetY = this.height / 2;
        this.onPreInit();
    };
    Page.prototype.onPreInit = function (doInit) {
        if (doInit === void 0) { doInit = true; }
        this.touchEnabled = true;
        var mask = new egret.Shape;
        mask.graphics.beginFill(0x000000, .01);
        mask.graphics.drawRect(0, 0, this.width, this.height);
        mask.graphics.endFill();
        this.addChild(mask);
        // let bg: egret.Bitmap = this.createBitmap("welcomebg", true);
        // bg.width = this.width;
        // bg.height = this.height;
        // bg.anchorOffsetX = bg.width / 2;
        // bg.anchorOffsetY = bg.height / 2;
        // bg.x = this.width / 2;
        // bg.y = this.height / 2;
        // bg.scaleX = bg.scaleY = 1.2;
        //
        // this.addChild(bg);
        if (doInit)
            this.init();
    };
    Page.prototype.changePage = function (p) {
        var _this = this;
        if (this.parent == null)
            return;
        var func = function (obj) {
            for (var i = 0; i < obj.numChildren; i++) {
                egret.Tween.removeTweens(obj.getChildAt(i));
                if (obj.mask != null) {
                    obj.mask.parent.removeChild(obj.mask);
                    obj.mask = null;
                }
                if (obj instanceof egret.DisplayObjectContainer) {
                    func(obj.getChildAt(i));
                }
                if (obj instanceof egret.MovieClip) {
                    obj.stop();
                }
                // if (obj instanceof particle.GravityParticleSystem) {
                //     (<particle.GravityParticleSystem>obj).stop(true);
                // }
            }
        };
        func(this);
        p.alpha = 0;
        p.scaleX = p.scaleY = 1.3;
        this.parent.addChild(p);
        egret.Tween.get(p).to({ "alpha": 1, "scaleX": 1, "scaleY": 1 }, 500, egret.Ease.cubicOut).call(function () {
            if (_this.parent == null)
                return;
            _this.parent.removeChild(_this);
        }, this);
    };
    Page.prototype.createBitmap = function (resKey, isACenter) {
        if (isACenter === void 0) { isACenter = false; }
        var bmp = new egret.Bitmap(RES.getRes(resKey));
        if (isACenter) {
            bmp.anchorOffsetX = bmp.width / 2;
            bmp.anchorOffsetY = bmp.height / 2;
        }
        return bmp;
    };
    Page.prototype.createBtn = function (reskey, callback) {
        var btn = this.createBitmap(reskey, true);
        btn.x = this.width / 2;
        btn.touchEnabled = true;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            CommonUtil.buttonTap(btn, function () {
                if (callback && callback != null)
                    callback();
            });
        }, this);
        return btn;
    };
    return Page;
}(egret.DisplayObjectContainer));
__reflect(Page.prototype, "Page");
