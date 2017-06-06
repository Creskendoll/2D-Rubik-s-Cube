var surface;
var selector;
var gameSize = 3;

var movement;

var canvasSize = 630;

var gameContext;
function startGame() {
    Rubics.start();
    gameContext = Rubics.context;

    //initialize an empty array for our surface
    surface = new Array(gameSize);
    for(var i = 0; i < gameSize; i++){
        surface[i] = new Array(gameSize);
    }

    surface = fillSurface(surface);

    Rubics.update();

    selector = new Selector();
}

var Rubics = {
    canvas : document.createElement("canvas"),
    start : function(){
        this.canvas.height = canvasSize;
        this.canvas.width = canvasSize;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        document.addEventListener('keydown', function (event) {
            eventControl(event);

        });
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    update : function () {
        for(var i = 0; i < gameSize; i++){
            for(var j = 0; j < gameSize; j++){
                var tempGrid = surface[i][j];
                gameContext.fillStyle = tempGrid.color;
                gameContext.fillRect(tempGrid.xPos, tempGrid.yPos, tempGrid.size, tempGrid.size);
            }
        }
    }
};

function fillSurface(arr) {
    var count = 0;
    var gridSize = canvasSize/gameSize;
    for(var i = 0; i < gameSize; i++){
        for(var j = 0; j < gameSize; j++){
            if(count < gameSize){
                arr[i][j] = new Grid("red", gridSize*j,gridSize*i);
            }else if(count < gameSize*2 && count >= gameSize){
                arr[i][j] = new Grid("blue", gridSize*j,gridSize*i);
            }else{
                arr[i][j] = new Grid("green", gridSize*j,gridSize*i);
            }
            count++;
        }
    }
    return arr;
}


//ask about 3d arrays
/*function fillGrids(size) {
    var gridArr = [];
    gridArr[0] = [];
    gridArr[0][0] = [];
    var halfDistance = Rubics.canvas.width/(size*2);
    console.log("Half distance: " + halfDistance);

    for(var i = 1; i < Grid.size+1; i++){
        for(var j = 1; j < Grid.size+1; j++){
            gridArr[i][j][0] = halfDistance*i;
            console.log(gridArr[i][j][0]);
            gridArr[i][j][1] = halfDistance*j;
        }
    }
    return gridArr;
}*/

//grid
function Grid(color, xPos, yPos) {
    this.size = canvasSize/gameSize;
    this.xPos = xPos;
    this.yPos = yPos;
    this.color = color;
}


//selector circle
function Selector() {
    this.xPos = canvasSize/(gameSize*2);
    this.yPos = canvasSize/(gameSize*2);
    var halfDistance = canvasSize/(gameSize*2);
    this.radius = 15;
    this.color = "yellow";
    this.indexX = 0;
    this.indexY = 0;

    this.xPosArr = [];
    this.xPosArr[0] = halfDistance;
    this.yPosArr = [];
    this.yPosArr[0] = halfDistance;

    for(var i = 1; i < gameSize+1; i++){
        this.xPosArr[i] = this.xPosArr[i-1] + 2*halfDistance;
        this.yPosArr[i] = this.yPosArr[i-1] + 2*halfDistance;
    }

    Rubics.context.fillStyle = this.color;
    Rubics.context.beginPath();
    Rubics.context.arc(this.xPos,this.yPos,this.radius,0,2*Math.PI,false);
    Rubics.context.fill();

    this.move = function(direction, destination){
        Rubics.clear();
        Rubics.update();

        switch (direction){
            //left
            case 37:
                this.xPos -= 2;
                gameContext.fillStyle = this.color;
                gameContext.beginPath();
                gameContext.arc(this.xPos,this.yPos,this.radius,0,2*Math.PI,false);
                gameContext.fill();
                if(this.xPos <= destination){
                    clearInterval(movement);
                }
                break;
            //up
            case 38:
                this.yPos -= 2;
                gameContext.fillStyle = this.color;
                gameContext.beginPath();
                gameContext.arc(this.xPos,this.yPos,this.radius,0,2*Math.PI,false);
                gameContext.fill();
                if(this.yPos <= destination){
                    clearInterval(movement);
                }
                break;
            //right
            case 39:
                this.xPos += 2;
                gameContext.fillStyle = this.color;
                gameContext.beginPath();
                gameContext.arc(this.xPos,this.yPos,this.radius,0,2*Math.PI,false);
                gameContext.fill();
                if(this.xPos >= destination){
                    clearInterval(movement);
                }
                break;
            //down
            case 40:
                this.yPos += 2;
                gameContext.fillStyle = this.color;
                gameContext.beginPath();
                gameContext.arc(this.xPos,this.yPos,this.radius,0,2*Math.PI,false);
                gameContext.fill();
                if(this.yPos >= destination){
                    clearInterval(movement);
                }
                break;
        }
    }
}

function eventControl(event) {
    if(event.keyCode >= 37 && event.keyCode <= 40){
        switch (event.keyCode){
            //left
            case 37:
                selector.indexX = selector.indexX-1;
                movement = setInterval(function(){selector.move(event.keyCode, selector.xPosArr[selector.indexX])}, 0.1);
                break;
            //up
            case 38:
                selector.indexY = selector.indexY-1;
                movement = setInterval(function(){selector.move(event.keyCode, selector.yPosArr[selector.indexY])}, 0.1);
                break;
            //right
            case 39:
                selector.indexX = selector.indexX+1;
                movement = setInterval(function(){selector.move(event.keyCode, selector.xPosArr[selector.indexX])}, 0.1);
                break;
            //down
            case 40:
                selector.indexY = selector.indexY+1;
                movement = setInterval(function(){selector.move(event.keyCode, selector.yPosArr[selector.indexY])}, 0.1);
                break;
        }
    }
}