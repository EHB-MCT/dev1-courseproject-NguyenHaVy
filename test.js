let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let context = canvas.getContext("2d");

pTest1_3_c();
function pTest1_3_c() {
    context. fillRect (0, 0, 400, 400);
    context.fillStyle = "lightgray";
    context.fillRect (50, 50, 300, 200);
    context.fillStyle = "gray";
    context. fillRect (50, 50, 300, 100);
    context. fillRect (250, 250, 100, 100);
    context.fillStyle = "black";
    context. fillRect (50, 50, 100, 300);
    context.fillStyle = "white"
    context. fillRect (50, 50, 100, 200);
}