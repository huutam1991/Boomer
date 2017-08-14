
var dWidth = [0, 0, 0, 1];
var dHeight = [0, 0, 1, 0];

export function CheckNextMovePosible(posX: any, posY: any, direction: any, mapData: any, imortalWall: any) {
    
    var maxRow = mapData.length;
    var maxCol = mapData[0].length;
    
    var currentPosX = posX + imortalWall.inGameWidth * dWidth[direction];
    var currentPosY = posY + imortalWall.inGameHeight * dHeight[direction];

    var col = Math.round(currentPosX / imortalWall.inGameWidth);
    if ((col * imortalWall.inGameWidth) > currentPosX) {
        col -= 1;
    }

    var row = Math.round(currentPosY / imortalWall.inGameHeight);
    if ((row * imortalWall.inGameHeight) > currentPosY)  {
        row -= 1;
    }

    if ((row < 0) || (row >= maxRow) || (col < 0) || (col >= maxCol)) {
        return false;
    } else if ((mapData[row][col] == 1) || (mapData[row][col] == 2)) {
        return false;
    }

    return true;
}