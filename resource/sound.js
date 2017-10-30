/**
 * 音频管理器
 * @type {{soundList: {}, mute: boolean, setMute: soundManager.setMute, play: soundManager.play, put: soundManager.put, pause: soundManager.pause, stop: soundManager.stop, pauseAll: soundManager.pauseAll, resumeAll: soundManager.resumeAll}}
 */
var soundManager = {
    soundList: {},
    mute: false,
    lastbgmname: null,
    setMute: function (bol) {
        this.mute = bol;
        if (bol == true) {
            this.pauseAll();
        } else if (bol == false) {
            this.resumeAll();
        }
        else {
            console.warn("无效的参数!(请传入true or false)");
        }
    },
    play: function (soundKey) {
        if (this.lastbgmname && this.lastbgmname != null) {
            this.pause(this.lastbgmname);
        }
        this.lastbgmname = soundKey;

        try {
            var a = this.soundList[soundKey];
            a.load();
            a.loop = true;
            a.currentTime = 0;
            a.play();
            if (this.mute) {
                a.pause();
            } else {
                // egret.Tween.removeTweens(a);
                // a.volume = 0;
                // egret.Tween.get(a).to({"volume": 1}, 1000);
            }
            return this.soundList[soundKey];
        } catch (e) {
            console.warn("播放遇到问题:" + e.message);
        }
    },
    put: function (soundKey, soundUrl) {
        var s = this.soundList[soundKey] = new Audio();
        s.loop = true;
        s.src = soundUrl;
        s.load();
    },
    pause: function (soundKey) {
        this.soundList[soundKey].pause();
    },
    pauseAll: function () {
        for (var s in this.soundList) {
            this.pause(s);
        }
    },
    resumeAll: function () {
        if (this.mute || !this.lastbgmname || this.lastbgmname == null || !this.soundList[this.lastbgmname] || this.soundList[this.lastbgmname] == null) return;
        this.soundList[this.lastbgmname].play(this.lastbgmname);
    }
};

var _selectorStr;
function initSoundController(selectorStr) {
    _selectorStr = selectorStr;
    var isPlay = true;
    $(selectorStr).click(function () {
        if (isPlay) {
            isPlay = false;
            $(selectorStr).attr("src", "./resource/audio_off.png");
            $(selectorStr).removeClass("audio_on");
            $(selectorStr).addClass("audio_off");
            soundManager.setMute(true);
        } else {
            isPlay = true;
            $(selectorStr).attr("src", "./resource/audio_on.gif");
            $(selectorStr).removeClass("audio_off");
            $(selectorStr).addClass("audio_on");
            soundManager.setMute(false);
        }
    });

}


audioBtnShowFunc = function () {
    $(_selectorStr).show();
    $(_selectorStr).css("opacity", 1);
};

audioBtnHideFunc = function () {
    $(_selectorStr).css("opacity", .3);
    $(_selectorStr).hide();
};