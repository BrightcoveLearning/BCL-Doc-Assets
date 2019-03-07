var BCLS = ( function (window, document) {
    var // strings for XML tags
      mapStr = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">',
      sCdata = '<![CDATA[',
      eCdata = ']]>',
      sUrl = '<url>',
      eUrl = '</url>',
      sLoc = '<loc>',
      eLoc = '</loc>',
      sVideo = '<video:video>',
      eVideo = '</video:video>',
      sThumbnail = '<video:thumbnail>',
      eThumbnail = '</video:thumbnail>',
      sTitle = '<video:title>',
      eTitle = '</video:title>',
      sDescription = '<video:description>',
      eDescription = '</video:description>',
      sContent_loc =  '<video:content_loc>',
      eContent_loc = '</video:content_loc>',
      sDuration =  '<video:duration>',
      eDuration = '</video:duration>',
      sExpiration =  '<video:expiration>',
      eExpiration = '</video:expiration>',
      sViewcount =  '<video:view_count>',
      eViewcount = '</video:view_count>',
      sPublicationdate =  '<video:publication_date>',
      ePublicationdate = '</video:publication_date>',
      sFamilyfriendly =  '<video:family_friendly>',
      eFamilyfriendly = '</video:family_friendly>',
      sRestriction =  '<video:restriction relationship="',
      eRestriction = '</video:restriction>',
      // account stuff
      account_id,
      account_id_default = '1485884786001',
      client_id,
      client_secret,
      // api stuff
      proxyURL = 'https://solutions.brightcove.com/bcls/bcls-proxy/bcls-proxy-v2.php',
      baseURL = 'https://cms.api.brightcove.com/v1/accounts/',
      sort,
      sortDirection = "",
      search,
      limit = 25,
      totalVideos = 0,
      totalCalls = 0,
      callNumber = 0,
      videosArray = [],
      // element references
      account_id_input = document.getElementById('account_id'),
      client_id_input = document.getElementById('client_id'),
      client_secret_input = document.getElementById('client_secret'),
      hostingRadioButtons = document.getElementsByTagName('hosting'),
      idTypeRadioButtons = document.querySelectorAll('idType'),
      customField = document.querySelector('#customField'),
      customFieldName = document.querySelector('#customFieldName'),
      singlePage = document.querySelector('#singlePage'),
      pageURL = document.querySelector('#pageURL'),
      urlParam = document.querySelector('#urlParam'),
      freqSelect = document.getElementById('freqSelect'),
      familyFriendly = document.getElementById('familyFriendly'),
      numberSelect = document.getElementById('numberSelect'),
      searchStr = document.getElementById('searchStr'),
      sortSelect = document.getElementById('sortSelect'),
      directionSelect = document.getElementById('directionSelect'),
      makeFeed = document.getElementById('makeFeed'),
      logger = document.getElementById('logger'),
      apiRequest = document.getElementById('apiRequest'),
      feedDisplay = document.getElementById('feedDisplay'),
      allButtons = document.querySelectorAll('button');

    /**
     * tests for all the ways a variable might be undefined or not have a value
     * @param {String|Number} x the variable to test
     * @return {Boolean} true if variable is defined and has a value
     */
    function isDefined(x){
        if ( x === "" || x === null || x === undefined) {
            return false;
        }
        return true;
    }

    /**
     * get selected value for single select element
     * @param {htmlElement} e the select element
     */
    function getSelectedValue(e) {
        return e.options[e.selectedIndex].value;
    }


    /**
     * disables all buttons so user can't submit new request until current one finishes
     */
    function disableButtons() {
        var i,
            iMax = allButtons.length;
        for (i = 0; i < iMax; i++) {
            allButtons[i].setAttribute('disabled', 'disabled');
        }
    }

    /**
    * re-enables all buttons
    */
    function enableButtons() {
        var i,
        iMax = allButtons.length;
        for (i = 0; i < iMax; i++) {
            allButtons[i].removeAttribute('disabled');
        }
    }

    /**
     * sort an array of objects based on an object property
     * @param {array} targetArray - array to be sorted
     * @param {string|number} objProperty - object property to sort on
     * @return sorted array
     */
    function sortArray(targetArray, objProperty) {
        targetArray.sort(function (b, a) {
            var propA = a[objProperty], propB = b[objProperty];
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

    function processSources(sources) {
        var i = sources.length;
        // remove non-MP4 sources
        while (i > 0) {
            i--;
            if (sources[i].container !== 'MP4') {
                sources.splice(i, 1);
            } else if (sources[i].hasOwnProperty('stream_name')) {
                sources.splice(i, 1);
            }
        }
        // sort sources by encoding rate
        sortArray(sources, 'encoding_rate');
        // return the first item (highest bitrate)
        return sources[0];
    }

    function addItems() {
        var i, iMax, video, pubdate, eItem, videoURL, thumbnailURL, doThumbnail = true;
        if (videosArray.length > 0) {
            iMax = videosArray.length;
            for (i = 0; i < iMax; i += 1) {
                video = videosArray[i];
                // video may not have a valid source
                if (isDefined(video.source) && isDefined(video.source.src)) {
                    videoURL = encodeURI(video.source.src.replace(/&/g, '&amp;'));
                } else {
                    videoURL = "";
                }
                // depending on when/how the video was created, it may have different thumbnail properties or none at all
                if (isDefined(video.images) && isDefined(video.images.thumbnail)) {
                    thumbnailURL = encodeURI(video.images.thumbnail.sources[0].src.replace(/&/g, '&amp;'));
                } else if (isDefined(video.thumbnail)) {
                    thumbnailURL = encodeURI(video.thumbnail.replace(/&/g, '&amp;'));
                } else {
                    doThumbnail = false;
                }

                pubdate = new Date(video.created_at).toGMTString();
                mapStr += sItem;
                mapStr += sLink + 'https://players.brightcove.net/' + account_id + '/default_default/index.html?videoId=' + video.id + eLink;
                mapStr += sPubDate + pubdate + ePubDate;
                mapStr += sMediaContent + ' url="' + videoURL + '" fileSize="' + video.source.size + '" type="video/quicktime" medium="video" duration="' + video.duration / 1000 + '" isDefault="true" height="' + video.source.height + '" width="' + video.source.width + '">';
                mapStr += sMediaPlayer + ' url="' + 'https://players.brightcove.net/' + account_id + '/default_default/index.html?videoId=' + video.id + '"' + eMediaPlayer;
                mapStr += sMediaTitle + video.name + eMediaTitle;
                mapStr += sMediaDescription + video.description + eMediaDescription;
                if (doThumbnail) {
                    mapStr += sMediaThumbnail + ' url="' + thumbnailURL + '"';
                    if (isDefined(video.images)) {
                        mapStr += ' height="' + video.images.thumbnail.sources[0].height + '" width="' + video.images.thumbnail.sources[0].width + '"' + eMediaThumbnail;
                    } else {
                        mapStr += eMediaThumbnail;
                    }
                }
                mapStr += eMediaContent;
                if (isDefined(video.schedule) && video.schedule.ends_at) {
                    eItem = eItemStart + video.schedule.ends_at + eItemEnd;
                } else {
                    eItem = eItemStart + defaultEndDate + eItemEnd;
                }
                mapStr += eItem;
            }
        }
        mapStr += eChannel + '</rss>';
        logger.textContent = 'Finished!';
        feedDisplay.textContent = vkbeautify.xml(mapStr);
        enableButtons();
    }

    /**
     * sets up the data for the API request
     * @param {String} id the id of the button that was clicked
     */
    function createRequest(id) {
        var endPoint = '',
            options = {},
            parsedData;
        // disable buttons to prevent a new request before current one finishes
        disableButtons();
        options.proxyURL = proxyURL;
        options.account_id = account_id;
        if (isDefined(client_id) && isDefined(client_secret)) {
          options.client_id = client_id;
          options.client_secret = client_secret;
        }

        switch (id) {
            case 'getCount':
                endPoint = account_id + '/counts/videos?sort=' + sort;
                if (isDefined(search)) {
                    endPoint += '&q=' + search;
                }
                options.url = baseURL + endPoint;
                options.requestType = 'GET';
                apiRequest.textContent = options.url;
                makeRequest(options, function(response) {
                  parsedData = JSON.parse(response);
                  // set total videos
                  totalVideos = parsedData.count;
                  totalCalls = Math.ceil(totalVideos / limit);
                  logger.textContent = 'Total videos: ' + totalVideos;
                  createRequest('getVideos');
                });
                break;
            case 'getVideos':
            endPoint = account_id + '/videos?sort=' + sort + '&limit=' + limit + '&offset=' + limit * callNumber;
            if (isDefined(search)) {
                endPoint += '&q=' + search;
            }
            options.url = baseURL + endPoint;
            options.requestType = 'GET';
            apiRequest.textContent = options.url;
            makeRequest(options, function(response) {
              parsedData = JSON.parse(response);
              videosArray = videosArray.concat(parsedData);
              callNumber++;
              if (callNumber < totalCalls) {
                  logger.textContent = 'Getting video set ' + callNumber;
                  createRequest('getVideos');
              } else {
                  logger.textContent = 'Video data for ' + totalVideos + ' retrieved; getting sources...';
                  callNumber = 0;
                  createRequest('getVideoSources');
                }
            });
            break;
            case 'getVideoSources':
                var i,
                    iMax = videosArray.length;
                endPoint = account_id + '/videos/' + videosArray[callNumber].id + '/sources';
                options.url = baseURL + endPoint;
                options.requestType = 'GET';
                apiRequest.textContent = options.url;
                logger.textContent = 'Getting sources for video ' + videosArray[callNumber].name;
                makeRequest(options, function(response) {
                  sources = JSON.parse(response);
                  if (sources.length > 0) {
                      // get the best MP4 rendition
                      var source = processSources(sources);
                      videosArray[callNumber].source = source;
                  } else {
                      // video has no sources
                      videosArray[callNumber].source = null;
                  }
                  callNumber++;
                  if (callNumber < iMax) {
                      createRequest('getVideoSources');
                  } else {
                      // remove videos with no sources
                      i = videosArray.length;
                      while (i > 0) {
                          i--;
                          console.log('videosArray[i]', videosArray[i]);
                          if (!isDefined(videosArray[i].source)) {
                              console.log('i', i);
                              videosArray.splice(i, 1);
                          }
                      }
                      addItems();
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
        requestParams,
        dataString,
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

    function init() {
        // event handlers
        makeFeed.addEventListener('click', function() {
            var numVideos;
            // get the inputs
            client_id = client_id_input.value;
            client_secret = client_secret_input.value;
            // only use entered account id if client id and secret are entered also
            if (isDefined(client_id) && isDefined(client_secret)) {
                if (isDefined(account_id_input.value)) {
                    account_id = account_id_input.value;
                } else {
                    window.alert('To use your own account, you must specify an account id, and client id, and a client secret - since at least one of these is missing, a sample account will be used');
                    client_id = '';
                    client_secret = '';
                    account_id = '1752604059001';
                }
            } else {
                account_id = '1752604059001';
            }
            sort = getSelectedValue(sortSelect);
            sortDirection = getSelectedValue(directionSelect);
            if (isDefined(sortDirection)) {
                sort = sortDirection + sort;
            }
            search = searchStr.value;
            numVideos = getSelectedValue(numberSelect);
            // add title and description
            mapStr += sChannel + sTitle + feedTitle.value + eTitle + sDescription + feedDescription.value + eDescription;
            // if all videos wanted, get count; otherwise get videos
            if (numVideos === 'all') {
                // we need to get the count
                createRequest('getCount');
            } else {
                totalVideos = parseInt(numVideos);
                totalCalls = Math.ceil(numVideos / limit);
                logger.textContent = 'Total videos to retrieve: ' + totalVideos;
                createRequest('getVideos');
            }
        });
        feedDisplay.addEventListener('click', function() {
            feedDisplay.select();
        });
    }

    init();
})(window, document);
