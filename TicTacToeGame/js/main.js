document.addEventListener('DOMContentLoaded', readyMain);

function readyMain() {

var settings            = document.querySelector('.settings'),
	boardTumbler        = document.querySelector('.boardTumbler'),
	plaersTumbler       = document.querySelector('.plaersTumbler'),
	boardTumblerButton  = document.querySelector('.boardTumblerButton'),
	plaersTumblerButton = document.querySelector('.plaersTumblerButton'),
	simplGrid           = document.querySelector('.simplGrid'),
	hardGrid            = document.querySelector('.hardGrid'),
	onePerson           = document.querySelector('.onePerson'),
	twoPerson           = document.querySelector('.twoPerson'),
	playButton          = document.querySelector('.playButton');

var gameBlock          = document.querySelector('.gameBlock'),
	homeButton         = document.querySelector('.homeButton'),
	gameBoard          = document.querySelector('.gameBoard');

var partsOfgameBoard = 0;


boardTumbler.addEventListener('click', changeBoard);
plaersTumbler.addEventListener('click', changePlaers);
playButton.addEventListener('click', runToe);
homeButton.addEventListener('click', returnHomePage);

function runToe() {
	settings.classList.toggle('activeSection');
	gameBlock.classList.toggle('activeSection');

	createBoard();

}

function createBoard() {

	if( !boardTumblerButton.classList.contains('pressTumblerButton') ) {
		partsOfgameBoard = 9;
	}

	var fragment = document.createDocumentFragment();


	for( var i = 0; i < partsOfgameBoard; i++ ) {
		var list = document.createElement('li');
		list.className = 'gameBoardItem';
		fragment.appendChild(list);
	}

	gameBoard.appendChild(fragment);

	runGameToe();
}

function returnHomePage() {
	settings.classList.toggle('activeSection');
	gameBlock.classList.toggle('activeSection');
	gameBoard.innerHTML = '';
}

function changeBoard() {
	boardTumblerButton.classList.toggle('pressTumblerButton');
	simplGrid.classList.toggle('activeTumb');
	hardGrid.classList.toggle('activeTumb');
}

function changePlaers() {
	plaersTumblerButton.classList.toggle('pressTumblerButton');
	onePerson.classList.toggle('activeTumb');
	twoPerson.classList.toggle('activeTumb');
}

}