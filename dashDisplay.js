
//Run Everything
$(document).ready(function () {
  //initial run
  var $body = $('body');
  var index = 0;
  var $feed = $(`<section class = "feed"></section>`);
  $feed.append($("<h2>newsfeed</h2>"));
  var $feedContent = $('<section class = "feedContent"></section>');
  $feed.append($feedContent);
  $body.append($feed);
  $body.append($("<div class='fix'><\div>)"))
  ;
  checkNewMessages();

  
  //subsequent updates
  setInterval(checkNewMessages, 5000);
  
  
  //helper Methods
  
/*
Check and display tweets
Assumes: index
SideEffect: updates index to be index of last item in stream.home;

*/
function checkNewMessages(){
  var currStreamIndex = streams.home.length - 1;
  var userDetailName = ($('.userDetail').length !==0) ? $('.userDetail').data('name') : null;
  while (currStreamIndex >= index) {
    var tweet = streams.home[index];
    var $tweet = $('<section class = "tweet"></section>');
    var content = `<a data-name=${tweet.user} href="#">@${tweet.user}</a>`+ ': ' + tweet.message;
    var time = tweet.created_at;
    if (userDetailName === tweet.user){
      var $userTweet = $('<section class = "userTweet tweet"></section>');
      $userTweet.append($(`<p class="tweetContent">${tweet.message}</p>`));
      $userTweet.append($(`<p class="tweetTime"> ${time} </p>`));
      ($(".userDetail h2")).after($userTweet);
    
    }
    $tweet.append($(`<p class="tweetContent"> ${content} </p>`));
    $tweet.append($(`<p class="tweetTime"> ${time} </p>`));
    $tweet.prependTo($feedContent);
    index++;
  }
}

$('.feedContent').on('click',$('.tweet a'), function(event){
  
  if ($('.userDetail').length !==0){
    $('.userDetail').remove();
  };
  $(".feed").addClass("withUser");

  var userName= $(event.target).data('name');
  $userSection = $(`<aside class="userDetail" data-name=${userName}></aside>`);
  $userSection.prepend($(`<h2> @${userName} </h2>` ));
  $(".header").after($userSection);
  var userObj = {};
  userObj=streams.users[userName];
  for (var i=0; i<userObj.length; i++){
    var tweet = userObj[i];
    var $tweet = $('<section class = "userTweet tweet"></section>');
    var content = tweet.message;
    var time = tweet.created_at;
    $tweet.append($(`<p class="tweetContent"> ${content} </p>`));
    $tweet.append($(`<p class="tweetTime"> ${time} </p>`));
    ($(".userDetail h2")).after($tweet);
  }
  
});
  
});

