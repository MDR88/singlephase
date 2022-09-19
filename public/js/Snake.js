export default class Snake {
  constructor(scene) {
    this.scene = scene; //A scene property that passes into the object.
    this.lastMoveTime = 0;
    this.moveInterval = 100;
    this.tileSize = 16;
    this.direction = Phaser.Math.Vector2.DOWN; //A Property
    this.body = []; // Open array
    this.body.push(
      this.scene.add
        .rectangle(
        this.scene.game.config.width / 2, 
        this.scene.game.config.height / 2,
        this.tileSize, 
        this.tileSize, 
        0xff0000
        )
        .setOrigin(0)
    );

    // Created a Green apple
    this.apple = this.scene.add
      .rectangle(0, 0, this.tileSize, this.tileSize, 0x00ff00)
      .setOrigin(0);      
      this.positionApple(); //Method to randomly spawn apple
    scene.input.keyboard.on("keydown", e => {
      this.keydown(e);
    });
  }
  positionApple() {
    //Sets position of apple and multiply by width of the game "config 16"
    this.apple.x = 
    Math.floor((Math.random() * this.scene.game.config.width) / this.tileSize
    ) * this.tileSize;
        this.apple.y = 
    Math.floor(
        (Math.random() * this.scene.game.config.height) / this.tileSize
    ) * this.tileSize;    
  }

  // Changes directon of snake and prevents snake from eating itslf by going opposite direction.
  keydown(event) {
    console.log(event);
    switch (event.keyCode) {
      case 37: //Left
        if (this.direction !== Phaser.Math.Vector2.RIGHT)
         this.direction = Phaser.Math.Vector2.LEFT;
        break;
      case 38: //UP
      if (this.direction !== Phaser.Math.Vector2.DOWN)
        this.direction = Phaser.Math.Vector2.UP;
        break;
      case 39: //Right
      if (this.direction !== Phaser.Math.Vector2.LEFT)
        this.direction = Phaser.Math.Vector2.RIGHT;
        break;
      case 40: //Down
      if (this.direction !== Phaser.Math.Vector2.UP)
        this.direction = Phaser.Math.Vector2.DOWN;
        break;
    }
  }
  update(time) {
    if (time >= this.lastMoveTime + this.moveInterval) {
      this.lastMoveTime = time;
      this.move();
    }
  }
  //Compare where snakes head is compared to the apple, if the two are the same
    // then snake eats apple
  move() {
        let x = this.body[0].x + this.direction.x * this.tileSize;
        let y = this.body[0].y + this.direction.y * this.tileSize;

        if(this.apple.x === x && this.apple.y === y){
            //eat the apple and add white
            this.body.push(this.scene.add.rectangle(0,0, this.tileSize,this.tileSize,0xffffff).setOrigin(0));
            this.positionApple();
        }


    for (let index = this.body.length - 1; index > 0; index--) {
      this.body[index].x = this.body[index - 1].x;
      this.body[index].y = this.body[index - 1].y;
    }
    this.body[0].x = x;
    this.body[0].y = y;
    // Death to snake by going off screen
    if (this.body[0].x < 0 || this.body[0].x >= this.scene.game.config.width || this.body[0].y < 0 || this.body[0].y >= this.scene.game.config.height
        ) {
       this.scene.scene.restart();
    } 
    // Death by eating own tail if head position is equal to any
    let tail = this.body.slice(1);
    if (tail.some(s => s.x === this.body[0].x && s.y === this.body[0].y)    
    ) {
        this.scene.scene.restart();
    }
  }
}