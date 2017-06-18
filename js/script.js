var surface;
var infoSurface;
var goalSurface;
var difficulty;

var selector;
var selectorSpeed;

var movement;
var eventController;

var gameMenu;

var gameSize;

var canvasSize = 600;
var gameContext;
function startGame() {
    document.getElementById("gameMan").style.display = 'none';
    gameMenu = document.getElementById("gameMenu");
    gameMenu.style.display = 'none';
    movement = false;

    //need to make the resume button visible
    document.getElementById("resumeButton").style.display = 'inline';

    //show game canvas'
    Rubics.gameCanvas.style.display = 'inline';
    Rubics.infoCanvas.style.display = 'inline';

    //initialize game elements
    selector = new Selector(canvasSize, gameSize);
    infoSurface = new InfoCanvas();

    //initialize the game
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
}


var Rubics = {
    gameCanvas : document.createElement("canvas"),
    infoCanvas : document.createElement("canvas"),
    start : function(){
        //left side canvas
        this.gameCanvas.height = canvasSize;
        this.gameCanvas.width = canvasSize;
        this.gameCanvas.style.border = "1px solid";
        this.gameCanvas.style.position = 'absolute';
        this.context = this.gameCanvas.getContext("2d");
        document.body.appendChild(this.gameCanvas);

        //right side canvas
        this.infoCanvas.height = canvasSize;
        this.infoCanvas.width = canvasSize;
        this.infoCanvas.style.border = "1px solid";
        this.infoCanvas.style.position = 'absolute';
        this.infoCanvas.style.left = canvasSize+80 + "px";
        document.body.appendChild(this.infoCanvas);

        //adds event listener if game is not restarted
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
        var i, j;
        //draw surface
        for (i = 0; i < gameSize; i++) {
            for (j = 0; j < gameSize; j++) {
                gameContext.fillStyle = surface[i][j].color;
                gameContext.fillRect(surface[i][j].xPos, surface[i][j].yPos, surface[i][j].size, surface[i][j].size);
            }
        }

        if(infoSurface.infoSurface != -1){
            if(gameFinished()){
                if(confirm("Good Job! Restart?")){
                    infoSurface.clearSurface();
                    startGame();
                }else{
                    //return to menu
                    Rubics.gameCanvas.style.display = 'none';
                    Rubics.infoCanvas.style.display = 'none';
                    document.getElementById("gameMan").style.display = 'initial';
                    gameMenu.style.display = 'initial';
                    document.getElementById("resumeButton").style.display = 'none';
                    document.getElementById("startButton").value = "Start";
                }
            }
        }

        //vertical line
        gameContext.beginPath();
        gameContext.moveTo(0,selector.yPos);
        gameContext.lineTo(canvasSize, selector.yPos);
        gameContext.strokeStyle = "yellow";
        gameContext.stroke();

        //horizontal line
        gameContext.beginPath();
        gameContext.moveTo(selector.xPos,0);
        gameContext.lineTo(selector.xPos, canvasSize);
        gameContext.strokeStyle = "yellow";
        gameContext.stroke();

        //draw selector
        gameContext.fillStyle = selector.color;
        gameContext.beginPath();
        gameContext.arc(selector.xPos, selector.yPos, selector.radius, 0, 2 * Math.PI, false);
        gameContext.fill();
    }
};

//gives grids their initial colors
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

//checks if game is finished
function gameFinished(){
    for(i = 0; i < gameSize; i++){
        for(j = 0; j < gameSize; j++){
            if(surface[i][j].color != goalSurface[i][j].color){
                return false;
            }
        }
    }
    return true;
}

//called on button click
function setGameSize(toggleButton){
    let buttons = document.getElementsByClassName("toggleButton"); 
    let val = toggleButton.attributes["value"].value;

    //TODO:fix this, it's not solid
    for(let i = 0; i < 3; i++){
        if(buttons[i] !== toggleButton){
            buttons[i].src = "../res/grid" + buttons[i].attributes["value"].value + ".png"
        }else if(toggleButton.src == "file:///home/ken/Documents/javascript/Rubics/res/check.png"){
            toggleButton.src = "../res/grid" + val + ".png";
            gameSize = null;
        }else{
            toggleButton.src = "../res/check.png";
            gameSize = val;
        }
    }
}

//called on button click
function setSelectorSpeed(toggleButton, selectedIndex){
    if(toggleButton.attributes["selected"].value == "false"){
        for(let i = 0; i < 4; i++){
            if(i != selectedIndex){
                document.getElementsByClassName("animatedCanvas")[i]
                    .attributes["selected"].value = "false";
                Menu.reset(i);
                Menu.clear(i);
                Menu.update(i);
            }
        }
        Menu.selectors[selectedIndex].xPos = 192;
        Menu.clear(selectedIndex);
        Menu.update(selectedIndex);
        clearInterval(menuSelectorMovement);
        let img = new Image();
        img.src = "../res/check.png";
        img.onload = function() {
        toggleButton.getContext("2d").drawImage(img, 64,0,128,128);
        };
        selectorSpeed = Number(toggleButton.attributes["value"].value);
        toggleButton.attributes["selected"].value = "true";
    }else{
        selectorSpeed = null;
        toggleButton.attributes["selected"].value = "false";
        Menu.clear(selectedIndex);
        Menu.update(selectedIndex);
    }
}

function setDifficulty(toggleButton){
    let dif = toggleButton.attributes["value"].value;
    let diffButtons = document.getElementsByClassName("toggleButton");

    //TODO:fix this, it's not solid
    for(let i = 4; i < diffButtons.length; i++){
        if(diffButtons[i] !== toggleButton){
            diffButtons[i].src = "../res/smiley" + diffButtons[i].attributes["value"].value + ".png"
        }else if(toggleButton.src == "file:///home/ken/Documents/javascript/Rubics/res/check.png"){
            toggleButton.src = "../res/smiley" + dif + ".png";
            difficulty = null;
        }else{
            difficulty = dif;
            toggleButton.src = "../res/check.png";
        }
    }
}

//called on mouse hover
function animateMenuSelectorGrid(toggleButton, selectedIndex){
    if(toggleButton.attributes["selected"].value == "false"){
    Menu.initMovement(Number(selectedIndex));
    }
}

//called on mouse exit
function resetAnimatedCanvas(toggleButton, selectedIndex) {
    if(toggleButton.attributes["selected"].value == "false"){
    Menu.reset(selectedIndex);
    }
}

//called on body load
function initMenu() {
    var selectorCanvasArr = document.getElementsByClassName("animatedCanvas");
    for(let i = 0; i < selectorCanvasArr.length; i++){
            selectorCanvasArr[i].height = 128;
            selectorCanvasArr[i].width = 256;
            selectorCanvasArr[i].position = 'absolute';
            let selector = new Selector(128, 1);
            let context = selectorCanvasArr[i].getContext("2d");

            context.fillStyle = "red";
            context.fillRect(0,0,128,128);
            context.fillStyle = "blue";
            context.fillRect(128,0,128,128);

            //save the variables into the Menu object
            Menu.selectors[i] = selector;
            Menu.animatedContextArr[i] = context;

            //draw selectors
            context.fillStyle = selector.color;
            context.beginPath();
            context.arc(selector.xPos, selector.xPos, selector.radius-3, 0, 2 * Math.PI, false);
            context.fill();
    }
}