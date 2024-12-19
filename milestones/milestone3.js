import context from "../scripts/context.js";
import * as Utils from "../scripts/utils.js";

let width = context.canvas.width;
let height = context.canvas.height;

let amount = 100;
let rain = [];

setup();

update();

drawCloud();
function drawCloud() {
	for (let i = 0; i < 100; i++) {
		let x = Utils.randomNumber(500, width - 500);
		let y = Utils.randomNumber(0, height - 650);
		let size = Utils.randomNumber(10, 100);
		context.fillStyle = Utils.hsla(Utils.randomNumber(0, 360), 75, 95, 50);
		Utils.fillCircle(x, y, size);
	}
}

function setup() {
	for (let i = 0; i < amount; i++) {
		let drop = {
			x: Utils.randomNumber(width / 3, width / 2 + 250),
			y: Utils.randomNumber(0, height),
			color: "#4175ec",
		};
		rain.push(drop);
	}
}

function update() {
	context.fillStyle = "#9fd2ff";
	context.fillRect(0, 0, width, height);
	for (let i = 0; i < rain.length; i++) {
		rain[i].y += 1;

		//met behulp van chatGPT
		if (rain[i].y > height) {
			rain[i].y = 0;
			rain[i].x = Utils.randomNumber(width / 3, width / 2 + 250);
		}
		drawDrop(rain[i]);
	}
	drawCloud();

	requestAnimationFrame(update);
}

function drawDrop(drop) {
	context.fillStyle = drop.color;
	Utils.fillEllipse(drop.x, drop.y, 5, 10);
}

// met chatGPT; zodat als ik op de druppel klick het van kleur verandert
document.onmousedown = click;

/**
 *
 * @param{MouseEvent}e
 */
function click(e) {
	// Bereken de klikpositie relatief aan het canvas
	const rect = context.canvas.getBoundingClientRect(); //getBoundingClientRec geeft je de positie en afmetingen van het canvas in de viewport
	const mouseX = e.clientX - rect.left; //clientX en clientY geven de positie van de muis weer t.o.v. het vieuwpoort van de browser
	const mouseY = e.clientY - rect.top;

	// Controleer of een druppel geraakt wordt
	for (let i = 0; i < rain.length; i++) {
		const drop = rain[i];
		const dropWidth = 5;
		const dropHeight = 10;

		// Check of de klik binnen de ellips valt
		const dx = mouseX - drop.x; //dx = distance tussen de x-coördinaten van de muis en druppel
		const dy = mouseY - drop.y; //dy = distance tussen de y-coördinaten van de muis en druppel
		if (
			(dx * dx) / (dropWidth * dropWidth) +
				(dy * dy) / (dropHeight * dropHeight) <=
			1 //ellipse formule
		) {
			drop.color = "	#34346d";
			break;
		}
	}
}
