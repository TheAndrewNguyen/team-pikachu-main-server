const canvas = document.querySelector(".myCanvas");
const width = (canvas.width = 800);
const height = (canvas.height = 600);
const ctx = canvas.getContext("2d");
ctx.fillStyle = "rgb(0, 0, 0)";
ctx.fillRect(0, 0, width, height);
var ballX=10;
var ballY=300;
var xVel=5;
var yVel=5;
let curX;
let curY;
let pressed = false;
let keys = [];
let frames = 0;
let start = Date.now()+3000;
let animation = -1;
let toClear = [];
document.addEventListener("mousemove", (e) => {
    curX = e.pageX;
    curY = e.pageY;
});
const blocks = [[]];
for (let y=0; y<5; y++){
    blocks[y] = [];
    for (let x=0; x<16; x++){
        blocks[y][x] = 100-y*20;
    }
}
canvas.addEventListener("mousedown", () => (pressed = true));
canvas.addEventListener("mouseup", () => (pressed = false));
window.addEventListener('keydown', this.keyDown, false);
window.addEventListener('keyup', this.keyUp, false);
function keyDown(e){
    keys[e.keyCode] = true;
}
function keyUp(e){
    keys[e.keyCode] = false;
}
function rainbow(val){
    if (val<255){
        return "rgb(255, "+val+", 0)";
    }
    if (val<510){
        return "rgb("+(510-val)+", 255, 0)";
    }
    if (val<765){
        return "rgb(0, 255, "+(val-510)+")";
    }
    if (val<1020){
        return "rgb(0, "+(1020-val)+", 255";
    }
    if (val<1275){
        return "rgb("+(val-1020)+", 0, 255)";
    }
}
function loop() {
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "rgb(255, 0, 255)";
    ctx.fillRect(ballX-10,ballY-10,20,20);
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(curX-50, 550, 100, 10);
    
    for (y=0; y<5; y++){
        for (x=0; x<16; x++){
            if (blocks[y][x]>0){
                ctx.fillStyle = rainbow(blocks[y][x]*10);
                ctx.fillRect(x*50+10, y*50+10, 30, 30);
            }
        }
    }
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    if (Date.now()<start){
        ctx.fillText("Starting in "+Math.ceil((start-Date.now())/1000), 10, 575);
        requestAnimationFrame(loop);
        return;
    } else {
        ctx.fillText(frames, 10, 575);
    }
    for (let i=0; i<Math.abs(yVel); i++){
        if (xVel>0){
            ballX++;
        } else {
            ballX--;
        }
        if (yVel>0){
            ballY++;
        } else {
            ballY--;
        }
        if (ballX<10){
            ballX = 10;
            xVel*=-1;
        }
        if (ballY<10){
            ballY = 10;
            yVel*=-1;
        }
        if (ballX>790){
            ballX = 790;
            xVel*=-1;
        }
        if (ballY>590){
            ballY = 590;
            yVel*=-1;
            if (xVel>3){
                xVel--;
            }
            if (xVel<-3){
                xVel++;
            }
            if (yVel>3){
                yVel--;
            }
            if (yVel<-3){
                yVel++;
            }
        }
        if (ballY>550&&ballY<580&&ballX>curX-60&&ballX<curX+60){
            yVel*=-1;
            if (xVel>0){
                xVel++;
            } else {
                xVel--;
            }
            if (yVel>0){
                yVel++;
            } else {
                yVel--;
            }
            ballY+=yVel;
        }
        let flipX = 0;
        let flipY = 0;
        let finished = 1;
        for (y=0; y<5; y++){
            for (x=0; x<16; x++){
                if (blocks[y][x]>0){
                    finished = 0;
                    if (ballX>x*50-10&&ballX<x*50+60&&ballY>y*50-10&&ballY<y*50+60){
                        blocks[y][x]-=Math.abs(yVel);
                        if (blocks[y][x]>0){
                            if (Math.abs(ballX-x*50-25)>Math.abs(ballY-y*50+25)){
                                flipX = 1;
                            } else {
                                flipY = 1;
                            }
                        }
                    }
                    
                }
            }
        }
        if (flipX==1){
            xVel*=-1;
        }
        if (flipY==1){
            yVel*=-1;
        }
        if (finished==1){
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillText("Score: "+Math.round(10000000/frames), 20, 30);
            return;
        }
    }
    frames++;
    requestAnimationFrame(loop);
  }

  loop();