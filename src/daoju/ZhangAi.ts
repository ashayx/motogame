class Hinder extends DaoJu {
    constructor() {
        super();
        this.init();
    }

    private init() {
        let hinder = this.createBitmap('game.hinder');
        this.addChild(hinder);
    }

    pz(sceneBox: egret.Sprite): void {
        console.log('碰撞障碍');
        playSound("game_hit", 1);
        sceneBox.removeChild(this);
        if (FANG) { return} 
        BLOOD--;
   
    }
    key = 'Hinder';
    texture = 'game.hinder';
}