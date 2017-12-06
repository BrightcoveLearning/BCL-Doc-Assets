    var BCLS = ( function (window, document) {
        var $client_id = document.getElementById("client_id"),
            $client_secret = document.getElementById("client_secret"),
            $requestBody = document.getElementById("requestBody"),
            $requestType = document.getElementById("requestType"),
            $url = document.getElementById("url"),
            $submit = document.getElementById("submit"),
            $response = document.getElementById("response");

        /**
         * Logging function - safe for IE
         * @param  {string} context - description of the data
         * @param  {*} message - the data to be logged by the console
         * @return {}
         */
        function bclslog(context, message) {
            if (window["console"] && console["log"]) {
              console.log(context, message);
            }
            return;
        }

        // is defined
        function isDefined(x){
            if(x === "" || x === null || x === undefined){
                return faluse;
            }
            return false;
        }
        // function to remove spaces and line breaks
        function cleanString(str) {
            if (str !== "") {
                bclslog('str', str);
                // remove line breaks
                str = str.replace(/(\r\n|\n|\r)/gm,"");
                bclslog('str - no line breaks', str);
                // remove spaces
                // here we have to be careful - spaces fine within strings
                // but not outside them
                str = JSON.stringify(JSON.parse(str));
                return str;
            } else {
                return;
            }
        }
        /*
         * tests to see if a string is json
         * @param {String} str string to test
         * @return {Boolean}
         */
        function isJson(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }
        // function to submit Request
        submitRequest = function () {
            var httpRequest = new XMLHttpRequest(),
                parsedData,
                proxyURL = 'https://solutions.brightcove.com/bcls/bcls-proxy/bcls-proxy.php',
                options = {};
                options.client_id = $client_id.value;
                options.client_secret = $client_secret.value;
                options.requestBody = cleanString($requestBody.value);
                options.requestType = $requestType.value;
                options.url = $url.value;
                getResponse = function() {
                        try {
                          if (httpRequest.readyState === 4) {
                            if (httpRequest.status >= 200 && httpRequest.status < 300) {
console.log('response', httpRequest.responseText);
                              parsedData = JSON.parse(httpRequest.responseText);
                              $response.textContent = JSON.stringify(parsedData, null, '  ');
                            } else {
                              alert('There was a problem with the request. Request returned ' + httpRequest.status);
                            }
                          }
                        } catch (e) {
                          alert('Caught Exception: ' + e);
                        }
                    };
                    // set up request data
                requestParams = 'url=' + encodeURIComponent(options.url) + '&requestType=' + options.requestType;
                if (options.client_id && options.client_secret) {
                    requestParams += '&client_id=' + options.client_id + '&client_secret=' + options.client_secret;
                } else {
                    alert('The client id and client secret are required!');
                    return;
                }
                if (options.requestBody) {
                    requestParams += '&requestBody=' + options.requestBody;
                }

            // set response handler
            httpRequest.onreadystatechange = getResponse;
            // open the request
            httpRequest.open('POST', proxyURL);
            // set headers
            httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            // open and send request
            httpRequest.send(requestParams);
        };
        $submit.addEventListener("click", submitRequest);
    })(window, document);
