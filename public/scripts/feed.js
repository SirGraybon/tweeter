$(document).ready(function() {

$(".feed").hover(function() {

  $(".feed").css("box-shadow", "5px 5px 9px rgba(94,104,121, 1").css("margin", "0 5px 5px 0")
}, function() {

  $(".feed").css("box-shadow", "5px 5px 9px rgba(94,104,121, 0)").css("margin", " 5px 0 0 5px");
});

});