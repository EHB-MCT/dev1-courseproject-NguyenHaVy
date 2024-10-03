let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let context = canvas.getContext("2d");

drawAvatar();
function drawAvatar(){
    context.fillStyle = "black";
    context.beginPath();
    context.rect(20, 20, 300, 300);
    context.fill();

    context.fillStyle = "#d77373";
    context.beginPath();
    context.rect(145,50,50,100);
    context.rect(50,100,50,50);
    context.rect(240,100,50,50);
    context.rect(240,200,50,50);
    context.rect(50,200,50,50);
    context.rect(145,200,50,50);
    context.fill();

    
}

