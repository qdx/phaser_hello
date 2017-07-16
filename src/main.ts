import { sayHello } from "./greet";

function showHello(divName: string, name: string) {
  const elt = document.getElementById(divName);
  elt.innerText = sayHello(name);
}

showHello("greeting", "TypeScript");

var game;


var gameOptions = {

  // width of the game, in pixels
  gameWidth: 2600,

  // height of the game, in pixels
  gameHeight: 1590,

  // background color
  bgColor: 0x444444,
}
window.onload = function() {
  game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight);
  game.state.add("PreloadGame", preloadGame);
  game.state.add("PlayGame", playGame);
  game.state.start("PreloadGame");
}
var preloadGame = function(game){}
preloadGame.prototype = {
  preload: function(){
    game.stage.backgroundColor = gameOptions.bgColor;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.disableVisibilityChange = true;

    // loading level tilemap
    game.load.tilemap("level", 'maze.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image("tile", "wall.png");
    game.load.image("hero", "hero.png");
  },
  create: function(){
    game.state.start("PlayGame");
  }
}
var playGame = function(game){}
playGame.prototype = {
  create: function(){

    // starting ARCADE physics
    // game.physics.startSystem(Phaser.Physics.ARCADE);

    // creatin of "level" tilemap
    this.map = game.add.tilemap("level");

    // adding tiles (actually one tile) to tilemap
    this.map.addTilesetImage("tileset01", "tile");

    // which layer should we render? That's right, "layer01"
    this.mazeLayer = this.map.createLayer("layer01");
    this.mazeLayer.resizeWorld();

    // tile 1 (the black tile) has the collision enabled

    // adding the hero sprite
    this.hero = game.add.sprite(100, 100, "hero");

    // setting hero anchor point
    this.hero.anchor.set(0.5);

    // enabling ARCADE physics for the  hero
    game.physics.enable(this.hero, Phaser.Physics.ARCADE);

    this.hero.body.collideWorldBounds = true;

    this.safetile = -1;
    this.gridsize = 26;
    this.marker = new Phaser.Point();
    // setting hero gravity
    //this.hero.body.gravity.y = gameOptions.playerGravity;

    // setting hero horizontal speed
    //this.hero.body.velocity.x = gameOptions.playerSpeed;

    // the hero can jump
    //this.canJump = false;

    // the hero is not on the wall
    //this.onWall = false;

  },
  update: function () {
    var currentTile = this.map.getTileWorldXY(this.hero.x, this.hero.y, 26, 26, this.mazeLayer, true);
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      var leftTile = this.map.getTileLeft(this.mazeLayer.index, currentTile.x, currentTile.y);
      console.log(leftTile);
      if (leftTile.index == this.safetile) {
        console.log("left moving");
        this.hero.x -= 4;
      }
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      var rightTile = this.map.getTileRight(this.mazeLayer.index, currentTile.x, currentTile.y);
      console.log(rightTile);
      if (rightTile.index == this.safetile) {
        console.log("right moving");
        this.hero.x += 4;
      }
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      var aboveTile = this.map.getTileAbove(this.mazeLayer.index, currentTile.x, currentTile.y);
      console.log(aboveTile);
      if (aboveTile.index == this.safetile) {
        console.log("up moving");
        this.hero.y -= 4;
      }
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      var belowTile = this.map.getTileBelow(this.mazeLayer.index, currentTile.x, currentTile.y);
      console.log(belowTile);
      if (belowTile.index == this.safetile) {
        console.log("down moving");
        this.hero.y += 4;
      }
    }
  }
}
