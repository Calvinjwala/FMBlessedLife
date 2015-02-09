// $(document).ready(function(){

var globeTweet = {};

console.log("globetweet");

bCount = 0;
fCount = 0;

globeTweet.startStream = function() {
  console.log("globetweet");
  // set variables
  var socket = io(),

    bDiv = $('#blessedTweets'),
    bCounter = $('#blessedCounter'),
    bTweetCount = $('#blessedTweetCount');

    fDiv = $('#fmlTweets'),
    fCounter = $('#fmlCounter'),
    fTweetCount = $('#fmlTweetCount');

    loadMessage = $('#load-msg'),
    waitMessage = $('#wait-msg');

  setTimeout(function() {
    if (fCount === 0 || bCount === 0) {
      waitMessage.fadeIn();
    }
  }, 15000);
  console.log("set timeout");

  socket.on('receive_tweet', function(tweet) {
    console.log ("calling socket on event");
    console.log("receiving tweet");

    if (tweet.text.indexOf("#blessed") != -1) {
      bDiv.prepend($('<div class="theTweets"><img id="profPic" src="'
        + tweet.user.profile_image_url + '" > @'
        + tweet.user.screen_name + ': <a id="actualTweet" href="http://twitter.com/'
        + tweet.user.screen_name + '/status/'
        + tweet.id_str + '" target="blank">'
        + tweet.text + '</a></div>').fadeIn('slow','swing'));

      bCount += 1;
      bCounter.html(bCount);
    }
    else if (tweet.text.indexOf("#fml") != -1) {
      fDiv.prepend($('<div class="theTweets" style="inline-block"><img id="profPic" src="'
        + tweet.user.profile_image_url + '" > @'
        + tweet.user.screen_name + ': <a id="actualTweet" href="http://twitter.com/'
        + tweet.user.screen_name + '/status/'
        + tweet.id_str + '" target="blank">'
        + tweet.text + '</a></div>').fadeIn('slow','swing'));
      fCount += 1;
      fCounter.html(fCount);
    }

    if (count > 0) {
      loadMessage.hide();
      waitMessage.hide();
      tweetCount.show();
    }
  });
};


globeTweet.stopStream = function() {
  var socket = io();
  socket.off();
};