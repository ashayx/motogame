class EUtil {

    private static tearCfg = {};

    public static tear(obj: egret.DisplayObject, playTimes: number = 1, callback?: Function) {

        let partArr: egret.DisplayObject[];
        let box: egret.Sprite;

        if (EUtil.tearCfg[obj.hashCode.toString()] && EUtil.tearCfg[obj.hashCode.toString()] != null) {
            box = EUtil.tearCfg[obj.hashCode.toString()].box;
            partArr = EUtil.tearCfg[obj.hashCode.toString()].partArr;
        } else {
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

            for (let y: number = 0, h: number = 0; y < obj.height; y += h) {
                h = Math.ceil(1 + Math.ceil(Math.random() * 5));
                if (y + h > obj.height)
                    h = obj.height - y;


                let rt: egret.RenderTexture = new egret.RenderTexture;
                rt.drawToTexture(obj, new egret.Rectangle(0, y, obj.width, h));
                let part: egret.Bitmap = new egret.Bitmap(rt);
                part.y = y;
                part.filters = [];
                box.addChild(part);
                partArr.push(part);
            }
            EUtil.tearCfg[obj.hashCode.toString()] = {};
            EUtil.tearCfg[obj.hashCode.toString()].box = box;
            EUtil.tearCfg[obj.hashCode.toString()].partArr = partArr;
        }

        let func: Function = () => {
            let index: number = obj.parent.getChildIndex(obj);
            obj.parent.addChildAt(box, index);
            obj.parent.removeChild(obj);

            let nowTime: number = 1;

            let checkFunc: Function = () => {
                if (playTimes > 0 && nowTime++ > playTimes) {
                    egret.Tween.removeTweens(box);
                    box.parent.addChildAt(obj, index);
                    box.parent.removeChild(box);
                    if (callback) callback();
                    return;
                }
            };
            let duration: number = 100 + Math.random() + 200;
            egret.Tween.get(box, {"loop": true})
                .call(checkFunc)
                .wait(100)
                .call(() => {
                    for (let i: number = 0; i < partArr.length; i++) {
                        let parObj: egret.DisplayObject = partArr[i];
                        egret.Tween.removeTweens(parObj);
                        egret.Tween.get(parObj)
                            .to({"x": parObj.x - 50 + Math.random() * 100, "alpha": .2 + Math.random() * .8}, duration * .15)
                            .call((parObj: egret.DisplayObject) => {
                                if (Math.random() > .5) return;

                                let cfarr: number[] = [];
                                for (let i: number = 0; i < 20; i++) {
                                    cfarr.push(Math.random());
                                }
                                parObj.filters.push(new egret.ColorMatrixFilter(cfarr));

                            }, this, [parObj])
                            .to({"x": parObj.x - 20 + Math.random() * 40, "alpha": .3 + Math.random() * .7}, duration * .2)
                            .to({"x": parObj.x - 10 + Math.random() * 20, "alpha": .3 + Math.random() * .7}, duration * .1)
                            .call(() => {
                                parObj.filters = [];
                            })
                            .to({"x": parObj.x, "alpha": parObj.alpha, "scaleX": parObj.scaleX, "scaleY": parObj.scaleY}, duration);
                    }
                })
                .wait(duration / 2)
                .to({"alpha": box.alpha * .5}, 50)
                .wait(50)
                .to({"alpha": box.alpha}, 50)
                .wait(duration)
                .call(checkFunc)
                .wait(duration * 5);
        };


        if (!obj.parent || obj.parent == null)
            obj.once(egret.Event.ADDED_TO_STAGE, func, this);
        else
            func();

    }
}
