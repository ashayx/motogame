class ResultPage extends Page {
    private score: number = 0;
    private openid = 0;
    private highestScore: number = 0;
    private money: number = 0;

    constructor(score: number) {
        super();
        this.score = score;
        this.openid = wxCom.user.openid;
        // this.openid = 24;
    }

    init(): void {

        let log = console.log.bind(console)

        let resultbg: egret.Bitmap = this.createBitmap("resultbg");
        resultbg.height = this.height;

        let logo: egret.Bitmap = this.createBitmap("result.logo");
        logo.anchorOffsetX = logo.width / 2;
        logo.x = this.width / 2;
        logo.y = this.height * .03;

        let phone: egret.Bitmap = this.createBitmap("result.phone", true);
        phone.x = this.width / 2;
        phone.y = this.height * .28;

        let txt: egret.BitmapText = new egret.BitmapText;
        txt.font = RES.getRes("rtext.fnt");
        txt.width = this.width;
        txt.height = 150;
        txt.anchorOffsetY = txt.height / 2;
        txt.textAlign = egret.HorizontalAlign.CENTER;
        txt.verticalAlign = egret.VerticalAlign.MIDDLE;
        txt.y = this.height * .5;
        // txt.text = "获得" + this.score + "积分\n可兑换" + this.money +"元代金券";

        //TODO 最高分
        // txt.text = "本次获得" + this.score + "积分\n当前最高分为" + this.highestScore +"分\n可兑换" + this.money +"元代金券";
        // 优惠券
        if(this.score === 0) {
            this.money = 0
        } else if (this.score < 80) {
            this.money = 20
        } else if (this.score < 200) {
            this.money = 50
        } else {
            this.money = 200
        }

        //最高分
        $.post('http://h5.sjzzimu.com/McHouServ/Choice/kingsman_addScore.do', {
            openid: this.openid,
            score: this.score
        }, (response) => {
            // console.log('最高分', response)
            let r: any = JSON.parse(response);
            this.highestScore = r.score;
            txt.text = "本次获得" + this.score + "积分\n当前最高分为" + this.highestScore + "分\n可兑换" + this.money + "元代金券";
        })
        
        let tip: egret.Bitmap = this.createBitmap("result.tip", true);
        tip.x = this.width / 2;
        tip.y = txt.y + txt.anchorOffsetY + 20;

        let btnBox: egret.Sprite = new egret.Sprite;
        btnBox.width = 280;
        btnBox.height = 340;
        btnBox.anchorOffsetX = btnBox.width / 2;
        btnBox.anchorOffsetY = btnBox.height / 2;
        btnBox.x = this.width / 2;
        btnBox.y = this.height * .82;

        let selectBox: egret.Sprite = new egret.Sprite;
        selectBox.alpha = 0;
        let selectBg: egret.Bitmap = this.createBitmap("result.selectbg");

        let selectTitle: egret.Bitmap = this.createBitmap("result.selecttitle");
        selectTitle.x = (selectBg.width - selectTitle.width) /2;
        selectTitle.y = 30;

        let selectTip: egret.Bitmap = this.createBitmap("result.selecttip");
        selectTip.x = (selectBg.width - selectTip.width) / 2;
        selectTip.y = 60;
        selectTip.alpha = 0;
        selectTip.scaleX = selectTip.scaleY =  1.3;

        let selectYouHui: egret.Bitmap = this.createBitmap("result.youhuima");
        selectYouHui.x = (selectBg.width - selectYouHui.width) / 2 - 120;
        selectYouHui.y = 90;
        selectYouHui.alpha = 0;

        let selectYes: egret.Bitmap = this.createBtn("result.yes", () => {

            $.post('http://h5.sjzzimu.com/McHouServ/Choice/kingsman_lottert.do', {
                openid: this.openid,
                score: this.score
            }, (response) => {
                let r: any = JSON.parse(response);
                console.log('优惠券', r)
                if (r.code == -1 || r.code == 1) {
                    $('#money').html(r.couponnum);
                    this.money = r.parvalue;
                } else if (r.code == 2) {
                    this.money = 0;
                    $('#money').html('您还没有获得');
                }
                // txt.text = "获得" + this.score + "积分\n可兑换" + this.money + "元代金券";
                // txt.text = "本次获得" + this.score + "积分\n当前最高分为" + this.highestScore + "分\n可兑换" + this.money + "元代金券";
            })

            selectBox.removeChild(selectYes);
            selectBox.removeChild(selectNo);
            selectYouHui.alpha = 1
            selectTip.alpha = 1;
            selectWait.alpha = 1;
            selectNow.alpha = 1;
            selectYes.touchEnabled = true;
            selectWait.touchEnabled = true;
            selectNow.touchEnabled = true;
            $('#money').fadeIn();
            
        });
        selectYes.x = selectBg.width / 2 - selectYes.width - 30;

        let selectNo: egret.Bitmap = this.createBtn("result.no", () => {
            selectNo.touchEnabled = true;
            egret.Tween.get(selectBox).to({alpha: 0},500)
            $('#money').fadeOut();
        });
        selectNo.x = selectBg.width / 2 + selectNo.width + 30;
        selectYes.y = selectNo.y = 150;
        // 现在
        let selectNow: egret.Bitmap = this.createBtn("result.wait", () => {
            selectNow.touchEnabled = true;
            window.location.href = 'http://www.motorola.com.cn/store/74.html'
            // 跳转
        });
        selectNow.touchEnabled = false;
        selectNow.x = selectBg.width / 2 - selectNow.width - 10;
        selectNow.alpha = 0;
        // 稍后
        let selectWait: egret.Bitmap = this.createBtn("result.now", () => {
            selectWait.touchEnabled = true;
            egret.Tween.get(selectBox).to({ alpha: 0 }, 500)
            $('#money').fadeOut();
        });
        selectWait.touchEnabled = false;
        selectWait.x = selectBg.width / 2 + selectWait.width + 10;
        selectWait.alpha = 0;
        selectNow.y = selectWait.y = 150;

        selectBox.x = (this.width - selectBg.width) / 2;
        selectBox.y = this.height * .4;

        
        let body: HTMLDivElement = <HTMLDivElement>document.body;
        let w = body.clientWidth * (selectYouHui.x  + selectBox.x  + 70) / this.width
        let h = body.clientHeight * (selectYouHui.y + selectBox.y)/this.height -5;
        $('#money').css({ left: w,top: h})

        let rule: egret.Bitmap = this.createBtn("result.usejifen", () => {
            rule.touchEnabled = true;
            rulejifen.x = 0;
            
        });
        rule.x = this.width - rule.width - 20;
        rule.y = this.height - rule.height - 30;

        let rulejifen: egret.Bitmap = this.createBitmap("jifenbg");
        rulejifen.width = this.width;
        rulejifen.height = this.height;
        rulejifen.x = -3000;
        rulejifen.touchEnabled = true;
        rulejifen.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            rulejifen.x = -3000;
        }, this);    


        let sharePage: egret.Sprite = new egret.Sprite();
        sharePage.x = -3000;

        sharePage.touchEnabled = true;
        sharePage.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            sharePage.x = -3000;
        }, this);

        let shareBg: egret.Bitmap = this.createBitmap("sharepage");
        shareBg.width = this.width;
        shareBg.height = this.height;
        
        let shareLight: egret.Bitmap = this.createBitmap("result.sharelight");
        shareLight.y = 0;
        shareLight.x = 320;
       
       
        let sharePhone: egret.Bitmap = this.createBitmap("result.sharephone");
        sharePhone.y = this.height * .35;
        sharePhone.x = 218;

        let btnagain: egret.Bitmap = this.createBtn("result.btnagain", () => {
            this.changePage(new GamePage());
        });
        let btninvite: egret.Bitmap = this.createBtn("result.btninvite", () => {
            sharePage.x = 0;
            egret.Tween.get(shareLight).to({ alpha: 0 }, 1300).to({ alpha: 1 }, 1300).to({ alpha: 0 }, 1300).to({ alpha: 1 }, 1300)
            btninvite.touchEnabled = true;
        });
        let btnuse: egret.Bitmap = this.createBtn("result.btnuse", () => {
            egret.Tween.get(selectBox).to({ alpha: 1 }, 500);
            btnuse.touchEnabled = true;
            if (selectNow.touchEnabled) {
                $('#money').fadeIn();
            }

        });
        let btnmore: egret.Bitmap = this.createBtn("result.btnmore", () => {
            btnmore.touchEnabled = true;
            window.location.href = 'http://m.motorola.com.cn/store/166.html?hmsr=wechat&hmpl=171026&cid=sqgc2907'
        });
        btnagain.x = btninvite.x = btnuse.x = btnmore.x = btnBox.width / 2;
        btnagain.y = 40;
        btninvite.y = 120;
        btnuse.y = 200;
        btnmore.y = 280;

        btnBox.addChild(btnagain);
        btnBox.addChild(btninvite);
        btnBox.addChild(btnuse);
        btnBox.addChild(btnmore);

        selectBox.addChild(selectBg);
        selectBox.addChild(selectTitle);
        selectBox.addChild(selectTip);
        selectBox.addChild(selectYouHui);
        selectBox.addChild(selectYes);
        selectBox.addChild(selectNo);
        selectBox.addChild(selectWait);
        selectBox.addChild(selectNow);

        sharePage.addChild(shareBg);
        sharePage.addChild(shareLight);
        sharePage.addChild(sharePhone);

        this.addChild(resultbg);
        this.addChild(phone);
        this.addChild(logo);
        this.addChild(tip);
        this.addChild(txt);
        this.addChild(btnBox);
        this.addChild(selectBox);
        this.addChild(rule);
        this.addChild(sharePage);
        this.addChild(rulejifen);

        

        for (let i: number = 0; i < btnBox.numChildren; i++) {
            let btn: egret.DisplayObject = btnBox.getChildAt(i);
            egret.Tween.get(btn).to({"alpha": 0, "y": btn.y - 50}, 1).wait(500 + i * 300).to({"alpha": 1,"y": btn.y}, 500,egret.Ease.backOut);
        }
    }

}

