$(document).ready(function() {
 
  // fuciton to manipulate the character counter on tweet form
  $("#tweet-text").on("input", function() {
    const maxChar = 140;

    let chars = $("#tweet-text").val().length;
    $(".counter").text(maxChar - chars);
    
    if (chars > 140) {
      $(".counter").css("color", "#b31d06");
      
    } else {
      $(".counter").css("color", "#084c61");
    }

  });
});






