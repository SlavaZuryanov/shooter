function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function inRange(x, min, max) {
    return x >= min && x <= max;
}

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext('2d');

var canvasTargetArea = document.getElementById("target-area"),
    ctxTA = canvasTargetArea.getContext('2d');

var x = 0,
    y = 0,
    r =100,
    lineWidth = 5;

var timeLeft = 30,
    points = 1;

var targetX,
    targetY,
    targetW = 20,
    targetH = 20,
    targetColor = {
    red: 0,
    green: 0,
    blue: 0
};

var mousePosX,
    mousePosY;

function init() {
    initScope();
    initScore();
    startGame();
}

function getMousePos(canvasTargetArea, evt) {
    var rect = canvasTargetArea.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function startGame() {
    $(".start").click(function(){
        points = 1;

        $(".points span").html("0");
        initGameTimer();
        initTarget();
        targetClick();

        $(this).addClass("clicked");
    });
}

function initScope() {

    canvas.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(canvas, evt);

        x=mousePos.x-r;
        y=mousePos.y-r;

        ctx.save();

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.restore();

        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.arc(x+r+lineWidth/2, y+r+lineWidth/2, r, 0, 2 * Math.PI, false);
        ctx.fillStyle = "rgba(255,255,255,.3)";
        ctx.fill();
        ctx.stroke();

        ctx.lineWidth = lineWidth/2;
        ctx.beginPath();
        ctx.moveTo(x+r,y);
        ctx.lineTo(x+r,r*2+y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x,y+r);
        ctx.lineTo(x+r*2,y+r);
        ctx.stroke();

    }, false);

}

function initTarget() {

    targetX = getRandomInt(r, canvas.width - r);
    targetY = getRandomInt(r, canvas.height - r);

    targetColor = {
        red: getRandomInt(0, 256),
        green: getRandomInt(0, 256),
        blue: getRandomInt(0, 256)
    };

    ctxTA.clearRect(0, 0, canvas.width, canvas.height);
    ctxTA.beginPath();
    ctxTA.fillStyle = "rgb("+targetColor.red+","+targetColor.green+","+targetColor.blue+")";
    ctxTA.fillRect(targetX, targetY, targetW, targetH);

}

function targetClick() {

    canvas.addEventListener('click', function(e){
        var pos = getMousePos(canvasTargetArea, e);
        mousePosX = pos.x;
        mousePosY = pos.y;

        if(inRange(mousePosX, targetX, targetX+targetW) && inRange(mousePosY, targetY, targetY+targetH)) {
            $(".points span").html(points++);
            initTarget();
        } else {
            return;
        }

    });

}

function initGameTimer() {
    $(".timer span").html("Go!");

    var timer = setInterval(function(){
        $(".timer span").html(timeLeft--);

        if(timeLeft===-1){
            clearInterval(timer);

            $(".timer span").html("Time's up!");
            $(".points span").html("0");

            points--;
            timeLeft = 30;

            ctxTA.clearRect(0,0,canvas.width, canvas.height);

            $(".score-popup").addClass("score-active");
            $(".score-popup .score").html(points);
            $(".close-score").click(function () {
                $(".score-popup").removeClass("score-active");
                $(".start").removeClass("clicked");
            });
        }

    }, 1000);

}

function initScore() {

    var points=0;

    $(".points span").html(points);
}

init();