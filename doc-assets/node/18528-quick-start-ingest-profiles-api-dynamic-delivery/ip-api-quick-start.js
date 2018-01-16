var BCLS = (function(window, document) {
  var account_id_input = document.getElementById('account_id_input'),
    client_id_input = document.getElementById('client_id_input'),
    client_secret_input = document.getElementById('client_secret_input'),
    get_profiles = document.getElementById('get_profiles'),
    create_profile = document.getElementById('create_profile'),
    set_default_profile = document.getElementById('set_default_profile'),
    rendition_selector = document.getElementById('rendition_selector'),
    rendition_select = document.getElementById('rendition_select'),
    profile_selector = document.getElementById('profile_selector'),
    profile_select = document.getElementById('profile_select'),
    logger = document.getElementById('logger'),
    api_request_display = document.getElementById('api_request_display'),
    api_request_body_display = document.getElementById('api_request_body_display'),
    api_response = document.getElementById('api_response'),
    renditions = ['default/audio64', 'default/audio96', 'default/audio128', 'default/audio192', 'default/video450', 'default/video700', 'default/video900', 'default/video1200', 'default/video1700', 'default/video2000', 'default/video3500', 'default/video3800'],
    profiles = [];

  // event listeners
  //
  //

  /**
   * adds options to a select element from an array of valuesArray
   * @param {HTMLelement} selectElement the select element reference
   * @param {Array} valuesArray the array of option values
   */
  function addOptions(selectElement, valuesArray) {
    var i,
      iMax,
      option,
      fragment = document.createDocumentFragment;
    if (selectElement && valuesArray) {
      iMax = valuesArray.length;
      for (i = 0; i < iMax; i++) {
        option = document.createElement('option');
        option.setAttribute('value', valuesArray[i]);
        option.textContent = valuesArray[i];
        fragment.appendChild(option);
      }
      selectElement.appendChild(option);
    } else {
      console.log('function addOptions: no parameters provided');
    }
  }


  /**
   * createRequest sets up requests, send them to makeRequest(), and handles responses
   * @param  {string} type the request type
   */
  function createRequest(type) {
    var options = {},
      requestBody = {},
      proxyURL = 'https:/solutions.brightcove.com/bcls/bcls-proxy/bcls-proxy.php'
      ipBaseURL = 'https://ingestion.api.brightcove.com/v1/accounts/' + account.value,
      diBaseURL = 'https://ingest.api.brightcove.com/v1/accounts/' + account.value,
      endpoint,
      responseDecoded,
      i,
      iMax,
      el,
      txt;

    // set credentials
    options.client_id = cid.value;
    options.client_secret = secret.value;
    options.proxyURL = proxyURL;

    switch (type) {
      case 'getProfiles':
        endpoint = '/profiles';
        options.url = ipBaseURL + endpoint;
        options.requestType = 'GET';
        makeRequest(options, function(response) {
          responseDecoded = JSON.parse(response);
          if (Array.isArray(responseDecoded)) {
            // remove existing options
            iMax = profiles.length;
            for (i = 0; i < iMax; i++) {
              profiles.remove(i);
            }
            // add new options
            iMax = responseDecoded.length;
            for (i = 0; i < iMax; i++) {
              el = document.createElement('option');
              el.setAttribute('value', responseDecoded[i].name);
              txt = document.createTextNode(responseDecoded[i].name);
              el.appendChild(txt);
              profiles.appendChild(el);
            }
          }
        });
        break;
      case :'ingestVideo'
      endpoint = '/profiles';
      options.url = ipBaseURL + endpoint;
      options.requestType = 'POST';;
      requestBocy.master = {};
      requestBody.master.url = 'http://myvideos.com/foo.mp4';
      // add more properties
      options.requestBody = JSON.stringify(requestBody);
      makeRequest(options, function(response) {
        responseDecoded = JSON.parse(response);
        // do more stuff
      });
      break;

      // additional cases
      default:
        console.log('Should not be getting to the default case - bad request type sent');
        break;
    }
  }


})(window, document);
