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
var ResultPage = (function (_super) {
    __extends(ResultPage, _super);
    function ResultPage(score) {
        var _this = _super.call(this) || this;
        _this.score = 0;
        _this.openid = 0;
        _this.highestScore = 0;
        _this.money = 0;
        _this.score = score;
        _this.openid = wxCom.user.openid;
        return _this;
        // this.openid = 24;
    }
    ResultPage.prototype.init = function () {
        var _this = this;
        var log = console.log.bind(console);
        var resultbg = this.createBitmap("resultbg");
        resultbg.height = this.height;
        var logo = this.createBitmap("result.logo");
        logo.anchorOffsetX = logo.width / 2;
        logo.x = this.width / 2;
        logo.y = this.height * .03;
        var phone = this.createBitmap("result.phone", true);
        phone.x = this.width / 2;
        phone.y = this.height * .28;
        var txt = new egret.BitmapText;
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
        if (this.score === 0) {
            this.money = 0;
        }
        else if (this.score < 80) {
            this.money = 20;
        }
        else if (this.score < 200) {
            this.money = 50;
        }
        else {
            this.money = 200;
        }
        //最高分
        $.post('http://h5.sjzzimu.com/McHouServ/Choice/kingsman_addScore.do', {
            openid: this.openid,
            score: this.score
        }, function (response) {
            // console.log('最高分', response)
            var r = JSON.parse(response);
            _this.highestScore = r.score;
            txt.text = "本次获得" + _this.score + "积分\n当前最高分为" + _this.highestScore + "分\n可兑换" + _this.money + "元代金券";
        });
        var tip = this.createBitmap("result.tip", true);
        tip.x = this.width / 2;
        tip.y = txt.y + txt.anchorOffsetY + 20;
        var btnBox = new egret.Sprite;
        btnBox.width = 280;
        btnBox.height = 340;
        btnBox.anchorOffsetX = btnBox.width / 2;
        btnBox.anchorOffsetY = btnBox.height / 2;
        btnBox.x = this.width / 2;
        btnBox.y = this.height * .82;
        var selectBox = new egret.Sprite;
        selectBox.alpha = 0;
        var selectBg = this.createBitmap("result.selectbg");
        var selectTitle = this.createBitmap("result.selecttitle");
        selectTitle.x = (selectBg.width - selectTitle.width) / 2;
        selectTitle.y = 30;
        var selectTip = this.createBitmap("result.selecttip");
        selectTip.x = (selectBg.width - selectTip.width) / 2;
        selectTip.y = 60;
        selectTip.alpha = 0;
        selectTip.scaleX = selectTip.scaleY = 1.3;
        var selectYouHui = this.createBitmap("result.youhuima");
        selectYouHui.x = (selectBg.width - selectYouHui.width) / 2 - 120;
        selectYouHui.y = 90;
        selectYouHui.alpha = 0;
        var selectYes = this.createBtn("result.yes", function () {
            $.post('http://h5.sjzzimu.com/McHouServ/Choice/kingsman_lottert.do', {
                openid: _this.openid,
                score: _this.score
            }, function (response) {
                var r = JSON.parse(response);
                console.log('优惠券', r);
                if (r.code == -1 || r.code == 1) {
                    $('#money').html(r.couponnum);
                    _this.money = r.parvalue;
                }
                else if (r.code == 2) {
                    _this.money = 0;
                    $('#money').html('您还没有获得');
                }
                // txt.text = "获得" + this.score + "积分\n可兑换" + this.money + "元代金券";
                // txt.text = "本次获得" + this.score + "积分\n当前最高分为" + this.highestScore + "分\n可兑换" + this.money + "元代金券";
            });
            selectBox.removeChild(selectYes);
            selectBox.removeChild(selectNo);
            selectYouHui.alpha = 1;
            selectTip.alpha = 1;
            selectWait.alpha = 1;
            selectNow.alpha = 1;
            selectYes.touchEnabled = true;
            selectWait.touchEnabled = true;
            selectNow.touchEnabled = true;
            $('#money').fadeIn();
        });
        selectYes.x = selectBg.width / 2 - selectYes.width - 30;
        var selectNo = this.createBtn("result.no", function () {
            selectNo.touchEnabled = true;
            egret.Tween.get(selectBox).to({ alpha: 0 }, 500);
            $('#money').fadeOut();
        });
        selectNo.x = selectBg.width / 2 + selectNo.width + 30;
        selectYes.y = selectNo.y = 150;
        // 现在
        var selectNow = this.createBtn("result.wait", function () {
            selectNow.touchEnabled = true;
            window.location.href = 'http://www.motorola.com.cn/store/74.html';
            // 跳转
        });
        selectNow.touchEnabled = false;
        selectNow.x = selectBg.width / 2 - selectNow.width - 10;
        selectNow.alpha = 0;
        // 稍后
        var selectWait = this.createBtn("result.now", function () {
            selectWait.touchEnabled = true;
            egret.Tween.get(selectBox).to({ alpha: 0 }, 500);
            $('#money').fadeOut();
        });
        selectWait.touchEnabled = false;
        selectWait.x = selectBg.width / 2 + selectWait.width + 10;
        selectWait.alpha = 0;
        selectNow.y = selectWait.y = 150;
        selectBox.x = (this.width - selectBg.width) / 2;
        selectBox.y = this.height * .4;
        var body = document.body;
        var w = body.clientWidth * (selectYouHui.x + selectBox.x + 70) / this.width;
        var h = body.clientHeight * (selectYouHui.y + selectBox.y) / this.height - 5;
        $('#money').css({ left: w, top: h });
        var rule = this.createBtn("result.usejifen", function () {
            rule.touchEnabled = true;
            rulejifen.x = 0;
        });
        rule.x = this.width - rule.width - 20;
        rule.y = this.height - rule.height - 30;
        var rulejifen = this.createBitmap("jifenbg");
        rulejifen.width = this.width;
        rulejifen.height = this.height;
        rulejifen.x = -3000;
        rulejifen.touchEnabled = true;
        rulejifen.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            rulejifen.x = -3000;
        }, this);
        var sharePage = new egret.Sprite();
        sharePage.x = -3000;
        sharePage.touchEnabled = true;
        sharePage.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            sharePage.x = -3000;
        }, this);
        var shareBg = this.createBitmap("sharepage");
        shareBg.width = this.width;
        shareBg.height = this.height;
        var shareLight = this.createBitmap("result.sharelight");
        shareLight.y = 0;
        shareLight.x = 320;
        var sharePhone = this.createBitmap("result.sharephone");
        sharePhone.y = this.height * .35;
        sharePhone.x = 218;
        var btnagain = this.createBtn("result.btnagain", function () {
            _this.changePage(new GamePage());
        });
        var btninvite = this.createBtn("result.btninvite", function () {
            sharePage.x = 0;
            egret.Tween.get(shareLight).to({ alpha: 0 }, 1300).to({ alpha: 1 }, 1300).to({ alpha: 0 }, 1300).to({ alpha: 1 }, 1300);
            btninvite.touchEnabled = true;
        });
        var btnuse = this.createBtn("result.btnuse", function () {
            egret.Tween.get(selectBox).to({ alpha: 1 }, 500);
            btnuse.touchEnabled = true;
            if (selectNow.touchEnabled) {
                $('#money').fadeIn();
            }
        });
        var btnmore = this.createBtn("result.btnmore", function () {
            btnmore.touchEnabled = true;
            window.location.href = 'http://m.motorola.com.cn/store/166.html?hmsr=wechat&hmpl=171026&cid=sqgc2907';
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
        for (var i = 0; i < btnBox.numChildren; i++) {
            var btn = btnBox.getChildAt(i);
            egret.Tween.get(btn).to({ "alpha": 0, "y": btn.y - 50 }, 1).wait(500 + i * 300).to({ "alpha": 1, "y": btn.y }, 500, egret.Ease.backOut);
        }
    };
    return ResultPage;
}(Page));
__reflect(ResultPage.prototype, "ResultPage");
