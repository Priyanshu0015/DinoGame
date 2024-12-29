const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;
canvas.style.backgroundColor = 'white';

let isIntro = true;
let isGameOver = false;
let dino = { x: 50, y: 400, width: 40, height: 40, dy: 0, jumping: false };
const gravity = 0.5;
let score = 0;
let baseSpeed = 5;

let cactus = {
    x: canvas.width,
    y: 410,
    width: 30,
    height: 30,
    speed: baseSpeed
};

function spawnCactus() {
    cactus.x = canvas.width;
    cactus.width = Math.random() * 30 + 20;
    cactus.height = Math.random() * 20 + 20;
    cactus.speed = Math.random() * 2 + baseSpeed;
}


function drawIntro() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#fff";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Welcome to Dino Game", canvas.width / 2, 150);
    ctx.font = "20px Arial";
    ctx.fillText("Press SPACE to Start", canvas.width / 2, 200);

    ctx.fillStyle = "green";
    ctx.fillRect(canvas.width / 2 - 20, 250, 40, 40); // Dino
}


function drawGameOver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#fff";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, 150);
    ctx.fillText(`Your Score: ${score}`, canvas.width / 2, 200);
    ctx.fillText("Press SPACE to Restart", canvas.width / 2, 250);
}


function drawGame() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#A0522D";
    ctx.fillRect(0, 440, canvas.width, 60);


    if (dino.jumping) {
        dino.dy += gravity;
        dino.y += dino.dy;
        if (dino.y >= 400) {
            dino.jumping = false;
            dino.dy = 0;
            dino.y = 400;
        }
    }

    ctx.fillStyle = "green";
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);

    cactus.x -= cactus.speed;

    if (cactus.x + cactus.width < 0) {
        spawnCactus();
        score += 1;
        baseSpeed += 0.1;
    }

    ctx.fillStyle = "brown";
    ctx.fillRect(cactus.x, cactus.y, cactus.width, cactus.height);

    if (
        dino.x < cactus.x + cactus.width &&
        dino.x + dino.width > cactus.x &&
        dino.y < cactus.y + cactus.height &&
        dino.y + dino.height > cactus.y
    ) {
        isGameOver = true;
    }

    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`Score: ${score}`, canvas.width / 2, 30);
}

function gameLoop() {
    if (isIntro) {
        drawIntro();
    } else if (isGameOver) {
        drawGameOver();
    } else {
        drawGame();
    }

    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        if (isIntro) {
            isIntro = false;
        } else if (isGameOver) {
            isGameOver = false;
            score = 0;
            baseSpeed = 5;
            spawnCactus();
            dino.y = 400;
            dino.jumping = false;
            dino.dy = 0;
        } else if (!dino.jumping) {
            // Make Dino jump
            dino.jumping = true;
            dino.dy = -10;
        }
    }
});


spawnCactus();
gameLoop();
