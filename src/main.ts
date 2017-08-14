
import { setOnDownCallback } from "./ts/input";
import { setOnUpCallback } from "./ts/input";
import { DrawBomber } from "./ts/drawBomber";
import { BomberDirection } from "./ts/drawBomber";
import { isMovingKeyPress } from "./ts/drawBomber";
import { DrawWall } from "./ts/drawWall";
import { CheckInCell } from "./ts/checkInCell";
import { DrawBomb } from "./ts/drawBomb";
import { DrawExplosion } from "./ts/drawExplosion";
import { AddExplosion } from "./ts/drawExplosion";
import { CheckNextMovePosible } from "./ts/checkNextMovePosible";

//global configuration
var gameWidth = 1300; 
var gameHeight = 700;
var frameTime = 50;
var bombTime = 3000;
var lengthOfExplosion = 3;
var nRow;
var nCol;

var mapData = [
    [0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 2, 0, 0, 0, 1, 0, 0, 0],
    [0, 2, 0, 2, 0, 2, 1, 2, 0, 2, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 0],
    [1, 1, 1, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 1, 2, 0, 2, 1, 2, 0, 2, 0, 2, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 2, 1, 0, 1, 0, 0],
    [0, 2, 0, 2, 0, 2, 1, 2, 0, 2, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 0],
    [1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 3, 1, 0, 1, 0, 0],
    [1, 2, 0, 2, 3, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 3, 2, 0, 0],
    [0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0],
    [0, 2, 0, 2, 0, 1, 0, 2, 0, 2, 2, 0, 2, 0, 1, 0, 2, 0, 1, 2, 1, 2, 2, 0, 1, 0, 0],
    [0, 2, 0, 2, 0, 2, 0, 2, 0, 1, 2, 0, 1, 0, 1, 0, 2, 0, 2, 0, 1, 0, 2, 0, 2, 0, 2],
    [0, 1, 0, 2, 0, 1, 0, 2, 0, 2, 2, 0, 2, 0, 2, 0, 2, 0, 1, 1, 1, 0, 2, 0, 1, 0, 0],
    [0, 0, 1, 0, 1, 0, 0, 0, 3, 1, 0, 3, 1, 0, 1, 1, 1, 1, 1, 2, 0, 0, 0, 1, 0, 0, 0],
    [0, 2, 0, 2, 0, 2, 1, 2, 0, 2, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 0],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 1, 2, 0, 2, 1, 2, 0, 2, 0, 2, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 2, 1, 0, 1, 0, 0],
    [0, 2, 0, 2, 0, 2, 1, 2, 0, 2, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 0],
    [1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 3],
    [1, 2, 0, 2, 0, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0]
]

var grassSize = {
    width: 1280,
    height: 720
}

//for bomber
var bomber = {
    posX: 0,
    posY: 0,
    width: 64,
    height: 64,
    widthRatioInFrame: 1.4 / 2, //width ratio of charater inside the frame
    heightRatioInFrame: 5.4 / 6,//height ratio of charater inside the frame
    ratioWithWall: 1.2, //ratio with each wall
    inGameWidth: 0,
    inGameHeight: 0,
    name: "bomber.png",
    folder: "assets/",
    image: null,

    //for animation
    imageIndex: 0,
    numOfImageForEachDirection: 9,
    direction: BomberDirection.UNKNOW,
    xSpeed: 0,
    ySpeed: 0,
    speedWithWall: 1 / 7 //with 5 moves, character will get over the wall
}

function LoadBomberImage() {
    bomber.image = new Image();
    bomber.image.src = bomber.folder + bomber.name;
    bomber.image.onLoad = function (e: any) {
        console.log("Image ", name, " has loaded");
    };

    bomber.direction = BomberDirection.DOWN;

    //bomber size
    bomber.inGameWidth = bomber.ratioWithWall * (gameWidth / nCol) / bomber.widthRatioInFrame;
    bomber.inGameHeight = bomber.ratioWithWall * (gameHeight / nRow) / bomber.heightRatioInFrame;

    //bomber speed
    bomber.xSpeed = imortalWall.inGameWidth * bomber.speedWithWall;
    bomber.ySpeed = imortalWall.inGameHeight * bomber.speedWithWall;
}

//for wall
var imortalWall = {
    width: 736,
    height: 736,
    name: "imortalWall.jpg",
    folder: "assets/",
    image: null,
    inGameWidth: 0,
    inGameHeight: 0
}

