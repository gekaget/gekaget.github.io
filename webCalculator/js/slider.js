document.addEventListener('DOMContentLoaded', readySlyde);

function readySlyde() {

var formulasSliderLine = document.querySelector('.formulasSliderLine'),
	formulasItems = document.querySelectorAll('.formulesItems'),
	buttonPrev = document.querySelector('.sliderButton.prev'),
	buttonNext = document.querySelector('.sliderButton.next');

var elemToHideLeft = 0,
	moveWidth = 0,
	viewSliderBlocks = 2;

	buttonNext.addEventListener('click', runSliderRights);
	buttonPrev.addEventListener('click', runSliderLefts);

getWidthSliderLine();

function runSliderRights() {

	if( elemToHideLeft <  formulasItems.length - viewSliderBlocks ) {

		moveWidth += getWidthElem(formulasItems[elemToHideLeft]);
		formulasSliderLine.style.left = -moveWidth + 'px';
		elemToHideLeft++;
	}
}

function runSliderLefts() {

	if( elemToHideLeft >  0 ) {

		moveWidth -= getWidthElem(formulasItems[elemToHideLeft]);
		formulasSliderLine.style.left = -moveWidth + 'px';
		elemToHideLeft--;
	}
}

function getWidthElem(elem) {

	return 	parseInt(getComputedStyle( elem ).width) + 
			parseInt(getComputedStyle( elem ).marginLeft) + 
			parseInt(getComputedStyle( elem ).marginRight);
}

function getWidthSliderLine() {
	var width = 0;

	for( var i = 0; i < formulasItems.length; i++ ) {
		width += parseInt(getComputedStyle(formulasItems[i]).width);
		width += parseInt(getComputedStyle(formulasItems[i]).marginLeft);
		width += parseInt(getComputedStyle(formulasItems[i]).marginRight);
	}

	formulasSliderLine.style.width = width + 'px';
}


}