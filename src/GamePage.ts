class GamePage extends Page{
    private scene: egret.DisplayObjectContainer;
    private sceneBoxDown: egret.Sprite;
    private sceneBoxTop: egret.Sprite;
    private uiBox: egret.Sprite;

    private overScene: egret.Sprite;

    private carBox: egret.Sprite;
    private enemycarBox: egret.Sprite;

    private DaoJubox: egret.Sprite;
    private DaoJubox2: egret.Sprite;

    private tip: egret.Bitmap;
    private tipRange: number;
    private addScore: egret.TextField;
    private nowSpeed: egret.TextField;
    private allTime: egret.TextField;
    private gameLoopTimer: egret.Timer;
    private removeRange: number;
    private FULLOFBLOOD: number;

    private DaoJuSceneIndex: number;
    private orientation;
    init(): void {
        
        // 设置属性
        this.setUp();

        this.scene = new egret.DisplayObjectContainer();

        this.sceneBoxDown = this.creatSceneBox('bigbg');
        this.sceneBoxTop = this.creatSceneBox('bigbg');
        this.sceneBoxTop.y = -7 * this.height + 10;

        this.DaoJubox = this.createDaoJuBox();

        this.tip = this.createBitmap('game.warning')
        this.tip.x = 150;
        this.tip.y = 100;
        this.tip.width = 60;
        this.tip.height = 60;
        this.tip.alpha = 0;
        
        this.uiBox = this.createUiBox();
        
        this.carBox = this.createCarBox('game.enemycar');
        this.enemycarBox = this.createCarBox('game.mycar');
        this.enemycarBox.y = this.height;

        // 背景,道具添加到scene
        this.scene.addChild(this.sceneBoxTop);
        this.scene.addChild(this.sceneBoxDown);

        this.scene.addChild(this.DaoJubox);
        this.scene.addChild(this.tip);
        this.scene.addChild(this.carBox);
        
       

        
        this.addChild(this.scene);
        this.addChild(this.uiBox);
        this.addChild(this.enemycarBox);
        
        
        

        //创建 DeviceOrientation 类
        var orientation = new egret.DeviceOrientation();
        //添加事件监听器
        orientation.addEventListener(egret.Event.CHANGE, this.onOrientation, this);
        //开始监听设备方向变化
        // orientation.start();
        this.orientation = orientation;
        var timer: egret.Timer = new egret.Timer(1000 / 60, -1);
        //注册事件侦听器
        timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
        //开始计时
        // timer.start();
        this.gameLoopTimer = timer;
        let rule = new RulePage(()=>{
            timer.start();
            orientation.start();
        });
        this.addChild(rule);
        
        // 按键
        window.addEventListener('keydown',  (event)=> {
            if (event.keyCode == 37) {
                this.carBox.x -= 60
                // console.log(this.carBox.x)
            } else if (event.keyCode == 39){
                this.carBox.x += 60
                // console.log(this.carBox.x)
            }
        })
        
        
        
    }
    
    private setUp() {
        FANG = false;
        SCORE = 0;
        BLOOD = 2;
        this.FULLOFBLOOD = BLOOD;
        SPEED = 10;
        USETIME = 0;
        mowanScene = false;
        moyanTip = false;
        clearDaoju = false;
        moyanTipNum = 0;
        this.tipRange = 2500;  // 预警范围
        this.removeRange = 1300; // 激光清屏范围
        this.DaoJuSceneIndex = 0; // 道具场景
        log = console.log.bind(console);
    }
    private isOver:boolean = false;
    private timeNum: number = 60;
    private addSpeedNum: number = 30;
    // 计时器
    private timerFunc() {
        if (this.isOver) return;
        this.timeNum--;

        this.enemycarBox.x  = this.carBox.x;
        if(this.zhaozi) {
            this.zhaozi.x = this.carBox.x - (this.zhaozi.width - this.carBox.width) / 2;
        }
        if(this.yinbo) {
            this.yinbo.x = this.carBox.x +  this.carBox.width / 2;
        }

        if(this.timeNum === 0) {
            USETIME ++;
            this.timeNum = 60;
            this.addSpeedNum--;
            if (this.addSpeedNum == 0) {
                SPEED ++ ;
            }
        }
        if(SPEED >= 30) {
            SPEED = 30;
        }
        this.moveSceneBox();
        this.moveDaoJuBox();
        this.carMoveCheck();
        this.collideCheck();

        this.addScore.text = `累计积分：${SCORE}`;
        this.nowSpeed.text = `当前速度：${SPEED}/km`;
        this.allTime.text = `总共用时：${USETIME}s`;

        // 如果吃到魔玩,变换道具box
        if (mowanScene) {
            this.addDaoJuToScene();
            mowanScene = false;
        }
        //激光清屏
        if (clearDaoju) {
            this.removeFrontDaoju();
        }   
        if (BLOOD === 0) {
            log('die')
            this.orientation.stop();
            this.gameLoopTimer.stop();
            this.isOver = true;

            this.overScene = this.createOverScene();
            this.addChild(this.overScene);
         
        }
        if(this.jiguang) {

            this.jiguang.x = this.carBox.x + this.carBox.width / 2;
        }
       

    }
    // 场景移动
    private moveSceneBox() {
        this.sceneBoxDown.y += SPEED;
        this.sceneBoxTop.y += SPEED;
        
        if (this.sceneBoxDown.y >= this.height) {
            this.sceneBoxDown.y = -7 * this.height + 80;         
        }
        if (this.sceneBoxTop.y >= this.height) {
            this.sceneBoxTop.y = -7 * this.height + 80;
            
        }

    }
    // 道具移动
    private moveDaoJuBox() {
        this.DaoJubox.y += SPEED;
        // log(this.DaoJubox.numChildren, this.DaoJubox.y, 'box')
        if (this.DaoJubox.numChildren === 0 && this.DaoJubox.y >= 0) { // 其他条件
            mowanScene = false;
            if( this.eatJinbi) {
                this.scene.removeChild(this.carBox); //
                this.changeScene();
                this.scene.addChild(this.carBox);
                this.eatJinbi = false;
            }

            this.addDaoJuToScene();
          
        }
    }
    private eatJinbi:boolean= false;
    // 车移动到边框检测
    private carMoveCheck() {
        let carWidth = this.carBox.width;
        if (this.carBox.x < 145) {
            this.carBox.x = 145;
            // BLOOD --;
        } else if (this.carBox.x + carWidth > 510) {
            this.carBox.x = 510 - carWidth;
            // BLOOD--;
        }
    }
    // 碰撞检测
    private collideCheck() {
        for (let i: number = 0; i < this.DaoJubox.numChildren; i++) {
            let dj: DaoJu = <DaoJu>this.DaoJubox.getChildAt(i);
            // log(dj, i)
            // 检测坐标
            if (this.DaoJubox.y + dj.y + dj.height >= this.carBox.y && this.DaoJubox.y + dj.y <= this.carBox.y + this.carBox.height) {
                if (this.carBox.x + this.carBox.width > dj.x && this.carBox.x < dj.x + dj.width){
                    dj.pz(this.DaoJubox); 

                    if (dj.key === 'Hinder') {
                        // 血条动画
                        if (!FANG) {
                            let hpheight = this.HpLength * (1 - BLOOD / this.FULLOFBLOOD);
                            egret.Tween.get(this.cutHp).to({ y: hpheight }, 1000);
                        }
                        // 敌人车前进动画
                        egret.Tween.get(this.enemycarBox)
                            .to({ y: this.height - 120 }, 500)
                            .to({ y: this.height - 50 }, 500).wait(3000).to({ y: this.height }, 500)
                        // 罩子减血
                        if(this.zhaozi) {
                            this.zhaozi.alpha -= 0.34;
                            log(this.zhaozi.alpha)
                            if(this.zhaozi.alpha <= 0 && this.zhaozi != null) {
                                FANG = false;
                                this.removeChild(this.zhaozi)
                                this.zhaozi = null;
                            }
                        }

                    } else if (dj.key === 'MoDian') {
                       
                        //防御罩
                        if(this.zhaozi ) {
                            this.removeChild(this.zhaozi);
                            this.zhaozi = null;
                        }
                        this.fangyu(this.carBox.x); 

                    } else if (dj.key === 'MoYin') {
                        // 音波清屏
                        this.yinboAni(this.carBox.x);
                       
                    }else if (dj.key != 'Gold' ) {
                        // 变身
                        this.changeCarBox(this.carBox.x,dj.texture)
                    } 
                    
                    log(BLOOD)
                }
            } else if (this.DaoJubox.y + dj.y >= this.height && dj != null) {  
                this.DaoJubox.removeChild(dj);
            }
            // 魔眼预警提示
            if (moyanTip) {
                this.createTip(dj)
            }
            // 激光扫射
            if(this.jiguang) {
                if (this.DaoJubox.y + dj.y + dj.height >= 0 && dj.key === 'Hinder' && this.DaoJubox.y + dj.y + dj.height < this.height -300) {
                    if(this.jiguang.x + this.jiguang.width > dj.x  && this.jiguang.x < dj.x + dj.width ) {
                        if(dj) {
                            playSound("gamejiguang.wav", 1);
                            this.DaoJubox.removeChild(dj);
                            log('激光杀死')

                        }
                        
                    }
                }
            }
            // 音波
            if (this.yinbo && dj != null) {
                if (this.DaoJubox.y + dj.y + dj.height >= this.yinbo.y - this.yinbo.width * this.yinbo.scaleX + 100 && this.DaoJubox.y + dj.y  <= this.yinbo.y + this.yinbo.width * this.yinbo.scaleX -100) {
                    if (dj.x + dj.width >= this.yinbo.x - this.yinbo.width * this.yinbo.scaleX && dj.x <= this.yinbo.x + this.yinbo.width * this.yinbo.scaleX)
                        if(dj.key == 'Hinder') {

                            this.DaoJubox.removeChild(dj)
                            log('音波杀死')
                        }
                }
            }
          
        }
        
    }
    // 提示
    private createTip(dj) {
     
        if (this.DaoJubox.y + dj.y + dj.height >= -this.tipRange) {

            if (dj.key == 'Hinder') {
                playSound("game_warning", 1);
                this.tip.x = dj.x;
                egret.Tween.get(this.tip)
                    .to({ alpha: 1 }, 500).to({ alpha: 0 }, 500)
                    .to({ alpha: 1 }, 500).to({ alpha: 0 }, 500)
                    .to({ alpha: 1 }, 500).to({ alpha: 0 }, 500)
                    .to({ alpha: 1 }, 500).to({ alpha: 0 }, 500)
                moyanTipNum++;
            }
        }

        if (moyanTipNum === 4) {
            moyanTip = false;

        }
        
    }
    // 清屏道具
    private removeFrontDaoju() {
        clearDaoju = false;

        this.jiguangAni(this.carBox.x + this.carBox.width / 2);

        
    }
    // 防御罩
    private zhaozi: egret.Bitmap 
    private fangyu(x) {
        FANG = true;
        this.zhaozi = this.createBitmap('game.fangyu');
        this.zhaozi.x = x - (this.zhaozi.width - this.carBox.width) /2;
        this.zhaozi.y = this.height - 420;
        this.zhaozi.alpha = 1;
        this.addChild(this.zhaozi);
    }
    //音波
    private yinbo;
    private yinboAni(x) {
        this.yinbo = this.createBitmap("game.yinbo");
        this.yinbo.anchorOffsetX = this.yinbo.width / 2;
        this.yinbo.anchorOffsetY = this.yinbo.height / 2;
        this.yinbo.x = x + this.carBox.width /2;
        this.yinbo.y = this.height - 300;
        this.yinbo.scaleX = 0.005;
        this.yinbo.scaleY = 0.005;
        this.addChild(this.yinbo);

        egret.Tween.get(this.yinbo)
            .to({ scaleY: 1.8, scaleX: 1.8 }, 1500)
            .to({ scaleY: 0.01, scaleX: 0.01 }, 0)
            .to({ scaleY: 1.8, scaleX: 1.8 }, 1500)
            .to({ scaleY: 0.01, scaleX: 0.01 }, 0)
            .to({ scaleY: 1.8, scaleX: 1.8 }, 1500).call(() => {
                this.removeChild(this.yinbo);
                this.yinbo = null;
            })
        
        
    }
    // 计时结束
    private timerComFunc() {
        console.log("计时结束");
    }
    // 陀螺仪
    private onOrientation(e: egret.OrientationEvent) {
        this.carBox.x += e.gamma;
        this.carMoveCheck();
    }
    // 主车
    private createCarBox(texture):egret.Sprite{
        let carBox = new egret.Sprite();
        carBox.y = this.height - 300;
        carBox.x = 180;
        
        let car = this.createBitmap(texture);
        carBox.width = car.width;
        carBox.height = car.height;
        
        let lighting = this.createBitmap('game.lighting');
        lighting.x = -(lighting.width - car.width) / 2 - 10;
        lighting.y = -lighting.height + 20;
        
        egret.Tween.get(lighting,{loop: true})
            .to({ alpha: 0 }, 500)
            .to({ alpha: 1 }, 500)
            .to({ alpha: 0 }, 500)
            .to({ alpha: 1 }, 500)
            .wait(3000)

        carBox.addChild(lighting);
        carBox.addChild(car);
        return carBox;
    }
    // 变身
    private changeCarBox(x,texture) {
        egret.Tween.get(this.carBox).call(()=>{
            this.scene.removeChild(this.carBox);
            this.carBox = this.createCarBox(texture);
            this.carBox.x = x;
            this.scene.addChild(this.carBox);
        }).to({ alpha: 0 }, 150).to({ alpha: 1 }, 150)           
    }
    // 游戏背景
    private creatSceneBox(texture): egret.Sprite {

        let sceneBox = new egret.Sprite();
        sceneBox.y = -3 * this.height;

        let bg = this.createBitmap(texture);
        bg.width = this.width;
        bg.height = this.height * 4;
        
        sceneBox.addChild(bg);
        
        return sceneBox;
    }
    // 道具box场景
    private createDaoJuBox(): egret.Sprite {
        let box = new egret.Sprite();
        box.height = 8 * this.height;
        box.y = -7 * this.height;
        // 如果是金币场景mowanscene 创建金币
        let randomNum = this.randomBetwen(1,4);
        if(mowanScene) {
            this.changeScene();
            this.createMowanScene(box);
        }else {
            if(this.DaoJuSceneIndex === 0) {
                if (randomNum < 100 ) {
                    //变音乐
                    let moyin: DaoJu = new MoYin();
                    moyin.x = 295;
                    moyin.y = 3000;
                    box.addChild(moyin);
                }
                // 清屏
                // let moying: DaoJu = new MoYing();
                // moying.x = 195;
                // moying.y = 5500;
                // box.addChild(moying);
            } else if (this.DaoJuSceneIndex === 1) {
                if (randomNum != 0) {
                    
                    // 加血
                    let modian: DaoJu = new MoDian();
                    modian.x = 295;
                    modian.y = 2000;
                    box.addChild(modian);
                }
                if (randomNum != 0) {

                  // 清屏
                    let moying: DaoJu = new MoYing(); ///
                    moying.x = 195;
                    moying.y = 3500;
                    box.addChild(moying);
                }
               
                // // 提示
                let moyan: DaoJu = new MoYan();
                moyan.x = 195;
                moyan.y = 5000;
                box.addChild(moyan);
                
            } else if (this.DaoJuSceneIndex === 2) {
                // 加速
                let molun: DaoJu = new MoLun();
                molun.x = 295;
                molun.y = 6500;
                box.addChild(molun);

                if (randomNum < 100) {
                    // // 变金币场景
                    let mowan: DaoJu = new MoWan();
                    mowan.x = 195;
                    mowan.y = 1600;
                    box.addChild(mowan);
                }
               
            }
            // 加血
            // let modian: DaoJu = new MoYin();
            // modian.x = 295;
            // modian.y = 7000;
            // box.addChild(modian);
            // 障碍
            for (let i = 0; i < 11; i++) {
                let hinder: DaoJu = new Hinder();
                hinder.x = this.randomBetwen(165, 395);
                hinder.y = 650 * i;
                box.addChild(hinder);
            }
      
        }
        return box;
    }
    // 激光动画
    private jiguang: egret.Bitmap;

    private jiguangAni(x) {

            // this.jiguang = new egret.Shape();
            // this.jiguang.graphics.beginFill(0xb39bfb);
            // this.jiguang.graphics.drawRect(0, 0, 20, this.height - 300);
            // this.jiguang.x = x ;
            // this.jiguang.anchorOffsetX = this.jiguang.width / 2;
            // this.jiguang.anchorOffsetY = this.height - 300;
            // this.jiguang.x += this.jiguang.anchorOffsetX ;
            // this.jiguang.y += this.jiguang.anchorOffsetY;
            // // this.jiguang.scaleX = 0.005;
            // this.jiguang.scaleY = 0.01;
            // this.jiguang.graphics.endFill();
            // this.addChild(this.jiguang);

            this.jiguang = this.createBitmap("game.jiguang");
            this.jiguang. height = this.height - 300;
            this.jiguang.x = x;
            this.jiguang.anchorOffsetX = this.jiguang.width / 2;
            this.jiguang.anchorOffsetY = this.height - 300;
            this.jiguang.x += this.jiguang.anchorOffsetX ;
            this.jiguang.y += this.jiguang.anchorOffsetY;
            // this.jiguang.scaleX = 0.005;
            this.jiguang.scaleY = 0.01;
            this.addChild(this.jiguang);

            egret.Tween.get(this.jiguang)
                .to({ scaleY: 1, alpha: 0.7 }, 200).call(() => {
                    playSound("gamejiguang.wav", 1);
                })
                .wait(5000).call(()=>{
                    this.removeChild(this.jiguang);
                    this.jiguang = null;
                })
    }
    // 场景变白
    private gamebgIndex: number = 1;

    private changeScene() {
        // 变背景
        this.gamebgIndex ++;
        this.scene.removeChild(this.sceneBoxDown);
        this.scene.removeChild(this.sceneBoxTop);
        if(!mowanScene ) {
            this.sceneBoxDown = this.creatSceneBox('bigbg');
            this.sceneBoxTop = this.creatSceneBox('bigbg');
        }else {
            this.sceneBoxDown = this.creatSceneBox('bigbg1');
            this.sceneBoxTop = this.creatSceneBox('bigbg1');
        }
        this.sceneBoxTop.y = -7 * this.height + 10;
        this.scene.addChild(this.sceneBoxDown);
        this.scene.addChild(this.sceneBoxTop);
        

        let ani = new egret.Shape();
        ani.graphics.beginFill(0xffffff);
        ani.graphics.drawRect(0, 0, this.width , this.height);
        ani.graphics.endFill();
        ani.alpha = 0;
        this.addChild(ani);

        egret.Tween.get(ani)
            .to({ alpha: 1 }, 400)
            .to({ alpha: 0 }, 400).call(() => {
                this.removeChild(ani);
            })

    }
    // 血条
    private cutHp: egret.Shape;
    private HpLength: number;
   
    private createHpBar(): egret.Sprite {
        let box = new egret.Sprite();
        box.x = 30;
        box.y = this.height - 600;

        let barborder = this.createBitmap('game.hp');
        let bar = this.createBitmap('game.hp');
        this.HpLength = bar.height;

        this.cutHp = new egret.Shape ();
        this.cutHp.graphics.beginFill(0xff0000);
        this.cutHp.graphics.drawRect(0, 0, bar.width, bar.height);
        this.cutHp.graphics.endFill();
        bar.mask = this.cutHp;


        box.addChild(barborder);
        box.addChild(bar);
        box.addChild(this.cutHp)
        
        

        return box;

    }
    // 创建魔玩金币场景
    private createMowanScene(box) {
        this.eatJinbi = true;
        // 金币
        for (let i = 0; i < 40; i++) {
            let jinbi: DaoJu = new Gold();
            // if (i <= 15) {
            //     jinbi.x = 200;
            // } else {
            //     jinbi.x = 355;
            // }
            jinbi.x = this.randomBetwen(150,380)
            jinbi.y = 1200 + 150 * i;
            box.addChild(jinbi);
            
        }

        let molun: DaoJu = new MoLun();
        molun.x = 295;
        molun.y = 1000;
        box.addChild(molun);

    }
    // ui box 
    private createUiBox():egret.Sprite {
        let box = new egret.Sprite();
        box.width = .84 * this.width;
        box.x = .08 * this.width;
        box.y = this.height * .05;

        let topbar = this.createBitmap('game.topbar');
        topbar.width = box.width;
        let scoreBox = this.createBitmap('game.textbox');
        scoreBox.x = 0;
        scoreBox.y = 10;
        let speedBox = this.createBitmap('game.textbox');
        speedBox.x = 190;
        speedBox.y = 10;
        let timeBox = this.createBitmap('game.textbox');
        timeBox.x = 380;
        timeBox.y = 10;

        box.addChild(topbar);
        box.addChild(scoreBox);
        box.addChild(speedBox);
        box.addChild(timeBox);

        this.addScore = new egret.TextField();
        this.addScore.x = 30;
        this.addScore.y = 17;
        this.addScore.scaleX = this.addScore.scaleY = 0.6;
        this.addScore.text = `累计积分：${SCORE}`;
        box.addChild(this.addScore);

        this.nowSpeed = new egret.TextField();
        this.nowSpeed.x = 205;
        this.nowSpeed.y = 17;
        this.nowSpeed.scaleX = this.nowSpeed.scaleY = 0.6;
        this.nowSpeed.text = `当前速度：${SPEED}/km`;
        box.addChild(this.nowSpeed);

        this.allTime = new egret.TextField();
        this.allTime.x = 410;
        this.allTime.y = 17;
        this.allTime.scaleX = this.allTime.scaleY = 0.6;
        this.allTime.text = `总共用时：${USETIME}s`;
        box.addChild(this.allTime);

        let hp = this.createHpBar();
        box.addChild(hp);
        return box;
    }
    
    // GAMEOVER 
    private createOverScene(): egret.Sprite {
        let box = new egret.Sprite();
        box.width = this.width;
        box.height = this.height;

        let bg = new egret.Shape();
        bg.graphics.beginFill(0x000000);
        bg.graphics.drawRect(0, 0, box.width, box.height );
        bg.alpha = 0.6;
        bg.graphics.endFill();
        box.addChild(bg);

        let over = this.createBitmap('game.gameover');
        // over.width = this.width * .6;
        over.x = (this.width - over.width) /2;
        over.y = this.height * .3;
        box.addChild(over);
        
        box.touchEnabled = true;
        box.once(egret.TouchEvent.TOUCH_TAP,()=>{
            this.cutHp = null;
            this.changePage(new ResultPage(SCORE));
        },this);

        return box;
    }
    // 随机数
    private randomBetwen(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
    }
    //添加道具到场景
    private addDaoJuToScene() {
        this.DaoJuSceneIndex ++;
        if(this.DaoJuSceneIndex >= 3) {
            this.DaoJuSceneIndex = 0;
        }
        this.scene.removeChild(this.DaoJubox);
        this.DaoJubox = this.createDaoJuBox();
        this.scene.addChild(this.DaoJubox);
    }
    
}

declare let SPEED: number;
declare let SCORE: number;
declare let BLOOD: number;
declare let USETIME: number;
declare let mowanScene: boolean;
declare let moyanTip: boolean;
declare let clearDaoju: boolean;
declare let moyanTipNum: number;
declare let log: any;

declare let addScore: () => void;
declare let FANG: boolean;

