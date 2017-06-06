/**
 * Created by ken on 06.06.2017.
 */
function EventController() {
    this.handleKeyEvent = function(event){
        //console.log(event);
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
                            //movement = setInterval(function(){selector.move(event.keyCode, -selector.radius)}, 0.1);
                        }
                        movement = setInterval(function(){
                            selector.move(event.keyCode, selector.xPosArr[selector.indexX])}, 0.1);
                        break;
                    //up
                    case 38:
                        selector.indexY = selector.indexY-1;
                        if(selector.indexY < 0){
                            selector.indexY = gameSize-1;
                            selector.outOfMap = true;
                            //movement = setInterval(function(){selector.move(event.keyCode, -selector.radius)}, 0.1);
                        }
                        movement = setInterval(function(){
                            selector.move(event.keyCode, selector.yPosArr[selector.indexY])}, 0.1);
                        break;
                    //right
                    case 39:
                        selector.indexX = selector.indexX+1;
                        if(selector.indexX > gameSize-1){
                            selector.indexX = 0;
                            selector.outOfMap = true;
                            //movement = setInterval(function(){selector.move(event.keyCode, canvasSize+selector.radius)}, 0.1);
                        }
                        movement = setInterval(function(){
                            selector.move(event.keyCode, selector.xPosArr[selector.indexX])}, 0.1);
                        break;
                    //down
                    case 40:
                        selector.indexY = selector.indexY+1;
                        if(selector.indexY > gameSize-1){
                            selector.indexY = 0;
                            selector.outOfMap = true;
                            //movement = setInterval(function(){selector.move(event.keyCode, canvasSize+selector.radius)}, 0.1);
                        }
                        movement = setInterval(function(){
                            selector.move(event.keyCode, selector.yPosArr[selector.indexY])}, 0.1);
                        break;
                }
            }
        }else{

            switch (event.key){
                case "w":
                    var horizLine = surface[selector.indexX];
                    surface[0] = horizLine[gameSize-1];
                    for(var i = 1; i < gameSize; i++){
                        surface[i] = horizLine[i-1];
                    }
                    Rubics.update();
                    break;
                case "s":
                    break;
                case "a":
                    var verticLine = new Array(gameSize);
                    verticLine = surface[selector.indexY];
                    surface[0] = verticLine[gameSize-1];
                    for(var j = 1; j < gameSize; j++){
                        surface[j] = verticLine[j-1];
                    }
                    Rubics.update();
                    break;
                case "d":
                    break;
            }

        }
    }
}