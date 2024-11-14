import context from "../scripts/context.js";
import * as Utils from "../scripts/utils.js";
import * as Noise from "../scripts/noise.js";

let width = context.canvas.width;
let height = context.canvas.height;

drawSky();

drawRain();
drawCloud();

function drawCloud() {
	for (let i = 0; i < 100; i++) {
		let x = Utils.randomNumber(500, width - 500);
		let y = Utils.randomNumber(450, height - 550);
		let size = Utils.randomNumber(10, 100);
		context.fillStyle = Utils.hsla(Utils.randomNumber(0, 360), 75, 95, 50);
		Utils.fillCircle(x, y, size);
	}
}

function drawRain() {
	let rows = 60;
	let columns = 50;
	let w = 5;
	let h = 5;
	let margin = width / 3 - 20;

	for (let i = 0; i < columns; i++) {
		context.fillStyle = Utils.hsla(Utils.randomNumber(100, 360), 75, 60, 90);
		for (let j = 0; j < rows; j++) {
			let x = margin + i * (w + 5) + (j % 6) * 10;
			let y = margin + j * (h + 5);
			context.fillRect(x, y, w, h);
		}
	}
}

function drawSky() {
	context.fillStyle = "#0FA8FF";
	context.fillRect(0, 0, width, height);
}
