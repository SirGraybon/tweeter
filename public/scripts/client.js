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
  <div class="content">${content.text}</div>
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
  $("form").on("submit", function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    if (data.length - 5 === 0) {
      window.alert("text feild blank");

    } else if (data.length - 5 > 140) {
      window.alert("cant exceed 140 characters");
    } else {


      $.ajax({
        type: "POST",
        url: "/tweets",
        data: data,
      });

    }

  });

  const loadTweets = function() {
    $.ajax({
      type: "GET",
      url: "/tweets",
      success: function(res) {
        renderTweet(res);
      },
    });
    //.then(renderTweet(data))


  };



  loadTweets();


})

