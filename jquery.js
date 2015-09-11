/*var sentences = [
	'ten ate neite ate nee enet ite ate inet ent eate',
	'Too ato too nOt enot one totA not anot tOO aNot',
	'oat itain oat tain nate eate tea anne inant nean',
	'itant eate anot eat nato inate eat anot tain eat',
	'nee ene ate ite tent tiet ent ine ene ete ene ate'
];

var words=0;
var mistakes=0;
var letterCount=0;
var done = false;
var newLineStarted = true;
var currentLetter;
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
});*/

$(document).ready(function(){
	var sentences = [
		'ten ate neite ate nee enet ite ate inet ent eate',
		'Too ato too nOt enot one totA not anot tOO aNot',
		'oat itain oat tain nate eate tea anne inant nean',
		'itant eate anot eat nato inate eat anot tain eat',
		'nee ene ate ite tent tiet ent ine ene ete ene ate'
	];

	var words=0;
	var mistakes=0;
	var letterCount=0;
	var done = false;
	var newLineStarted = true;
	var currentLetter;
	
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
		var key_char;
		var key_id;
		$("#words-typed").append(String.fromCharCode(event.which));
		if (((event.which > 47) && (event.which < 58)) || ((event.which > 64) && (event.which < 91)) || ((event.which > 96) && (event.which < 123))) {
			key_char = String.fromCharCode(event.which);
			key_id = "#" + key_char;
//			console.log(event.which.toString());
//			console.log(String.fromCharCode(event.which));
		} else {
			key_id = "#" + event.which.toString();
//			console.log("non letter pressed");
		}
//		console.log(key_id.toString());
//		$(key_id).html("PR");
		var keyBGColor = $(key_id).css("background-color");
		var keyFGColor = $(key_id).css("color");
		console.log(keyBGColor);
		console.log(keyFGColor);
		$(key_id).css('background-color', '#8888ff');
		$(key_id).css('color', '#ffffff');
//		$(key_id).animate({width: '-=30px'},1000);
		$(key_id).animate({
			backgroundColor: 'rgb(245,245,245)',
			color: 'rgb(51,51,51)'
		},100);
		
		console.log($(".letter").eq(letterCount).html());
		$(".letter").removeClass("highlight-red");
		$(".letter").eq(letterCount).addClass("highlight-red");
		$(".letter").eq(letterCount).removeClass("highlight-red");
		$(".letter").eq(letterCount+1).addClass("highlight-red");
		if ($(".letter").eq(letterCount).html() == key_char) {
			$(".letter").eq(letterCount).addClass("highlight");
		}
		console.log(letterCount);
		letterCount++;
//		while (!done) {
//			if (newLineStarted) {
//				if ($(".letter").html[letterCount] == 
//			}			
//		}		
    });

});
