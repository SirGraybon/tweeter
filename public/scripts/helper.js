// helper functions

$(document).ready(function() {
  
  // function to show / hide tweet form
  $(".dropper").on("click", function() {
    if ($(".new_tweet").css("display") === "none") {
      $(".new_tweet").slideDown();
      $("#tweet-text").focus();
    } else {
      $(".new_tweet").slideUp();

    }
  });

  // funtion to adjust the size of the input box in  tweet form
  $("#tweet-text").on("keydown", function() {
    $("#tweet-text").css("height", `${$("#tweet-text").prop("scrollHeight")}px`);
  });


 



});