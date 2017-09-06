document.addEventListener('DOMContentLoaded', ready);

function ready() {

var memoryCalc = 0,
	countInputs = 0,
	DEGITS = 10,
	numb1 = '',
	numb2 = '',
	result,
	operator = '',
	flagResult = 0;

var inputButtons = document.querySelector('.inputButtons'),
	cleanButtons = document.querySelector('.cleanButtons'),
	memoryButtons = document.querySelector('.memoryButtons'),
	functionsButtons = document.querySelector('.functionsButtons'),
	plusMinus = document.querySelector('.plusMinus'),
	resultCulc = document.querySelector('.resultCulc'),
	squareRoot = document.querySelector('.squareRoot'),
	persent = document.querySelector('.persent'),
	partNumber = document.querySelector('.partNumber'),
	calcWindow   = document.querySelector('.calcWindow'),
	memoryNumber = document.querySelector('.calcMemoryInfoNumber'),
	body = document.body;


inputButtons.addEventListener('click', inputNumber);
cleanButtons.addEventListener('click', cleanButton);
memoryButtons.addEventListener('click', memoryButton);
functionsButtons.addEventListener('click', makeSimpleMath);
plusMinus.addEventListener('click', changePlusMinus);
squareRoot.addEventListener('click', getSquareRoot);
persent.addEventListener('click', getPersent);
partNumber.addEventListener('click', getPartNumber);
resultCulc.addEventListener('click', getResultCulc);
body.addEventListener('keypress', inputKeyNumber);
body.addEventListener('keypress', inputOperationsKey);
body.addEventListener('keydown', getKeyFunctionsCulc);


function inputNumber(e) {

	if( e.target.tagName.toLowerCase() === 'li') {
		var number = e.target.innerText;

		tapeNumbers(number);
	}
}

function inputKeyNumber(e) {

	if (e.ctrlKey || e.altKey || e.metaKey) return;

	if ( !isNaN( parseInt(e.key) ) ) {
		tapeNumbers(e.key);
	}

	if ( e.key === '.' || e.key === ',' ) {
		tapeNumbers('.');
	}	
}

function tapeNumbers(myNumber) {
	if(	countInputs < DEGITS ) {
		
		if (flagResult === 0 && operator == '' ) {

			if( calcWindow.value === '' ||
				 calcWindow.value === '0' ) {

				calcWindow.value = myNumber;
			} else {
				if(numb1.indexOf('.') >= 0 && myNumber === '.') return;

				calcWindow.value += myNumber;
			}

			numb1 = calcWindow.value;
		}

		if( flagResult === 0 && operator !== '' ) {

			if( calcWindow.value == operator ) {
				calcWindow.value = myNumber;
			} else {
				if(numb2.indexOf('.') >= 0 && myNumber === '.') return;

				calcWindow.value += myNumber;
			}

			numb2 = calcWindow.value;
		}

		if( flagResult === 1 && operator == '' ) {

			calcWindow.value = myNumber;
			numb1 = calcWindow.value;
			flagResult = 0;
		}

		if( flagResult === 1 &&	operator !== '' ) {

			calcWindow.value = myNumber;
			numb2 = calcWindow.value;
			flagResult = 0;
		}

	countInputs++;
	}
}

function cleanButton(e) {
	if( e.target.classList.value.indexOf('backspace') >= 0) {
		backspaciesNumbers();
	}

	if( e.target.classList.value.indexOf('value') >= 0) {
		cleanValue();
	}

	if( e.target.classList.value.indexOf('extra') >= 0) {
		extraCleanValue();
	}	
}

function backspaciesNumbers() {
	calcWindow.value = calcWindow.value.slice(0, -1);
	numb1 = calcWindow.value;
	countInputs--;
}

function cleanValue() {
	calcWindow.value = 0;
	countInputs = 0;
}

function extraCleanValue() {
	calcWindow.value = 0;
		countInputs = 0;
		numb1 = '';
		numb2 = '';
		operator = '';
		flagResult = 0;
}

function memoryButton(e) {
	if( e.target.classList.value.indexOf('mSource') >= 0) {
		memoryCalc = calcWindow.value;
	}

	if( e.target.classList.value.indexOf('mWrite') >= 0) {

		if( memoryCalc.toString().length > DEGITS ) {
			calcWindow.value = normalizeParam(memoryCalc);
		} else {
			calcWindow.value = memoryCalc;
		}

		if( numb1 === '' ) {
			numb1 = memoryCalc;
		} else {
			numb2 = memoryCalc;
		}
		
	}

	if( e.target.classList.value.indexOf('mClean') >= 0) {
		memoryCalc = 0;
	}

	if( e.target.classList.value.indexOf('mPlus') >= 0) {
		memoryCalc += +calcWindow.value;
	}

	if( e.target.classList.value.indexOf('mMinus') >= 0) {
		memoryCalc -= +calcWindow.value;
	}

	if( memoryNumber.textContent !== memoryCalc ) {
		memoryNumber.textContent = memoryCalc;
	}
}

function changePlusMinus() {
	calcWindow.value = -calcWindow.value;
	numb1 = calcWindow.value;
}

function getSquareRoot() {
	result = Math.sqrt(calcWindow.value);

	normalizeParam();
}

function getPersent() {

	if( operator == '*' ) {
		numb1 = numb1/100;
		result = numb2 * numb1;
	}

	if( operator == '/' ) {
		numb1 = numb1*100;
		result = numb1/numb2;
	}

	normalizeParam();
}

function getPartNumber() {
	result = 1 / numb1;

	normalizeParam();
}

function makeSimpleMath(e) {
	if( e.target.classList.value.indexOf('simpleMath') >= 0) {

		chooseMathOperator(e);
	}
}

function inputOperationsKey(e) {
	if (e.ctrlKey || e.altKey || e.metaKey) return;

	if( e.key === '/' ||
		e.key === '*' || 
		e.key === '-' || 
		e.key === '+' ) {

		chooseMathOperator(e);
	}
}

function chooseMathOperator(obj) {
	if( operator != '' ) {
		getResultCulc();
	}

	if( operator == '' ) {
		operator = obj.key || obj.target.innerText;
		calcWindow.value = obj.key || obj.target.innerText;
	}

	countInputs = 0;
}

function getKeyFunctionsCulc(e) {

	switch(e.key) {
		case 'Enter':
			getResultCulc();
			break;

		case 'Backspace':
			backspaciesNumbers();
			break;

		case 'Escape':
			extraCleanValue();
			break;

		case 'Delete':
			cleanValue();
			break;

		default:
      		return;
	}
}

function getResultCulc() {
	if( operator != '' ) {
		switch(operator) {
			case '+':
				result = +numb1 + +numb2;
				break;

			case '-':
				result = +numb1 - +numb2;
				break;

			case '*':
				result = +numb1 * +numb2;
				break;

			case '/':
				result = +numb1 / +numb2;
				break;
		}

		normalizeParam();
	}
}

function normalizeParam(numb) {

		var newNumber = numb || result;

		if ( newNumber.toString().length > DEGITS ) {
			var resultPart1,
				resultPart2,
				exp;
			var resultStr = newNumber.toString();

			var numberCut = ( newNumber > 0 ) ? 1 : 2;
			var expSign = ( newNumber > 0 && newNumber < 1 ) ? '-' : '+';

			resultPart1 = resultStr.slice(0, numberCut);
			resultPart2 = resultStr.slice(numberCut);

			if ( resultPart2.length > DEGITS - 1) {
				exp = resultPart2.length;
				resultPart2 = resultPart2.slice(0, DEGITS - ( 4 + numberCut ));
				resultPart2 = resultPart2 + 'e' + expSign + exp;
			}

			newNumber = resultPart1 + '.' + resultPart2;
		}

		if( numb ) {
			return newNumber;
		} else {

			calcWindow.value = newNumber;
			operator = '';
			numb1 = calcWindow.value;
			flagResult = 1;
			countInputs = 0;
		}
}

}