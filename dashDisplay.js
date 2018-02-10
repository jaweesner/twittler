//TO DO
/*
add tweeting ability
Only show the most recent 20 tweets, expand section on click

 */

//Run Everything
$(document).ready(function () {
  //initial run
  var $body = $('body');
  var index = 0;
  var $feed = $(`<section class = "feed"></section>`);
  $feed.append($(`<h2>newsfeed</h2>`));
  var $feedContent = $(`<section class = "feedContent"></section>`);
  $feed.append($feedContent);
  $body.append($feed);
  $body.append($("<div class='fix'><\div>)"));
  checkNewMessages();

  //subsequent updates
  setInterval(checkNewMessages, 5000);

  //helper Methods

  /*
  Check and display tweets
  Assumes: index
  SideEffect: updates index to be index of last item in stream.home;

   */
  function checkNewMessages() {
    var currStreamIndex = streams.home.length - 1;
    var userDetailName = ($('.userDetail').length !== 0) ? $('.userDetail').data('name') : null;

    //Add new tweets
    while (currStreamIndex >= index) {
      var tweet = streams.home[index];
      addSingleFeedTweet(tweet)

      //if matches open user panel, update there too
      if (userDetailName === tweet.user) {
        addSingleUserTweet(tweet);
      }

      index++;
    }
    //Update past elements to have relative times
    var allTimeElements = $('.tweetTime');
    for (var i = 0; i < allTimeElements.length; i++) {
      $(allTimeElements[i]).text(moment($(allTimeElements[i]).data('time')).fromNow());
    }
  }

  //handle clicking of user name and initial backfill of tweets

  $('.feedContent').on('click', '.tweet a', function (event) {
    //if user section already open, get rid of it
    if ($('.userDetail').length !== 0) {
      $('.userDetail').remove();
    };

    //change CSS of main feed to allow sidebar
    $('*').addClass('withUser');

    //insert basic sidebar framework
    var userName = $(event.target).data('name');
    $userDetail = $(`<aside class="userDetail" data-name=${userName}></aside>`);
    $userDetail.append($(`<a class='closeUser'> close </a>`));
    $userDetail.append($(`<h2> @${userName} </h2>`));
    $('.header').after($userDetail);

    //backfill user -specific tweets
    var userObj = streams.users[userName];
    for (var i = 0; i < userObj.length; i++) {
      addSingleUserTweet(userObj[i]);
    }
    //Handles closing the user sidebar (in this function for scope reasons)
    $(".closeUser").on('click', function () {
      $('.userDetail').remove();
      $('*').removeClass('withUser');
    });
  });

  //Handles adding a single tweet to the user sidebar, given a tweet data object
  function addSingleUserTweet(tweetData) {
    var time = moment(tweetData.created_at);
    var formattedTime = time.format(`ddd, MMM Do YYYY, h:mm a`);
    var $userTweet = $('<section class = "userTweet tweet"></section>');
    $userTweet.append($(`<p class="tweetContent">${tweetData.message}</p>`));
    $userTweet.append($(`<p class="tweetTime" title="${formattedTime}" data-time="${time}"> ${time.fromNow()} </p>`));
    ($(".userDetail h2")).after($userTweet);
  }

  //Handles adding a single tweet to the feed, given a tweet data object
  function addSingleFeedTweet(tweetData) {
    var time = moment(tweetData.created_at);
    var formattedTime = time.format(`ddd, MMM Do YYYY, h:mm a`);
    var $tweet = $('<section class = "tweet"></section>');
    var content = `<a data-name=${tweetData.user} href="#">@${tweetData.user}</a>` + ': ' + tweetData.message;
    $tweet.append($(`<p class="tweetContent">${content}</p>`));
    $tweet.append($(`<p class="tweetTime" title="${formattedTime}" data-time="${time}"> ${time.fromNow()} </p>`));
    $tweet.prependTo($feedContent);
  }
$('.startTweet').on('click',function(){
  $('input').slideDown();
  
  $('.submit').on('click',function(){
  writeTweet($('.tweetText').val());
  $('.tweetText').val('');
  checkNewMessages();
});
});


});

