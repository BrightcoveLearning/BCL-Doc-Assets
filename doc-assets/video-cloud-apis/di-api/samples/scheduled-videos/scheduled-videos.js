var BCLS = ( function (window, document) {
    var fromDatePicker         = document.getElementById('fromDatePicker'),
        toDatePicker           = document.getElementById('toDatePicker'),
        account_id             = document.getElementById('account_id'),
        client_id              = document.getElementById('client_id'),
        client_secret          = document.getElementById('client_secret'),
        ingest_profile_display = document.getElementById('ingest_profile_display'),
        custom_profile_display = document.getElementById('custom_profile_display'),
        di_url                 = document.getElementById('di_url'),
        cms_url                = document.getElementById('cms_url'),
        di_submit              = document.getElementById('di_submit'),
        fromPicker,
        toPicker,
        now                    = new Date(),
        // get the date part of the date-time string
        nowISO                 = now.toISOString().substr(0, 10);

    // add date pickers to the date input fields
    fromPicker = new Pikaday({
      field: fromDatePicker,
      format: 'YYYY-MM-DD'
    });
    toPicker = new Pikaday({
      field: toDatePicker,
      format: 'YYYY-MM-DD'
    });
    // set initial from value
    fromDatePicker.value = nowISO;

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
            proxyURL    = options.proxyURL,
            // response handler
            getResponse = function() {
                try {
                    if (httpRequest.readyState === 4) {
                        if (httpRequest.status === 200 || httpRequest.status === 204) {
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
         * the proxy used here takes the following params:
         * url - the full API request (required)
         * requestType - the HTTP request type (default: GET)
         * clientId - the client id (defaults here to a Brightcove sample account value - this should always be stored on the server side if possible)
         * clientSecret - the client secret (defaults here to a Brightcove sample account value - this should always be stored on the server side if possible)
         * requestData - request body for write requests (optional JSON string)
         */
        requestParams = "url=" + encodeURIComponent(options.url) + "&requestType=" + options.requestType;
        // only add client id and secret if both were submitted
        if (options.client_id && options.client_secret) {
            requestParams += '&client_id=' + options.client_id + '&client_secret=' + options.client_secret;
        }
        // add request data if any
        if (options.requestData) {
            requestParams += '&requestBody=' + options.requestBody;
        }
        console.log('requestParams', requestParams);
        // set response handler
        httpRequest.onreadystatechange = getResponse;
        // open the request
        httpRequest.open('POST', proxyURL);
        // set headers
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // open and send request
        httpRequest.send(requestParams);
    }


})(window, document);
