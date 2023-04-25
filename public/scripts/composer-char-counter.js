
$(document).ready(function() {
  // use jquery to grab the 140 max char
  // use jquery to grab length of what is being typoed in input 
  // subtract length of what is typed from the 140
  
  $("#tweet-text").on("input", function() {
    const maxChar = 140;
    let chars = $("#tweet-text").val().length;
    $(".counter").text(maxChar - chars);

    if (chars > 140) {
      $(".counter").css("color", "#b31d06")

    } else {
      $(".counter").css("color", "black")
    }
  });
});