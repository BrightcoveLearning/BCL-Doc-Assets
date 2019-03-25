var BCLS = (function(window, document) {
  var showJSON = document.getElementById("showJSON"),
    showMRSS = document.getElementById("showMRSS"),
    mrssOutput = false,
    feed = document.getElementById("feed"),
    account_id_input = document.getElementById("account_id_input"),
    videoData,
    policy_key_input = document.getElementById("policy_key_input"),
    playlist_id_input = document.getElementById("playlist_id_input"),
    siteURL = document.getElementById('siteURL'),
    feedURL = document.getElementById('feedURL'),
    feedDescription = document.getElementById('feedDescription'),
    account_id,
    policyKey,
    playlist_id,
    feedname,
    // the next three lines are the ones that need to be changed
    account_id_default = "1752604059001",
    policyKey_default =
    "BCpkADawqM3_9ax216PJYuUTLApMLkLJ3apjFlTRKHHS4q0DE33J0XsiDWmc6SfKwrwRAhejCZpTbwljz4-OlUwyqKi64L25Dwy4yhY1eSZ9ZduI-dO0mjSNVcR9C8nz0jtkimOOtzQgswCr",
    playlist_id_default = "5492280057001",
    // vars for MRSS generation
    mrssStr =
    '<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:georss="http://www.georss.org/georss" xmlns:gml="http://www.opengis.net/gml" xmlns:atom="http://www.w3.org/2005/Atom">',
    sCdata = '<![CDATA[',
    eCdata = ']]>',
    sChannel = "<channel>",
    eChannel = "</channel>",
    sTitle = "<title>",
    eTitle = "</title>",
    sDescription = "<description>",
    eDescription = "</description>",
    sItem = "<item>",
    eItem = "</item>",
    sLink = "<link>",
    eLink = "</link>",
    sPubDate = "<pubDate>",
    ePubDate = "</pubDate>",
    sGuid = '<guid isPermaLink="false">',
    eGuid = '</guid>',
    sMediaContent = "<media:content",
    eMediaContent = " />",
    sMediaPlayer = "<media:player",
    eMediaPlayer = " />",
    sMediaDescription = "<description>",
    eMediaDescription = "</description>",
    sMediaThumbnail = "<media:thumbnail",
    eMediaThumbnail = "/>",
    sMediaTitle = "<title>",
    eMediaTitle = "</title>";

  // event listeners for the buttons
  showJSON.addEventListener("click", function() {
    mrssOutput = false;
    // get media data if we haven't already
    if (!isDefined(videoData)) {
      // check inputs to see if we use those or default values
      if (
        isDefined(account_id_input.value) &&
        isDefined(policy_key_input.value) &&
        isDefined(playlist_id_input.value)
      ) {
        account_id = removeSpaces(account_id_input.value);
        policyKey = removeSpaces(policy_key_input.value);
        playlist_id = removeSpaces(playlist_id_input.value);
      } else {
        account_id = account_id_default;
        policyKey = policyKey_default;
        playlist_id = playlist_id_default;
      }
      getMediaData(function() {
        feed.textContent = JSON.stringify(videoData, null, "  ");
      });
    } else {
      // JSON data to the textarea
      feed.textContent = JSON.stringify(videoData, null, "  ");
    }
  });

  showMRSS.addEventListener("click", function() {
    mrssOutput = true;
    // get media data if we haven't already
    if (!isDefined(videoData)) {
      // check inputs to see if we use those or default values
      if (
        isDefined(account_id_input.value) && isDefined(policy_key_input.value) && isDefined(playlist_id_input.value)
      ) {
        account_id = removeSpaces(account_id_input.value);
        policyKey = removeSpaces(policy_key_input.value);
        playlist_id = removeSpaces(playlist_id_input.value);
      } else {
        account_id = account_id_default;
        policyKey = policyKey_default;
        playlist_id = playlist_id_default;
      }
      getMediaData(function() {
        processMRSS();
      });
    } else {
      processMRSS();
    }
  });

  function processMRSS() {
    var i, iMax, sources;
    iMax = videoData.length;
    for (i = 0; i < iMax; i++) {
      sources = videoData[i].sources;
      if (sources.length > 0) {
        // get the best MP4 rendition
        var source = processSources(sources);
        videoData[i].source = source;
      } else {
        // video has no sources
        videoData[i].source = null;
      }
    }
    // remove videos with no sources
    i = videoData.length;
    while (i > 0) {
      i--;
      if (!isDefined(videoData[i].source)) {
        videoData.splice(i, 1);
      }
    }
    // generate and display the MRSS data
    addItems();
  }

  /**
   * tests for all the ways a variable might be undefined or not have a value
   * @param {String|Number} x the variable to test
   * @return {Boolean} true if variable is defined and has a value
   */
  function isDefined(x) {
    if (x === "" || x === null || x === undefined) {
      return false;
    }
    return true;
  }

  /**
   * remove spaces from a string
   * @param {String} str string to process
   * @return {String} trimmed string
   */
  function removeSpaces(str) {
    str = str.replace(/\s/g, "");
    return str;
  }

  /**
   * sort an array of objects based on an object property
   * @param {array} targetArray - array to be sorted
   * @param {string|number} objProperty - object property to sort on
   * @return sorted array
   */
  function sortArray(targetArray, objProperty) {
    targetArray.sort(function(b, a) {
      var propA = a[objProperty],
        propB = b[objProperty];
      // sort ascending; reverse propA and propB to sort descending
      if (propA < propB) {
        return -1;
      } else if (propA > propB) {
        return 1;
      } else {
        return 0;
      }
    });
    return targetArray;
  }

  /**
   * [processSources gets the highest bitrate source for the MRSS feed
   * @param  {Array} sources array of video sources
   * @return {Object} the highest bitrate MP4 source
   */
  function processSources(sources) {
    var i = sources.length;
    // remove non-MP4 sources
    while (i > 0) {
      i--;
      if (sources[i].container !== "MP4") {
        sources.splice(i, 1);
      } else if (sources[i].hasOwnProperty("stream_name")) {
        sources.splice(i, 1);
      }
    }
    // sort sources by encoding rate
    sortArray(sources, "encoding_rate");
    // return the first item (highest bitrate)
    return sources[0];
  }

  /**
   * add video items to the MRSS feed
   */
  function addItems() {
    var i,
      iMax,
      video,
      pubdate,
      videoURL,
      thumbnailURL,
      doThumbnail = true;
    if (videoData.length > 0) {
      mrssStr += sChannel;
      mrssStr += '<atom:link href="' + feedURL.value.replace(/&/g, '&amp;') + '" rel="self" type="application/rss+xml" />';
      mrssStr += sTitle + feedname + eTitle;
      mrssStr += sDescription + sCdata + feedDescription.value + eCdata + eDescription;
      mrssStr += sLink + siteURL.value.replace(/&/g, "&amp;") + eLink;
      iMax = videoData.length;
      for (i = 0; i < iMax; i += 1) {
        doThumbnail = true;
        video = videoData[i];

        // video may not have a valid source
        if (isDefined(video.source) && isDefined(video.source.src)) {
          videoURL = video.source.src.replace(/&/g, "&amp;");
        } else {
          // no source; skip this videos
          continue;
        }
        // depending on when/how the video was created, it may have different thumbnail properties or none at all
        if (isDefined(video.thumbnail)) {
          thumbnailURL = encodeURI(video.thumbnail.replace(/&/g, "&amp;"));
        } else {
          doThumbnail = false;
        }

        pubdate = new Date(video.created_at).toGMTString();
        mrssStr += sItem;
        mrssStr +=
          sLink +
          "https://players.brightcove.net/" +
          account_id +
          "/default_default/index.html?videoId=" +
          video.id +
          eLink;
        mrssStr += sPubDate + pubdate + ePubDate;
        mrssStr += sGuid + video.id + eGuid;
        mrssStr +=
          sMediaContent +
          ' url="' +
          videoURL +
          '" fileSize="' +
          video.source.size +
          '" type="video/quicktime" medium="video" duration="' +
          video.duration / 1000 +
          '" isDefault="true" height="' +
          video.source.height +
          '" width="' +
          video.source.width +
          '"' + eMediaContent;
        mrssStr +=
          sMediaPlayer +
          ' url="' +
          "https://players.brightcove.net/" +
          account_id +
          "/default_default/index.html?videoId=" +
          video.id +
          '"' +
          eMediaPlayer;
        mrssStr += sMediaTitle + video.name + eMediaTitle;
        mrssStr += sMediaDescription + sCdata + video.description + eCdata + eMediaDescription;
        if (doThumbnail) {
          mrssStr += sMediaThumbnail + ' url="' + thumbnailURL + '"';
          if (isDefined(video.images)) {
            mrssStr +=
              ' height="' +
              video.images.thumbnail.sources[0].height +
              '" width="' +
              video.images.thumbnail.sources[0].width +
              '"' +
              eMediaThumbnail;
          } else {
            mrssStr += eMediaThumbnail;
          }
        }
        mrssStr += eItem;
      }
      mrssStr += eChannel + "</rss>";
      feed.textContent = vkbeautify.xml(mrssStr);
    }
  }

  feed.addEventListener("click", function() {
    feed.select();
  });

  /**
   * makes the request to the Playback API
   */
  function getMediaData(callback) {
    var httpRequest = new XMLHttpRequest(),
      responseData,
      parsedData,
      requestURL =
      "https://edge.api.brightcove.com/playback/v1/accounts/" +
      account_id +
      "/playlists/" +
      playlist_id +
      "?limit=100";
    // response handler
    getResponse = function() {
      try {
        if (httpRequest.readyState === 4) {
          if (httpRequest.status >= 200 && httpRequest.status < 300) {
            responseData = httpRequest.responseText;
            parsedData = JSON.parse(responseData);
            videoData = parsedData.videos;
            feedname = parsedData.name;
            if (mrssOutput) {
              callback();
            } else {
              callback();
            }
          } else {
            alert(
              "There was a problem with the request. Request returned " +
              httpRequest.status
            );
          }
        }
      } catch (e) {
        alert("Caught Exception: " + e);
      }
    };
    // set response handler
    httpRequest.onreadystatechange = getResponse;
    // open the request
    httpRequest.open("GET", requestURL);
    // set headers
    httpRequest.setRequestHeader("Accept", "application/json;pk=" + policyKey);
    // open and send request
    httpRequest.send();
  }
})(window, document);
