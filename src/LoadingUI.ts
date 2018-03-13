class LoadingUI extends Page {

    private mb: egret.Shape;
    private loadingbg;

    init(): void {
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

        RES.getResAsync("blackbg", () => {
            RES.getResAsync("loadingnum.fnt", () => {
                RES.getResAsync("loadingtopbg", () => {
                    RES.getResAsync("loadingtopbg2", () => {
                        RES.getResAsync("loading.title", () => {
                            RES.getResAsync("loading.tip", () => {

                                this.textField.font = RES.getRes("loadingnum.fnt");
                                this.textField.text = "0%";

                                let blackBg: egret.Bitmap = this.createBitmap("blackbg");
                                blackBg.width = this.width;
                                blackBg.height = this.height;
                                

                                let loadingtopbg: egret.Bitmap = this.createBitmap("loadingtopbg");
                                loadingtopbg.anchorOffsetY = loadingtopbg.height;
                                loadingtopbg.y = this.height * .55;

                                let loadingtopbg2: egret.Bitmap = this.createBitmap("loadingtopbg2");
                                loadingtopbg2.anchorOffsetY = loadingtopbg.anchorOffsetY;
                                loadingtopbg2.y = loadingtopbg.y;

                                this.loadingtopbgMask = new egret.Shape;
                                this.loadingtopbgMask.graphics.beginFill(0x000000, 1);
                                this.loadingtopbgMask.graphics.drawRect(0, 0, loadingtopbg.width, loadingtopbg.height);
                                this.loadingtopbgMask.graphics.endFill();
                                this.loadingtopbgMask.anchorOffsetY = loadingtopbg.anchorOffsetY;
                                this.loadingtopbgMask.y = loadingtopbg.y + this.loadingtopbgMask.height;

                                this.loadingbg = loadingtopbg;
                                this.loadingbg.mask = this.loadingtopbgMask;
                                // egret.Tween.get(loadingtopbg, {"loop": true})
                                //     .to({ "alpha": parseInt(this.textField.text)}, 300)
                                this.loadingtopbg = loadingtopbg;
                                this.textField.y = loadingtopbg.y - loadingtopbg.height / 2;

                                let title: egret.Bitmap = this.createBitmap("loading.title", true);
                                title.x = this.width / 2;
                                title.y = this.height * .6;
                                this.title = title;

                                let tip: egret.Bitmap = this.createBitmap("loading.tip", true);
                                tip.x = this.width / 2;
                                tip.y = this.height * .9;
                                this.tip = tip;

                                this.addChild(blackBg);
                                this.addChild(this.loadingtopbgMask);
                                this.addChild(loadingtopbg2);
                                this.addChild(loadingtopbg);
                                this.addChild(tip);
                                this.addChild(title);
                                this.addChild(this.textField);

                                RES.loadGroup("preload");
                            }, this);
                        }, this);
                    }, this);
                }, this);
            }, this);
        },this);
        
    }

    private loadingtopbgMask: egret.Shape;
    private textField: egret.BitmapText;
    private tip: egret.Bitmap;
    private title: egret.Bitmap;
    private loadingtopbg: egret.Bitmap;


    public setProgress(current: number, total: number): void {

        this.textField.text = (Math.floor(current / total * 100)) + "%";
        // this.loadingbg.alpha = parseInt(this.textField.text)/100
        egret.Tween.removeTweens(this.loadingtopbgMask);
        egret.Tween.get(this.loadingtopbgMask).to({"y": this.loadingtopbg.y + this.loadingtopbgMask.height - this.loadingtopbgMask.height * current / total});


    }

    public ok(callback: Function) {
        // this.textField.text = "点击开始";
        // egret.Tween.get(this.textField, {"loop": true})
        //     .to({"scaleX": .9, "scaleY": .9}, 500)
        //     .to({"scaleX": 1, "scaleY": 1}, 500);
        this.textField.alpha = 0;
        this.tip.alpha = 0;
        egret.Tween.removeTweens(this.loadingtopbg);
        egret.Tween.get(this.loadingtopbg).to({"y": this.loadingtopbg.y + 30}, 700);
        egret.Tween.get(this.title).to({"y": this.title.y + 30}, 500);

        callback(); // 跳过视频


        let vBox: HTMLVideoElement = (<HTMLVideoElement>document.getElementById("vBox"));
        let v: HTMLVideoElement = (<HTMLVideoElement>document.getElementById("v"));
        v.poster = "./resource/v.png";

        let btn: egret.Bitmap = this.createBtn("loading.btn", () => {

            let ffunc: (this: any, ...arg) => void = () => {
                vBox.style.display = "block";
                v.style.display = "block";
                soundManager.pauseAll();

                this.addChild(this.mb);
                let vFunc: () => void = () => {
                    vBox.style.display = "none";
                    v.style.display = "none";
                    $(v).remove();
                    soundManager.play("bgm");
                    soundManager.resumeAll();
                    v.removeEventListener("ended", vFunc, true);

                    if (callback) {
                        this.loadingbg.mask = null ;
                        callback()
                    };
                };

                v.addEventListener("ended", vFunc, true);

                v.addEventListener("pause", () => {
                    if (v.currentTime >= v.duration) return;

                    this.removeChild(this.mb);
                    vBox.style.display = "none";
                    v.style.display = "none";
                    v.removeEventListener("ended", vFunc, true);

                    this.once(egret.TouchEvent.TOUCH_BEGIN, () => {
                        // egret.Tween.removeTweens(this.btnPlay);
                        // this.btnPlay.scaleX = this.btnPlay.scaleY = 1;
                        // this.btnPlay.alpha = 0;
                        ffunc();
                    }, this);
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
        btn.once(egret.TouchEvent.TOUCH_BEGIN, () => {
            v.load();
        }, this);
        btn.x = this.width / 2;
        btn.y = this.height * .85;
        btn.scaleX = btn.scaleY = 1.5;

        egret.Tween.get(btn, {"loop": true})
            .to({"scaleX": 1.15, "scaleY": 1.15}, 500)
            .to({"scaleX": 1.5, "scaleY": 1.5}, 500);

        this.addChild(btn);
        // callback();
    }

}
