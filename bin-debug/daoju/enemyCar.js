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
var EnemyCar = (function (_super) {
    __extends(EnemyCar, _super);
    function EnemyCar() {
        var _this = _super.call(this) || this;
        _this.key = 'EnemyCar';
        _this.texture = 'game.enemycar';
        _this.init();
        return _this;
    }
    EnemyCar.prototype.init = function () {
        var car = this.createBitmap('game.enemycar');
        this.width = car.width;
        this.height = car.height;
        var lighting = this.createBitmap('game.lighting');
        lighting.x = -(lighting.width - car.width) / 2 - 10;
        lighting.y = -lighting.height + 20;
        egret.Tween.get(lighting, { loop: true })
            .to({ alpha: 0 }, 500)
            .to({ alpha: 1 }, 500)
            .to({ alpha: 0 }, 500)
            .to({ alpha: 1 }, 500);
        this.addChild(lighting);
        this.addChild(car);
    };
    EnemyCar.prototype.pz = function (sceneBox) {
        console.log('碰撞障碍');
        playSound("game_eat_daoju.wav", 1);
        sceneBox.removeChild(this);
        BLOOD--;
    };
    return EnemyCar;
}(DaoJu));
__reflect(EnemyCar.prototype, "EnemyCar");
