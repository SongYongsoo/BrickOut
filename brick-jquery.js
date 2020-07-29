$(document).ready(
	function(){
		var myAudio;
		var audioarr = ["Music/1.mp3","Music/2.mp3","Music/3.mp3","Music/4.mp3","Music/5.mp3","Music/cat.mp3"];
		var playing=false;
		var track1 = new Audio(audioarr[0]);
		var track2 = new Audio(audioarr[1]);
		var track3 = new Audio(audioarr[2]);
		var track4 = new Audio(audioarr[3]);
		var track5 = new Audio(audioarr[4]);
		var track6 = new Audio(audioarr[5]);

		$("#stage1").click(function(){
			$("canvas").css("background-image", "url(Image/1.jpg)");
			stopMusic();
			track1.play();

		});
		$("#stage2").click(function(){
			$("canvas").css("background-image", "url(Image/2.jpg)");
			stopMusic();
			track2.play();
		});
		$("#stage3").click(function(){
			$("canvas").css("background-image", "url(Image/3.jpg)");
			stopMusic();
			track3.play();
			
		});
		$("#stage4").click(function(){
			$("canvas").css("background-image", "url(Image/4.jpg)");
			stopMusic();
			track4.play();
			
		});
		$("#cat").click(function(){
			$("canvas").css("background-image", "url(Image/cat.gif)");
			stopMusic();
			track6.play();
		});

		$("#image1").click(function(){
			$("canvas").css("background-image", "url(Image/1.jpg)");
		});
		$("#image2").click(function(){
			$("canvas").css("background-image", "url(Image/2.jpg)");
		});
		$("#image3").click(function(){
			$("canvas").css("background-image", "url(Image/3.jpg)");
		});
		$("#image4").click(function(){
			$("canvas").css("background-image", "url(Image/4.jpg)");
		});
		$("#image5").click(function(){
			$("canvas").css("background-image", "url(Image/5.jpg)");
		});


		$("#music1").click(function(){
			stopMusic();
			track1.play();
		});
		$("#music2").click(function(){
			stopMusic();
			track2.play();
		});
		$("#music3").click(function(){
			stopMusic();
			track3.play();
		});
		$("#music4").click(function(){
			stopMusic();
			track4.play();
		});
		$("#music5").click(function(){
			stopMusic();
			track5.play();
		});

		function stopMusic() {
			track1.pause();
			track1.currentTime=0;
			track2.pause();
			track2.currentTime=0;
			track3.pause();
			track3.currentTime=0;
			track4.pause();
			track4.currentTime=0;
			track5.pause();
			track5.currentTime=0;
			track6.pause();
			track6.currentTime=0;
		}

		$("#setting_Preview").click(function(){
			if($("#tools").css("display")=="none"){
				$("#tools").css("display","inline-block");
				stopMusic();
			}
		})
		$("#setting_Image").click(function(){
			if($("#setImage").css("display")=="none"){
				$("#setImage").css("display","block");
			}else if($("#setImage").css("display")=="block"){
				$("#setImage").css("display","none");
			}
		})
		$("#setting_Music").click(function(){
			if($("#setMusic").css("display")=="none"){
				$("#setMusic").css("display","block");
			}else if($("#setMusic").css("display")=="block"){
				$("#setMusic").css("display","none");
			}
		})
		$("#setting_Brick").click(function(){
			if($("#setBrick").css("display")=="none"){
				$("#setBrick").css("display","block");
			}else if($("#setBrick").css("display")=="block"){
				$("#setBrick").css("display","none");
			}
		})
		$("#setting_Ball").click(function(){
			if($("#setBall").css("display")=="none"){
				$("#setBall").css("display","block");
			}else if($("#setBall").css("display")=="block"){
				$("#setBall").css("display","none");
			}
		})
		$("#setting_Bar").click(function(){
			if($("#setBar").css("display")=="none"){
				$("#setBar").css("display","block");
			}else if($("#setBar").css("display")=="block"){
				$("#setBar").css("display","none");
			}
		})
	});