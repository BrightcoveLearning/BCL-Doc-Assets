var BCLS = (function(window, document, Pikaday) {
  var getPlaylists,
    limit = 25,
    offset = 0,
    playlistData = [],
    analyticsData = {},
    useMyAccount = document.getElementById('useMyAccount'),
    basicInfo = document.getElementById('basicInfo'),
    $accountInputs = document.getElementById('accountInputs'),
    $playlistInfo = document.getElementById('playlistInfo'),
    proxyURL = 'https://solutions.brightcove.com/bcls/bcls-proxy/bcls-proxy-v2.php',
    $account_id = document.getElementById('accountID'),
    account_id = '1752604059001',
    $client_id = document.getElementById('client_id'),
    $client_secret = document.getElementById('client_secret'),
    client_id,
    client_secret,
    $APIrequestType = document.getElementById('aapiRequestType'),
    requestType,
    $accountID = document.getElementById('accountID'),
    $dimension = document.getElementById('dimension'),
    fromPicker,
    toPicker,
    to = document.getElementById('to'),
    from = document.getElementById('from'),
    $player = document.getElementById('player'),
    $requestButton = document.getElementById('requestButton'),
    $request = document.getElementById('request'),
    $requestForm = document.getElementById('requestForm'),
    $aapiParams = document.getElementById('aapiParams'),
    $requestSubmitter = document.getElementById('requestSubmitter'),
    $submitButton = document.getElementById('submitButton'),
    $format = document.getElementById('format'),
    $directVideoInput = document.getElementById('directVideoInput'),
    $responseFrame = document.getElementById('responseFrame'),
    separator = '',
    requestTrimmed = false,
    lastChar = '',
    requestURL = '',
    endDate = '',
    startDate = '',
    $getPlaylists = document.getElementById('getPlaylists'),
    $playlistSelectWrapper = document.getElementById('playlistSelectWrapper'),
    $playlistSelector = document.getElementById('playlistSelector'),
    playlistSelector = document.getElementById('playlistSelector'),
    videoIds = [],
    isJSON = true,
    searchString,
    playlistLimit,
    playlistSort,
    totalPlaylists = 0,
    totalPlaylistCalls = 0,
    callNumber = 0,
    gettingData = false,
    now = new Date(),
    nowMS = now.valueOf(),
    fromMS = nowMS - (30 * 24 * 60 * 60 * 1000),
    fromDate = new Date(fromMS),
    nowISO = now.toISOString().substr(0, 10),
    fromISO = fromDate.toISOString().substr(0, 10);
  // utilities
  // more robust test for strings 'not defined'
  function isDefined(v) {
    if (v === '' || v === null || v === 'undefined' || v === undefined) {
      return false;
    }
    return true;
  }

  /**
   * get selected value for single select element
   * @param {htmlElement} e the select element
   * @return {Object} object containing the `value` and selected `index` and 'data-playlist-index'
   */
  function getSelectedPlaylist(e) {
    var val = e.options[e.selectedIndex].value,
      playlistIndex = parseInt(e.options[e.selectedIndex].getAttribute('data-playlist-index')),
      idx = e.selectedIndex;
    return {
      value: val,
      playlistIndex: playlistIndex,
      index: idx
    };
  }

  /**
   * get selected value for single select element
   * @param {htmlElement} e the select element
   * @return {Object} object containing the `value` and selected `index`
   */
  function getSelectedValue(e) {
    var val = e.options[e.selectedIndex].value,
      idx = e.selectedIndex;
    return {
      value: val,
      index: idx
    };
  }

  /**
   * handler for playlist selection
   * get the videos from the playlist metadata or the search criteria
   * and then invokes the Analytics API request
   */
  function onPlaylistSelect() {
    var selectedPlaylistObj = getSelectedPlaylist(playlistSelector),
      selectedPlaylist = playlistData[selectedPlaylistObj.playlistIndex];

    switch (selectedPlaylist.type) {
      case 'EXPLICIT':
        videoIds = selectedPlaylist.video_ids;
        break;
      case 'ACTIVATED_OLDEST_TO_NEWEST':
        searchString = selectedPlaylist.search;
        playlistLimit = selectedPlaylist.limit;
        playlistSort = 'published_at';
        buildRequest('getVideos');
        break;
      case 'ACTIVATED_NEWEST_TO_OLDEST':
        searchString = selectedPlaylist.search;
        playlistLimit = selectedPlaylist.limit;
        playlistSort = encodeURI('-published_at');
        buildRequest('getVideos');
        break;
      case 'ALPHABETICAL':
        searchString = selectedPlaylist.search;
        playlistLimit = selectedPlaylist.limit;
        playlistSort = 'name';
        buildRequest('getVideos');
        break;
      case 'PLAYS_TOTAL':
        searchString = selectedPlaylist.search;
        playlistLimit = selectedPlaylist.limit;
        playlistSort = encodeURI('-plays_total');
        buildRequest('getVideos');
        break;
      case 'PLAYS_TRAILING_WEEK':
        searchString = selectedPlaylist.search;
        playlistLimit = selectedPlaylist.limit;
        playlistSort = 'plays_trailing_week';
        buildRequest('getVideos');
        break;
      case 'START_DATE_OLDEST_TO_NEWEST':
        searchString = selectedPlaylist.search;
        playlistLimit = selectedPlaylist.limit;
        playlistSort = 'schedule_starts_at';
        buildRequest('getVideos');
        break;
      case 'START_DATE_NEWEST_TO_OLDEST':
        searchString = selectedPlaylist.search;
        playlistLimit = selectedPlaylist.limit;
        playlistSort = encodeURI('-schedule_starts_at');
        buildRequest('getVideos');
        break;
    }
    // undim param input fields
    $aapiParams.setAttribute('style', 'opacity:1;cursor:pointer;');
    $requestSubmitter.setAttribute('style', 'opacity:1;cursor:pointer;');
    buildRequest();
  }

  /**
   * removes spaces from a String
   * @param i{String} str the string to process
   */
  function removeSpaces(str) {
    if (isDefined(str)) {
      str = str.replace(/\s+/g, '');
      return str;
    }
  }

  /**
   * builds the various API requests,
   * submits them,
   * and handles the responses
   * @param {String} type the request type
   */
  function buildRequest(type) {
    var options = {},
      tmpArray,
      newOption,
      txt,
      frag = new DocumentFragment(),
      currentIndex,
      i;

    // add credentials if submitted
    if (isDefined(client_id) && isDefined(client_secret)) {
      options.client_id = client_id;
      options.client_secret = client_secret;
    }
    options.account_id = account_id;
    options.proxyURL = proxyURL;
    switch (type) {
      case 'getPlaylistsCount':
        options.url = 'https://cms.api.brightcove.com/v1/accounts/' + account_id + '/counts/playlists';
        $request.textContent = options.url;
        makeRequest(options, function(response) {
          response = JSON.parse(response);
          totalPlaylists = response.count;
          buildRequest('getPlaylists');
        });
        break;
      case 'getPlaylists':
        totalPlaylistCalls = Math.ceil(totalPlaylists / limit);
        options.url = 'https://cms.api.brightcove.com/v1/accounts/' + account_id + '/playlists?limit=' + limit + '&offset=' + (limit * callNumber);
        $request.textContent = options.url;
        makeRequest(options, function(response) {
          response = JSON.parse(response);
          // add the current items array to overall one
          playlistData = playlistData.concat(response);
          callNumber++;
          if (callNumber < totalPlaylistCalls) {
            // still have more videos to get
            buildRequest('getPlaylists');
          } else {
            // build the playlist selector
            newOption = document.createElement('option');
            txt = document.createTextNode('Select a Playlist');
            newOption.appendChild(txt);
            frag.appendChild(newOption);
            playlistData.forEach(function(playlist, index, playlistData) {
              newOption = document.createElement('option');
              newOption.setAttribute('value', playlist.id);
              newOption.setAttribute('data-playlist-index', index);
              txt = document.createTextNode(playlist.name);
              newOption.appendChild(txt);
              frag.appendChild(newOption);
            });
            // add the options to the playlist selector
            $playlistSelector.appendChild(frag);
            // reset callNumber
            callNumber = 0;
          }
        });
        break;
      case 'getVideos':
        options.url = 'https://cms.api.brightcove.com/v1/accounts/' + account_id + 'videos?q=' + searchString + '&limit=' + playlistLimit + '&sort=' + playlistSort;
        $request.textContent = options.url;
        makeRequest(options, function(response) {
          response = JSON.parse(response);
          response.forEach(function(video, index, response) {
            videoIds.push(video.id);
          });
        });
        break;
      case 'getAnalytics':
        var formatObj = getSelectedValue($format),
          format = formatObj.value;
        if (format === 'csv') {
          isJSON = false;
        }
        options.url = 'https://analytics.api.brightcove.com/v1/data?accounts=' + account_id + '&dimensions=video&where=video==' + videoIds.join(',') + '&from=' + from.value + '&to=' + to.value + '&limit=all&fields=engagement_score,play_rate,video,video_duration,video_engagement_1,video_engagement_100,video_engagement_25,video_engagement_50,video_engagement_75,video_impression,video_name,video_percent_viewed,video_seconds_viewed,video_view' + '&format=' + format;
        $request.textContent = options.url;
        makeRequest(options, function(response) {
          response = JSON.parse(response);
          if (format === 'json') {
            $responseFrame.textContent = JSON.stringify(response, null, '  ');
          } else {
            $responseFrame.textContent = response;
          }
        });
        break;
    }
  }

  /**
   * send API request to the proxy
   * @param  {Object} options for the request
   * @param  {String} options.url the full API request URL
   * @param  {String="GET","POST","PATCH","PUT","DELETE"} requestData [options.requestType="GET"] HTTP type for the request
   * @param  {String} options.proxyURL proxyURL to send the request to
   * @param  {String} options.client_id client id for the account (default is in the proxy)
   * @param  {String} options.client_secret client secret for the account (default is in the proxy)
   * @param  {JSON} [options.requestBody] Data to be sent in the request body in the form of a JSON string
   * @param  {Function} [callback] callback function that will process the response
   */
  function makeRequest(options, callback) {
    var httpRequest = new XMLHttpRequest(),
      response,
      proxyURL = options.proxyURL,
      // response handler
      getResponse = function() {
        try {
          if (httpRequest.readyState === 4) {
            if (httpRequest.status >= 200 && httpRequest.status < 300) {
              response = httpRequest.responseText;
              // some API requests return '{null}' for empty responses - breaks JSON.parse
              if (response === '{null}') {
                response = null;
              }
              // return the response
              callback(response);
            } else {
              alert('There was a problem with the request. Request returned ' + httpRequest.status);
            }
          }
        } catch (e) {
          alert('Caught Exception: ' + e);
        }
      };
    /**
     * set up request data
     * the proxy used here takes the following request body:
     * JSON.stringify(options)
     */
    // set response handler
    httpRequest.onreadystatechange = getResponse;
    // open the request
    httpRequest.open('POST', proxyURL);
    // set headers if there is a set header line, remove it
    // open and send request
    httpRequest.send(JSON.stringify(options));
  }

  // add date pickers to the date input fields
  fromPicker = new Pikaday({
    field: document.getElementById('from'),
    format: 'YYYY-MM-DD',
    onSelect: buildRequest
  });
  toPicker = new Pikaday({
    field: document.getElementById('to'),
    format: 'YYYY-MM-DD',
    onSelect: buildRequest
  });
  // populate to/from fields with default values
  to.value = nowISO;
  from.value = fromISO;

  // set event listeners
  useMyAccount.addEventListener('click', function() {
    if (basicInfo.getAttribute('style') === 'display:none;') {
      basicInfo.setAttribute('style', 'display:block;');
      useMyAccount.textContent = 'Use Sample Account';
    } else {
      basicInfo.setAttribute('style', 'display:none;');
      useMyAccount.textContent = 'Use My Account Instead';
    }
  });

  // event listeners
  $getPlaylists.addEventListener('click', function() {
    if (isDefined($account_id.value)) {
      account_id = $account_id.value;
      if (isDefined($client_id.value) && isDefined($client_secret.value)) {
        client_id = $client_id.value;
        client_secret = $client_secret.value;
      } else {
        alert('You must provide a client id and secret');
      }
    }
    buildRequest('getPlaylists');
  });

  playlistSelector.addEventListener('change', onPlaylistSelect);

  // send request
  $submitButton.addEventListener('click', function() {
    buildRequest('getAnalytics');
  });

  return {
    onPlaylistSelect: onPlaylistSelect
  };
})(window, document, Pikaday);
