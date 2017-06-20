var menuSelectorMovement;

var Menu = {
    selectors : new Array(4),
    animatedContextArr : new Array(4),
    initMovement : function(selectedIndex) {
        let sels = this.selectors;
        switch(selectedIndex){
            case 0:
            menuSelectorMovement = setInterval(function() {
                sels[selectedIndex].moveInMenu(2, selectedIndex);
            },1);
            break;

            case 1:
            menuSelectorMovement = setInterval(function() {
                sels[selectedIndex].moveInMenu(4, selectedIndex);
            },1);
            break;

            case 2:
            menuSelectorMovement = setInterval(function() {
                sels[selectedIndex].moveInMenu(8, selectedIndex);
            },1);
            break;

            case 3:
            sels[selectedIndex].xPos = 192;
            Menu.clear(selectedIndex);
            Menu.update(selectedIndex);
            break;
        }
    },
    update : function(selectedIndex) {
        let sels = this.selectors;
        let contextArr = this.animatedContextArr;

        //draw grids
        contextArr[selectedIndex].fillStyle = "red";
        contextArr[selectedIndex].fillRect(0,0,128,128);
        contextArr[selectedIndex].fillStyle = "blue";
        contextArr[selectedIndex].fillRect(128,0,128,128);

        //draw selector
        contextArr[selectedIndex].fillStyle = sels[selectedIndex].color;
        contextArr[selectedIndex].beginPath();
        contextArr[selectedIndex].arc(sels[selectedIndex].xPos, sels[selectedIndex].yPos, sels[selectedIndex].radius-3, 0, 2 * Math.PI, false);
        contextArr[selectedIndex].fill();
    },
    checkMenu : function(){
        let arr = new Array(3);
        arr[0] = gameSize;
        arr[1] = selectorSpeed;
        arr[2] = difficulty;

        let containsNull = false;

        for(let i = 0; i < arr.length; i++){
            if(arr[i] == null){
                containsNull = true;
                break;
            }
        }

        return containsNull ? arr : true;
    },
    clear : function(selectedIndex) {
         let contextArr = this.animatedContextArr;
         contextArr[selectedIndex].clearRect(0, 0, 192, 128);
    },
    reset : function(selectedIndex) {
        let sels = this.selectors;
        let contextArr = this.animatedContextArr;

        clearInterval(menuSelectorMovement);
        sels[selectedIndex].xPos = 64;
        Menu.clear(selectedIndex);
        Menu.update(selectedIndex);
    },
    blink : function(divValues, divObjects){
        for(let i = 0; i < divValues.length; i++){
            if(divValues[i] == null){
                if(blinkCount%2 == 0){
                    divObjects[i].style.background = "red";
                }else{
                    divObjects[i].style.background = "white";
                }
            }
        }

            blinkCount++;
            if(blinkCount == 4){
                clearInterval(blinkInterval);
                blinkInterval = false;
                blinkCount = 0;
            }
    }
}