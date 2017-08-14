

export function DrawWall(context: any, mapData: any, imortalWall: any, normalWall: any) {

    var i;
    var j;
    var inGamePosX;
    var inGamePosY;
    var nRow = mapData.length;
    var nCol = mapData[0].length;

    var inGameWidth = imortalWall.inGameWidth;
    var inGameHeight = imortalWall.inGameHeight;

    for (i = 0; i < nRow; i++) {
        for (j = 0; j < nCol; j++) {

            inGamePosX = inGameWidth * j;
            inGamePosY = inGameHeight * i;

            if (mapData[i][j] == 1) {

                context.drawImage(normalWall.image, 0, 0, normalWall.width, normalWall.height, inGamePosX, inGamePosY, normalWall.inGameWidth, normalWall.inGameHeight);

            } else if (mapData[i][j] == 2) {

                context.drawImage(imortalWall.image, 0, 0, imortalWall.width, imortalWall.height, inGamePosX, inGamePosY, imortalWall.inGameWidth, imortalWall.inGameHeight);

            }
        }
    }
}