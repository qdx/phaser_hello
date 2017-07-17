(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sayHello(name) {
    return "Hello from " + name + " yes adsf";
}
exports.sayHello = sayHello;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var greet_1 = require("./greet");
function showHello(divName, name) {
    var elt = document.getElementById(divName);
    elt.innerText = greet_1.sayHello(name);
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
};
window.onload = function () {
    game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight);
    game.state.add("PreloadGame", preloadGame);
    game.state.add("PlayGame", playGame);
    game.state.start("PreloadGame");
};
var preloadGame = function (game) { };
preloadGame.prototype = {
    preload: function () {
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
    create: function () {
        game.state.start("PlayGame");
    }
};
var playGame = function (game) { };
playGame.prototype = {
    create: function () {
        // starting ARCADE physics
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);
        //game.physics.p2.restitution(0.8);
        // group collision: https://phaser.io/examples/v2/p2-physics/collision-groups
        //var heroCollisionGroup = game.physics.p2.createCollisionGroup();
        //var wallCollisionGroup = game.physics.p2.createCollisionGroup();
        game.physics.p2.updateBoundsCollisionGroup();
        // creatin of "level" tilemap
        this.map = game.add.tilemap("level");
        // adding tiles (actually one tile) to tilemap
        this.map.addTilesetImage("tileset01", "tile");
        // which layer should we render? That's right, "layer01"
        this.mazeLayer = this.map.createLayer("layer01");
        this.mazeLayer.resizeWorld();
        this.map.setCollision(1);
        // tilemap collision: https://phaser.io/examples/v2/p2-physics/tilemap
        game.physics.p2.convertTilemap(this.map, this.mazeLayer);
        // tile 1 (the black tile) has the collision enabled
        // adding the hero sprite
        this.hero = game.add.sprite(120, 100, "hero");
        game.physics.p2.enable(this.hero);
        game.physics.p2.setBoundsToWorld(true, true, true, true, false);
        this.hero.body.fixedRotation = true;
        //this.hero.body.setCollisionGroup(heroCollisionGroup);
        // setting hero anchor point
        //this.hero.anchor.set(0.5);
        // enabling ARCADE physics for the  hero
        //game.physics.enable(this.hero, Phaser.Physics.ARCADE);
        //this.hero.body.collideWorldBounds = true;
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
                this.hero.body.moveLeft(100);
            }
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            var rightTile = this.map.getTileRight(this.mazeLayer.index, currentTile.x, currentTile.y);
            console.log(rightTile);
            if (rightTile.index == this.safetile) {
                console.log("right moving");
                this.hero.x += 4;
                this.hero.body.moveRight(100);
            }
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            var aboveTile = this.map.getTileAbove(this.mazeLayer.index, currentTile.x, currentTile.y);
            console.log(aboveTile);
            if (aboveTile.index == this.safetile) {
                console.log("up moving");
                this.hero.y -= 4;
                this.hero.body.moveUp(100);
            }
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            var belowTile = this.map.getTileBelow(this.mazeLayer.index, currentTile.x, currentTile.y);
            console.log(belowTile);
            if (belowTile.index == this.safetile) {
                console.log("down moving");
                this.hero.y += 4;
                this.hero.body.moveDown(100);
            }
        }
    }
};

},{"./greet":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZ3JlZXQudHMiLCJzcmMvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsa0JBQXlCLElBQVk7SUFDakMsTUFBTSxDQUFDLGdCQUFjLElBQUksY0FBVyxDQUFDO0FBQ3pDLENBQUM7QUFGRCw0QkFFQzs7Ozs7QUNGRCxpQ0FBbUM7QUFFbkMsbUJBQW1CLE9BQWUsRUFBRSxJQUFZO0lBQzlDLElBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0MsR0FBRyxDQUFDLFNBQVMsR0FBRyxnQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pDLENBQUM7QUFFRCxTQUFTLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBRXBDLElBQUksSUFBSSxDQUFDO0FBR1QsSUFBSSxXQUFXLEdBQUc7SUFFaEIsK0JBQStCO0lBQy9CLFNBQVMsRUFBRSxJQUFJO0lBRWYsZ0NBQWdDO0lBQ2hDLFVBQVUsRUFBRSxJQUFJO0lBRWhCLG1CQUFtQjtJQUNuQixPQUFPLEVBQUUsUUFBUTtDQUNsQixDQUFBO0FBQ0QsTUFBTSxDQUFDLE1BQU0sR0FBRztJQUNkLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNsQyxDQUFDLENBQUE7QUFDRCxJQUFJLFdBQVcsR0FBRyxVQUFTLElBQUksSUFBRSxDQUFDLENBQUE7QUFDbEMsV0FBVyxDQUFDLFNBQVMsR0FBRztJQUN0QixPQUFPLEVBQUU7UUFDUCxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDO1FBQ2pELElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO1FBQ3BELElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxLQUFLLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDO1FBRTFDLHdCQUF3QjtRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9CLENBQUM7Q0FDRixDQUFBO0FBQ0QsSUFBSSxRQUFRLEdBQUcsVUFBUyxJQUFJLElBQUUsQ0FBQyxDQUFBO0FBQy9CLFFBQVEsQ0FBQyxTQUFTLEdBQUc7SUFDbkIsTUFBTSxFQUFFO1FBRU4sMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLG1DQUFtQztRQUVuQyw2RUFBNkU7UUFDN0Usa0VBQWtFO1FBQ2xFLGtFQUFrRTtRQUVsRSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1FBRTdDLDZCQUE2QjtRQUM3QixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXJDLDhDQUE4QztRQUM5QyxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFOUMsd0RBQXdEO1FBQ3hELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV6QixzRUFBc0U7UUFDdEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXpELG9EQUFvRDtRQUVwRCx5QkFBeUI7UUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFFcEMsdURBQXVEO1FBRXZELDRCQUE0QjtRQUM1Qiw0QkFBNEI7UUFFNUIsd0NBQXdDO1FBQ3hDLHdEQUF3RDtRQUV4RCwyQ0FBMkM7UUFFM0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pDLHVCQUF1QjtRQUN2Qix1REFBdUQ7UUFFdkQsZ0NBQWdDO1FBQ2hDLHNEQUFzRDtRQUV0RCxvQkFBb0I7UUFDcEIsdUJBQXVCO1FBRXZCLDhCQUE4QjtRQUM5QixzQkFBc0I7SUFFeEIsQ0FBQztJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckQsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0QixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0IsQ0FBQztRQUNILENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFGLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEMsQ0FBQztRQUNILENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2QixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3QixDQUFDO1FBQ0gsQ0FBQztRQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2QixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMvQixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7Q0FDRixDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBmdW5jdGlvbiBzYXlIZWxsbyhuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gYEhlbGxvIGZyb20gJHtuYW1lfSB5ZXMgYWRzZmA7XG59XG4iLCJpbXBvcnQgeyBzYXlIZWxsbyB9IGZyb20gXCIuL2dyZWV0XCI7XG5cbmZ1bmN0aW9uIHNob3dIZWxsbyhkaXZOYW1lOiBzdHJpbmcsIG5hbWU6IHN0cmluZykge1xuICBjb25zdCBlbHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkaXZOYW1lKTtcbiAgZWx0LmlubmVyVGV4dCA9IHNheUhlbGxvKG5hbWUpO1xufVxuXG5zaG93SGVsbG8oXCJncmVldGluZ1wiLCBcIlR5cGVTY3JpcHRcIik7XG5cbnZhciBnYW1lO1xuXG5cbnZhciBnYW1lT3B0aW9ucyA9IHtcblxuICAvLyB3aWR0aCBvZiB0aGUgZ2FtZSwgaW4gcGl4ZWxzXG4gIGdhbWVXaWR0aDogMjYwMCxcblxuICAvLyBoZWlnaHQgb2YgdGhlIGdhbWUsIGluIHBpeGVsc1xuICBnYW1lSGVpZ2h0OiAxNTkwLFxuXG4gIC8vIGJhY2tncm91bmQgY29sb3JcbiAgYmdDb2xvcjogMHg0NDQ0NDQsXG59XG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gIGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoZ2FtZU9wdGlvbnMuZ2FtZVdpZHRoLCBnYW1lT3B0aW9ucy5nYW1lSGVpZ2h0KTtcbiAgZ2FtZS5zdGF0ZS5hZGQoXCJQcmVsb2FkR2FtZVwiLCBwcmVsb2FkR2FtZSk7XG4gIGdhbWUuc3RhdGUuYWRkKFwiUGxheUdhbWVcIiwgcGxheUdhbWUpO1xuICBnYW1lLnN0YXRlLnN0YXJ0KFwiUHJlbG9hZEdhbWVcIik7XG59XG52YXIgcHJlbG9hZEdhbWUgPSBmdW5jdGlvbihnYW1lKXt9XG5wcmVsb2FkR2FtZS5wcm90b3R5cGUgPSB7XG4gIHByZWxvYWQ6IGZ1bmN0aW9uKCl7XG4gICAgZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSBnYW1lT3B0aW9ucy5iZ0NvbG9yO1xuICAgIGdhbWUuc2NhbGUuc2NhbGVNb2RlID0gUGhhc2VyLlNjYWxlTWFuYWdlci5TSE9XX0FMTDtcbiAgICBnYW1lLnNjYWxlLnBhZ2VBbGlnbkhvcml6b250YWxseSA9IHRydWU7XG4gICAgZ2FtZS5zY2FsZS5wYWdlQWxpZ25WZXJ0aWNhbGx5ID0gdHJ1ZTtcbiAgICBnYW1lLnN0YWdlLmRpc2FibGVWaXNpYmlsaXR5Q2hhbmdlID0gdHJ1ZTtcblxuICAgIC8vIGxvYWRpbmcgbGV2ZWwgdGlsZW1hcFxuICAgIGdhbWUubG9hZC50aWxlbWFwKFwibGV2ZWxcIiwgJ21hemUuanNvbicsIG51bGwsIFBoYXNlci5UaWxlbWFwLlRJTEVEX0pTT04pO1xuICAgIGdhbWUubG9hZC5pbWFnZShcInRpbGVcIiwgXCJ3YWxsLnBuZ1wiKTtcbiAgICBnYW1lLmxvYWQuaW1hZ2UoXCJoZXJvXCIsIFwiaGVyby5wbmdcIik7XG4gIH0sXG4gIGNyZWF0ZTogZnVuY3Rpb24oKXtcbiAgICBnYW1lLnN0YXRlLnN0YXJ0KFwiUGxheUdhbWVcIik7XG4gIH1cbn1cbnZhciBwbGF5R2FtZSA9IGZ1bmN0aW9uKGdhbWUpe31cbnBsYXlHYW1lLnByb3RvdHlwZSA9IHtcbiAgY3JlYXRlOiBmdW5jdGlvbigpe1xuXG4gICAgLy8gc3RhcnRpbmcgQVJDQURFIHBoeXNpY3NcbiAgICBnYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuUDJKUyk7XG4gICAgZ2FtZS5waHlzaWNzLnAyLnNldEltcGFjdEV2ZW50cyh0cnVlKTtcbiAgICAvL2dhbWUucGh5c2ljcy5wMi5yZXN0aXR1dGlvbigwLjgpO1xuXG4gICAgLy8gZ3JvdXAgY29sbGlzaW9uOiBodHRwczovL3BoYXNlci5pby9leGFtcGxlcy92Mi9wMi1waHlzaWNzL2NvbGxpc2lvbi1ncm91cHNcbiAgICAvL3ZhciBoZXJvQ29sbGlzaW9uR3JvdXAgPSBnYW1lLnBoeXNpY3MucDIuY3JlYXRlQ29sbGlzaW9uR3JvdXAoKTtcbiAgICAvL3ZhciB3YWxsQ29sbGlzaW9uR3JvdXAgPSBnYW1lLnBoeXNpY3MucDIuY3JlYXRlQ29sbGlzaW9uR3JvdXAoKTtcblxuICAgIGdhbWUucGh5c2ljcy5wMi51cGRhdGVCb3VuZHNDb2xsaXNpb25Hcm91cCgpO1xuXG4gICAgLy8gY3JlYXRpbiBvZiBcImxldmVsXCIgdGlsZW1hcFxuICAgIHRoaXMubWFwID0gZ2FtZS5hZGQudGlsZW1hcChcImxldmVsXCIpO1xuXG4gICAgLy8gYWRkaW5nIHRpbGVzIChhY3R1YWxseSBvbmUgdGlsZSkgdG8gdGlsZW1hcFxuICAgIHRoaXMubWFwLmFkZFRpbGVzZXRJbWFnZShcInRpbGVzZXQwMVwiLCBcInRpbGVcIik7XG5cbiAgICAvLyB3aGljaCBsYXllciBzaG91bGQgd2UgcmVuZGVyPyBUaGF0J3MgcmlnaHQsIFwibGF5ZXIwMVwiXG4gICAgdGhpcy5tYXplTGF5ZXIgPSB0aGlzLm1hcC5jcmVhdGVMYXllcihcImxheWVyMDFcIik7XG4gICAgdGhpcy5tYXplTGF5ZXIucmVzaXplV29ybGQoKTtcbiAgICB0aGlzLm1hcC5zZXRDb2xsaXNpb24oMSk7XG5cbiAgICAvLyB0aWxlbWFwIGNvbGxpc2lvbjogaHR0cHM6Ly9waGFzZXIuaW8vZXhhbXBsZXMvdjIvcDItcGh5c2ljcy90aWxlbWFwXG4gICAgZ2FtZS5waHlzaWNzLnAyLmNvbnZlcnRUaWxlbWFwKHRoaXMubWFwLCB0aGlzLm1hemVMYXllcik7XG5cbiAgICAvLyB0aWxlIDEgKHRoZSBibGFjayB0aWxlKSBoYXMgdGhlIGNvbGxpc2lvbiBlbmFibGVkXG5cbiAgICAvLyBhZGRpbmcgdGhlIGhlcm8gc3ByaXRlXG4gICAgdGhpcy5oZXJvID0gZ2FtZS5hZGQuc3ByaXRlKDEyMCwgMTAwLCBcImhlcm9cIik7XG4gICAgZ2FtZS5waHlzaWNzLnAyLmVuYWJsZSh0aGlzLmhlcm8pO1xuICAgIGdhbWUucGh5c2ljcy5wMi5zZXRCb3VuZHNUb1dvcmxkKHRydWUsIHRydWUsIHRydWUsIHRydWUsIGZhbHNlKTtcbiAgICB0aGlzLmhlcm8uYm9keS5maXhlZFJvdGF0aW9uID0gdHJ1ZTtcblxuICAgIC8vdGhpcy5oZXJvLmJvZHkuc2V0Q29sbGlzaW9uR3JvdXAoaGVyb0NvbGxpc2lvbkdyb3VwKTtcblxuICAgIC8vIHNldHRpbmcgaGVybyBhbmNob3IgcG9pbnRcbiAgICAvL3RoaXMuaGVyby5hbmNob3Iuc2V0KDAuNSk7XG5cbiAgICAvLyBlbmFibGluZyBBUkNBREUgcGh5c2ljcyBmb3IgdGhlICBoZXJvXG4gICAgLy9nYW1lLnBoeXNpY3MuZW5hYmxlKHRoaXMuaGVybywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcblxuICAgIC8vdGhpcy5oZXJvLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcblxuICAgIHRoaXMuc2FmZXRpbGUgPSAtMTtcbiAgICB0aGlzLmdyaWRzaXplID0gMjY7XG4gICAgdGhpcy5tYXJrZXIgPSBuZXcgUGhhc2VyLlBvaW50KCk7XG4gICAgLy8gc2V0dGluZyBoZXJvIGdyYXZpdHlcbiAgICAvL3RoaXMuaGVyby5ib2R5LmdyYXZpdHkueSA9IGdhbWVPcHRpb25zLnBsYXllckdyYXZpdHk7XG5cbiAgICAvLyBzZXR0aW5nIGhlcm8gaG9yaXpvbnRhbCBzcGVlZFxuICAgIC8vdGhpcy5oZXJvLmJvZHkudmVsb2NpdHkueCA9IGdhbWVPcHRpb25zLnBsYXllclNwZWVkO1xuXG4gICAgLy8gdGhlIGhlcm8gY2FuIGp1bXBcbiAgICAvL3RoaXMuY2FuSnVtcCA9IGZhbHNlO1xuXG4gICAgLy8gdGhlIGhlcm8gaXMgbm90IG9uIHRoZSB3YWxsXG4gICAgLy90aGlzLm9uV2FsbCA9IGZhbHNlO1xuXG4gIH0sXG4gIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHZhciBjdXJyZW50VGlsZSA9IHRoaXMubWFwLmdldFRpbGVXb3JsZFhZKHRoaXMuaGVyby54LCB0aGlzLmhlcm8ueSwgMjYsIDI2LCB0aGlzLm1hemVMYXllciwgdHJ1ZSk7XG4gICAgaWYgKGdhbWUuaW5wdXQua2V5Ym9hcmQuaXNEb3duKFBoYXNlci5LZXlib2FyZC5MRUZUKSkge1xuICAgICAgdmFyIGxlZnRUaWxlID0gdGhpcy5tYXAuZ2V0VGlsZUxlZnQodGhpcy5tYXplTGF5ZXIuaW5kZXgsIGN1cnJlbnRUaWxlLngsIGN1cnJlbnRUaWxlLnkpO1xuICAgICAgY29uc29sZS5sb2cobGVmdFRpbGUpO1xuICAgICAgaWYgKGxlZnRUaWxlLmluZGV4ID09IHRoaXMuc2FmZXRpbGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJsZWZ0IG1vdmluZ1wiKTtcbiAgICAgICAgdGhpcy5oZXJvLmJvZHkubW92ZUxlZnQoMTAwKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoZ2FtZS5pbnB1dC5rZXlib2FyZC5pc0Rvd24oUGhhc2VyLktleWJvYXJkLlJJR0hUKSkge1xuICAgICAgdmFyIHJpZ2h0VGlsZSA9IHRoaXMubWFwLmdldFRpbGVSaWdodCh0aGlzLm1hemVMYXllci5pbmRleCwgY3VycmVudFRpbGUueCwgY3VycmVudFRpbGUueSk7XG4gICAgICBjb25zb2xlLmxvZyhyaWdodFRpbGUpO1xuICAgICAgaWYgKHJpZ2h0VGlsZS5pbmRleCA9PSB0aGlzLnNhZmV0aWxlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicmlnaHQgbW92aW5nXCIpO1xuICAgICAgICB0aGlzLmhlcm8ueCArPSA0O1xuICAgICAgICB0aGlzLmhlcm8uYm9keS5tb3ZlUmlnaHQoMTAwKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZ2FtZS5pbnB1dC5rZXlib2FyZC5pc0Rvd24oUGhhc2VyLktleWJvYXJkLlVQKSkge1xuICAgICAgdmFyIGFib3ZlVGlsZSA9IHRoaXMubWFwLmdldFRpbGVBYm92ZSh0aGlzLm1hemVMYXllci5pbmRleCwgY3VycmVudFRpbGUueCwgY3VycmVudFRpbGUueSk7XG4gICAgICBjb25zb2xlLmxvZyhhYm92ZVRpbGUpO1xuICAgICAgaWYgKGFib3ZlVGlsZS5pbmRleCA9PSB0aGlzLnNhZmV0aWxlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidXAgbW92aW5nXCIpO1xuICAgICAgICB0aGlzLmhlcm8ueSAtPSA0O1xuICAgICAgICB0aGlzLmhlcm8uYm9keS5tb3ZlVXAoMTAwKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoZ2FtZS5pbnB1dC5rZXlib2FyZC5pc0Rvd24oUGhhc2VyLktleWJvYXJkLkRPV04pKSB7XG4gICAgICB2YXIgYmVsb3dUaWxlID0gdGhpcy5tYXAuZ2V0VGlsZUJlbG93KHRoaXMubWF6ZUxheWVyLmluZGV4LCBjdXJyZW50VGlsZS54LCBjdXJyZW50VGlsZS55KTtcbiAgICAgIGNvbnNvbGUubG9nKGJlbG93VGlsZSk7XG4gICAgICBpZiAoYmVsb3dUaWxlLmluZGV4ID09IHRoaXMuc2FmZXRpbGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJkb3duIG1vdmluZ1wiKTtcbiAgICAgICAgdGhpcy5oZXJvLnkgKz0gNDtcbiAgICAgICAgdGhpcy5oZXJvLmJvZHkubW92ZURvd24oMTAwKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==
