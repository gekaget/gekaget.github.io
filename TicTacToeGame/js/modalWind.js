var modalWindow = {
	_block : null,
	_window : null,

	initBlock : function(){

		_block = document.getElementById('blockScreen');

		if(!_block){
			var myBody = document.getElementsByTagName('body')[0];
			var firstElem = myBody.firstChild;

			_block = document.createElement('div');
			_block.id = 'blockScreen';
			myBody.insertBefore(_block, firstElem);
			_block.onclick = function() { modalWindow.close();}
		}

		_block.style.display = 'inline';
	},

	initWind : function(width, html) {
		_window = document.getElementById('modalWindow');

		if(!_window){
			var myBody = document.getElementsByTagName('body')[0];
			var firstElem = myBody.firstChild;
			
			_window = document.createElement('div');
			_window.id = 'modalWindow';
			myBody.insertBefore(_window, firstElem);
		}

		_window.style.display = 'inline';
		_window.style.width = width + 'px';
		_window.style.left = 50 + '%';
		_window.style.top = 50 + '%';
		_window.style.marginTop = -(_window.offsetHeight / 2) + 'px';
		_window.style.marginLeft = -(width / 2) + 'px';

		_window.innerHTML = html;
	},

	close : function() {
		document.getElementById('blockScreen').style.display = 'none';
		document.getElementById('modalWindow').style.display = 'none';
	},

	show :  function(width, html) {
		modalWindow.initBlock();
        modalWindow.initWind(width, html)
	}
};