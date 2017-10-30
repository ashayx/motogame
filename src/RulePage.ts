class RulePage extends Page {
    private callback: Function;

    constructor(callback: Function) {
        super();
        this.callback = callback;
    }

    init(): void {
        let bgs: egret.Shape = new egret.Shape;
        bgs.graphics.beginFill(0x000000, .5);
        bgs.graphics.drawRect(0, 0, this.width, this.height);
        bgs.graphics.endFill();


        let box: egret.Sprite = new egret.Sprite;
        let bg: egret.Bitmap = this.createBitmap("rule.bg3");
        box.width = bg.width;
        box.height = bg.height;
        box.anchorOffsetX = bg.width / 2;
        box.anchorOffsetY = bg.height / 2;
        box.x = this.width / 2;
        box.y = this.height * .4;

        let bg2: egret.Bitmap = this.createBitmap("rule.bg4");

        egret.Tween.get(bg2, {"loop": true})
            .to({"alpha": 0}, 500)
            .to({"alpha": 1}, 500);

        let dTimeTxt: egret.BitmapText = new egret.BitmapText;
        dTimeTxt.width = 300;
        dTimeTxt.height = 300;
        dTimeTxt.anchorOffsetX = dTimeTxt.width / 2;
        dTimeTxt.anchorOffsetY = dTimeTxt.height / 2;
        dTimeTxt.alpha = 0;
        dTimeTxt.font = RES.getRes("dtime.fnt");
        dTimeTxt.text = "3";
        dTimeTxt.x = this.width / 2;
        dTimeTxt.y = this.height / 2;
        dTimeTxt.textAlign = egret.HorizontalAlign.CENTER;
        dTimeTxt.verticalAlign = egret.VerticalAlign.MIDDLE;


        let btn: egret.Bitmap = this.createBtn("rule.btn", () => {
            egret.Tween.removeTweens(box);
            egret.Tween.removeTweens(tip);

            egret.Tween.get(box).to({"y": box.y - 200, "alpha": 0}, 500, egret.Ease.backIn);
            egret.Tween.get(tip).to({"alpha": 0}, 500);

            dTimeTxt.scaleX = dTimeTxt.scaleY = 2;
            playSound("dtime.m4a", 1);
            egret.Tween.get(dTimeTxt)
                .to({"scaleX": 1, "scaleY": 1, "alpha": 1}, 500)
                .wait(300)
                .to({"scaleX": 2, "scaleY": 2, "alpha": 0}, 200)
                .call(() => {
                    dTimeTxt.text = "2";
                })
                .to({"scaleX": 1, "scaleY": 1, "alpha": 1}, 500)
                .wait(300)
                .to({"scaleX": 2, "scaleY": 2, "alpha": 0}, 200)
                .call(() => {
                    dTimeTxt.text = "1";
                })
                .to({"scaleX": 1, "scaleY": 1, "alpha": 1}, 500)
                .wait(300)
                .to({"scaleX": 2, "scaleY": 2, "alpha": 0}, 200)
                .call(() => {
                    this.parent.removeChild(this);
                    this.callback();
                });

        });
        btn.x = box.width / 2;
        btn.y = box.height - 85;

        egret.Tween.get(btn, {"loop": true})
            .to({"scaleX": .8, "scaleY": .8}, 500)
            .to({"scaleX": 1, "scaleY": 1}, 500);

        box.addChild(bg);
        box.addChild(bg2);
        box.addChild(btn);


        let factory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
        factory.parseDragonBonesData(RES.getRes("rotatip_ske.json"));
        factory.parseTextureAtlasData(RES.getRes("rotatip_tex.json"), RES.getRes("rotatip_tex.png"));

        //直接生成骨骼动画显示对象，该对象实现IArmatureDisplay接口
        let tip: dragonBones.EgretArmatureDisplay = factory.buildArmatureDisplay("rotatip");
        tip.x = this.width / 2;
        tip.y = this.height * .85;
        tip.alpha = 0;
        tip.animation.play("bling", -1);

        this.addChild(bgs);
        this.addChild(box);
        this.addChild(tip);
        this.addChild(dTimeTxt);


        egret.Tween.get(box)
            .to({"alpha": 0, "y": box.y - 200}, 1)
            .wait(200)
            .to({"alpha": 1, "y": box.y}, 555, egret.Ease.backOut)
            .call(() => {
                egret.Tween.get(tip)
                    .to({"alpha": .3}, 50)
                    .to({"alpha": 0}, 50)
                    .to({"alpha": .7}, 50)
                    .to({"alpha": .3}, 50)
                    .to({"alpha": .7}, 50)
                    .to({"alpha": 1}, 50);
            });
    }

}