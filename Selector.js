/**
 * Created by ken on 06.06.2017.
 */
//selector circle
function Selector() {
    this.xPos = canvasSize/(gameSize*2);
    this.yPos = canvasSize/(gameSize*2);
    var halfDistance = canvasSize/(gameSize*2);
    this.radius = 15;
    this.color = "yellow";
    this.indexX = 0;
    this.indexY = 0;

    this.outOfMap = false;

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
                //if required destination is met
                if(this.outOfMap){
                    if(this.xPos < 0 ){
                        this.xPos = canvasSize;
                        this.outOfMap = false;
                    }
                }else{
                    if(this.xPos <= destination){
                        clearInterval(movement);
                        movement = false;
                    }
                }
                break;
            //up
            case 38:
                this.yPos -= 2;
                gameContext.fillStyle = this.color;
                gameContext.beginPath();
                gameContext.arc(this.xPos,this.yPos,this.radius,0,2*Math.PI,false);
                gameContext.fill();

                if(this.outOfMap){
                    if(this.yPos < 0 ){
                        this.yPos = canvasSize;
                        this.outOfMap = false;
                    }
                }else{
                    if(this.yPos <= destination){
                        clearInterval(movement);
                        movement = false;
                    }
                }
                break;
            //right
            case 39:
                this.xPos += 2;
                gameContext.fillStyle = this.color;
                gameContext.beginPath();
                gameContext.arc(this.xPos,this.yPos,this.radius,0,2*Math.PI,false);
                gameContext.fill();

                if(this.outOfMap){
                    if(this.xPos > canvasSize){
                        this.xPos = 0;
                        this.outOfMap = false;
                    }
                }else{
                    if(this.xPos >= destination){
                        clearInterval(movement);
                        movement = false;
                    }
                }
                break;
            //down
            case 40:
                this.yPos += 2;
                gameContext.fillStyle = this.color;
                gameContext.beginPath();
                gameContext.arc(this.xPos,this.yPos,this.radius,0,2*Math.PI,false);
                gameContext.fill();

                if(this.outOfMap){
                    if(this.yPos > canvasSize){
                        this.yPos = 0;
                        this.outOfMap = false;
                    }
                }else{
                    if(this.yPos >= destination){
                        clearInterval(movement);
                        movement = false;
                    }
                }
                break;
        }

        console.log("Selector X: " + this.indexX, "Selector Y: " + this.indexY);
    }
}