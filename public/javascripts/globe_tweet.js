// $(document).ready(function(){

var globeTweet = {};

console.log("globetweet");

globeTweet.startStream = function() {
  console.log("globetweet");
  // set variables
  var socket = io(),
    tweetDiv = $('#blessedTweets'),
    count = 0,
    counter = $('#blessedCounter'),
    // loadMessage = $('#load-msg'),
    tweetCount = $('#blessedTweetCount');
    // waitMessage = $('#wait-msg');

  setTimeout(function() {
    if (count === 0) {
      waitMessage.fadeIn();
    }
  }, 15000);
  console.log("set timeout");

  socket.on('receive_tweet', function(tweet) {
    console.log ("calling socket on event");

    console.log('receiving tweet');
    tweetDiv.prepend($('<div class="theTweets"><img id="profPic" src="'
      + tweet.user.profile_image_url + '" > @'
      + tweet.user.screen_name + ': <a href="http://twitter.com/'
      + tweet.user.screen_name + '/status/'
      + tweet.id_str + '" target="blank">'
      + tweet.text + '</a></div>').fadeIn('slow','swing'));

    count += 1;
    counter.html(count);

    if (count > 0) {
      loadMessage.hide();
      waitMessage.hide();
      tweetCount.show();
    }
  });
};
// });