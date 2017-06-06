var surface;
var selector;
var movement = false;
var eventController;

var gameSize = 6;

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

    selector = new Selector();

    Rubics.update();

    eventController = new EventController();
}

var Rubics = {
    canvas : document.createElement("canvas"),
    start : function(){
        this.canvas.height = canvasSize;
        this.canvas.width = canvasSize;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        document.addEventListener('keydown', function (event) {
            eventController.handleKeyEvent(event);
        });
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    update : function () {
        //draw grids
        var tempGrid;
        for(var i = 0; i < gameSize; i++){
            for(var j = 0; j < gameSize; j++){
                tempGrid = surface[i][j];
                gameContext.fillStyle = tempGrid.color;
                gameContext.fillRect(tempGrid.xPos, tempGrid.yPos, tempGrid.size, tempGrid.size);
            }
        }

        //draw selector
        gameContext.fillStyle = selector.color;
        gameContext.beginPath();
        gameContext.arc(selector.xPos,selector.yPos,selector.radius,0,2*Math.PI,false);
        gameContext.fill();
    }
};

//will be usefull sometime...
function construct2DArr() {
    var result = new Array(gameSize);
    for(var i = 0; i < gameSize; i++){
        result[i] = new Array(gameSize);
    }
    return result;
}

function fillSurface(arr) {
    var gridSize = canvasSize/gameSize;
    for(var i = 0; i < gameSize; i++){
        for(var j = 0; j < gameSize; j++){
            //more cases can be added
            switch (i){
                case 0:
                    arr[i][j] = new Grid("red", gridSize*i,gridSize*j);
                    break;
                case 1:
                    arr[i][j] = new Grid("blue", gridSize*i,gridSize*j);
                    break;
                case 2:
                    arr[i][j] = new Grid("green", gridSize*i,gridSize*j);
                    break;
                case 3:
                    arr[i][j] = new Grid("black", gridSize*i,gridSize*j);
                    break;
                case 4:
                    arr[i][j] = new Grid("magenta", gridSize*i,gridSize*j);
                    break;
                case 5:
                    arr[i][j] = new Grid("purple", gridSize*i,gridSize*j);
                    break;
                case 6:
                    arr[i][j] = new Grid("pink", gridSize*i,gridSize*j);
                    break;
            }
        }
    }
    return arr;
}

//grid
function Grid(color, xPos, yPos) {
    this.size = canvasSize/gameSize;
    this.xPos = xPos;
    this.yPos = yPos;
    this.color = color;
}
