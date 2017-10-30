class EnemyCar extends DaoJu {
    constructor() {
        super();
        this.init();
    }

    private init() {
        
        let car = this.createBitmap('game.enemycar');
        this.width = car.width;
        this.height = car.height;

        let lighting = this.createBitmap('game.lighting');
        lighting.x = -(lighting.width - car.width) / 2 - 10;
        lighting.y = -lighting.height + 20;

        egret.Tween.get(lighting, { loop: true })
            .to({ alpha: 0 }, 500)
            .to({ alpha: 1 }, 500)
            .to({ alpha: 0 }, 500)
            .to({ alpha: 1 }, 500)

        this.addChild(lighting);
        this.addChild(car);
        
    }

    pz(sceneBox: egret.Sprite): void {
        console.log('碰撞障碍');
        playSound("game_eat_daoju.wav", 1);
        sceneBox.removeChild(this);
        BLOOD--;

    }
    key = 'EnemyCar';
    texture = 'game.enemycar';
}