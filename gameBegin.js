// 生成掉落物
function generateDropItem() {
    const x = 600; // 控制生成的初始X座標
  
    // 随機Y座標
    const y = Phaser.Math.Between(50, game.config.height - 50);
  
    //宣告掉落物 加入群組
    const dropItem = this.dropItems.create(x, y, 'dropItem');
    dropItem.setVelocityX(-200); // 设置掉落物的水平速度
    dropItem.setVelocityY(0);
    dropItem.setScale(0.1);
}

// 生成物的碰撞檢測函式
function collectDropItem(player, dropItem) {
    dropItem.destroy(); //刪掉落物
    
    this.score += 5;
    // 更新記分板
    this.scoreText.setText('Score: ' + this.score);
}

// 遊戲結束
function endGame() {
    // 暂停
    this.scene.pause();
  
    // 顯示分數在畫面中間
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;
    const gameOverText = this.add.text(centerX, centerY, 'Game Over\nScore: ' + this.score, {
      fontSize: '48px',
      fill: '#fff',
      align: 'center'
    });
    gameOverText.setOrigin(0.5);
  
    // 退出場景
    this.time.addEvent({
      delay: 2000, // 延遲兩秒
      callback: function() {
        this.scene.stop();
      },
      callbackScope: this
    });
  }

const gameBegin = { //遊戲開始物件
    key: "gameBegin",
    preload: function(){
        //載入資源 圖片 音樂

        //this指現在的canvas
        //第一個參數是定義ID
        this.load.image("bg1","/Pixel/far.png");
        this.load.image("bg2","/Pixel/sand.png");
        this.load.image("bg3","/Pixel/foreground-1.png");
        this.load.spritesheet("sub","/Pixel/subM.png",{frameWidth: 550, frameHeight:400});
        //sprite sheet可以處理動畫

        this.load.image("dropItem", "/Pixel/PABA.png");
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

        //character
        this.sub = this.physics.add.sprite(400,350,"sub");
        this.sub.setScale(0.3, 0.3);
        this.sub.setSize(500,450,0); //碰撞大小
        this.sub.body.allowGravity = false;

        this.sub.setCollideWorldBounds(true);

        this.dropItems = this.physics.add.group(); //掉落物的群組
        this.physics.add.collider(this.sub, this.dropItems, collectDropItem, null, this); //設置碰撞

        //持續執行
        this.time.addEvent({
            delay: 1000, // 生成掉落物的时間間隔，毫秒
            callback: generateDropItem,
            callbackScope: this,
            loop: true 
          });

        // 初始化
        this.score = 0;
        // 記分板
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });

        // 計時器
        this.timer = this.time.addEvent({
            delay: 60000, // 计时器的时间间隔，单位为毫秒
            callback: endGame,
            callbackScope: this
        });
        this.timerText = this.add.text(780, 16, 'Time: 60', { fontSize: '32px', fill: '#fff' });
        this.timerText.setOrigin(1, 0); //設置錨點
    },
    update: function(){
        //background move
        this.bg1.tilePositionX += 0.4;
        this.bg2.tilePositionX += 0.1;
        this.bg3.tilePositionX += 0.07;
        
        //keyboard input
        let keyboardInput = this.input.keyboard.createCursorKeys();

        if (keyboardInput.up.isDown) {
            this.sub.setVelocityY(-200);
        } else if (keyboardInput.down.isDown) {
            this.sub.setVelocityY(200);
        } else {
            this.sub.setVelocityY(0);
        }
    
        if (keyboardInput.left.isDown) {
            this.sub.setVelocityX(-200);
            this.sub.flipX = true;
        } else if (keyboardInput.right.isDown) {
            this.sub.setVelocityX(200);
            this.sub.flipX = false;
        } else {
            this.sub.setVelocityX(0);
        }

        //旋轉角度
        if((keyboardInput.up.isDown && keyboardInput.right.isDown)){
            this.sub.setRotation(Phaser.Math.DegToRad(-45));
        }else if((keyboardInput.up.isDown && keyboardInput.left.isDown)){
            this.sub.setRotation(Phaser.Math.DegToRad(45));    
        }else if((keyboardInput.down.isDown && keyboardInput.right.isDown)){
            this.sub.setRotation(Phaser.Math.DegToRad(45));
        }else if((keyboardInput.down.isDown && keyboardInput.left.isDown)){
            this.sub.setRotation(Phaser.Math.DegToRad(-45));
        }else{
            this.sub.setRotation(Phaser.Math.DegToRad(0));
        }

        this.dropItems.children.each(function(dropItem) {
            if (dropItem.active && dropItem.x < -100) {
              dropItem.destroy(); // 超出屏幕時刪除掉落物
            }
        }, this);
        
        //從timer獲得剩餘的時間 並且更新至畫面
        const remainingTime = this.timer.getRemainingSeconds();
        this.timerText.setText('Time: ' + remainingTime.toFixed(0));
    }
}