document.addEventListener('DOMContentLoaded', ready);

function ready() {
	var button = document.querySelector('.citiesBlock input'),
		listSities = document.querySelector('.citiesBlock .listSities'),
		body = document.getElementsByTagName('body')[0];

	button.addEventListener('click', menuShowHide);
	listSities.addEventListener('click', getParams);
	listSities.addEventListener('click', menuHide);
	window.addEventListener('click', outsideClick);

	function menuShowHide() {
		listSities.classList.toggle('showMenu');
	}

	function getParams(event) {
		if( event.target != listSities) {
			button.value = event.target.textContent;
		}
	}

	function menuHide() {
		listSities.classList.remove('showMenu');
	}

	function outsideClick(event) {
		if(event.target !== listSities && event.target !== button) {
			listSities.classList.remove('showMenu');
		}
	}

	console.dir(button);
}


