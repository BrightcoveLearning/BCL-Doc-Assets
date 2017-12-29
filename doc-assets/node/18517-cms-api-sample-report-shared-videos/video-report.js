var BCLS = (function(window, document) {
  var accountId,
    clientId,
    clientSecret,
    // api stuff
    proxyURL            = 'https://solutions.brightcove.com/bcls/bcls-proxy/shares-proxy.php',
    baseURL             = 'https://cms.api.brightcove.com/v1/accounts/',
    limit               = 25,
    totalVideos         = 0,
    totalCalls          = 0,
    totalSharedVideos   = 0,
    callNumber          = 0,
    videosCompleted     = 0,
    videosArray         = [],
    sharedVideos        = [],
    sharedVideoData     = [],
    affiliates          = [],
    summaryData         = {},
    csvStr,
    summaryCsvStr,
    // elements
    account_id          = document.getElementById('account_id'),
    client_id           = document.getElementById('client_id'),
    client_secret       = document.getElementById('client_secret'),
    searchTags          = document.getElementById('searchTags'),
    searchField         = document.getElementById('searchField'),
    searchFieldValue    = document.getElementById('searchFieldValue'),
    dateRangeType       = document.getElementById('dateRangeType'),
    fromDate            = document.getElementById('fromDate'),
    toDate              = document.getElementById('toDate'),
    videoCount          = document.getElementById('videoCount'),
    makeReport          = document.getElementById('makeReport'),
    content,
    logger              = document.getElementById('logger'),
    csvData             = document.getElementById('csvData'),
    apiRequest          = document.getElementById('apiRequest'),
    apiResponse         = document.getElementById('apiResponse'),
    allButtons          = document.getElementsByName('button'),
    pLogGettingVideos   = document.createElement('p'),
    gettingVideoShares  = document.createElement('p'),
    pLogFinish          = document.createElement('p'),
    spanIntro2          = document.createElement('span'),
    spanOf2             = document.createElement('span'),
    spanRenditionsTotal = document.createElement('span'),
    spanRenditionsCount = document.createElement('span'),
    dateTypeValue,
    fromDateValue,
    toDateValue,
    tagsSearchString,
    fieldsSearchString,
    dateSearchString,
    searchString,
    spanRenditionsTotalEl,
    spanRenditionsCountEl;

  // date pickers
  rome(fromDate);
  rome(toDate);

  /**
   * tests for all the ways a variable might be undefined or not have a value
   * @param {String|Number} x the variable to test
   * @return {Boolean} true if variable is defined and has a value
   */
  function isDefined(x) {
    if (x === '' || x === null || x === undefined) {
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
   * remove spaces from a string
   * @param {String} str string to process
   * @return {String} trimmed string
   */
  function removeSpaces(str) {
    str = str.replace(/\s/g, '');
    return str;
  }



  /**
   * find index of an object in array of objects
   * based on some property value
   *
   * @param {array} targetArray array to search
   * @param {string} objProperty object property to search
   * @param {string} value of the property to search for
   * @return {integer} index of first instance if found, otherwise returns -1
  */
  function findObjectInArray(targetArray, objProperty, value) {
      var i, totalItems = targetArray.length, objFound = false;
      for (i = 0; i < totalItems; i++) {
          if (targetArray[i][objProperty] === value) {
              objFound = true;
              return i;
          }
      }
      if (objFound === false) {
          return -1;
      }
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
   * determines whether specified item is in an array
   *
   * @param {array} array to check
   * @param {string} item to check for
   * @return {boolean} true if item is in the array, else false
   */
  function arrayContains(arr, item) {
    var i,
      iMax = arr.length;
    for (i = 0; i < iMax; i++) {
      if (arr[i] === item) {
        return true;
      }
    }
    return false;
  }

  /**
   * adds a new message to the logging element
   * @param  {string} message string to add
   */
  function logMessage(message) {
    lineBreak = document.createElement('br');
    logger.appendChild(lineBreak);
    message = document.createTextNode(message);
    logger.appendChild(message);
  }

  function startCSVStrings() {
    var i = 0,
      iMax;
    csvStr = '"ID","Name","Affiliate ID","Affiliate Name","Affiliate Video ID","Share Status",\r\n';
  }

  function writeReport() {
    var i,
      iMax,
      j,
      jMax,
      video;
    if (sharedVideoData.length > 0) {
      iMax = videosArray.length;
      for (i = 0; i < iMax; i += 1) {
        video = sharedVideoData[i];
        // add csv row
        csvStr += '"' + video.id + '","' + video.name + '","' + video.affiliate_id + '","' + video.affiliate_name + '","' + video.affiliate_video_id + '","' + video.share_status + '","' ;
          csvStr += '\r\n';
      }
      csvData.textContent += csvStr;
      // content = document.createTextNode('Finished! See the results or get the CSV data below.');
      logMessage('Finished! Get the CSV data below.');
      // reportDisplay.innerHTML = summaryReportStr + reportStr;
      enableButtons();
    }
  }

  /**
   * sets up the data for the API request
   * @param {String} id the id of the button that was clicked
   */
  function createRequest(id) {
    var endPoint = '',
      cmsBaseURL = baseURL + accountId,
      options = {},
      responseParsed,
      i,
      iMax;
    // disable buttons to prevent a new request before current one finishes
    disableButtons();
    switch (id) {
      case 'getAffiliates':
        endpoint = '/channels/default/members';
        options.url = cmsBaseURL + endpoint;
        apiRequest.textContent = options.url;
        options.requestType = 'GET';
        makeRequest(options, function(response) {
          affiliates = JSON.parse(response);
          apiResponse.textContent = JSON.stringify(affiliates, null, '  ');
          logMessage('Affiliates retrieved');
          // get some videos
          createRequest('getCount');
        });
        break;
      case 'getCount':
        endPoint = '/counts/videos';
        if (isDefined(searchString)) {
          endPoint += '&q=' + searchString;
        }
        options.url = cmsBaseURL + endPoint;
        options.requestType = 'GET';
        apiRequest.textContent = options.url;
        makeRequest(options, function(response) {
          responseParsed = JSON.parse(response);
          logMessage('Video count retrieved');
          apiResponse.textContent = JSON.stringify(responseParsed, null, '  ');
          totalVideos = responseParsed.count;
          if (totalVideos === 0) {
            alert('No videos found; try changing or removing the search criteria');
          } else if (getSelectedValue(videoCount) !== 'All') {
            totalVideos = getSelectedValue(videoCount);
          }
          totalCalls = Math.ceil(totalVideos / limit);
          createRequest('getVideos');
        });
        break;
      case 'getVideos':
        var offset = (limit * callNumber);
        endPoint = '/videos?limit=' + limit + '&offset=' + offset;
        if (isDefined(searchString)) {
          endPoint += '&q=' + searchString;
        }
        options.url = cmsBaseURL + endPoint;
        apiRequest.textContent = options.url;
        options.requestType = 'GET';
        apiRequest.textContent = options.url;
        makeRequest(options, function(response) {
          videosArray = videosArray.concat(JSON.parse(response));
          apiResponse.textContent = JSON.stringify(videosArray, null, '  ');
          callNumber++;
          if (callNumber < totalCalls) {
            createRequest('getVideos');
          } else {
            iMax = videosArray.length;
            for (i = 0; i < iMax; i++) {
              var o = {};
              if (isDefined(videosArray[i].sharing)) {
                o.id = videosArray[i].id;
                o.name = videosArray[i].name;
                sharedVideos.push(o);
console.log('sharedVideos', sharedVideos);
              }
            }
            if (sharedVideos.length === 0) {
              alert('None of the returned videos are shared');
              return;
            }
            totalSharedVideos = sharedVideos.length;
            logMessage('All videos retrieved; checking for shares...');
            callNumber = 0;
            createRequest('getShares');
          }
        });
        break;
      case 'getShares':
        endPoint = '/videos/' + sharedVideos[callNumber].id + '/shares';
        options.url = cmsBaseURL + endPoint;
        apiRequest.textContent = options.url;
        options.requestType = 'GET';
        apiRequest.textContent = options.url;
        makeRequest(options, function(response) {
          responseParsed = JSON.parse(response);
          apiResponse.textContent = JSON.stringify(responseParsed, null, '  ');
          iMax = responseParsed.length;
          for (i = 0; i < iMax; i++) {
            var o = {};
            o.id = sharedVideos[callNumber].id;
            o.name = sharedVideos[callNumber].name;
            o.affiliate_id = responseParsed[i].affiliate_id;
            // look up affiliate name from get affiliates response
            o.affiliate_name = affiliates[findObjectInArray(affiliates, 'account_id', responseParsed[i].affiliate_id)].account_name;
            o.affiliate_video_id = responseParsed[i].affiliate_video_id;
            o.share_status = responseParsed[i].affiliate_id.status;
            sharedVideoData.push(o);
          }
          callNumber++;
          if (callNumber < totalSharedVideos) {
            createRequest('getShares');
          } else {
            logMessage('Video sharing info retrieved; writing report...');
            writeReport();
          }
        });
        break;
      default:
        console.log('Something wrong; should never get here');
        break;
    }
  }

  /**
   * send API request to the proxy
   * @param  {Object} options options for the request
   * @param  {String} requestID the type of request = id of the button
   * @param  {Function} [callback] callback function
   */
  function makeRequest(options, callback) {
    var httpRequest = new XMLHttpRequest(),
      responseRaw,
      parsedData,
      requestParams,
      dataString,
      renditions,
      field,
      i = 0,
      iMax,
      // response handler
      getResponse = function() {
        var videoCount;
        try {
          if (httpRequest.readyState === 4) {
            if (httpRequest.status >= 200 && httpRequest.status < 300) {
              // check for completion
              responseRaw = httpRequest.responseText;
              callback(responseRaw);
            }
          }
        } catch (e) {
          alert('Caught Exception: ' + e);
        }
      };
    // set up request data
    requestParams = "url=" + encodeURIComponent(options.url) + "&requestType=" + options.requestType;
    // only add client id and secret if both were submitted
    if (isDefined(clientId) && isDefined(clientSecret)) {
      requestParams += '&client_id=' + clientId + '&client_secret=' + clientSecret;
    }

    // set response handler
    httpRequest.onreadystatechange = getResponse;
    // open the request
    httpRequest.open('POST', proxyURL);
    // set headers
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // open and send request
    httpRequest.send(requestParams);
  }

  function init() {
    // event listeners
    csvData.addEventListener('click', function() {
      this.select();
    });
    // set up the log elements
  }

  // button event handlers
  makeReport.addEventListener('click', function() {
    // get the inputs
    clientId     = client_id.value;
    clientSecret = client_secret.value;
    totalVideos  = getSelectedValue(videoCount);
    // check for search terms
    if (isDefined(searchTags.value)) {
      tagsSearchString = '%2Btags:' + removeSpaces(searchTags.value);
    }
    if (isDefined(searchFieldValue.value)) {
      if (isDefined(searchField.value)) {
        fieldsSearchString = '%2B' + searchField.value + ':' + convertSpaces(searchFieldValue.value);
      } else {
        fieldsSearchString = '%2Bcustom_fields:"' + convertSpaces(searchFieldValue.value) + '"';
      }
    }
    dateTypeValue = getSelectedValue(dateRangeType).value;
    fromDateValue = rome(fromDate).getDate();
    if (isDefined(fromDateValue)) {
      fromDateValue = fromDateValue.toISOString();
    }
    toDateValue = rome(toDate).getDate();
    if (isDefined(toDateValue)) {
      toDateValue = toDateValue.toISOString();
    }
    if (isDefined(fromDateValue) || isDefined(toDateValue)) {
      dateSearchString = dateTypeValue + ':' + fromDateValue + '..' + toDateValue;
    }

    // define the whole search string
    if (isDefined(tagsSearchString)) {
      searchString = tagsSearchString;
      if (isDefined(fieldsSearchString)) {
        searchString += '%20+' + fieldsSearchString;
      }
      if (isDefined(dateSearchString)) {
        searchString += '%20+' + dateSearchString;
      }
    } else if (isDefined(fieldsSearchString)) {
      searchString = fieldsSearchString;
      if (isDefined(dateSearchString)) {
        searchString += '%20+' + dateSearchString;
      }
    } else if (isDefined(dateSearchString)) {
      searchString = dateSearchString;
    }
    // only use entered account id if client id and secret are entered also
    if (isDefined(clientId) && isDefined(clientSecret)) {
      if (isDefined(account_id.value)) {
        accountId = account_id.value;
      } else {
        window.alert('To use your own account, you must specify an account id, and client id, and a client secret - since at least one of these is missing, a sample account will be used');
        clientId     = '';
        clientSecret = '';
        accountId    = '57838016001';
      }
    } else {
      accountId = '57838016001';
    }
    // get video count
    createRequest('getAffiliates');

  });

  init();
})(window, document);
