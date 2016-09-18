window.onload = function() {
	layout();
	var twopicture = document.querySelectorAll('.twopicture');
	var btn = document.querySelectorAll("#navs>span");
	var movepe = document.getElementById('movepe');
	var navs = document.getElementById('navs');
	var now = 0;
	var translateX = 0;
	var startPoint = 0;
	var startX = 0;
	var tpw = parseInt(css(twopicture[0],'width'));
	movepe.addEventListener(
		'touchstart',
		function(e) {
			now = -translateX/tpw;
			if(now == 0) {
				now = btn.length;
			};
			if(now ==btn.length*2 - 1){
				now = btn.length-1;
			};
			translateX = -now*tpw;
			movepe.style.webkitTransform = movepe.style.transform = "translateX("+translateX+"px) translateZ(0px)";
			startPoint = e.changedTouches[0].pageX;
			startX = translateX;
			movepe.style.transition = "0ms";
		},
		false
	);
	 movepe.addEventListener(
	 	'touchmove',
		function(e) {
			var nowPoint = e.changedTouches[0].pageX;
			var dis = nowPoint - startPoint;
			translateX  = startX + dis;
			movepe.style.webkitTransform = movepe.style.transform = "translateX("+translateX+"px) translateZ(0px)";
		},
		false
	 );
	  movepe.addEventListener(
	 	'touchend',
		function() {
			now = -translateX/tpw;console.log(translateX);
			now = Math.round(now);
			translateX = -now*tpw;
			movepe.style.transition = '400ms';
			movepe.style.webkitTransform = movepe.style.transform = "translateX("+translateX+"px) translateZ(0px)";
			for(var i = 0; i < btn.length; i++) {
				btn[i].className = "";
			}
			console.log(now% btn.length);
			btn[now% btn.length].className = 'active';
		},
		false
	 );	
	for(var i = 0;i < btn.length;i++){
		btn[i].index = i;
		btn[i].addEventListener(
			'touchend',
			function(e){
				now = this.index;	
				console.log(-translateX/tpw);
				if(-translateX/tpw >= 5){
					now = now + 5;
				}
				translateX = -now*tpw;
				movepe.style.webkitTransform = movepe.style.transform = "translateX("+translateX+"px) translateZ(0px)";

				movepe.style.transition = '1s';
				for(var j = 0; j < btn.length; j++) {
					btn[j].className = "";
				}
				btn[this.index].className = 'active';
			},
			false
		);
	};
	
	
	function css(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		};
		return getComputedStyle(obj)[attr];
	};
};
function layout() {
		var movepe = document.getElementById('movepe');
		var lis =  movepe.children;
		movepe.innerHTML += movepe.innerHTML;
		movepe.style.width = lis.length+"00%";
};