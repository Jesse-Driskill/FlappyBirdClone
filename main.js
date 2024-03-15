

console.log("Hello world!");




document.addEventListener("DOMContentLoaded", () => {

    let ctx = document.getElementById("canvas").getContext("2d");

    let screenHeight = 1080;
    let screenWidth = 1840;
    
    
    let b = {x: 300, y: 0, w: 30, h: 30, vX: 0, vY: 0};
    let obstacles = [];
    let gravity = 1;
    let counter = 0;
    
    document.addEventListener("click", () => {

        if (b.vY > -26) {

            b.vY -= 15;
        }
    });

    setInterval(() => {

        ctx.clearRect(b.x,b.y,b.w,b.h);

        if (b.vY < 2) {
            b.vY += gravity;
        }
        b.y += b.vY;
        
        ctx.fillStyle = "yellow";
        ctx.fillRect(b.x,b.y,b.w,b.h);
        ctx.fillStyle = "black";

        for (let i = 0; i < obstacles.length; i++) {
            let obstacle = obstacles[i];
            ctx.clearRect(obstacle.x, obstacle.y, 80, obstacle.h);
            ctx.fillStyle = "#32CD32";
            obstacle.x -= 1;
            ctx.fillRect(obstacle.x, obstacle.y, 80, obstacle.h);
        }

        if (counter > 2400) {
            generateTopObject();
            generateBottomObject();
            counter = 0
        }

    

        counter += 4;

        if (obstacles[0].x < -100) {
            obstacles.shift();
            console.log("shifted!");
        }
        if (obstacles[0].x < -100) {
            obstacles.shift();
            console.log("shifted!");
        }

    
        
    }, 5);

    function generateTopObject() {
        obstacles.push({x: screenWidth, y: 0, h: Math.max(Math.floor(Math.random() * 400), 100 + Math.floor(Math.random() * 100))});
    }

    function generateBottomObject() {
        let topleft = screenHeight - Math.max(Math.floor(Math.random() * 400), 100 + Math.floor(Math.random() * 100));
        obstacles.push({x: screenWidth, y: topleft, h: screenHeight + 400});
    }

})


