//TODO:use this to compare playable surface to infoSurface
function drawInfoCanvas() {
    var infoSurface = construct2DArr();
    var gridSize = canvasSize/gameSize;
    var i,j;
    var context = Rubics.infoCanvas.getContext("2d");

    for(i = 0; i < gameSize; i++){
        for(j = 0; j < gameSize; j++){
            infoSurface[i][j] = new Grid("red", gridSize*i,gridSize*j);
        }
    }

    //draw grids
    for(i = 0; i < gameSize; i++){
        for(j = 0; j < gameSize; j++){
            context.fillStyle = infoSurface[i][j].color;
            context.fillRect(infoSurface[i][j].xPos, infoSurface[i][j].yPos, infoSurface[i][j].size, infoSurface[i][j].size);
        }
    }

    return infoSurface;
}

function construct2DArr() {
    var result = new Array(gameSize);
    for(var i = 0; i < gameSize; i++){
        result[i] = new Array(gameSize);
    }
    return result;
}
