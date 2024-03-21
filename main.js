
console.log("Hello world!");




document.addEventListener("DOMContentLoaded", () => {

    let ctx = document.getElementById("canvas").getContext("2d");

    let screenHeight = 1080;
    let screenWidth = 1840;

    document.body.style.overflow = 'hidden';
    
    let terminalVelocity = 30;
    let maximumAcceleration = 10;

    let b = {x: 300, y: 0, w: 30, h: 30, vX: 0, vY: 0, vA: 0};
    let obstacles = [];
    let gravity = 1;
    let counter = 0;


    
    
    function startGame() {
        
        function youLose() {
            console.log("You lose!");
            let youLose = document.createElement("h1");
            youLose.innerHTML = "YOU LOSE!";
            youLose.style.position = 'absolute';
            youLose.style.top = "50%";
            youLose.style.left = "50%";
            document.body.appendChild(youLose);
            clearInterval(loopInterval);
        }
        document.addEventListener("click", () => {
            
            if (b.vA > -100) {
                b.vA -= 50;
            }
            

        });


        var loopInterval = setInterval(() => {

            //console.log(b.vA)
            ctx.clearRect(b.x,b.y,b.w,b.h);

            //bird physics

            
            b.vA += gravity;
            b.vY += b.vA;
            if (b.vY > 6) {
                b.vY = 6;
            } else if (b.vY < -8) {
                b.vY = -8;
            }
            b.y += b.vY;
            
            
            

            //bird physics

            
            ctx.fillStyle = "yellow";
            ctx.fillRect(b.x,b.y,b.w,b.h);
            ctx.fillStyle = "black";

            for (let i = 0; i < obstacles.length; i++) {
                let obstacle = obstacles[i];
                ctx.clearRect(obstacle.x, obstacle.y, 80, obstacle.h);
                ctx.fillStyle = "#32CD32";
                obstacle.x -= 2;
                ctx.fillRect(obstacle.x, obstacle.y, 80, obstacle.h);

                //collision checks
                if (obstacle.x === b.x + 30) {
                    console.log("UJIHDEFHUIUIHFEWNJKSDF")

                    if (obstacle.type === "bottomObject") {
                        if (obstacle.y < b.y) {
                            console.log("LOSS DUE TO BOTTOM COLLISION");
                            youLose();
                        }
                    } else if (obstacle.type === "topObject") {
                        if (obstacle.y + obstacle.h > b.y ) {
                            console.log("LOSS DUE TO TOP COLLISION");
                            youLose();
                        }
                    }
                }
            }

            if (counter > 1850) {
                generateTopObject();
                generateBottomObject();
                counter = 0
            }

        

            counter += 11;

            if (obstacles.length > 0) {
                if (obstacles[0].x < -100) {
                    obstacles.shift();
                    //console.log("shifted!");
                }
                if (obstacles[0].x < -100) {
                    obstacles.shift();
                    //console.log("shifted!");
                }
            }

            if (b.y > 1100) {
                youLose();
            }

            //console.log(obstacles[0].x);
            //console.log(b.x)

        }, 20);

    }

    startGame();


    

    function generateTopObject() {
        obstacles.push({type: "topObject", x: screenWidth, y: 0, h: Math.max(Math.floor(Math.random() * 450), 200 + Math.floor(Math.random() * 100))});
    }

    function generateBottomObject() {
        let topleft = screenHeight - Math.max(Math.floor(Math.random() * 450), 200 + Math.floor(Math.random() * 100));
        obstacles.push({type: "bottomObject", x: screenWidth, y: topleft, h: screenHeight + 400});
    }

})


