const canvas = document.querySelector(".myCanvas");
const width = (canvas.width = 800);
const height = (canvas.height = 600);
const ctx = canvas.getContext("2d");
let pressed = false;
let curX;
let curY;
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
const PI = Math.PI;
let playerX = 0;
let playerZ = -100;
let theta = 0;
let phi = 0;
const HEIGHT = 15;
let ballX = 0;
let ballY = 0;
let ballZ = -100;
let xVel = 0;
let yVel = 0;
let zVel = 0;
let enemyX = 0;
let enemyZ = 100;
let charge = 0;
let serve = true;
let direction = true;
let bounce = true;
let target = [];
let score = [0, 0];
let reset = 0;
let point = false;
function get3Dpoint(x, y, z, xAngle, yAngle) {
    let xView = 0;
    let yView = 0;
    let zView = 0;
    y*=-1;
    y+=HEIGHT;
    let newXangle = Math.atan2(x, z)-xAngle;
    xView = Math.sin(newXangle)*Math.hypot(x, z);
    zView = Math.cos(newXangle)*Math.hypot(x, z);
    let newYangle = Math.atan2(y, zView)-yAngle;
    yView = Math.sin(newYangle)*Math.hypot(y, zView);
    zView = Math.cos(newYangle)*Math.hypot(y, zView);
    return [xView, yView, zView];
}
function get3Ddisp(point){
    let dispX, dispY;
    if (point[2]<0){
        return null;
    }
    dispX = point[0]*(50.0/point[2])*6;
	dispY = (point[1])*(50.0/point[2])*6;
    return [dispX, dispY];
}
function get3Dline(x1, y1, z1, x2, y2, z2, xAngle, yAngle){
    let point1 = get3Dpoint(x1, y1, z1, xAngle, yAngle);
    let point2 = get3Dpoint(x2, y2, z2, xAngle, yAngle);
    if (point1[2]<0&&point2[2]<0){
        return null;
    }
    if (point1[2]<=0){
        let factor = -1*point1[2]/(point2[2]-point1[2]);
        point1[0]+=factor*(point2[0]-point1[0]);
        point1[1]+=factor*(point2[1]-point1[1]);
        point1[2] = 1;
    }
    if (point2[2]<=0){
        let factor = point2[2]*-1/(point1[2]-point2[2]);
        point2[0]+=factor*(point1[0]-point2[0]);
        point2[1]+=factor*(point1[1]-point2[1]);
        point2[2] = 1;
    }
    let disp1 = get3Ddisp([point1[0], point1[1], point1[2]]);
    let disp2 = get3Ddisp([point2[0], point2[1], point2[2]]);
    return [disp1[0], disp1[1], disp2[0], disp2[1]];
}
function loop() {
    ctx.fillStyle = "rgb(0, 255, 255)";
    ctx.fillRect(0, 0, width, height);
    theta = (curX-400)/127;
    phi = (curY-300)/191;
    if (keys[87]){ //W
        playerZ+=Math.cos(theta)*1.5;
        playerX+=Math.sin(theta)*1.5;
    }
    if (keys[65]){ //A
        playerZ+=Math.sin(theta)*1.5;
        playerX-=Math.cos(theta)*1.5;
    }
    if (keys[83]){ //S
        playerZ-=Math.cos(theta)*1.5;
        playerX-=Math.sin(theta)*1.5;
    }
    if (keys[68]){ //D
        playerZ-=Math.sin(theta)*1.5;
        playerX+=Math.cos(theta)*1.5;
    }
    if (keys[32]){ //space
        charge++;
        if (serve){
            ballX = playerX;
        ballZ = playerZ-1;
        ballY = 15;
        xVel = 0;
        yVel = 0;
        zVel = 0;
        }
        if (charge>50){
            charge = 50;
        }
    } else if (charge>0){
        if (Math.hypot(ballY-15, Math.hypot(ballX-playerX, ballZ-playerZ))<20&&direction){
            serve = false;
            direction = false;
            xVel = Math.sin(theta)*Math.cos(phi)*charge/15;
            yVel = Math.sin(phi)*charge/-10;
            zVel = Math.cos(theta)*Math.cos(phi)*charge/15;
            bounce = true;
        }
        charge = 0;
        if (zVel>0){
            let projX = ballX;
            let projY = ballY;
            let projZ = ballZ;
            let dx = xVel;
            let dy;
            let dz = zVel;
            for (dy=yVel; projY>0; dy-=0.05){
                projX+=dx;
                projY+=dy;
                projZ+=dz;
            }
            dy*=-0.8;
            dx*=0.98;
            dz*=0.98;
            projY = 0;
            for (dy=dy; projY<15&&dy>0; dy-=0.05){
                projX+=dx;
                projY+=dy;
                projZ+=dz;
            }
            target = [projX, projY, projZ];
        }
    }
    if (Date.now()>reset&&reset>0){
        reset = 0;
        playerX = 0;
        playerZ = -100;
        theta = 0;
        phi = 0;
        ballX = 0;
        ballY = 0;
        ballZ = -100;
        xVel = 0;
        yVel = 0;
        zVel = 0;
        enemyX = 0;
        enemyZ = 100;
        charge = 0;
        serve = true;
        direction = true;
        bounce = true;
        target = [];
    }
    if (!direction&&target.length>0){
        if (enemyX<target[0]){
            enemyX+=1.5;
        } else {
            enemyX-=1.5;
        }
        if (enemyZ<target[2]){
            enemyZ+=1.5;
        } else {
            enemyZ-=1.5;
        }
        if (Math.hypot(enemyX-ballX, Math.hypot(15-ballY, enemyZ-ballZ))<10){
            direction = true;
            let yAngle = enemyZ/250;
            let minX = Math.atan2(-105-enemyX, enemyZ+100);
            let maxX = Math.atan2(105-enemyX, enemyZ+100);
            console.log(minX+" "+maxX);
            let xAngle = Math.random()*(maxX-minX)+minX;
            xVel = Math.sin(xAngle)*Math.cos(yAngle)*2.7;
            yVel = Math.sin(yAngle)*3.6;
            zVel = Math.cos(xAngle)*Math.cos(yAngle)*-2.7;
            bounce = false;
        }
    }
    ballX+=xVel;
    ballZ+=zVel;
    ballY+=yVel;

    //Collisions
    if (ballY<0){
        yVel*=-0.8;
        xVel*=0.98;
        zVel*=0.98;
        ballY = 0;
        if (Date.now()>reset&&!serve){
            if (bounce){
                if (ballX<-105||ballX>105||ballZ<0||ballZ>200){
                    reset = Date.now()+3000;
                    score[1]++;
                    point = false;
                }
            } else {
                if (ballX<-105||ballX>105||ballZ>0||ballZ<-200){
                    reset = Date.now()+3000;
                    score[0]++;
                    point = true;
                }
            }
            bounce = !bounce;
        }
    }
    if ((ballZ>0&&ballZ-zVel<0)||(ballZ<0&&ballZ-zVel>0)){
        if (ballY<14){
            ballZ-=zVel*2;
            xVel = 0;
            yVel = 0;
            zVel = 0;
        }
    }
    if (playerZ>-5){
        playerZ = -5;
    }
    if (enemyZ<5){
        enemyZ = 5;
    }
    if (serve&&playerZ>-200){
        playerZ = -200;
    }

    yVel-=0.05;

    //Draw canvas
    let horizon;
    if (get3Ddisp(get3Dpoint(0, 15, 10000, 0, phi))===null){
        horizon = -300;
    } else {
        horizon = Math.max(-300, get3Ddisp(get3Dpoint(0, 15, 10000, 0, phi))[1]);
    }
    ctx.fillStyle = "rgb(0, 170, 85)";
    ctx.fillRect(0, 300+horizon, 800, 600);
    let court = [];
    court[0] = get3Dline(-140-playerX, 0, -200-playerZ, 140-playerX, 0, -200-playerZ, theta, phi);
    court[1] = get3Dline(140-playerX, 0, -200-playerZ, 140-playerX, 0, 200-playerZ, theta, phi);
    court[2] = get3Dline(140-playerX, 0, 200-playerZ, -140-playerX, 0, 200-playerZ, theta, phi);
    court[3] = get3Dline(-140-playerX, 0, 200-playerZ, -140-playerX, 0, -200-playerZ, theta, phi);
    court[4] = get3Dline(-105-playerX, 0, -200-playerZ, -105-playerX, 0, 200-playerZ, theta, phi);
    court[5] = get3Dline(105-playerX, 0, -200-playerZ, 105-playerX, 0, 200-playerZ, theta, phi);
    court[6] = get3Dline(-105-playerX, 0, -100-playerZ, 105-playerX, 0, -100-playerZ, theta, phi);
    court[7] = get3Dline(-105-playerX, 0, 100-playerZ, 105-playerX, 0, 100-playerZ, theta, phi);
    court[8] = get3Dline(-140-playerX, 0, 0-playerZ, 140-playerX, 0, 0-playerZ, theta, phi);
    court[9] = get3Dline(0-playerX, 0, -100-playerZ, 0-playerX, 0, 100-playerZ, theta, phi);
    ctx.strokeStyle = "rgb(255, 255, 255)";
    ctx.lineWidth = 3;
    for (let i=0; i<10; i++){
        if (court[i]==null){
            continue;
        }
        ctx.beginPath();
        ctx.moveTo(court[i][0]+400, court[i][1]+300);
        ctx.lineTo(court[i][2]+400, court[i][3]+300);
        ctx.stroke();
    }
    ctx.fillStyle = "rgb(255, 0, 0)";
    let enemy = get3Dpoint(enemyX-playerX, 0, enemyZ-playerZ, theta, phi);
    let eDisp = get3Ddisp(enemy);
    if (eDisp!=null){
        ctx.fillRect(eDisp[0]-1200/enemy[2]+400, eDisp[1]-7500/enemy[2]+300, 2400/enemy[2], 7500/enemy[2]);
    }
    if (ballZ>0){
        let ball = get3Dpoint(ballX-playerX, ballY-0, ballZ-playerZ, theta, phi);
        if (ball[2]>0){
            ctx.fillStyle = "rgb(0, 255, 0)";
            ctx.beginPath();
            ctx.arc(get3Ddisp(ball)[0]+400, get3Ddisp(ball)[1]+300, 600/ball[2], 0, 2*PI, false);
            ctx.fill();
        }
    }
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    let net = [get3Dline(-140-playerX, 0, 0-playerZ, 140-playerX, 0, 0-playerZ, theta, phi), get3Dline(-140-playerX, 14, 0-playerZ, 140-playerX, 14, 0-playerZ, theta, phi)];
    if (!net.includes(null)){
        ctx.beginPath();
        ctx.moveTo(net[0][0]+400, net[0][1]+300);
        ctx.lineTo(net[0][2]+400, net[0][3]+300);
        ctx.lineTo(net[1][2]+400, net[1][3]+300);
        ctx.lineTo(net[1][0]+400, net[1][1]+300);
        ctx.fill(); 
    }
    if (ballZ<=0){
        let ball = get3Dpoint(ballX-playerX, ballY-0, ballZ-playerZ, theta, phi);
        if (ball[2]>0){
            ctx.fillStyle = "rgb(0, 255, 0)";
            ctx.beginPath();
            ctx.arc(get3Ddisp(ball)[0]+400, get3Ddisp(ball)[1]+300, 600/ball[2], 0, 2*PI, false);
            ctx.fill();
        }
    }
    ctx.fillStyle = "rgb(255, 255, 0)";
    ctx.strokeStyle = "rgb(0, 0, 0)";
    ctx.lineWidth = 1;
    ctx.fillRect(20, 350-charge*2, 10, charge*2);
    ctx.strokeRect(20, 250, 10, 100);
    ctx.font = "40px Arial Black";
    ctx.strokeStyle = "black";
    if (Date.now()<reset){
        if (point){
            ctx.fillStyle = "blue";
        } else {
            ctx.fillStyle = "red";
        }
    } else {
        ctx.fillStyle = "white";
    }
    ctx.fillText("Score: "+score[0]+" - "+score[1], 20, 60);
    ctx.strokeText("Score: "+score[0]+" - "+score[1], 20, 60);
    if (serve){
        ctx.fillText("Serve the ball!", 20, 110);
        ctx.strokeText("Serve the ball!", 20, 110);
    }
    requestAnimationFrame(loop);
  }
  loop();