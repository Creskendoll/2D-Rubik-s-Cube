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

//button functions
//show/hide help
function showHelp(){
    document.getElementById("gameMan").style.display = 
            document.getElementById("gameMan").style.display == "inline-block" ? "none" : "inline-block";
    Menu.helpShowing = !Menu.helpShowing;
}

function changeButtonColor(button){
    if(button.id == "startButton"){
        button.style.background = Menu.checkMenu() == true ? "green" : "red";
        button.style.border = Menu.checkMenu() == true ? "solid #1b5e20 3px" : "solid #d50000 3px";        
    }else{
        button.style.background = Menu.checkMenu() == true ? "green" : "red";
        button.style.border = Menu.checkMenu() == true ? "solid #1b5e20 3px" : "solid #d50000 3px";
    }
}

function resetButtonColor(button) {
    button.style.border = "solid #2962ff 3px";
    button.style.background = null;
}

function resume(){
    Menu.hideMenu();
}

