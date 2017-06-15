//TODO:use this to compare playable surface to infoSurface
function InfoCanvas() {
    this.infoSurface = -1;
    this.context = Rubics.infoCanvas.getContext("2d");

    this.drawInfoSurface = function () {
        this.infoSurface = construct2DArr();
        var i,j;
        for(i = 0; i < gameSize; i++){
            for(j = 0; j < gameSize; j++){
                this.infoSurface[i][j] = new Grid(surface[i][j].color,
                    surface[i][j].xPos, surface[i][j].yPos);
            }
        }

        //draw grids
        for(i = 0; i < gameSize; i++){
            for(j = 0; j < gameSize; j++){
                this.context.fillStyle = this.infoSurface[i][j].color;
                this.context.fillRect(this.infoSurface[i][j].xPos, this.infoSurface[i][j].yPos,
                    this.infoSurface[i][j].size, this.infoSurface[i][j].size);
            }
        }

        goalSurface = this.infoSurface;
    };

    this.clearSurface = function () {
        this.context.clearRect(0, 0, Rubics.infoCanvas.width, Rubics.infoCanvas.height);
    }
}

function construct2DArr() {
    var result = new Array(gameSize);
    for(var i = 0; i < gameSize; i++){
        result[i] = new Array(gameSize);
    }
    return result;
}
