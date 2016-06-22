function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext('2d');

var x=0;
var y=0;
var r=100;
var lineWidth = 5;

function init() {
    initScope();
    initScore();
    startGame();
    //grid();
}

function startGame() {
    $(".start").click(function(){
        initTarget();
        initGameTimer();
    });
}

function grid() {
    ctx.fillStyle = "white";
    var gridCols = 50;
    var gridRows = 50;
    for(var i=0; i<gridCols; i++){
        ctx.fillRect(canvas.width/gridCols*i, 0, 1, canvas.height);
    }
    for(var j=0; j<gridRows; j++){
        ctx.fillRect(0, canvas.height/gridRows*j, canvas.width, 1);
    }
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

    var timer = setInterval(function(){

        /*RANDOMIZING START*/

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        var targetX = getRandomInt(r, canvas.width - r);
        var targetY = getRandomInt(r, canvas.height - r);

        var targetColor = {
            red: getRandomInt(0, 256),
            green: getRandomInt(0, 256),
            blue: getRandomInt(0, 256)
        };

        var targetTimeAppear = getRandomInt(500,3000);

        /*RANDOMIZING END*/

        ctx.beginPath();
        ctx.fillStyle = "rgb("+targetColor.red+","+targetColor.green+","+targetColor.blue+")";
        ctx.fillRect(targetX, targetY, 20, 20);

        if($(".timer span")===1){
            clearInterval(timer);
            $(".timer span").html("Time's up!");
        }

    }, targetTimeAppear);

}

function initGameTimer() {

    var timeLeft = 3;

    var timer = setInterval(function(){
        $(".timer span").html(timeLeft--);

        if(timeLeft===-1){
            clearInterval(timer);
            $(".timer span").html("Time's up!");
        }

    }, 1000);

}

function initScore() {

    var points=0;

    $(".points span").html(points);
}

init();