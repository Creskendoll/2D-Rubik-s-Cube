/**
 * Created by ken on 06.06.2017.
 */
function EventController() {
    this.handleKeyEvent = function(event){
        //if arrow keys are pressed
        if(event.keyCode >= 37 && event.keyCode <= 40){
            if(!movement){
                switch (event.keyCode){
                    //left
                    case 37:
                        selector.indexX--;
                        if(selector.indexX < 0){
                            selector.indexX = gameSize-1;
                            selector.outOfMap = true;
                        }
                        if(selectorSpeed != 0){
                        movement = setInterval(function(){
                            selector.move(event.keyCode, selector.xPosArr[selector.indexX])}, 1);
                        }else{
                            selector.xPos = selector.xPosArr[selector.indexX];
                            Rubics.update();
                        }
                        break;
                    //up
                    case 38:
                        selector.indexY--;
                        if(selector.indexY < 0){
                            selector.indexY = gameSize-1;
                            selector.outOfMap = true;
                        }
                        if(selectorSpeed != 0){
                        movement = setInterval(function(){
                            selector.move(event.keyCode, selector.yPosArr[selector.indexY])}, 1);
                        }else{
                            selector.yPos = selector.yPosArr[selector.indexY];
                            Rubics.update();
                        }
                        break;
                    //right
                    case 39:
                        selector.indexX++;
                        if(selector.indexX > gameSize-1){
                            selector.indexX = 0;
                            selector.outOfMap = true;
                        }
                        if(selectorSpeed != 0){
                        movement = setInterval(function(){
                            selector.move(event.keyCode, selector.xPosArr[selector.indexX])}, 1);
                        }else{
                            selector.xPos = selector.xPosArr[selector.indexX];
                            Rubics.update();
                        }
                        break;
                    //down
                    case 40:
                        selector.indexY++;
                        if(selector.indexY > gameSize-1){
                            selector.indexY = 0;
                            selector.outOfMap = true;
                        }
                        if(selectorSpeed != 0){
                        movement = setInterval(function(){
                            selector.move(event.keyCode, selector.yPosArr[selector.indexY])}, 1);
                        }else{
                            selector.yPos = selector.yPosArr[selector.indexY];
                            Rubics.update();
                        }
                        break;
                }
            }
        }else{
            switch (event.key){
                case "w":
                    gridMovement = setInterval(function(){
                        Rubics.moveSurface("Up");
                    },1);
                    gridMovements[0]();
                    break;
                case "s":
                    clearInterval(gridMovement);
                    //gridMovements[1]();
                    break;
                case "a":
                    gridMovements[2]();
                    break;
                case "d":
                    gridMovements[3]();
                    break;
                case "r":
                    infoSurface.drawInfoSurface();
                    randomizeSurface();
                    /*var file = new File([gameData], "rubicsDat.txt", {type: "text/plain;charset=utf-8"});
                    saveAs(file);*/
                    break;
                case "Escape":
                    Menu.showMenu();
                    Menu.showPrevSettings();
                    break;
            }
            Rubics.clear();
            Rubics.update();
        }
    };
}

function randomizeSurface() {
    //to reset the selector position
    var selectorPos = [selector.indexX, selector.indexY];
    switch (difficulty){
        case "Easy":
        do{
            for(let i = 0; i < 4; i++){
                selector.indexX = Math.floor(Math.random() * gameSize);
                selector.indexY = Math.floor(Math.random() * gameSize);
                gridMovements[Math.floor(Math.random() * 4)]();
            }
            selector.indexX = selectorPos[0]; selector.indexY = selectorPos[1];
        }while(gameFinished());
        break;
        case "Medium":
        do{
            for(let i = 0; i < 6; i++){
                selector.indexX = Math.floor(Math.random() * gameSize);
                selector.indexY = Math.floor(Math.random() * gameSize);
                gridMovements[Math.floor(Math.random() * 4)]();
            }
            selector.indexX = selectorPos[0]; selector.indexY = selectorPos[1];
        }while(gameFinished());
        break;
        case "Hard":
        do{
            for(let i = 0; i < 10; i++){
                selector.indexX = Math.floor(Math.random() * gameSize);
                selector.indexY = Math.floor(Math.random() * gameSize);
                gridMovements[Math.floor(Math.random() * 4)]();
            }
            selector.indexX = selectorPos[0]; selector.indexY = selectorPos[1];
        }while(gameFinished());
        break;
        case "Expert":
        do{
            for(let i = 0; i < 15; i++){
                selector.indexX = Math.floor(Math.random() * gameSize);
                selector.indexY = Math.floor(Math.random() * gameSize);
                gridMovements[Math.floor(Math.random() * 4)]();
            }
            selector.indexX = selectorPos[0]; selector.indexY = selectorPos[1];
        }while(gameFinished());
        break;
    }
}

//this is for gathering data from the game board and saving it on the local machine
/*function gatherData(surface) {
    for(var i = 0; i < gameSize; i++){
        for(var j = 0; j < gameSize; j++){

        }
    }
}*/

//surface grid movement functions, 0-up 1-down, 2-left, 3-right
var gridMovements = [
    function moveGridUp(){
        let tempArr = new Array(gameSize);
        let tempGrid;

        for(let i = 0; i < gameSize; i++){
            tempArr[i] = surface[selector.indexX][i];
        }

        for(let i = 0; i < gameSize; i++){
            tempGrid = tempArr[i];
            //tempGrid = tempArr[(i+1)%(gameSize)];
            /*surface[selector.indexX][i] = new Grid(tempGrid.color,
            tempArr[i].xPos, tempArr[i].yPos);*/
            surface[selector.indexX][i] = tempGrid;
        }
    },
    function moveGridDown(){
        let tempArr = new Array(gameSize);

        for(let i = 0; i < gameSize; i++){
            tempArr[i] = surface[selector.indexX][i];
        }

        surface[selector.indexX][0] = new Grid(tempArr[gameSize-1].color,
        tempArr[0].xPos, tempArr[0].yPos);

        for(let i = 1; i < gameSize; i++){
            surface[selector.indexX][i] = new Grid(tempArr[i-1].color, 
            tempArr[i].xPos, tempArr[i].yPos);
        }    
    },
    function moveGridLeft(){
        let tempArr = new Array(gameSize);
        let tempGrid; 

        for(let i = 0; i < gameSize; i++){
            tempArr[i] = surface[i][selector.indexY];
        }

        for(let i = 0; i < gameSize; i++){
            tempGrid = tempArr[(i+1)%(gameSize)];
            surface[i][selector.indexY] = new Grid(tempGrid.color,
            tempArr[i].xPos, tempArr[i].yPos);
        }
    },
    function moveGridRight(){
        let tempArr = new Array(gameSize); 

        for(let i = 0; i < gameSize; i++){
            tempArr[i] = surface[i][selector.indexY];
        }

        surface[0][selector.indexY] = new Grid(tempArr[gameSize-1].color, tempArr[0].xPos, tempArr[0].yPos);
        
        for(let i = 1; i < gameSize; i++){
            surface[i][selector.indexY] = new Grid(tempArr[i-1].color, tempArr[i].xPos, tempArr[i].yPos);
        }
    }
]