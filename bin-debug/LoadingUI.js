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
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoadingUI.prototype.init = function () {
        var _this = this;
        this.mb = new egret.Shape;
        this.mb.graphics.beginFill(0x000000, 1);
        this.mb.graphics.drawRect(0, 0, this.width, this.height);
        this.mb.graphics.endFill();
        this.anchorOffsetX = this.x = this.width / 2;
        this.anchorOffsetY = this.y = this.height / 2;
        this.textField = new egret.BitmapText();
        this.textField.width = this.width;
        this.textField.height = 100;
        this.textField.anchorOffsetX = this.textField.width / 2;
        this.textField.anchorOffsetY = this.textField.height / 2;
        this.textField.x = this.width * .5;
        this.textField.textAlign = egret.HorizontalAlign.CENTER;
        this.textField.verticalAlign = egret.VerticalAlign.MIDDLE;
        RES.getResAsync("loadingnum.fnt", function () {
            RES.getResAsync("loadingtopbg", function () {
                RES.getResAsync("loadingtopbg2", function () {
                    RES.getResAsync("loading.title", function () {
                        RES.getResAsync("loading.tip", function () {
                            _this.textField.font = RES.getRes("loadingnum.fnt");
                            _this.textField.text = "0%";
                            var loadingtopbg = _this.createBitmap("loadingtopbg");
                            loadingtopbg.anchorOffsetY = loadingtopbg.height;
                            loadingtopbg.y = _this.height * .55;
                            var loadingtopbg2 = _this.createBitmap("loadingtopbg2");
                            loadingtopbg2.anchorOffsetY = loadingtopbg.anchorOffsetY;
                            loadingtopbg2.y = loadingtopbg.y;
                            _this.loadingtopbgMask = new egret.Shape;
                            _this.loadingtopbgMask.graphics.beginFill(0x000000, 1);
                            _this.loadingtopbgMask.graphics.drawRect(0, 0, loadingtopbg.width, loadingtopbg.height);
                            _this.loadingtopbgMask.graphics.endFill();
                            _this.loadingtopbgMask.anchorOffsetY = loadingtopbg.anchorOffsetY;
                            _this.loadingtopbgMask.y = loadingtopbg.y + _this.loadingtopbgMask.height;
                            _this.loadingbg = loadingtopbg;
                            _this.loadingbg.mask = _this.loadingtopbgMask;
                            // egret.Tween.get(loadingtopbg, {"loop": true})
                            //     .to({ "alpha": parseInt(this.textField.text)}, 300)
                            _this.loadingtopbg = loadingtopbg;
                            _this.textField.y = loadingtopbg.y - loadingtopbg.height / 2;
                            var title = _this.createBitmap("loading.title", true);
                            title.x = _this.width / 2;
                            title.y = _this.height * .6;
                            _this.title = title;
                            var tip = _this.createBitmap("loading.tip", true);
                            tip.x = _this.width / 2;
                            tip.y = _this.height * .9;
                            _this.tip = tip;
                            _this.addChild(_this.loadingtopbgMask);
                            _this.addChild(loadingtopbg2);
                            _this.addChild(loadingtopbg);
                            _this.addChild(tip);
                            _this.addChild(title);
                            _this.addChild(_this.textField);
                            RES.loadGroup("preload");
                        }, _this);
                    }, _this);
                }, _this);
            }, _this);
        }, this);
    };
    LoadingUI.prototype.setProgress = function (current, total) {
        this.textField.text = (Math.floor(current / total * 100)) + "%";
        // this.loadingbg.alpha = parseInt(this.textField.text)/100
        egret.Tween.removeTweens(this.loadingtopbgMask);
        egret.Tween.get(this.loadingtopbgMask).to({ "y": this.loadingtopbg.y + this.loadingtopbgMask.height - this.loadingtopbgMask.height * current / total });
    };
    LoadingUI.prototype.ok = function (callback) {
        var _this = this;
        // this.textField.text = "点击开始";
        // egret.Tween.get(this.textField, {"loop": true})
        //     .to({"scaleX": .9, "scaleY": .9}, 500)
        //     .to({"scaleX": 1, "scaleY": 1}, 500);
        this.textField.alpha = 0;
        this.tip.alpha = 0;
        egret.Tween.removeTweens(this.loadingtopbg);
        egret.Tween.get(this.loadingtopbg).to({ "y": this.loadingtopbg.y + 30 }, 700);
        egret.Tween.get(this.title).to({ "y": this.title.y + 30 }, 500);
        // callback();
        var vBox = document.getElementById("vBox");
        var v = document.getElementById("v");
        v.poster = "./resource/v.png";
        var btn = this.createBtn("loading.btn2", function () {
            var ffunc = function () {
                vBox.style.display = "block";
                v.style.display = "block";
                soundManager.pauseAll();
                _this.addChild(_this.mb);
                var vFunc = function () {
                    vBox.style.display = "none";
                    v.style.display = "none";
                    $(v).remove();
                    soundManager.play("bgm");
                    soundManager.resumeAll();
                    v.removeEventListener("ended", vFunc, true);
                    if (callback)
                        callback();
                };
                v.addEventListener("ended", vFunc, true);
                v.addEventListener("pause", function () {
                    if (v.currentTime >= v.duration)
                        return;
                    _this.removeChild(_this.mb);
                    vBox.style.display = "none";
                    v.style.display = "none";
                    v.removeEventListener("ended", vFunc, true);
                    _this.once(egret.TouchEvent.TOUCH_BEGIN, function () {
                        // egret.Tween.removeTweens(this.btnPlay);
                        // this.btnPlay.scaleX = this.btnPlay.scaleY = 1;
                        // this.btnPlay.alpha = 0;
                        ffunc();
                    }, _this);
                    // egret.Tween.get(this.btnPlay, {"loop": true})
                    //     .to({"scaleX": .9, "scaleY": .9}, 1000)
                    //     .to({"scaleX": 1, "scaleY": 1}, 1000);
                    // this.btnPlay.alpha = 1;
                }, true);
                v.play();
                // if (egret.Capabilities.os != "Android")
                //     egret.Tween.get(this.imgObj["img" + vNum]).to({"alpha": 1}, 1000);
            };
            // if (egret.Capabilities.os == "Android")
            //     egret.setTimeout(ffunc, this, 50);
            // else
            ffunc();
        });
        btn.once(egret.TouchEvent.TOUCH_BEGIN, function () {
            v.load();
        }, this);
        btn.x = this.width / 2;
        btn.y = this.height * .85;
        btn.scaleX = btn.scaleY = 1.5;
        egret.Tween.get(btn, { "loop": true })
            .to({ "scaleX": 1.15, "scaleY": 1.15 }, 500)
            .to({ "scaleX": 1.5, "scaleY": 1.5 }, 500);
        this.addChild(btn);
        // callback();
    };
    return LoadingUI;
}(Page));
__reflect(LoadingUI.prototype, "LoadingUI");
