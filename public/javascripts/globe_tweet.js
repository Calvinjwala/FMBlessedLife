// $(document).ready(function(){

var globeTweet = {};

console.log("globetweet");

globeTweet.startStream = function() {
  console.log("globetweet");
  // set variables
  var socket = io(),
    bDiv = $('#blessedTweets'),
    bCount = 0,
    bCounter = $('#blessedCounter'),
    bTweetCount = $('#blessedTweetCount');

    fDiv = $('#fmlTweets'),
    fCount = 0,
    fCounter = $('#fmlCounter'),
    fTweetCount = $('#fmlTweetCount');
    loadMessage = $('#load-msg'),
    waitMessage = $('#wait-msg');

  setTimeout(function() {
    if (count === 0) {
      waitMessage.fadeIn();
    }
  }, 15000);
  console.log("set timeout");

  socket.on('receive_tweet', function(tweet) {
    console.log ("calling socket on event");
    console.log('receiving tweet');

    if (tweet.text.indexOf("#blessed") != -1) {
      bDiv.prepend($('<div class="theTweets"><img id="profPic" src="'
        + tweet.user.profile_image_url + '" > @'
        + tweet.user.screen_name + ': <a href="http://twitter.com/'
        + tweet.user.screen_name + '/status/'
        + tweet.id_str + '" target="blank">'
        + tweet.text + '</a></div>').fadeIn('slow','swing'));

      bCount += 1;
      bCounter.html(bCount);
    }
    else if (tweet.text.indexOf("#fml") != -1) {
      fDiv.prepend($('<div class="theTweets"><img id="profPic" src="'
        + tweet.user.profile_image_url + '" > @'
        + tweet.user.screen_name + ': <a href="http://twitter.com/'
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
// });