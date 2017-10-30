class WelcomePage extends Page {
    init(): void {

        // let bg: egret.Shape = new egret.Shape;
        // bg.graphics.beginFill(0x000000, 1);
        // bg.graphics.drawRect(0, 0, this.width, this.height);
        // bg.graphics.endFill();
        //
        // let kingsmanlogo: egret.Bitmap = this.createBitmap("welcome.kingsmanlogo", true);
        // kingsmanlogo.x = this.width / 2;
        // kingsmanlogo.y = this.height / 2;
        // kingsmanlogo.rotation = 90;

        let welcomebgdark: egret.Bitmap = this.createBitmap("welcomebgdark");
        welcomebgdark.scale9Grid = new egret.Rectangle(0, 60, welcomebgdark.width, 870);
        welcomebgdark.height = this.height;


        let welcomebg: egret.Bitmap = this.createBitmap("welcomebg");
        welcomebg.scale9Grid = new egret.Rectangle(0, 60, welcomebg.width, 870);
        welcomebg.height = this.height;
        egret.Tween.get(welcomebg, {"loop": true})
            .to({"alpha": .5}, 100)
            .to({"alpha": 1}, 100)
            .to({"alpha": .5}, 100)
            .to({"alpha": 1}, 100).wait(1000);

        let title: egret.Bitmap = this.createBitmap("welcome.title", true);
        title.x = this.width / 2;
        title.y = this.height * .2;

        let logo: egret.Bitmap = this.createBitmap("welcome.logo", true);
        logo.x = 380;
        logo.y = welcomebg.scale9Grid.y + this.height * .35;

        let msg1: egret.Bitmap = this.createBitmap("welcome.msg1");
        let msg2: egret.Bitmap = this.createBitmap("welcome.msg2");
        msg1.anchorOffsetX = 84;
        msg1.anchorOffsetY = 52;
        msg2.anchorOffsetX = 28;
        msg1.x = this.width * .75;
        msg1.y = this.height * .6;
        msg2.x = this.width * .63;
        msg2.y = this.height * .72;
        msg1.scaleX = msg1.scaleY = msg1.alpha = msg2.scaleX = msg2.scaleY = msg2.alpha = 0;

        let cbox: egret.Sprite = new egret.Sprite;
        let ccar: egret.Bitmap = this.createBitmap("welcome.ccar");
        cbox.width = ccar.width;
        cbox.height = ccar.height;
        cbox.anchorOffsetY = cbox.height;
        cbox.y = this.height * .85;
        cbox.x = 50;
        // let cman: egret.Bitmap = this.createBitmap("welcome.cman");
        let clight: egret.Bitmap = this.createBitmap("welcome.clight");

        let factory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
        factory.parseDragonBonesData(RES.getRes("kingsman_ske.json"));
        factory.parseTextureAtlasData(RES.getRes("kingsman_tex.json"), RES.getRes("kingsman_tex.png"));

        //直接生成骨骼动画显示对象，该对象实现IArmatureDisplay接口
        let kingsman: dragonBones.EgretArmatureDisplay = factory.buildArmatureDisplay("kingsman");
        kingsman.x = 100 + 50;
        kingsman.y = 180;

        cbox.addChild(kingsman);
        cbox.addChild(ccar);
        cbox.addChild(clight);

        egret.Tween.get(kingsman)
            .to({"alpha": 0}, 1)
            .wait(2000)
            .call(() => {

                kingsman.armature.addEventListener(dragonBones.Event.COMPLETE, (evt: dragonBones.FrameEvent) => {
                    kingsman.animation.play("idle", -1);
                }, this);
                kingsman.animation.play("up", 1);
            })
            .to({"alpha": 1}, 500);

        egret.Tween.get(cbox)
            .to({"x": cbox.x + 300, "y": cbox.y - 200, "scaleX": .3, "scaleY": .3, "alpha": 1}, 1)
            .wait(-200)
            .to({"x": cbox.x, "y": cbox.y, "scaleX": 1, "scaleY": 1, "alpha": 1}, 1500, egret.Ease.backOut)
            .call(() => {
                egret.Tween.get(clight, {"loop": true})
                    .to({"alpha": .7}, 500)
                    .to({"alpha": 1}, 500);

                egret.Tween.get(msg1).wait(500).to({"scaleX": 1, "scaleY": 1, "alpha": 1}, 500, egret.Ease.backOut);
                egret.Tween.get(msg2).wait(1500).to({"scaleX": 1, "scaleY": 1, "alpha": 1}, 500, egret.Ease.backOut)
                    .call(() => {
                        egret.Tween.get(msg2, {"loop": true})
                            .to({"scaleX": .8, "scaleY": .8}, 500)
                            .to({"scaleX": 1, "scaleY": 1}, 500);
                        this.once(egret.TouchEvent.TOUCH_TAP, () => {
                            this.changePage(new GamePage());
                        }, this);
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
            .call(() => {
                // EUtil.tear(logo, -1);
                egret.Tween.get(logo, {"loop": true})
                    .to({"alpha": .7}, 200)
                    .to({"alpha": 1}, 200)
                    .to({"alpha": .7}, 100)
                    .to({"alpha": 1}, 100)
                    .wait(1000);

            });
    }

}