let size = 4;
let numberOfTiles = size ** 2;
let empty = numberOfTiles;
let container = document.createElement("div");
container.id = "puzzle";
let shuffled = false;
loadTiles();
shuffle();

const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;
const UP_ARROW = 40;
const DOWN_ARROW = 38;
window.onkeydown = function (event) {
	if (event.keyCode === RIGHT_ARROW) {
		swap(empty + 1);
	} else if (event.keyCode === LEFT_ARROW) {
		swap(empty - 1);
	} else if (event.keyCode === UP_ARROW) {
		swap(empty + size);
	} else if (event.keyCode === DOWN_ARROW) {
		swap(empty - size);
	}
};

function loadTiles() {
	for (let x = 0; x < size; x++) {
		for (let y = 0; y < size; y++) {
			let newTile = document.createElement("img");
			let id = x * size + y + 1;
			newTile.id = id;
			newTile.name = id;
			newTile.className = "tile";
			newTile.src = `./images/${id}.png`;
			newTile.setAttribute("draggable", false);
			newTile.addEventListener("click", function () {
				swap(id);
			});
			container.append(newTile);
		}
	}
	document.body.appendChild(container);
}
function shuffle() {
	let minShuffles = 300;
	let totalShuffles = minShuffles + Math.floor(Math.random() * 200);
	for (let i = 0; i <= totalShuffles; i++) {
		setTimeout(function timer() {
			let x = Math.floor(Math.random() * 4);
			let direction = 0;
			if (x == 0) {
				direction = empty + 1;
			} else if (x == 1) {
				direction = empty - 1;
			} else if (x == 2) {
				direction = empty + size;
			} else if (x == 3) {
				direction = empty - size;
			}
			swap(direction);
			if (i > totalShuffles - 1) {
				shuffled = true;
			}
		}, i * 10);
	}
}
function swap(tile) {
	if (tile < 1 || tile > numberOfTiles) {
		return;
	}
	//swap right
	if (tile == empty + 1) {
		if (tile % size != 1) {
			setSelected(tile);
		}
		//left
	} else if (tile == empty - 1) {
		if (tile % size != 0) {
			setSelected(tile);
		}
		//up
	} else if (tile == empty + size) {
		setSelected(tile);
		//down
	} else if (tile == empty - size) {
		setSelected(tile);
	}
	if (shuffled) {
		if (checkHasWon()) {
			setTimeout(() => {
				alert("You solved the puzzle!");
			}, 500);
		}
	}
}
function setSelected(index) {
	let currentTile = document.getElementById(`${empty}`);
	let newTile = document.getElementById(`${index}`);
	let swap = currentTile.src;
	currentTile.src = newTile.src;
	newTile.src = swap;
	swap = currentTile.name;
	currentTile.name = newTile.name;
	newTile.name = swap;
	newTile.classList.add("selected");
	currentTile.classList.remove("selected");
	empty = index;
}
function checkHasWon() {
	for (let b = 1; b <= numberOfTiles; b++) {
		currentTile = document.getElementById(`${b}`);
		currentTileValue = currentTile.name;
		if (b != parseInt(currentTileValue)) {
			return false;
		}
	}
	return true;
}