var normalWall = {
    width: 894,
    height: 894,
    name: "normalWall.jpg",
    folder: "assets/",
    image: null,
    inGameWidth: 0,
    inGameHeight: 0
}

function LoadWall() {
    imortalWall.image = new Image();
    imortalWall.image.src = imortalWall.folder + imortalWall.name;
    imortalWall.image.onLoad = function (e: any) {
        console.log("Image ", name, " has loaded");
    };

    normalWall.image = new Image();
    normalWall.image.src = normalWall.folder + normalWall.name;
    normalWall.image.onLoad = function (e: any) {
        console.log("Image ", name, " has loaded");
    };

    imortalWall.inGameWidth = gameWidth / nCol;
    imortalWall.inGameHeight = gameHeight / nRow;
    normalWall.inGameWidth = gameWidth / nCol;
    normalWall.inGameHeight = gameHeight / nRow;
}

//for bomb
var bombImage = {
    width: 256,
    height: 256,
    name: "bomb.png",
    folder: "assets/",
    image: null,
    inGameWidth: 0,
    inGameHeight: 0
}

function LoadBomb() {
    bombImage.image = new Image();
    bombImage.image.src = bombImage.folder + bombImage.name;
    bombImage.image.onLoad = function (e: any) {
        console.log("Image ", name, " has loaded");
    };

    bombImage.inGameWidth = gameWidth / nCol;
    bombImage.inGameHeight = gameHeight / nRow;
}
//template of bomb's information
var bombInformation = {
    row: 0,
    col: 0,
    timeRemain: 0
}
var bombList = [];
var isPutBomb = false;

//for explosion
var explosionImage = {
    width: 480,
    height: 288,
    frameWidth: 96,
    frameHeight: 96,
    numOfImages: 15,
    name: "explosionSprite.png",
    folder: "assets/",
    image: null,
    inGameWidth: 0,
    inGameHeight: 0
}

export function LoadExplosion() {
    explosionImage.image = new Image();
    explosionImage.image.src = explosionImage.folder + explosionImage.name;
    explosionImage.image.onLoad = function (e: any) {
        console.log("Image ", name, " has loaded");
    };

    explosionImage.inGameWidth = gameWidth / nCol;
    explosionImage.inGameHeight = gameHeight / nRow;
}
//template of explosion's information
var explosionInformation = {
    row: 0,
    col: 0,
    currentIndex: 0
}
var explosionList = [];

//for ghost
var ghostImage = {
    width: 2555,
    height: 2768,
    name: "ghost.png",
    folder: "assets/",
    image: null,
    inGameWidth: 0,
    inGameHeight: 0
}

export function LoadGhost() {
    ghostImage.image = new Image();
    ghostImage.image.src = ghostImage.folder + ghostImage.name;
    ghostImage.image.onLoad = function (e: any) {
        console.log("Image ", name, " has loaded");
    };

    ghostImage.inGameWidth = gameWidth / nCol;
    ghostImage.inGameHeight = gameHeight / nRow;
}
var ghostList = [];

var gameCanvas = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = gameWidth;
        this.canvas.height = gameHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}

function DrawImage(context: any, img: any) {
    context.drawImage(img, 0, 0, grassSize.width, grassSize.height, 0, 0, gameWidth, gameHeight);
}

var onDown = function (key: any) {

    var bomberDirection = BomberDirection.UNKNOW;

    switch (key) {
        case "left":
            bomberDirection = BomberDirection.LEFT;
            isMovingKeyPress.val = true;
            break;
        case "right":
            bomberDirection = BomberDirection.RIGHT;
            isMovingKeyPress.val = true;
            break;
        case "up":
            bomberDirection = BomberDirection.UP;
            isMovingKeyPress.val = true;
            break;
        case "down":
            bomberDirection = BomberDirection.DOWN;
            isMovingKeyPress.val = true;
            break;

    }

    if (bomberDirection != BomberDirection.UNKNOW) {
        bomber.direction = bomberDirection;
        bomber.imageIndex += 1;
        if (bomber.imageIndex == bomber.numOfImageForEachDirection) {
            bomber.imageIndex = 0;
        }
    }
}

