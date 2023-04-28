/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// add comments for each individual funciton

$(document).ready(function() {


  // first function called - loops through passed in array and calls createTweetElement function on each object in array. finally it appends the return tweet to the html
  const renderTweet = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);

    }
  };
//creates safe string content
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // accepts an object and returns an HTML tweet
  const createTweetElement = function(obj) {
    const { user, content, created_at } = obj;
 

    const newTweet = `<article class="tweet">
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
</article>
`;

    return newTweet;

  };


  //Function call - starts the process
  // renderTweet(tweetData);
  //accepts submitted form data and sends it to server. also prevents page refresh
  $(".new_tweet").on("submit", function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    if (data.length - 5 === 0) {
      $("#toast").text("You can't tweet about nothing :)")
      $("#toast").toggleClass();
      setTimeout(() => $("#toast").toggleClass(), 2000)
      

    } else if (data.length - 5 > 140) {
      $("#toast").text("Cannot tweet more than 140 characters")
      $("#toast").toggleClass();
      setTimeout(() => $("#toast").toggleClass(), 2000)
    } else {
      
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: data,
      })
      .then(() => $("#tweets-container").empty())
      .then(() => loadTweets())
      .then(() =>$(".new_tweet").trigger("reset"))
      .then(() =>$(".counter").text("140"))
      .then(() =>$("#tweet-text").css("height", "1.25em"))
      
      
      
    }

  });

  const loadTweets = function() {
    $.ajax({
      type: "GET",
      url: "/tweets",
      success: function(res) {
        renderTweet(res);
        console.log(res)
      },
    });
    //.then(renderTweet(data))


  };



  loadTweets();


  $(".dropper").on("click", function() {
    $(".constainer").css("margin", "0 0 120px 0")
  } )

  $("#tweet-text").on("keydown", function() {
    $("#tweet-text").css("height", `${$("#tweet-text").prop("scrollHeight")}px`)
  })


})

