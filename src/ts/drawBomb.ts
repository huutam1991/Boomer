

export function DrawBomb(context: any, bombList: any, bombImage: any) {

    var i;
    for (i = 0; i < bombList.length; i++) {
        var bomb = bombList[i];
        var posX = bomb.col * bombImage.inGameWidth;
        var posY = bomb.row * bombImage.inGameHeight;

        context.drawImage(bombImage.image, 0, 0, bombImage.width, bombImage.height, posX, posY, bombImage.inGameWidth, bombImage.inGameHeight);
    }
}