var onUp = function (key: any) {

    var bomberDirection = BomberDirection.UNKNOW;

    switch (key) {
        case "left":
            bomberDirection = BomberDirection.LEFT;
            isMovingKeyPress.val = false;
            break;
        case "right":
            bomberDirection = BomberDirection.RIGHT;
            isMovingKeyPress.val = false;
            break;
        case "up":
            bomberDirection = BomberDirection.UP;
            isMovingKeyPress.val = false;
            break;
        case "down":
            bomberDirection = BomberDirection.DOWN;
            isMovingKeyPress.val = false;
            break;

        //for place bomb
        case "space":
            isPutBomb = true;
            break;

    }

    if (bomberDirection != BomberDirection.UNKNOW) {
        bomber.direction = bomberDirection;
        bomber.imageIndex = 0;
    }
}

function onUpdate() {
    if (isMovingKeyPress.val == true) {

        bomber.imageIndex += 1;
        if (bomber.imageIndex == bomber.numOfImageForEachDirection) {
            bomber.imageIndex = 0;
        }

        var savePosX = bomber.posX;
        var savePosY = bomber.posY;
        
        switch (bomber.direction) {
            case BomberDirection.LEFT:
                bomber.posX -= bomber.xSpeed;
                break;

            case BomberDirection.RIGHT:
                bomber.posX += bomber.xSpeed;
                break;

            case BomberDirection.UP:
                bomber.posY -= bomber.ySpeed;
                break;

            case BomberDirection.DOWN:
                bomber.posY += bomber.ySpeed;
                break;
        }

        if (CheckNextMovePosible(bomber.posX, bomber.posY, bomber.direction, mapData, imortalWall) == false) {
            bomber.posX = savePosX;
            bomber.posY = savePosY;
        }
    }
    

    //calculate the remaining time of each bomb
    var i;
    for (i = 0; i < bombList.length; i++) {
        bombList[i].timeRemain -= frameTime;
        console.log("row: ", bombList[i].row, " - col: ", bombList[i].col, " - timeRemain: ", bombList[i].timeRemain);
    }
    //clear extra bomb
    i = 0;
    while (i < bombList.length) {
        if (bombList[i].timeRemain <= 0) {
            i++;
        } else {
            break;
        }
    }
    var numOfExtraBomb = i;
    for (i = 0; i < numOfExtraBomb; i++) {
        var bomb = bombList[i];
        mapData[bomb.row][bomb.col] = 0;
        AddExplosion(bomb.row, bomb.col, mapData, explosionList, lengthOfExplosion);
    }
    for (i = 0; i < numOfExtraBomb; i++) {
        bombList.splice(0, 1);
    }

    //add bomb to list 
    if (isPutBomb == true) {

        var cell = CheckInCell(bomber.posX, bomber.posY, imortalWall);

        if ((mapData[cell.row][cell.col] != 1) && (mapData[cell.row][cell.col] != 2)) {
            var aBomb = {
                col: cell.col,
                row: cell.row,
                timeRemain: bombTime 
            }
            bombList.push(aBomb);

            mapData[cell.row][cell.col] = 4;
        }
        
        isPutBomb = false;
    }
}

function onDraw() {
    var context = gameCanvas.canvas.getContext("2d");

    context.save();
    context.clearRect(0, 0, gameWidth, gameHeight);

    DrawImage(context, grassImage);
    DrawWall(context, mapData, imortalWall, normalWall);
    DrawBomb(context, bombList, bombImage);
    DrawExplosion(context, explosionList, explosionImage);
    DrawBomber(context, bomber);
}

function StartGameLoop() {
    setInterval(function () {
        onUpdate();
        onDraw();
    }, frameTime);
}
var grassImage = new Image();

function initializeGame() {
    gameCanvas.start();

    setOnDownCallback(onDown);
    setOnUpCallback(onUp);

    grassImage.src = "assets/grass.jpg";
    grassImage.onload = function (e: any) {
        console.log("Context = ", gameCanvas.canvas.getContext("2d"));
        console.log("Grass src = ", grassImage.src);
        DrawImage(gameCanvas.canvas.getContext("2d"), grassImage);
    };

    //num of Rows and Colums of game
    nRow = mapData.length;
    nCol = mapData[0].length;

    LoadWall();
    LoadBomberImage();
    LoadBomb();
    LoadExplosion();
    LoadGhost();

    //Start game
    StartGameLoop();

}
initializeGame();