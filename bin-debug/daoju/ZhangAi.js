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
var Hinder = (function (_super) {
    __extends(Hinder, _super);
    function Hinder() {
        var _this = _super.call(this) || this;
        _this.key = 'Hinder';
        _this.texture = 'game.hinder';
        _this.init();
        return _this;
    }
    Hinder.prototype.init = function () {
        var hinder = this.createBitmap('game.hinder');
        this.addChild(hinder);
    };
    Hinder.prototype.pz = function (sceneBox) {
        console.log('碰撞障碍');
        playSound("game_hit", 1);
        sceneBox.removeChild(this);
        if (FANG) {
            return;
        }
        BLOOD--;
    };
    return Hinder;
}(DaoJu));
__reflect(Hinder.prototype, "Hinder");
