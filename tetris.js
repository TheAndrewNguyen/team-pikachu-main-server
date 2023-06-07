const canvas = document.querySelector(".myCanvas");
const width = (canvas.width = 800);
const height = (canvas.height = 600);
const ctx = canvas.getContext("2d");
ctx.fillStyle = "rgb(0, 0, 0)";
ctx.fillRect(0, 0, width, height);
let pressed = false;
let keys = [];
document.addEventListener("mousemove", (e) => {
    curX = e.pageX;
    curY = e.pageY;
});
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
//Global variables here
let board = [[]];
for (let r=0; r<20; r++){
    board[r] = [];
    for (let c=0; c<10; c++){
        board[r][c] = 0;
    }
}
let shapes = [[],
    [{x:-1, y:0},{x:0, y:0},{x:1, y:0},{x:2, y:0}], //I
    [{x:-1, y:-1},{x:-1, y:0},{x:0, y:0},{x:1, y:0}], //J
    [{x:-1, y:0},{x:0, y:0},{x:1, y:0},{x:1, y:-1}], //L
    [{x:0, y:0},{x:1, y:0},{x:1, y:-1},{x:0, y:-1}], //O
    [{x:-1, y:0},{x:0, y:0},{x:0, y:-1},{x:1, y:-1}], //S
    [{x:-1, y:0},{x:0, y:0},{x:1, y:0},{x:0, y:-1}], //T
    [{x:-1, y:-1},{x:0, y:-1},{x:0, y:0},{x:1, y:0}] //Z
];
let colors = ["rgb(0, 0, 204)", "rgb(0, 187, 187)", "rgb(0, 204, 0)", "rgb(187, 187, 0)", "rgb(204, 0, 0)", "rgb(187, 0, 187)"];
let current = Math.floor(Math.random()*7)+1;
let next = Math.floor(Math.random()*7)+1;
let das = 0;
let dasKey = 0;
let sdf = 0;
let rotation = 0;
let x = 4;
let y = 1;
let frame = 0;
let level = 1;
let lines = 0;
let score = 0;
let gravity = Date.now()+4000;
let start = Date.now()+3000;
let toClear = [];
let animating = -1;
function collide(position){
    for (let i=0; i<4; i++){
        if (position[i].y<0||position[i].y>19){
            return true;
        }
        if (position[i].x<0||position[i].x>9){
            return true;
        }
        if (board[[position[i].y]][[position[i].x]]>0){
            return true;
        }
    }
    return false;
}
function getPosition(piece, xPos, yPos, rotation){
    let position = [];
    for (let i=0; i<4; i++){
        position[i] = {x:shapes[piece][i].x, y:shapes[piece][i].y};
    }
    rotation+=4;
    rotation%=4;
    if (rotation==1){
        for (let i=0; i<4; i++){
            let temp = position[i].x;
            position[i].x = position[i].y*-1;
            position[i].y = temp;
        }
    }
    if (rotation==2){
        for (let i=0; i<4; i++){
            position[i].x*=-1;
            position[i].y*=-1;
        }
    }
    if (rotation==3){
        for (let i=0; i<4; i++){
            let temp = position[i].x;
            position[i].x = position[i].y;
            position[i].y = temp*-1;
        }
    }
    for (let i=0; i<4; i++){
        position[i].x+=xPos;
        position[i].y+=yPos;
    }
    return position;
}
function tick() {
    if (keys[37]){ //LEFT
        if (collide(getPosition(current, x-1, y, rotation))==false){
            if (dasKey==37){
                if (Date.now()>das){
                    x--;
                    das = Date.now()+50;
                }
            } else {
                x--;
                dasKey = 37;
                das = Date.now()+170;
            }
        }
    } else if (dasKey==37){
        dasKey = 0;
    }
    if (keys[39]){ //RIGHT
        if (collide(getPosition(current, x+1, y, rotation))==false){
            if (dasKey==39){
                if (Date.now()>das){
                    x++;
                    das = Date.now()+50;
                }
            } else {
                x++;
                dasKey = 39;
                das = Date.now()+170;
            }
        }
    } else if (dasKey==39){
        dasKey = 0;
    }
    if (keys[40]){ //DOWN
        if (collide(getPosition(current, x, y+1, rotation))==false){
            if (Date.now()>sdf){
                y++;
                sdf = Date.now()+50;
                score++;
            }
        } else {
            let position = getPosition(current, x, y, rotation);
            for (let i=0; i<4; i++){
                board[position[i].y][position[i].x] = current;
            }
            x = 4;
            y = 1;
            rotation = 0;
            current = next;
            next = Math.floor(Math.random()*7)+1;
            if (collide(getPosition(current, x, y, rotation))){
                start = -1;
                return;
            }
            gravity = Date.now()+1000*Math.pow(0.85, level-1);
        }
    }
    if (keys[38]){ //UP
        if (collide(getPosition(current, x, y, rotation+1))==false){
            keys[38] = false;
            rotation++;
        }
    }
    if (keys[90]){ //Z
        if (collide(getPosition(current, x, y, rotation-1))==false){
            keys[90] = false;
            rotation--;
        }
    }
    rotation+=4;
    rotation%=4;
    if (Date.now()>gravity){
        y++;
        gravity+=1000*Math.pow(0.85, level-1);
    }
    if (collide(getPosition(current, x, y, rotation))==true){
        y--;
        let position = getPosition(current, x, y, rotation);
        for (let i=0; i<4; i++){
            board[position[i].y][position[i].x] = current;
        }
        x = 4;
        y = 1;
        rotation = 0;
        current = next;
        next = Math.floor(Math.random()*7)+1;
        if (collide(getPosition(current, x, y, rotation))){
            start = -1;
            return;
        }
    }
    let thisLines = 0;
    toClear = [];
    for (let r=0; r<20; r++){
        let filled = true;
        for (let c=0; c<10; c++){
            if (board[r][c]==0){
                filled = false;
            }
        }
        if (filled){
            toClear[toClear.length] = r;
            thisLines++;
            lines++;
            if (lines%10==0){
                level++;
            }
            animating = 0;
        }
    }
    if (thisLines==1){
        score+=40*level;
    }
    if (thisLines==2){
        score+=100*level;
    }
    if (thisLines==3){
        score+=300*level;
    }
    if (thisLines==4){
        score+=1200*level;
    }
}
function loop() {
    frame++;
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = "rgb(255, 255, 255)";
    ctx.strokeRect(275, 50, 250, 500);
    if (Date.now()<start){
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Starting in "+Math.ceil((start-Date.now())/1000), 30, 50);
        requestAnimationFrame(loop);
        return;
    }
    if (start>-1){
        if (animating>-1){
            if (animating==5){
                animating = -1;
                for (let i=0; i<toClear.length; i++){
                    board.splice(toClear[i], 1);
                    board.unshift([0,0,0,0,0,0,0,0,0,0]);
                }
            }
            if (frame%4==0){
                for (let i=0; i<toClear.length; i++){
                    board[toClear[i]][4-animating] = 0;
                    board[toClear[i]][5+animating] = 0;
                }
                animating++;
            }
        } else {
            tick();
        }
    }
    for (let r=0; r<20; r++){
        for (let c=0; c<10; c++){
            if (board[r][c]>0){
                if (level<7){
                    ctx.fillStyle = colors[level-1];
                } else {
                    ctx.fillStyle = colors[Math.floor(frame/20)%6];
                }
                if (toClear.length==4&&animating%2==0){
                    ctx.fillStyle = "rgb(255, 255, 255)";
                }
                ctx.fillRect(275+c*25, 50+r*25, 25, 25);
                ctx.fillStyle = "rgb(255, 255, 255)";
                ctx.fillRect(279+c*25, 54+r*25, 17, 17);
            }
        }
    }
    for (let i=0; i<4; i++){
        if (level<7){
            ctx.fillStyle = colors[level-1];
        } else {
            ctx.fillStyle = colors[Math.floor(frame/20)%6];
        }
        let position = getPosition(current, x, y, rotation);
        ctx.fillRect(275+position[i].x*25, 50+position[i].y*25, 25, 25);
        ctx.fillRect(600+shapes[next][i].x*25, 100+shapes[next][i].y*25, 25, 25);
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fillRect(279+position[i].x*25, 54+position[i].y*25, 17, 17);
        ctx.fillRect(604+shapes[next][i].x*25, 104+shapes[next][i].y*25, 17, 17);
    }
    ctx.fillStyle = "White";
    ctx.font = "20px Arial";
    ctx.fillText("Score", 20, 300);
    ctx.fillText(score, 20, 320);
    ctx.fillText("Level", 20, 350);
    ctx.fillText(level, 20, 370);
    ctx.fillText("Lines", 20, 400);
    ctx.fillText(lines, 20, 420);
    if (start==-1){
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Game over!", 30, 50);
        return;
    }
    requestAnimationFrame(loop);
}
loop();