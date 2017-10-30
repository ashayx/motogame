abstract class Page extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStageFunc, this);
    }

    onAddToStageFunc() {
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
        this.x = this.anchorOffsetX = this.width / 2;
        this.y = this.anchorOffsetY = this.height / 2;


        this.onPreInit();

    }

    protected onPreInit(doInit: boolean = true): any {
        this.touchEnabled = true;

        let mask: egret.Shape = new egret.Shape;
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
    }

    abstract init(): void;


    public changePage(p: Page): void {
        if (this.parent == null) return;

        let func: Function = (obj: egret.DisplayObjectContainer) => {
            for (let i: number = 0; i < obj.numChildren; i++) {
                egret.Tween.removeTweens(obj.getChildAt(i));
                if (obj.mask != null) {
                    (<egret.DisplayObject>obj.mask).parent.removeChild((<egret.DisplayObject>obj.mask));
                    obj.mask = null;
                }
                if (obj instanceof egret.DisplayObjectContainer) {
                    func(obj.getChildAt(i));
                }
                if (obj instanceof egret.MovieClip) {
                    (<egret.MovieClip>obj).stop();
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
        egret.Tween.get(p).to({"alpha": 1, "scaleX": 1, "scaleY": 1}, 500, egret.Ease.cubicOut).call(() => {
            if (this.parent == null) return;
            this.parent.removeChild(this);
        }, this);

    }


    protected createBitmap(resKey: string, isACenter: boolean = false): egret.Bitmap {
        let bmp: egret.Bitmap = new egret.Bitmap(RES.getRes(resKey));
        if (isACenter) {
            bmp.anchorOffsetX = bmp.width / 2;
            bmp.anchorOffsetY = bmp.height / 2;
        }
        return bmp;
    }


    protected createBtn(reskey: string, callback?: Function): egret.Bitmap {
        let btn: egret.Bitmap = this.createBitmap(reskey, true);
        btn.x = this.width / 2;

        btn.touchEnabled = true;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            CommonUtil.buttonTap(btn, () => {
                if (callback && callback != null)
                    callback();
            });
        }, this);
        return btn;
    }


}
