

export function DrawExplosion(context: any, explosionList: any, explosionImage: any, data: any) {

    var i;
    for (i = 0; i < explosionList.length; i++) {
        
        var explosion = explosionList[i];
        var imageIndex = explosion.currentIndex;

        var localPosX = 0;
        var localPosY = 0;
        var j;
        for (j = 0; j < imageIndex; j++) {
            localPosX += explosionImage.frameWidth;
            if (localPosX > (explosionImage.width - explosionImage.frameWidth)) {
                localPosX = 0;
                localPosY += explosionImage.frameHeight;
            }
        }

        var posX = explosion.col * explosionImage.inGameWidth;
        var posY = explosion.row * explosionImage.inGameHeight;

        context.drawImage(explosionImage.image, localPosX, localPosY, explosionImage.frameWidth, explosionImage.frameHeight, posX, posY, explosionImage.inGameWidth, explosionImage.inGameHeight);

        explosion.currentIndex += 1;
    }

    //clear extra explosion image
    i = 0;
    while (i < explosionList.length) {

        if (explosionList[i].currentIndex >= explosionImage.numOfImages) {
            var explosion = explosionList[i];
            debugger
            data[explosion.row][explosion.col] = 0;
            i++;
        } else {
            break;
        }
    }

    var numOfExtraExplosionImage = i;
    for (i = 0; i < numOfExtraExplosionImage; i++) {
        explosionList.splice(0, 1);
    }
}

var dr = [-1, 0, 1, 0];
var dc = [0, 1, 0, -1];

export function AddExplosion(explosionRow: any, explosionCol: any, mapData:any, explosionList: any, lengthOfExplosion: any) {
    var explosionMain = {
        row: explosionRow,
        col: explosionCol,
        currentIndex: 0
    }

    explosionList.push(explosionMain);
    mapData[explosionRow][explosionCol] = 6;

    var maxRow = mapData.length;
    var maxCol = mapData[0].length;
    var i;
    var j;
    for (i = 0; i < 4; i++) {
        var currentRow = explosionRow;
        var currentCol = explosionCol;
        for (j = 0; j < lengthOfExplosion; j++) {
            currentRow += dr[i];
            currentCol += dc[i];

            if ((currentRow < 0) || (currentRow >= maxRow) || (currentCol < 0) || (currentCol >= maxCol)) {
                break;
            }

            if (mapData[currentRow][currentCol] == 2) {
                break;
            } else {
                var explosion = {
                    row: currentRow,
                    col: currentCol,
                    currentIndex: 0
                }
                explosionList.push(explosion);

                if (mapData[currentRow][currentCol] == 1) {
                    mapData[currentRow][currentCol] = 0; 
                    break;
                }

                mapData[currentRow][currentCol] = 6; // explosion at this cell
            }
        }
    }
}