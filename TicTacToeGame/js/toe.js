function runGameToe() {

var currentPlayer = 'x',
	countSteps = 0,
	win = false,
	arrX = [],
	arrO = [],
	winArrX = [],
	winArrO = [],
	numberComputerCellStep = null,
	centralCell = 4,
	cornerCels = [0, 2, 6, 8],
	lastsCells = [],
	winCombination = null,
	winCombinationsArrX =[],
	winCombinationsArrO =[],
	winCombinations  = [[0, 1, 2],
						[3, 4, 5],
						[6, 7, 8],
						[0, 3, 6],
						[1, 4, 7],
						[2, 5, 8],
						[0, 4, 8],
						[2, 4, 6]],
	lockalDataWins 	=  {
						x : 0,
						o : 0,
						t : 0,

						setLocalStorage : function() {
							var lockalDataWinsStr = JSON.stringify( this );
							localStorage.setItem('toeWins', lockalDataWinsStr)
							console.log(lockalDataWinsStr );
						},

						getLocalStorage : function() {
							if( localStorage.toeWins ) {
							var saveDataWins = JSON.parse( localStorage.getItem('toeWins'));

							for(var key in saveDataWins ) {
								this[key] = saveDataWins[key]
								}
							}
							console.log( saveDataWins );
						},

						clearLocalStorage : function() {
							for(var key in this ) {
								this[key] = 0;
								}
							console.log( this );
						}
						};

	Object.defineProperty(lockalDataWins, 'setLocalStorage', {enumerable: false});
	Object.defineProperty(lockalDataWins, 'getLocalStorage', {enumerable: false});
	Object.defineProperty(lockalDataWins, 'clearLocalStorage', {enumerable: false});

var gameCells 		= document.getElementsByClassName('gameBoardItem'),
	plaerStepNow	= document.querySelectorAll('.plaerStepNow'),
	plaerStepText	= document.querySelector('.plaerStepText'),
	plaerCountWinsX	= document.querySelector('.plaerCountWinsX'),
	plaerCountWinsO	= document.querySelector('.plaerCountWinsO'),
	plaerCountTiesO	= document.querySelector('.plaerCountTiesO'),
	buttonNewGame	= document.querySelector('.buttonNewGame'),
	buttonReset	= document.querySelector('.buttonReset'),
	plaersTumblerButton = document.querySelector('.plaersTumblerButton');

buttonNewGame.addEventListener('click', startNewGame);
buttonReset.addEventListener('click', resetLocalStorage );

startNewGame();

function stepPlayer() {
	if( this.textContent === '' && countSteps < gameCells.length ) { 
		this.textContent = currentPlayer;

		getNumberStepCell( this );

		( currentPlayer === 'x') ?
			getWinPlayer( arrX ) : getWinPlayer( arrO );

		if( win ) {
			setWinSettings();
		} else {
			( currentPlayer === 'x') ? 
				( currentPlayer = 'o') : ( currentPlayer = 'x');

			setNewContentPlaerStepNow( currentPlayer );
			countSteps++;

			if( plaersTumblerButton.className.indexOf('pressTumblerButton') === -1 ) {
				computerChooseCell();
				setTimeout( stepComputer, 600);
			}
		}

		if( countSteps === 9) {
			setTieGame();
		}
	}
}

function stepComputer() {
	if( gameCells[numberComputerCellStep].textContent === '' &&
		countSteps < gameCells.length ) { 

		gameCells[numberComputerCellStep].textContent = currentPlayer;

		getNumberStepCell( gameCells[numberComputerCellStep] );
		getWinPlayer( arrO );

		if( win ) {
			setWinSettings();
			
		} else {
			currentPlayer = 'x';
			setNewContentPlaerStepNow( currentPlayer );
			countSteps++;
		}

		if( countSteps === 9) {
			setTieGame();
		}
	}
}

function computerChooseCell() {
	if( gameCells[centralCell].textContent === '' ) {
		numberComputerCellStep  = centralCell;

	} else if ( arrX.length < 2 && gameCells[centralCell].textContent !== '' ) {
		getEmptyCornerCell();

	} else if ( getWinCombinationO() && getEmptyCellToWin( winArrO ) ) {
		
	} else if( getWinCombinationX() && getEmptyCellToWin( winArrX ) ) {
		noGiveToWinX();

	} else if( getElseWinCombinationO() ) {
		getEmptyCellToWin( winArrO );

	} else {
		getLastsCells();
		makeLastStep();
	}
}

/**
 * Selects function selects an empty corner cell from fourth possible
 * in array cornerCels.
 * Saves the number of the cell in outer variable numberComputerCellStep.
 */
function getEmptyCornerCell() {
	var n = randomCornerCell();

	if( gameCells[cornerCels[n]].textContent === '' ) {
		numberComputerCellStep = cornerCels[n];
	} else {
		while ( gameCells[cornerCels[n]].textContent !== '') {
			n = randomCornerCell();
		} 

		numberComputerCellStep = cornerCels[n];
	}
}

/**
 * Creates random number of conrel cell.
 *
 * @return {number} The number of the cornel cell.
 */
function randomCornerCell() {
	min = 0;
	max = 3;
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

function getEmptyCellToWin( arr ) {
	for(var j = 0; j < arr.length; j++ ){
		if( gameCells[arr[j]].textContent === '') {
			numberComputerCellStep = arr[j];
			return true;
		}
	}

	return false;
}

function noGiveToWinX() {
	for(var j = 0; j < winArrX.length; j++ ){
		if( gameCells[winArrX[j]].textContent === '') {
			numberComputerCellStep = winArrX[j];
		}
	}
}

function getWinCombinationX() {
	var countCellsX = 0;

	for(var i = 0; i <winCombinationsArrX.length; i++ ) {

		countCellsX = 0;

		for(var j = 0; j < winCombinationsArrX[i].length; j++ ) {
			if(  gameCells[winCombinationsArrX[i][j]].textContent === 'x' ) {
				countCellsX++;
				if( countCellsX === 2 ) {
					winArrX = winCombinationsArrX[i].slice();
					winCombinationsArrX.splice(i, 1);
					return true;
				} 		
			}
		}
	}

	return false;
}

function getWinCombinationO() {
	var countCellsO = 0;

	for(var i = 0; i <winCombinationsArrO.length; i++ ) {

		countCellsO = 0;

		for(var j = 0; j < winCombinationsArrO[i].length; j++ ) {
			if(  gameCells[winCombinationsArrO[i][j]].textContent === 'o' ) {
				countCellsO++;
				if( countCellsO === 2 ) {
					winArrO = winCombinationsArrO[i].slice();
					winCombinationsArrO.splice(i, 1);
					return true;
				} 		
			}
		}
	}

	return false;
}

function getElseWinCombinationO() {
	var countCellsO, countCellsEmpty;

	/*outer:*/
	for(var i = 0; i <winCombinationsArrO.length; i++ ) {

		countCellsO = 0;
		countCellsEmpty = 0;

		for(var j = 0; j < winCombinationsArrO[i].length; j++ ) {
			if(  gameCells[winCombinationsArrO[i][j]].textContent === 'o' ) {
				countCellsO++;
			}
			if(  gameCells[winCombinationsArrO[i][j]].textContent === '' ) {
				countCellsEmpty++;
			}
			if( countCellsO === 1 && countCellsEmpty === 2 ) {
				winArrO = winCombinationsArrO[i].slice();
				return true;
			}
		}
	}

	return false;
}

function getLastsCells() {
	for(var n = 0; n < gameCells.length; n++) {
		if( gameCells[n].textContent === '') {
			lastsCells.push(n);
		}
	}
}

function makeLastStep() {
	for(var i = 0; i < lastsCells.length; i++) {
		if( gameCells[lastsCells[i]].textContent === '') {
			numberComputerCellStep = lastsCells[i];
			return;
		}
	}
}

function getNumberStepCell( item ) {
	for(var i = 0; i < gameCells.length; i++) {
		if( item === gameCells[i] ) {
			if( currentPlayer === 'x') {
				arrX.push(i);
			} else {
				arrO.push(i);
			}
		}
	}
}

function getWinPlayer( arr ) {

	if( arr.length > 2 ) {
		for(var i = 0; i < winCombinations.length; i++) {

			var coincidence = 0;

			for(var j = 0; j < winCombinations[i].length; j++) {

				if( arr.indexOf( winCombinations[i][j] ) === -1 ) continue;

				coincidence++;
			}

			if( coincidence === 3 ) {
				win = true;
				winCombination = i;
				break;
			}
		}
	}
}

function setWinSettings() {
	plaerStepText.textContent = 'WINS: ';

	for(var k =0; k < winCombinations[winCombination].length; k++) {
		gameCells[winCombinations[winCombination][k]].classList.add('win');
	}

	modalWindow.show(400, '<div class="statusGame"><span class="plaerStepText">wins player: </span><span class="plaerStepNow">x</span></div>');

	plaerStepNow	= document.querySelectorAll('.plaerStepNow');

	setNewContentPlaerStepNow( currentPlayer );

	if ( currentPlayer === 'x') {
		lockalDataWins.x++;
		plaerCountWinsX.textContent = lockalDataWins.x;
	} else {
		lockalDataWins.o++;
		plaerCountWinsO.textContent = lockalDataWins.o;
		console.log( lockalDataWins.o );
	}

	endingGame ();
}

function setNewContentPlaerStepNow( newContent ) {
	for(var i = 0; i < plaerStepNow.length; i++) {
		plaerStepNow[i].textContent = newContent||'';
	}
}

function setTieGame() {
	lockalDataWins.t++;
	plaerCountTiesO.textContent = lockalDataWins.t;
	setNewContentPlaerStepNow();
	plaerStepText.textContent = 'tie!';

	endingGame();
	modalWindow.show(400, '<div class="statusGame"><span class="plaerStepText">game is draw</span></div>');
}

function endingGame () {
	for(var i = 0; i < gameCells.length; i++) {
		gameCells[i].removeEventListener('click', stepPlayer);
	}

	lockalDataWins.setLocalStorage();
	plaerStepNow.textContent = currentPlayer;
}

function resetLocalStorage() {
	lockalDataWins.clearLocalStorage();
	lockalDataWins.setLocalStorage();
	plaerCountWinsX.textContent = lockalDataWins.x;
	plaerCountWinsO.textContent = lockalDataWins.o;
	plaerCountTiesO.textContent = lockalDataWins.t;
}

function startNewGame() {
	for(var i = 0; i < gameCells.length; i++) {
		gameCells[i].addEventListener('click', stepPlayer);
		gameCells[i].textContent = '';
		gameCells[i].classList.remove('win');
	}

	lockalDataWins.getLocalStorage();
	
	plaerStepText.textContent = 'step of player: ';
	if( plaerStepNow[1] ) {
		plaerStepNow[1].textContent = currentPlayer;
	}
	plaerCountWinsX.textContent = lockalDataWins.x;
	plaerCountWinsO.textContent = lockalDataWins.o;
	plaerCountTiesO.textContent = lockalDataWins.t;
	countSteps = 0;
	win = false;
	arrX = [],
	arrO = [],
	winArrX = [],
	winArrO = [],
	lastsCells = [],
	winCombination = null;
	winCombinationsArrX = winCombinations.slice();
	winCombinationsArrO = winCombinations.slice();
	
	if( currentPlayer === 'o' &&
	plaersTumblerButton.className.indexOf('pressTumblerButton') === -1 ) {
		computerChooseCell();
		setTimeout( stepComputer, 500);
}
}

}