
//Run Everything
$(document).ready(function () {
  //initial run
  var $body = $('body');
  var index = 0;
  var $feed = $(`<section class = "feed"></section>`);
  $body.append($feed);
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
    var content = `<a data-name=${tweet.user} href="#top">@${tweet.user}</a>`+ ': ' + tweet.message;
    var time = tweet.created_at;
    if (userDetailName === tweet.user){
      var $userTweet = $('<section class = "userTweet"></section>');
      $userTweet.append($(`<div class="tweetContent">${tweet.message}</div>`));
      $userTweet.append($(`<div class="tweetTime"> ${time} </div>`));
      ($(".userDetail h1")).after($userTweet);
    
    }
    $tweet.append($(`<div class="tweetContent"> ${content} </div>`));
    $tweet.append($(`<div class="tweetTime"> ${time} </div>`));
    $tweet.prependTo($feed);
    index++;
  }
}

$('.tweet a').on('click',function(){
  
  if ($('.userDetail').length !==0){
    $('.userDetail').remove();
  };
  var userName=$(this).data('name');
  $userSection = $(`<aside class="userDetail" data-name=${userName}></aside>`);
  $userSection.prepend($(`<h2> ${userName} </h2>` ));
  $userSection.hide();
  $("#top").after($userSection);
  var userObj = {};
  userObj=streams.users[userName];
  for (var i=0; i<userObj.length; i++){
    var tweet = userObj[i];
    var $tweet = $('<section class = "userTweet"></section>');
    var content = tweet.message;
    var time = tweet.created_at;
    $tweet.append($(`<div class="tweetContent"> ${content} </div>`));
    $tweet.append($(`<div class="tweetTime"> ${time} </div>`));
    ($(".userDetail h2")).after($tweet);
  $userSection.slideDown("fast");
  }
  
});
  
function addTweets(){
  
}  
  
});

