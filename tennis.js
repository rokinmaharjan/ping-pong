var canvas;
var canvasContext;

const BALL_RADIUS = 10;
const PADDLE_WIDTH = 12;
const PADDLE_HEIGHT = 129;

var ballX;
var ballY;
var ballXSpeed = 5;
var ballYSpeed = 5;

var leftPaddleY;
var rightPaddleY;

var leftPlayerScore = 0;
var rightPlayerScore = 0;

$(document).ready(function() {
    canvas = $('#tennisCanvas').get(0);
    canvasContext = canvas.getContext('2d');
    leftPaddleY = rightPaddleY = canvas.height / 2 - PADDLE_HEIGHT / 2;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    setInterval(function() {
        drawEverything();
        moveEverything();
    }, 1000 / 90);
});

function drawEverything() {
    // Draw tennis board
    drawRectangle(0, 0, canvas.width, canvas.height, 'navy');
    // Draw horizontal table margin
    drawDottedLines(0, canvas.height / 2, canvas.width, canvas.height / 2, 'white');
    // Draw verticle table margin
    drawDottedLines(canvas.width / 2, 0, canvas.width / 2, canvas.height, 'white');
    // Draw left paddle
    drawRectangle(0, leftPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT, 'red');
    // Draw right paddle
    drawRectangle(canvas.width - PADDLE_WIDTH, rightPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT, 'black');
    // Draw ball
    drawCircle(ballX, ballY, BALL_RADIUS, 'white');
    // Move left paddle
    movePaddle();
    // Show scores
    showScores();
}

function drawRectangle(leftX, topY, width, height, colour) {
    canvasContext.fillStyle = colour;
    canvasContext.fillRect(leftX, topY, width, height);
}

function drawCircle(centerX, centerY, radius, colour) {
    canvasContext.fillStyle = colour;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}

function drawDottedLines(startX, startY, endX, endY, colour) {
    canvasContext.beginPath();
    canvasContext.setLineDash([53, 15]);
    canvasContext.moveTo(startX, startY);
    canvasContext.lineTo(endX, endY);
    canvasContext.strokeStyle = colour;
    canvasContext.stroke();
}

function moveEverything() {
    ballX += ballXSpeed;
    ballY += ballYSpeed;

    if (ballX < PADDLE_WIDTH) {
        if (ballY >= leftPaddleY && ballY <= leftPaddleY + PADDLE_HEIGHT) {
            ballXSpeed = -ballXSpeed;

            var yDiffFromCenter = ballY - (leftPaddleY + PADDLE_HEIGHT / 2);
            ballYSpeed = yDiffFromCenter * 0.2;
            console.log(yDiffFromCenter);

        } else if (ballX < 0) {
            rightPlayerScore++;
            declareWinner();
            resetBall();
        }
    }

    if (ballX > canvas.width - PADDLE_WIDTH) {
        if (ballY >= rightPaddleY && ballY <= rightPaddleY + PADDLE_HEIGHT) {
            ballXSpeed = -ballXSpeed;
        } else if (ballX > canvas.width) {
            leftPlayerScore++;
            declareWinner();
            resetBall();
        }
    }

    if (ballY < 0 || ballY > canvas.height) {
        ballYSpeed = -ballYSpeed;
    }

}

function movePaddle() {
    $(document).on('mousemove', function(event) {
        if (event.pageX < canvas.width && event.pageY < canvas.height) {
            // if (leftPaddleY < canvas.height - PADDLE_HEIGHT) {
            leftPaddleY = event.pageY - PADDLE_HEIGHT / 2;
            // } else {
            //  leftPaddleY--;
            // }
        }
    });

    var rightPaddleYCenter = rightPaddleY + (PADDLE_HEIGHT / 2);
    if (rightPaddleYCenter < ballY) {
        rightPaddleY = rightPaddleY + 5;
    } else if (rightPaddleYCenter > ballY) {
        rightPaddleY = rightPaddleY - 5;
    }
    // rightPaddleY = ballY - PADDLE_HEIGHT / 2;

}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballXSpeed = 5;
    ballYSpeed = 5;
}


function showScores() {
    canvasContext.font = "50px Arial";
    canvasContext.fillStyle = "red";
    canvasContext.fillText(leftPlayerScore, canvas.width / 2 - 50, 100);
    canvasContext.fillStyle = "black";
    canvasContext.fillText(rightPlayerScore, canvas.width / 2 + 17, 100);
}


function declareWinner() {
    if (leftPlayerScore >= 5) {
        alert("LEFT PLAYER WINS!!")
        leftPlayerScore = 0;
        rightPlayerScore = 0;
    } else if (rightPlayerScore >= 5) {
        alert("RIGHT PLAYER WINS!!")
        leftPlayerScore = 0;
        rightPlayerScore = 0;
    }
}
