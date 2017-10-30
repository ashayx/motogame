class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        soundManager.play("bgm");
    }

    private onAddToStage(event: egret.Event) {
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;


        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {
                // console.log('hello,world')
            }
        });

        // egret.lifecycle.onPause = () => {
        //     egret.ticker.pause();
        // };

        // egret.lifecycle.onResume = () => {
        //     egret.ticker.resume();
        // };

        $.ajax({
            "url": "./resource/default.res.json",
            "dataType": "json",
            "success": (d) => {
                this.onConfigComplete(d);
            }
        });
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(data: any): void {
        let pConf: any = {
            "groups": [
                {
                    "keys": "",
                    "name": "preload"
                }
            ],
            "resources": []
        };

        pConf.resources = data.resources;

        for (let i: number = 0; i < pConf.resources.length; i++) {
            pConf.groups[0].keys += "," + pConf.resources[i].name;
        }

        RES.parseConfig(pConf, "./resource/");

        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);


        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.addChild(this.loadingView);

    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.loadingView.ok(()=>{
                this.removeChild(this.loadingView);
                this.createGameScene();
            });
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);

        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        this.addChild(new WelcomePage);
        // this.addChild(new GamePage());
        // this.addChild(new ResultPage(0));
        // this.addChild(new RulePage(()=>{
        //     this.addChild(new GamePage());
        // }));
    }
}


