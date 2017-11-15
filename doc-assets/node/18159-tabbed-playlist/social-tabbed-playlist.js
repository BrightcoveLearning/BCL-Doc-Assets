videojs.registerPlugin('socialTabbedPlaylist', function() {
  // Get a reference to the player when it is ready
  var myPlayer = this,
  // Define an array of playlist Ids
  playlistIds = ["4450721964001", "2805100167001", "2764931905001","1754200320001"],
  // Get the playlist array length
  playlistIdsLength = playlistIds.length,
  // Get a reference to the playlist tabs
  tabs = document.getElementsByClassName("button"),
  // variables for the social sharing URL which will include the tabId and video item
  url, tabId, item,
  playlistNames = [];

  // Get the tabId from the URL if it exists
  tabId = getParameter('tabId');
  // Get the playlist video item from the URL if it exists
  item = getParameter('item');

  // If the tabId exists in the URL, then load the assciated tab, playlist and video item
  if (tabId) {
    processTab(tabId);
  }
  // If the tabID does not exist, then load the first tab, playlist and video item
  else{
    processTab(0);
    item=0;
  }

  // Wait for the video to start loading, so that we have data in the mediainfo object
  myPlayer.on('loadstart',function(){
    // Set the first video item
    myPlayer.one('playlistitem',function(){
      item = myPlayer.playlist.currentItem();
      /*console.log('item: ' + item);*/
    });

    url = location.protocol + '//' + location.host + location.pathname + "?playlistVideoId=" + myPlayer.mediainfo.id + "&tabId=" + tabId + "&item=" + item;

    var options = {
      "url": url,
      "deeplinking": false,
      "services": {
        "facebook": true,
        "google": true,
        "twitter": true,
        "tumblr": true,
        "pinterest": true,
        "linkedin": true
      }
    };
    myPlayer.social(options);
  })

  // +++ Set selected tab and load video +++
  function processTab(index) {

    window.tabId=index;
    /*console.log('tabId: ' + tabId);*/

    // Reset the tabs so that none of them are selected/highlighted
    resetTabs();

    // Highlight the selected tab in the navigation
    document.getElementById("tab" + index).setAttribute("style", "background:#08c;color: #00FFFF; border-bottom: 1px solid #00FFFF;");
    // Load the selected tab's playlist into the player
    loadPlaylist(playlistIds[index]);
  };

  // +++ Load selected playlist and first video +++
  function loadPlaylist(currentId) {

    // Get the playlist object for the currently selected tab
    myPlayer.catalog.getPlaylist(currentId, function(error, playlist) {
      /*console.log('currentID:' + currentId);*/
      // Load the playlist into the player
      myPlayer.catalog.load(playlist);
      // Load the first video in the playlist into the player

      /*console.log(">>>item: " + item);*/

      myPlayer.playlist.currentItem(Number(item));
    });
  };

  function resetTabs() {
    // Turn highlighting off for all of the tabs
    var i,
        iMax = tabs.length;
    for (i = 0; i < iMax; i++) {
      tabs[i].setAttribute("style", "background: #0000cc;color: #fff;")
    }
  }

  // +++ get parameter from URL +++
  function getParameter(theParameter) {
    var params = window.location.search.substr(1).split('&');

    for (var i = 0; i < params.length; i++) {
      var p=params[i].split('=');
      if (p[0] == theParameter) {
        return decodeURIComponent(p[1]);
      }
    }
    return false;
  }

});
