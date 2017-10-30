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
var Gold = (function (_super) {
    __extends(Gold, _super);
    function Gold() {
        var _this = _super.call(this) || this;
        _this.key = 'Gold';
        _this.texture = 'game.gold';
        _this.init();
        return _this;
    }
    Gold.prototype.init = function () {
        var gold = this.createBitmap('game.jinbi');
        this.addChild(gold);
    };
    Gold.prototype.pz = function (sceneBox) {
        console.log('吃金币');
        playSound("eatjinbi", 1);
        SCORE++;
        sceneBox.removeChild(this);
    };
    return Gold;
}(DaoJu));
__reflect(Gold.prototype, "Gold");
