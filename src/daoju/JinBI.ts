class Gold extends DaoJu {
    constructor () {
        super();
        this.init();
    }

    private init() {
        let gold = this.createBitmap('game.jinbi');
        this.addChild(gold);
    }

    pz(sceneBox:egret.Sprite):void {
        console.log('吃金币')
        playSound("eatjinbi", 1);
        SCORE++;
        sceneBox.removeChild(this)
    }
    key = 'Gold';
    texture = 'game.gold';
    
}