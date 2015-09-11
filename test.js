$(document).ready(function(){

$("#go").click(function(){
    $("#block").animate({
            backgroundColor: "#abcdef"
    }, 1500 );
});
$("#sat").click(function(){
    $("#block").animate({
            backgroundColor: "#ffffff"
    }, 1500 );
});

});