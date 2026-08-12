$(document).ready(function() {
	tick();
});

var xVel = 0.7, yVel = 0.7;

function tick() {
	moveImage();
	
	setTimeout(function() {
		tick();
	}, 1);
}

function moveImage() {
	var cur = $(".dvd").offset();
  $(".dvd").offset({ top: cur.top + yVel, left: cur.left + xVel});
	
	if((cur.top + $(".dvd").height()) > $("body").height())
	{
		yVel = -1;
		tint();
	}
		if(cur.top < 0)
	{
		yVel = 1;
		tint();
	}
	
 if((cur.left + $(".dvd").width() - 0) > $("body").width())
	{
		xVel = -1;
		tint();
	}
		if(cur.left < 0)
	{
		xVel = 1;
		tint();
	}
}

function tint() {
	$(".dvd").css("filter", `sepia(100%) saturate(600%) brightness(80%) hue-rotate(${Math.random() * 360}deg)`);
}


