
export var BomberDirection = {
    UP: 0,
    LEFT: 1,
    DOWN: 2,
    RIGHT: 3,
    UNKNOW: 4
}

export var isMovingKeyPress = {
    val: false
}

export function DrawBomber(context: any, bomber: any) { 

    var localPosX = bomber.imageIndex * bomber.width;
    var localPosY = bomber.direction * bomber.height;

    //these code below is used to align center character 
    var inGamePosX = bomber.posX - ((bomber.inGameWidth * (1 - bomber.widthRatioInFrame)) / 2);
    var inGamePosY = bomber.posY - (bomber.inGameHeight * (1 - bomber.heightRatioInFrame));
    inGamePosX -= ((bomber.inGameWidth / bomber.ratioWithWall) * (bomber.ratioWithWall - 1)) / 2;
    inGamePosY -= ((bomber.inGameHeight / bomber.ratioWithWall) * (bomber.ratioWithWall - 1)) / 2;

    context.drawImage(bomber.image, localPosX, localPosY, bomber.width, bomber.height, inGamePosX, inGamePosY, bomber.inGameWidth, bomber.inGameHeight);
}