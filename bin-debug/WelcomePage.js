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
var WelcomePage = (function (_super) {
    __extends(WelcomePage, _super);
    function WelcomePage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WelcomePage.prototype.init = function () {
        // let bg: egret.Shape = new egret.Shape;
        // bg.graphics.beginFill(0x000000, 1);
        // bg.graphics.drawRect(0, 0, this.width, this.height);
        // bg.graphics.endFill();
        //
        // let kingsmanlogo: egret.Bitmap = this.createBitmap("welcome.kingsmanlogo", true);
        // kingsmanlogo.x = this.width / 2;
        // kingsmanlogo.y = this.height / 2;
        // kingsmanlogo.rotation = 90;
        var _this = this;
        var welcomebgdark = this.createBitmap("welcomebgdark");
        welcomebgdark.scale9Grid = new egret.Rectangle(0, 60, welcomebgdark.width, 870);
        welcomebgdark.height = this.height;
        var welcomebg = this.createBitmap("welcomebg");
        welcomebg.scale9Grid = new egret.Rectangle(0, 60, welcomebg.width, 870);
        welcomebg.height = this.height;
        egret.Tween.get(welcomebg, { "loop": true })
            .to({ "alpha": .5 }, 100)
            .to({ "alpha": 1 }, 100)
            .to({ "alpha": .5 }, 100)
            .to({ "alpha": 1 }, 100).wait(1000);
        var title = this.createBitmap("welcome.title", true);
        title.x = this.width / 2;
        title.y = this.height * .2;
        var logo = this.createBitmap("welcome.logo", true);
        logo.x = 380;
        logo.y = welcomebg.scale9Grid.y + this.height * .35;
        var msg1 = this.createBitmap("welcome.msg1");
        var msg2 = this.createBitmap("welcome.msg2");
        msg1.anchorOffsetX = 84;
        msg1.anchorOffsetY = 52;
        msg2.anchorOffsetX = 28;
        msg1.x = this.width * .75;
        msg1.y = this.height * .6;
        msg2.x = this.width * .63;
        msg2.y = this.height * .72;
        msg1.scaleX = msg1.scaleY = msg1.alpha = msg2.scaleX = msg2.scaleY = msg2.alpha = 0;
        var cbox = new egret.Sprite;
        var ccar = this.createBitmap("welcome.ccar");
        cbox.width = ccar.width;
        cbox.height = ccar.height;
        cbox.anchorOffsetY = cbox.height;
        cbox.y = this.height * .85;
        cbox.x = 50;
        // let cman: egret.Bitmap = this.createBitmap("welcome.cman");
        var clight = this.createBitmap("welcome.clight");
        var factory = new dragonBones.EgretFactory();
        factory.parseDragonBonesData(RES.getRes("kingsman_ske.json"));
        factory.parseTextureAtlasData(RES.getRes("kingsman_tex.json"), RES.getRes("kingsman_tex.png"));
        //直接生成骨骼动画显示对象，该对象实现IArmatureDisplay接口
        var kingsman = factory.buildArmatureDisplay("kingsman");
        kingsman.x = 100 + 50;
        kingsman.y = 180;
        cbox.addChild(kingsman);
        cbox.addChild(ccar);
        cbox.addChild(clight);
        egret.Tween.get(kingsman)
            .to({ "alpha": 0 }, 1)
            .wait(2000)
            .call(function () {
            kingsman.armature.addEventListener(dragonBones.Event.COMPLETE, function (evt) {
                kingsman.animation.play("idle", -1);
            }, _this);
            kingsman.animation.play("up", 1);
        })
            .to({ "alpha": 1 }, 500);
        egret.Tween.get(cbox)
            .to({ "x": cbox.x + 300, "y": cbox.y - 200, "scaleX": .3, "scaleY": .3, "alpha": 1 }, 1)
            .wait(-200)
            .to({ "x": cbox.x, "y": cbox.y, "scaleX": 1, "scaleY": 1, "alpha": 1 }, 1500, egret.Ease.backOut)
            .call(function () {
            egret.Tween.get(clight, { "loop": true })
                .to({ "alpha": .7 }, 500)
                .to({ "alpha": 1 }, 500);
            egret.Tween.get(msg1).wait(500).to({ "scaleX": 1, "scaleY": 1, "alpha": 1 }, 500, egret.Ease.backOut);
            egret.Tween.get(msg2).wait(1500).to({ "scaleX": 1, "scaleY": 1, "alpha": 1 }, 500, egret.Ease.backOut)
                .call(function () {
                egret.Tween.get(msg2, { "loop": true })
                    .to({ "scaleX": .8, "scaleY": .8 }, 500)
                    .to({ "scaleX": 1, "scaleY": 1 }, 500);
                _this.once(egret.TouchEvent.TOUCH_TAP, function () {
                    _this.changePage(new GamePage());
                }, _this);
            });
        });
        this.addChild(welcomebgdark);
        this.addChild(welcomebg);
        this.addChild(cbox);
        this.addChild(msg1);
        this.addChild(msg2);
        this.addChild(logo);
        this.addChild(title);
        // this.addChild(bg);
        // this.addChild(kingsmanlogo);
        // egret.Tween.get(bg).to({"alpha": 0}, 1000).call(() => {
        //     bg.parent.removeChild(bg);
        // });
        // egret.Tween.get(kingsmanlogo)
        //     .to({
        //         "rotation": 0,
        //         "x": title.x,
        //         "y": title.y - title.anchorOffsetY + title.height - 12,
        //         "scaleX":23/kingsmanlogo.width,
        //         "scaleY":23/kingsmanlogo.height,
        //         "alpha":.5
        //     }, 1000, egret.Ease.cubicIn)
        //     .to({"alpha":0}, 200)
        //     .call(() => {
        //         kingsmanlogo.parent.removeChild(kingsmanlogo);
        //     });
        egret.Tween.get(this).wait(1000)
            .call(function () {
            // EUtil.tear(logo, -1);
            egret.Tween.get(logo, { "loop": true })
                .to({ "alpha": .7 }, 200)
                .to({ "alpha": 1 }, 200)
                .to({ "alpha": .7 }, 100)
                .to({ "alpha": 1 }, 100)
                .wait(1000);
        });
    };
    return WelcomePage;
}(Page));
__reflect(WelcomePage.prototype, "WelcomePage");
