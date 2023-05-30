const config = { //設定遊戲的canvas
    type: Phaser.AUTO, //渲染引擎的模式，支不支援webgl
    width: 800, //遊戲的框
    height: 600,
    parent: 'game-container', //如果不填此欄位就會把canvas都到body上。
    physics:{ //物理
        default: "arcade",
        arcade:{
            gravity:{
                y: 0 //沒有重力
            },
            debug: false //碰撞框線
        }
    },
    scene: [ //儲存場景
        gameMenu,
        gameBegin
    ]
}
const game = new Phaser.Game(config); //設定遊戲實體，會把canvas的設定套用到 parent內