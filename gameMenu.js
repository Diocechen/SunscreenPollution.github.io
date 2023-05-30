const gameMenu = {
    key: "gameMenu",
    preload: function(){
        //載入資源 圖片 音樂

        //this指現在的canvas
        //第一個參數是定義ID
        this.load.image("bg1","/Pixel/far.png");
        this.load.image("bg2","/Pixel/sand.png");
        this.load.image("bg3","/Pixel/foreground-1.png");
        
        this.load.image("sub","/Pixel/subM.png");
        
        this.load.image("startBTN","/UI/PlayButton.png");
    },
    create: function(){
        //初始化
        
        //background
        //tileSprite 具有重複特性 x, y, width, height
        this.bg1 = this.add.tileSprite(400,350,800,600,"bg1");
        this.bg1.setScale(2.5, 3.5);
        this.bg2 = this.add.tileSprite(400,370,800,600,"bg2");
        this.bg2.setScale(3, 3.5)
        this.bg3 = this.add.tileSprite(400,370,800,600,"bg3");
        this.bg3.setScale(3, 3.5);

        this.sub = this.add.image(400,450,"sub");
        this.sub.setScale(0.3, 0.3);

        this.startBTN = this.add.image(400, 250, "startBTN");
        this.startBTN.setScale(0.3, 0.3);
        this.startBTN.setInteractive(); //要設定可否互動
        this.startBTN.on("pointerdown",()=>{ //定義匿名函式
            console.log("g g");
            this.scene.start("gameBegin");
        })
    },
    update: function(){
        //background move
        this.bg1.tilePositionX += 0.4;
        this.bg2.tilePositionX += 0.1;
        this.bg3.tilePositionX += 0.07;

    }
}