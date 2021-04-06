'use strict';

var myPlayer = document.querySelector("#myPlayer video"),
playpause = document.getElementById("playpause"),
lefttoplay = document.getElementById("lefttoplay"),
righttoplay = document.getElementById("righttoplay"),
lefttopause = document.getElementById("lefttopause"),
righttopause = document.getElementById("righttopause");
myPlayer.removeAttribute("controls");
playpause.style.display = "block";
playpause.addEventListener('click',function(){
	if (myPlayer.paused) {
		myPlayer.play();
		playpause.classList.add("playing");
		lefttopause.beginElement();
		righttopause.beginElement();
		
	} else { 
		myPlayer.pause();
		lefttoplay.beginElement();
		righttoplay.beginElement();
		playpause.classList.remove("playing");
	}
	
},false);