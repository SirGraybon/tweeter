$(document).ready(function() {

  $(".feed").hover(function(event) {
    event.stopImmediatePropagation();
    $(this).css("box-shadow", "5px 5px 9px rgba(94,104,121, 1").css("margin", "0 5px 5px 0");
  }, function() {

    $(this).css("box-shadow", "5px 5px 9px rgba(94,104,121, 0)").css("margin", " 5px 0 0 5px");
  });

  $("i").hover(function() {
    $(this).css("color", "#ae8a44");
  }, function() { $(this).css("color", "#545149")
});

});