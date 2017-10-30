class MoYan extends DaoJu {
    constructor() {
        super();
        this.init();
    }

    private init() {
    
        let m = this.createBitmap('game.moyan');
        this.width = m.width;
        this.height = m.height;

        let guang = this.createBitmap('game.guang');
        guang.x = - (guang.width - m.width) / 2;
        guang.y = - (guang.height - m.height) / 2;
        guang.anchorOffsetX = m.width / 2;
        guang.anchorOffsetY = m.height / 2;
        guang.x += guang.anchorOffsetX;
        guang.y += guang.anchorOffsetY;

        egret.Tween.get(guang, { loop: true })
            .to({ alpha: 0, scaleX: 1.4, scaleY: 1.4 }, 800)
            .to({ alpha: 1, scaleX: 0.9, scaleY: 0.9 }, 800)
            .to({ alpha: 0, scaleX: 1.3, scaleY: 1.3 }, 800)
            .to({ alpha: 1, scaleX: 1, scaleY: 1 }, 800)


        this.addChild(guang);
        this.addChild(m);
    }

    pz(sceneBox: egret.Sprite): void {
        console.log('预警');
        playSound("game_eat_daoju.wav", 1);
        sceneBox.removeChild(this);
        moyanTip = true;
        moyanTipNum = 0;
    }
    key = 'MoYan';
    texture = 'game.moyan';

}