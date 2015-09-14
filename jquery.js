$(document).ready(function(){
	var sentences = [
		'ten ate neite ate nee enet ite ate inet ent eate',
		'Too ato too nOt enot one totA not anot tOO aNot',
		'oat itain oat tain nate eate tea anne inant nean',
		'itant eate anot eat nato inate eat anot tain eat',
		'nee ene ate ite tent tiet ent ine ene ete ene ate'
	];

	var typedWords = 0;
	var letterCount = 0;
	var mistakeCount = 0;
	var bStarted = false;
	var bDone = false;
	var bCharPressedLast = false;
	var dte = new Date();
	var start_time;
	var stop_time;
	var newLineStarted = true;
	var key_char;
	var key_id;
	var currentLetter;
	var currentWord = "";
	var typedWord = "";
	var wordCount = 0;
	
	var lines = [];
	var lineCount = 0;

	$(sentences).each(function(){
		var letters = this.split('');
		console.log(letters);
		var line = $('<div class="letters"></div>');
		$(letters).each(function() {
			var letter = this;
			if(letter == ' ') {
				letter = '&nbsp;';
			}
			line.append($('<div class="letter"></div>').html(letter));
		});
		lines.push(line);
	});


	$("#keyboard-upper-container").hide();
	$("#keyboard-lower-container").show();
	$("#words-typed").html("");
	$("#words").html(lines[lineCount]);
	$(".letter").eq(0).addClass("highlight-red");
	$("#next-letter").html($(".letter").eq(0).html());

	$(document).keydown(function(event){
		if (event.which === 16) {
			$("#keyboard-lower-container").hide();
			$("#keyboard-upper-container").show();
        }
//        $("#words-typed").html("Key: " + event.which + " keycode: " + event.keyCode);
    });

	$(document).keyup(function(event){
		if (event.which === 16) {
			$("#keyboard-upper-container").hide();
			$("#keyboard-lower-container").show();
        }
//        $("#words-typed").html("Key: " + event.which + " keycode: " + event.keyCode);
    });	

	$(document).keypress(function(event){
		if (!bStarted) {
			bStarted = true;
			start_time = performance.now();
//			console.log(start_time);
		}

		if (!bDone) {
			$("#words-typed").append(String.fromCharCode(event.which));
			if (((event.which > 47) && (event.which < 58)) || ((event.which > 64) && (event.which < 91)) || ((event.which > 96) && (event.which < 123))) {
				key_char = String.fromCharCode(event.which);
				key_id = "#" + key_char;
			} else {
				key_id = "#" + event.which.toString();
				if (event.which.toString() == 32) key_char = '&nbsp;';
			}
			$(key_id).css('background-color', '#8888ff');
			$(key_id).css('color', '#ffffff');
			$(key_id).animate({
				backgroundColor: 'rgb(245,245,245)',
				color: 'rgb(51,51,51)'
			},100);
		
			currentLetter = $(".letter").eq(letterCount).html();
			$(".letter").removeClass("highlight-red");
			$(".letter").eq(letterCount).addClass("highlight-red");
			$(".letter").eq(letterCount).removeClass("highlight-red");
			$(".letter").eq(letterCount+1).addClass("highlight-red");
			$("#next-letter").html($(".letter").eq(letterCount+1).html());
			if (currentLetter == '&nbsp;') {
				if (currentWord == typedWord) wordCount++;
				currentWord = "";
				typedWord = "";
			} else {
				currentWord += currentLetter;
				typedWord += key_char;
			}
			if (currentLetter == key_char) {
				$(".letter").eq(letterCount).addClass("highlight");
				$("#icons").html($("#icons").html() + '<img src="check.jpeg" />');
			} else {
				mistakeCount++;
				$("#icons").html($("#icons").html() + '<img src="x.jpeg" />');
			}
			letterCount++;
			if (letterCount == $(".letter").length) {
				lineCount++;
				currentWord += currentLetter;
				typedWord += key_char;
				if (currentWord == typedWord) {
					wordCount++;
					currentWord = "";
					typedWord = "";
				}
				if (lineCount == lines.length) {
					bDone = true;
					stop_time = performance.now();
					DisplayResults();	
				} else {
					letterCount = 0;
					$("#words-typed").html("");
					$("#words").html(lines[lineCount]);
					$(".letter").eq(0).addClass("highlight-red");
					$("#next-letter").html($(".letter").eq(0).html());
					$("#icons").html("");
				}
			}
		}
    });
	
	function DisplayResults() {
		var time_minutes = ((stop_time - start_time ) / 60000).toFixed(1);
		var wpm = ((wordCount / time_minutes) - (mistakeCount * 2)).toFixed(1);
		$("#words-typed").html("");
		$("#icons").html("");
		$("#next-letter").html("");
		$("#words").html("<div>Words correctly typed: " + wordCount.toString() + " Mistakes: " + mistakeCount.toString() + " Words per minute: " + wpm.toString());
	}
	
});