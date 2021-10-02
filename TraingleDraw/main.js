var canvas = document.getElementById('paintCanvas')
var ctx = canvas.getContext('2d')

//event listener for creating triangle
canvas.addEventListener('mousedown', start);
canvas.addEventListener('mouseup', end);
canvas.addEventListener('mousemove', move);

var x = 0, y = 0, width = 0, height = 0;
var drawing = false;
var shapes = []

function start(e) {
    x = e.clientX;
    y = e.clientY;
    drawing = true;
}

function move(e) {
    if (drawing) {
        width = x - e.clientX;
        height = Math.abs(y - e.clientY);
    }
}
function end(e) {

    if(width == 0 || height == 0){
        x = y = width = height = 0;
        drawing = false;
        return;
    }

    drawTriangle(x, y, width, height);
    shapes.push({ x: x, y: y, w: width, h: height });
    x = y = width = height = 0;
    drawing = false;
}


function drawTriangle(x1, y1, w, h) {
    if(w == 0 || h == 0){
        return;
    }
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 - w, y1 + h);
    ctx.lineTo(x1 + w, y1 + h)
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 + w, y1 + h);

    ctx.fillStyle = getNewColor()
    ctx.fill();

}

//to get random color
function getNewColor() {
    return "hsla(" + Math.floor(Math.random() * 360) + ", 100%, 50%, 1)";
}

//event listener to clear the canvas
document.getElementById('clear').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes = []
}, false);

//event listener to erase shape when double cliked
canvas.addEventListener("dblclick", (e) => {
    var y1 = e.clientY;
    for(var i = 0; i < shapes.length; i++){
        if(y1 >= shapes[i].y && y1 <= (shapes[i].y + shapes[i].h)){
            shapes.splice(i, 1);
            console.log(shapes);
            refresh();
            break;
        }
    }
});

//refreshing canvas
function refresh(){
    console.log('ref')
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas

    //draw shapes
    shapes.forEach((item)=> {
        drawTriangle(item.x, item.y, item.w, item.h);
    });
}