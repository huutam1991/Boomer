

export function CheckInCell(posX: any, posY: any, imortalWall: any) {

    posX += imortalWall.inGameWidth / 2;
    posY += imortalWall.inGameHeight / 2;

    var numOfWallWidth = Math.round(posX / imortalWall.inGameWidth);
    if ((numOfWallWidth * imortalWall.inGameWidth) > posX) {
        numOfWallWidth -= 1;
    }

    var numOfWallHeight = Math.round(posY / imortalWall.inGameHeight);
    if ((numOfWallHeight * imortalWall.inGameHeight) > posY) {
        numOfWallHeight -= 1;
    }

    var returnCell = {
        row: numOfWallHeight,
        col: numOfWallWidth
    }

    return returnCell;
}