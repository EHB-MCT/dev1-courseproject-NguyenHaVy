import context from "../scripts/context.js";
import * as Utils from "../scripts/utils.js";

let width = context.canvas.width;
let height = context.canvas.height;

let amount = 100;
let rain = [];

setup();
update();

function setup() {
	for (let i = 0; i < amount; i++) {
		let drop = {
			x: Utils.randomNumber(width / 3, width / 2 + 250),
			y: Utils.randomNumber(0, height),
			hue: Utils.randomNumber(0, 50),
		};
		rain.push(drop);
	}
}

function update() {
	context.fillStyle = "#9fd2ff";
	context.fillRect(0, 0, width, height);
	for (let i = 0; i < rain.length; i++) {
		rain[i].y += 2;

		//chatGPT
		if (rain[i].y > height) {
			rain[i].y = 0;
			rain[i].x = Utils.randomNumber(width / 3, width / 2 + 250);
		}
		drawDrop(rain[i]);
	}

	requestAnimationFrame(update);
}

function drawDrop(drop) {
	context.fillStyle = "#4175ec";
	Utils.fillEllipse(drop.x, drop.y, 5, 10);
}

document.onmousedown = color;

/**
 *
 * @param{MouseEvent}e
 */
function color(e) {
	console.log(e.code);
}
