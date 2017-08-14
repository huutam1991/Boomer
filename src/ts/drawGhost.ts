

export function DrawGhost(context: any, ghostList: any, ghostImage: any) {

    var i;
    for (i = 0; i < ghostList.length; i++) {
        var ghost = ghostList[i];

        if (ghost.isKilled == false) {
            var posX = ghost.posX;
            var posY = ghost.posY;

            context.drawImage(ghostImage.image, 0, 0, ghostImage.width, ghostImage.height, posX, posY, ghostImage.inGameWidth, ghostImage.inGameHeight);
        }
    }
}