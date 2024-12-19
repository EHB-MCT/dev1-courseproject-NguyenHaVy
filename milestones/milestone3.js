import context from "../scripts/context.js";
import * as Utils from "../scripts/utils.js";

let width = context.canvas.width;
let height = context.canvas.height;

let amount = 100;
let rain = [];
let clouds = [];

setup();

update();

function setup() {
	for (let i = 0; i < amount; i++) {
		let drop = {
			x: Utils.randomNumber(width / 3, width / 2 + 250),
			y: Utils.randomNumber(0, height),
			color: "#4175ec",
		};
		rain.push(drop);
	}
	for (let i = 0; i < 100; i++) {
		let cloud = {
			x: Utils.randomNumber(500, width - 500),
			y: Utils.randomNumber(0, height - 650),
			size: Utils.randomNumber(10, 100),
			color: Utils.hsla(Utils.randomNumber(0, 360), 75, 95, 50),
		};
		clouds.push(cloud);
	}
}

function update() {
	context.fillStyle = "#9fd2ff";
	context.fillRect(0, 0, width, height);
	for (let i = 0; i < rain.length; i++) {
		rain[i].y += 0.5;

		//met behulp van chatGPT
		if (rain[i].y > height) {
			rain[i].y = 0;
			rain[i].x = Utils.randomNumber(width / 3, width / 2 + 250);
		}
		drawDrop(rain[i]);
		drawCloud();
		updateClouds();
		drawAvatar();
	}

	updateClouds();
	drawCloud();

	requestAnimationFrame(update);
}
function updateClouds() {
	for (let i = 0; i < clouds.length; i++) {
		let cloud = clouds[i];
		cloud.x += 0.025;

		if (cloud.x > width / 2 + 250) {
			cloud.x = Utils.randomNumber(350, width - 450);
			cloud.y = Utils.randomNumber(0, height - 650);
		}
	}
}

function drawDrop(drop) {
	context.fillStyle = drop.color;
	Utils.fillEllipse(drop.x, drop.y, 5, 10);
}

function drawCloud() {
	for (let i = 0; i < clouds.length; i++) {
		let cloud = clouds[i];
		context.fillStyle = cloud.color;
		Utils.fillCircle(cloud.x, cloud.y, cloud.size);
	}
}

function drawAvatar() {
	context.fillStyle = "black";
	context.beginPath();
	context.rect(width - 305, height - 305, 300, 300);
	context.fill();

	context.fillStyle = "#d77373";
	context.beginPath();
	context.rect(145 + width - 325, 50 + height - 305, 50, 100);
	context.rect(50 + width - 330, 100 + height - 305, 50, 50);
	context.rect(240 + width - 320, 100 + height - 305, 50, 50);
	context.rect(240 + width - 320, 200 + height - 305, 50, 50);
	context.rect(50 + width - 330, 200 + height - 305, 50, 50);
	context.rect(145 + width - 325, 200 + height - 305, 50, 50);
	context.fill();
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
