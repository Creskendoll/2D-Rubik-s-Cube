var surface;

var selector;
var selectorSpeed;

var movement;
var eventController;

var gameMenu;

var gameSize;

var currentGame;

var canvasSize = 630;

var gameContext;
function startGame() {
    gameMenu = document.getElementById("gameMenu");
    gameMenu.style.display = 'none';
    movement = false;

    //need to make the resume button visible
    document.getElementById("resumeButton").style.display = 'inline';

    //show game canvas'
    Rubics.gameCanvas.style.display = 'inline';
    Rubics.infoCanvas.style.display = 'inline';

    //initialise game variables
    var el = document.getElementById("gameSize");
    gameSize = Number(el.options[el.selectedIndex].value);

    currentGame = gameSize;

    el = document.getElementById("selSpeed");
    selectorSpeed = Number(el.options[el.selectedIndex].value);

    selector = new Selector();
    Rubics.start();

    gameContext = Rubics.context;
    //initialize an empty array for our surface
    surface = new Array(gameSize);
    for(var i = 0; i < gameSize; i++){
        surface[i] = new Array(gameSize);
    }


    //fills the surface with grids
    surface = fillSurface(surface);

    eventController = new EventController();

    Rubics.update();
    drawInfoCanvas();
}

var Rubics = {
    gameCanvas : document.createElement("canvas"),
    infoCanvas : document.createElement("canvas"),
    start : function(){
        //left side canvas
        this.gameCanvas.height = canvasSize;
        this.gameCanvas.width = canvasSize;
        this.gameCanvas.style.border = "1px solid";
        this.gameCanvas.style.zIndex = 0;
        this.context = this.gameCanvas.getContext("2d");
        document.body.appendChild(this.gameCanvas);

        //right side canvas
        this.infoCanvas.height = canvasSize;
        this.infoCanvas.width = canvasSize;
        this.gameCanvas.style.zIndex = 0;
        this.infoCanvas.style.border = "1px solid";
        this.infoCanvas.style.marginLeft = "10px";
        this.infoContext = this.infoCanvas.getContext("2d");
        document.body.appendChild(this.infoCanvas);

        if(!eventController){
            document.addEventListener('keydown', function (event) {
                eventController.handleKeyEvent(event);
            });
        }

    },
    clear : function() {
        this.context.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
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
