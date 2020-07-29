window.onload= function()
{
	var bossFlag=0;
	var colorList=["red","yellow","green","blue","magenta","orange","navy","purple","teal","brown","pink","black"];
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	var img = new Image();
	img.src="Image/l3.png";

	var brickSound=document.getElementById("brickSound");
	var barSound=document.getElementById("barSound");

	var dd=1;
	var dx=2*dd;
	var dy=6*dd;
	var x=canvas.width/2;
	var y=canvas.height/2; 
	var ballColorStd=0;
	var ballRadius=15;

	var barColorStd=1;
	var barHeight=10;
	var barWidth=400;
	var barColor=colorList[barColorStd];
	var ballColor=colorList[ballColorStd];
	var barX=(canvas.width-barWidth)/2;

	var score=0; 
	var life=3;

	var brickStd=10;
	var brickRow=5;
	var brickCol=5;
	var brickPadding=5;
	var brickMarginTop=30;
	var brickMarginLR=6*(15-brickStd);
	var brickHeight=40;
	var brickWidth=(canvas.width-(brickMarginLR*2)-(brickPadding*4))/5;
	var bricks=[];
	for(var i=0;i<brickCol;i++){
		bricks[i]=[];
		for(var j=0;j<brickRow;j++){
			bricks[i][j]={x:0,y:0,status:1};
		}
	}

	document.addEventListener("mousemove",mouseMoveHandler);
	document.getElementById("stage1").addEventListener("click",Stage1);
	document.getElementById("stage2").addEventListener("click",Stage2);
	document.getElementById("stage3").addEventListener("click",Stage3);
	document.getElementById("stage4").addEventListener("click",Stage4);
	document.getElementById("cat").addEventListener("click",Stage5);
	document.getElementById("start").addEventListener("click",gameStart);
	document.getElementById("setting_Preview").addEventListener("click",custom);
	document.getElementById("incSizeBrick").addEventListener("click",incBrick);
	document.getElementById("decSizeBrick").addEventListener("click",decBrick);
	document.getElementById("changeColorBall").addEventListener("click",changeBallColor);
	document.getElementById("incSizeBall").addEventListener("click",incRad);
	document.getElementById("decSizeBall").addEventListener("click",decRad);
	document.getElementById("incSpeedBall").addEventListener("click",incSpeed);
	document.getElementById("decSpeedBall").addEventListener("click",decSpeed);
	document.getElementById("incSizeBar").addEventListener("click",incBar);
	document.getElementById("decSizeBar").addEventListener("click",decBar);
	document.getElementById("changeColorBar").addEventListener("click",changeBarColor);

	function gameStart() {
		draw();
		sleep(1000);
		setInterval(calculate,10);
	}

	function Stage1(){
		ddx=1;
		dx=2*dd;
		dy=6*dd;
		barWidth=400;
		bossFlag=0;
		draw();

	}

	function Stage2(){
		dd=1;
		dx=2*dd;
		dy=6*dd;
		barWidth=350;
		bossFlag=0;
		draw();
	}

	function Stage3(){
		dd=1.5;
		dx=2*dd;
		dy=6*dd;
		barWidth=300;
		bossFlag=0;
		draw();
	}

	function Stage4(){
		dd=1.5;
		dx=2*dd;
		dy=6*dd;
		barWidth=280;
		bossFlag=0;
		draw();

	}

	function Stage5(){
		dd=1.5;
		dx=2*dd;
		dy=6*dd;
		barWidth=250;
		bossFlag=1;
		draw();

	}

	function custom(){
		dd=1;
		dx=2*dd;
		dy=6*dd;
		barWidth=400;
		document.getElementById("myCanvas").style.background="#eee";
		bossFlag=0;
		draw();
	}

	function changeBallColor(){
		if(ballColorStd>11){
			ballColorStd=0;
		}else{
			ballColorStd++;
		}
		ballColor=colorList[ballColorStd];
		context.clearRect(0,0,canvas.width,canvas.height);
		draw();

	}

	function changeBarColor(){
		if(barColorStd>11){
			barColorStd=0;
		}else{
			barColorStd++;
		}
		barColor=colorList[barColorStd];
		draw();

	}

	function incRad(){
		ballRadius+=3;
		if(ballRadius>21){
			ballRadius=21;
		}
		draw();

	}

	function decRad() {
		ballRadius-=3;
		if(ballRadius<9){
			ballRadius=9;
		}
		draw();

	}

	function incSpeed() {
		dd+=0.2;
		if(dd>2){
			dd=2;
		}
		dx=2*dd;
		dy=6*dd;
	}

	function decSpeed(){
		dd-=0.2;
		if(dd<0.4){
			dd=0.4;
		}
		dx=2*dd;
		dy=6*dd;
	}

	function incBar() {
		barWidth+=50;
		if(barWidth>400){
			barWidth=400;
		}

		draw();

	}

	function decBar() {
		barWidth-=50;
		if(barWidth<200){
			barWidth=200;
		}
		draw();

	}

	function incBrick() {
		brickStd+=2;
		if(brickStd>10){
			brickStd=10;
		}
		brickMarginLR=6*(15-brickStd);
		brickWidth=(canvas.width-(brickMarginLR*2)-(brickPadding*4))/5;
		draw();

	}

	function decBrick() {
		brickStd-=2;
		if(brickStd<2){
			brickStd=2;
		}
		brickMarginLR=6*(15-brickStd);
		brickWidth=(canvas.width-(brickMarginLR*2)-(brickPadding*4))/5;
		draw();
	}

	function play(a) {
		a.volume=0.5;
		if(a.paused){
			a.play();
		}else{
			a.pause();
			a.currentTime=0;
		}
	}

	function mouseMoveHandler(e) {
		var relativeX=e.clientX-canvas.offsetLeft;
		if(relativeX>0&&relativeX<canvas.width){
			barX=relativeX-barWidth/2;
		}
	}


	function drawLife() {
		context.font="20px Arial";
		context.fillStyle="red";
		context.fillText("Life: ",150,20);
	}

	function drawScore() {
		context.font="20px Arial";
		context.fillStyle="gold";
		context.fillText("Score: "+score,15,20);

	}

	function touched() {
		for(var i=0;i<brickCol;i++){
			for(var j=0;j<brickRow;j++){
				var b=bricks[i][j];
				if(b.status==1){		
					if(x>b.x&&x<b.x+brickWidth&&y>b.y&&y<b.y+brickHeight){
						play(brickSound);
						dy=-dy;
						b.status=0;
						score+=100;
						if(score==2500){
							if(bossFlag==1){
								alert("축하합니다! 당신은 고양이를 무찔렀습니다.\n세계는 무지개를 되찾고 평화로워졌습니다...\n커스텀 게임으로 당신만의 스테이지를 만들어 플레이해보세요!");
							}else{
								alert("Stage Clear!");
							}
							document.location.reload();
						}
					}
				}
			}
		}
	}

	function drawBricks() {
		for(var i=0;i<brickCol;i++){
			for(var j=0;j<brickRow;j++){
				if(bricks[i][j].status==1){	
					var bX=(i*(brickWidth+brickPadding))+brickMarginLR;
					var bY=(j*(brickHeight+brickPadding))+brickMarginTop;
					bricks[i][j].x=bX;
					bricks[i][j].y=bY;
					context.beginPath();
					context.rect(bX,bY,brickWidth,brickHeight);
					context.fillStyle=colorList[j];
					context.fill();
					context.closePath();
				}
			}
		}
	}

	function drawBar() {
		context.beginPath();
		context.rect(barX, canvas.height-barHeight, barWidth, barHeight);
		context.fillStyle=barColor;
		context.fill();
		context.closePath();
	}

	function drawBall() {
		context.beginPath();
		context.arc(x,y,ballRadius,0,2*Math.PI);
		context.fillStyle=ballColor;
		context.fill();
		context.closePath();
	}

	function draw() {
		context.clearRect(0,0,canvas.width,canvas.height);
		context.drawImage(img,190,1);
		drawBricks();
		drawBall();
		drawBar();
		drawScore();
		drawLife();
		touched();
	}

	function calculate() {

		if(x+dx>canvas.width-ballRadius||x+dx<ballRadius){
			dx = -dx;
		}
		if(y + dy - brickMarginTop < ballRadius) {

			dy = -dy;
		} else if(y + dy > canvas.height-ballRadius) {
			if(x > barX && x < barX + barWidth) {
				play(barSound);
				dy = -dy;
			} else {
				life--;
				if(life==0){
					alert("GAME OVER");
					document.location.reload();
				}else{
					x=canvas.width/2;
					y=canvas.height/2;
					barX=(canvas.width-barWidth)/2;
					sleep(1000);
				}

			}
		}

		x+=dx;
		y+=dy;

		draw();

		if(life==3){
			document.body.style.background="white";
			img.src="Image/l3.png";
		}else if(life==2){
			document.body.style.background="pink";
			img.src="Image/l2.png";
		}else if(life==1){
			document.body.style.background="#ff294e";
			img.src="Image/l1.png";
		}


	}

	function sleep(num){
		var now = new Date();
		var stop = now.getTime() + num;
		while(true){
			now = new Date();
			if(now.getTime() > stop)return;
		}
	}
}
