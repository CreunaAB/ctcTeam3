/*
 *  Declare standard objects for the API (model/view)
 */
 var sp = getSpotifyApi(1),
 m = sp.require('sp://import/scripts/api/models'),
 v = sp.require('sp://import/scripts/api/views'),
 dom = sp.require('sp://import/scripts/dom');


 $(document).ready(function () {
  $("#twitter-name-form").submit(function (e) {
    e.preventDefault();
    $(".player").remove();
    var twitterName = $("#twitter-name").val();

    st.loadLatestTweet(twitterName);
    $("#title").ajaxError(function (event, request, settings) {
      $(this).append("Error requesting page " + settings.url);
    });
  });
 });

 var st = {
  loadLatestTweet: function (twitterName) {
    var _url = 'https://api.twitter.com/1/statuses/user_timeline/' + twitterName + '.json?callback=?&count=1';
    $.getJSON(_url, st.getTweet);
  },

  getTweet: function (data) {
    response = data[0].text;
    var tracks = st.getSongsFromArray(st.splitString(response, ' '));
    st.createPlaylist(tracks, response);
  },

  splitString: function (string, split) {
    return string.split(split);
  },

  getSongsFromArray: function (words) {
    var wordsongs = [],
        song,
        word;

    for (word in words) {
      song = st.getSongFromWord(words[word]);
      if (!!song) {
        wordsongs.push(song);
      }
    }
    return wordsongs;
  },

  getSongFromWord: function (word) {
    var songs = st.getSongsFromWord(word);
    var song = songs[Math.floor(Math.random() * songs.length)];
    return song;
  },

  getSongsFromWord: function (word) {
    var search = new m.Search(word);

    search.appendNext();
    return search._tracks;

  },

  createPlaylist: function (trackList, tweet) {

    // console.log(trackList, tweet);

    // Create element for visual holder and set class (for css)
    var playerHolder = $(document.createElement('div'));
    playerHolder.addClass('player');
    // Create title and enumeraion
    var title = $('<h3 id="title" class="title" />');

    // Set class (for css)
    title.text(tweet);
    // Create spotify objects
    var playlist = new m.Playlist();
    var player = new v.Player();
    // Fill up playlist
    playlist.add(trackList);
    // Set context
    player.context = playlist;
    // Set 1st track to player
    player.track = playlist.get(0);
    // Add it to dom
    playerHolder.append(player.node);
    playerHolder.append(title);
    $('.app').append(playerHolder);
    // Visual list
    var list = new v.List(playlist, function (track) {
      return new v.Track(track, v.Track.FIELD.STAR | v.Track.FIELD.POPULARTIY | v.Track.FIELD.ARTIST | v.Track.FIELD.NAME | v.Track.FIELD.DURATION);
    });
    // Add list below player
    playerHolder.append(list.node);

  }
}