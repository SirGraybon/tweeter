/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // Fisrts function called on page load - pulls tweet DB and calls render tweet function.
  const loadTweets = function() {
    $.ajax({
      type: "GET",
      url: "/tweets",
      success: function(res) {
        renderTweet(res);
        console.log(res);
      },
    });
  };

  // loops through passed in array and calls createTweetElement function on each object in array. finally it appends the return tweet to the html
  const renderTweet = function(tweets) {
    $("#tweets-container").empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);

    }
  };
  //creates safe string content
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // accepts an object and returns an HTML tweet
  const createTweetElement = function(obj) {
    const { user, content, created_at } = obj;

    const newTweet =
      `<article class="tweet">
        <header>
          <div class="user">
            <img class="avatars" src=${user.avatars}>
            <a class="name">${user.name}</a>
          </div>
          <a class="handle">${user.handle}</a>
        </header>
        <div class="content">${escape(content.text)}</div>
        <footer>
         <a class="timeago" >${timeago.format(created_at)}</a>
          <a class="actions">
           <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-arrows-rotate"></i>
            <i class="fa-solid fa-heart"></i>
          </a>
        </footer>
      </article>`;

    return newTweet;
  };

  //accepts submitted form data and sends it to server. also prevents page refresh
  $(".new_tweet").on("submit", function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    if (data.length - 5 === 0) {
      $("#toast").text("You can't tweet about nothing :)");
      $("#toast").toggleClass();
      setTimeout(() => $("#toast").toggleClass(), 2000);


    } else if (data.length - 5 > 140) {
      $("#toast").text("Cannot tweet more than 140 characters");
      $("#toast").toggleClass();
      setTimeout(() => $("#toast").toggleClass(), 2000);
    } else {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: data,
      })
        .then(() => loadTweets())
        .then(() => $(".new_tweet").trigger("reset"))
        .then(() => $(".counter").text("140"))
        .then(() => $("#tweet-text").css("height", "1.25em"));
    }
  });

  // helper functions
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



  // Function call
  loadTweets();

})

