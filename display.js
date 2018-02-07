
//Run Everything
$(document).ready(function () {
  //initial run
  var $body = $('body');
  $body.html('');
  var index = 0;
  checkNewMessages();
  //subsequent updates
  setInterval(checkNewMessages, 500);
  //helper Methods


/*

Check and display tweets
Assumes: index
SideEffect: updates index to be index of last item in stream.home;

*/
function checkNewMessages(){
  var currStreamIndex = streams.home.length - 1;
  while (currStreamIndex >= index) {
    var tweet = streams.home[index];
    var $tweet = $('<section class = "tweet"></section>');
    var content = '@' + tweet.user + ': ' + tweet.message;
    var time = tweet.created_at;
    $tweet.append($(`<div class="tweetContent"> ${content} <div>`));
    $tweet.append($(`<div class="tweetTime"> ${time} <div>`));
    $tweet.prependTo($body);
    index++;
  }
}


//format time
  
  
  
});

