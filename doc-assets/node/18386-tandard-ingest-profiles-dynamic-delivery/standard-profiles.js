var codeBlocks;
var BCLS = ( function (window, document, bclsProfiles_cached) {
    var  mainSection = document.querySelector('.bcls-article'),
        proxyURL = "https://solutions.brightcove.com/bcls/bcls-proxy/bcls-proxy.php",
        requestData = "client_id=cca7ae2a-503d-472e-996c-3aa664d4aa95&client_secret=OE43iNQ6HluFxM2I_f6QDfGLoSSW28jnDWbX8gDgS6GIFD2P6VNWKbRHyln0I5aVyoSeil0l5ikWYQ2hUbR99g&url=" + encodeURI('https://ingestion.api.brightcove.com/v1/accounts/3921507403001/profiles') + "&requestBody=null&requestType=GET",
        data = bclsProfiles_cached,
        navLabel = [];
    /**
     * determines whether specified item is in an array
     *
     * @param {array} array to check
     * @param {string} item to check for
     * @return {boolean} true if item is in the array, else false
     */
    function isItemInArray(arr, item) {
        var i,
            iMax = arr.length;
        for (i = 0; i < iMax; i++) {
            if (arr[i] === item) {
                return true;
            }
        }
        return false;
    }

    /*
     * determines whether this profile is static
     * @param {Object} item the profile item
     * @return {Boolean} whether the item is static
     */
    function isStatic(item) {
        if (item.name.indexOf('static') >= 0) {
            return true;
        }
        return false;
    }

    /*
     *
     */
    function isAudio(item) {
        if (item.indexOf('audio') >= 0) {
            return true;
        }
        return false;
    }
    /**
     * remove spaces from passed string
     * @param  {string} str - the string to remove spaces from
     * @return {str}   - string with spaces removed
     */
    function removeSpaces(str) {
        if (isDefined(str)) {
            return str.replace(/\s/g, "");
        }
        return "";
    }
    /**
     * tests for all the ways a variable might be undefined or not have a value
     * @param {*} x the variable to test
     * @return {Boolean} true if variable is defined and has a value
     */
    function isDefined(x){
        if( x === '' || x === null || x === undefined){
            return false;
        } else{
            return true;
        }
    }

    /**
     * dedupe a simple array of strings or numbers
     * @param {array} arr the array to be deduped
     * @return {array} out the deduped array
     */
    function dedupe(arr) {
        var i,
            len = arr.length,
            out = [],
            obj = {};

        for (i = 0;i < len; i++) {
            obj[arr[i]] = 0;
        }
        for (i in obj) {
            out.push(i);
        }
        return out;
    }
    /**
     * Logging function - safe for IE
     * @param  {string} context description of the data
     * @param  {*} message the data to be logged by the console
     * @return {}
     */
    function bclslog(context, message) {
        if (window.console && console.log) {
            console.log(context, message);
        }
        return;
    }
    /**
     * create an element
     * @param  {string} type - the element type
     * @param  {object} attributes - attributes to add to the element
     * @return {object} the HTML element
     */
    function createEl(type, attributes) {
        var el;
        if (isDefined(type)) {
            el = document.createElement(type);
            if (isDefined(attributes)) {
                var attr;
                for (attr in attributes) {
                    el.setAttribute(attr, attributes[attr]);
                }
            }
            return el;
        }
    }

    // create navigation for page sections
    function createInPageNavMenu() {
        var sideNavList = document.querySelector('.bc-ipnav-block ul'),
            lastLI = sideNavList.lastChild,
            i,
            max = navLabel.length,
            aEl,
            liEl,
            txt;
        for (i = 0; i < max; i++) {
            liEl = document.createElement('li');
            aEl = document.createElement('a');
            aEl.setAttribute('href', '#' + navLabel[i].link);
            txt = document.createTextNode(navLabel[i].text);
            aEl.appendChild(txt);
            liEl.appendChild(aEl);
            sideNavList.insertBefore(liEl, lastLI);
        }
    }
    function createInPageNav() {
        var navObj = {},
            h2s = document.querySelectorAll('section.bcls-section h2'),
            i, index,
            iMax = h2s.length;
        // set initial visibilities
        for (i = 0; i < iMax; i++) {
            index = i;
            // bclslog("index", index);
            if (index > 0) {
                $this = h2s[i];
                navObj = {};
                navObj.link = $this.getAttribute("id");
                navObj.text = $this.innerHTML;
                navLabel.push(navObj);
            }
        }
        // bclslog('navLabel', navLabel);
        // only create the nav widget if there is more than one item
        if (navLabel.length > 1) {
            // create in-page nav menu
            createInPageNavMenu();
        }
    }

    function buildSummaryTable() {
        var newSectionNode = document.createElement("section"),
            sectionHeadingNode = document.createElement("h2"),
            sectionSubHeadingNode,
            sectionIntroNode = document.createElement("p"),
            profileTableNode = document.createElement("table"),
            profileTableNodeCAE = document.createElement("table"),
            profiletheadNode = document.createElement("thead"),
            profiletheadNodeCAE = document.createElement("thead"),
            profiletbodyNode = document.createElement("tbody"),
            profiletbodyNodeCAE = document.createElement("tbody"),
            sectionHeadingElem,
            sectionIntroElem,
            profileTableElem,
            profiletheadElem,
            profiletbodyElem,
            fragment1 = document.createDocumentFragment(),
            fragment2 = document.createDocumentFragment(),
            i,
            iMax,
            j,
            jMax,
            k,
            kMax,
            item,
            str = "",
            tr,
            th,
            td,
            a,
            content;
        // static profiles
        iMax = data.BCLSprofilesStatic.length;
        // massage data
        for (i = 0; i < iMax; i++) {
            item = data.BCLSprofilesStatic[i];
            item.videoRenditions = 0;
            item.audioRenditions = 0;
            item.imageRenditions = item.dynamic_origin.images.length;

            jMax = item.dynamic_origin.renditions.length;
            item.numRenditions = jMax;

            for (j = 0; j < jMax; j++) {
                // count up renditions of each kind
// console.log('item.dynamic_origin.renditions[j]', item.dynamic_origin.renditions[j]);
                if (!isAudio(item.dynamic_origin.renditions[j])) {
                    item.videoRenditions++;
                } else {
                    item.audioRenditions++;
                }
            }
        }
        sectionSubHeadingNode = document.createElement('h3');
        content = document.createTextNode('Dynamic Delivery Profiles');
        sectionSubHeadingNode.appendChild(content);
        newSectionNode.setAttribute("id", "Summary_Table");
        newSectionNode.setAttribute("class", "bcls-section");
        sectionHeadingNode.setAttribute("id", "summaryTableHeading");
        sectionIntroNode.setAttribute("id", "summarySectionIntro");
        profileTableNode.setAttribute("id", "profileSummaryTable");
        profileTableNode.setAttribute("class", "bcls-table");
        profiletheadNode.setAttribute("id", "profileSummaryTableThead");
        profiletheadNode.setAttribute("class", "bcls-table__head");
        profiletbodyNode.setAttribute("id", "profileSummaryTableTbody");
        profiletbodyNode.setAttribute("class", "bcls-table__body");
        newSectionNode.appendChild(sectionHeadingNode);
        newSectionNode.appendChild(sectionIntroNode);
        newSectionNode.appendChild(sectionSubHeadingNode);
        newSectionNode.appendChild(profileTableNode);
        profileTableNode.appendChild(profiletheadNode);
        profileTableNode.appendChild(profiletbodyNode);

        iMax = data.BCLSprofilesStatic.length;
        for (i = 0; i < iMax; i++) {
            item = data.BCLSprofilesStatic[i];
            tr = document.createElement('tr');
            profiletbodyNode.appendChild(tr);
            td = document.createElement('td');
            a = document.createElement('a');
            a.setAttribute('href', '#' + removeSpaces(item.name));
            content = document.createTextNode(item.name);
            a.appendChild(content);
            td.appendChild(a);
            tr.appendChild(td);
            td = document.createElement('td');
            td.setAttribute('class', 'bcl-center');
            content = document.createTextNode(item.videoRenditions);
            td.appendChild(content);
            tr.appendChild(td);
            td = document.createElement('td');
            td.setAttribute('class', 'bcl-center');
            content = document.createTextNode(item.audioRenditions);
            td.appendChild(content);
            tr.appendChild(td);
            td = document.createElement('td');
            td.setAttribute('class', 'bcl-center');
            content = document.createTextNode(item.imageRenditions);
            td.appendChild(content);
            tr.appendChild(td);
            td = document.createElement('td');
            content = document.createTextNode(item.description);
            td.appendChild(content);
            tr.appendChild(td);
        }
        content = document.createTextNode('Standard Profiles List');
        sectionHeadingNode.appendChild(content);
        content = document.createTextNode('Click on a profile name to see details of the renditions it includes. Note that the actual renditions created will depend on the quality of the source video.');
        sectionIntroNode.appendChild(content);
        tr = document.createElement('tr');
        profiletheadNode.appendChild(tr);
        th = document.createElement('th');
        content = document.createTextNode('Profile Name');
        th.appendChild(content);
        tr.appendChild(th);
        th = document.createElement('th');
        content = document.createTextNode('Video');
        th.appendChild(content);
        tr.appendChild(th);
        th = document.createElement('th');
        content = document.createTextNode('Audio');
        th.appendChild(content);
        tr.appendChild(th);
        th = document.createElement('th');
        content = document.createTextNode('Image');
        th.appendChild(content);
        tr.appendChild(th);
        th = document.createElement('th');
        content = document.createTextNode('Description');
        th.appendChild(content);
        tr.appendChild(th);

        fragment1.appendChild(newSectionNode);
        mainSection.appendChild(fragment1);


//         // now the CAE profiles
//         iMax = data.BCLSprofilesDynamic.length;
//
//         for (i = 0; i < iMax; i++) {
//             item = data.BCLSprofilesDynamic[i];
//             item.videoRenditions = item.dynamic_origin.dynamic_profile_options.min_renditions + ' - ' + item.dynamic_origin.dynamic_profile_options.max_renditions;
//             item.audioRenditions = item.dynamic_origin.renditions.length;
//             item.imageRenditions = item.dynamic_origin.images.length;
//
//         }
//         sectionSubHeadingNode = document.createElement('h3');
//         content = document.createTextNode('Context Aware Encoding Profiles');
//         sectionSubHeadingNode.appendChild(content);
//         profileTableNodeCAE.setAttribute("id", "profileSummaryTableCAE");
//         profileTableNodeCAE.setAttribute("class", "bcls-table");
//         profiletheadNodeCAE.setAttribute("id", "profileSummaryTableTheadCAE");
//         profiletheadNodeCAE.setAttribute("class", "bcls-table__head");
//         profiletbodyNodeCAE.setAttribute("id", "profileSummaryTableTbodyCAE");
//         profiletbodyNodeCAE.setAttribute("class", "bcls-table__body");
//         newSectionNode.appendChild(sectionSubHeadingNode);
//         newSectionNode.appendChild(profileTableNodeCAE);
//         profileTableNodeCAE.appendChild(profiletheadNodeCAE);
//         profileTableNodeCAE.appendChild(profiletbodyNodeCAE);
//         iMax = data.BCLSprofilesDynamic.length;
//         for (i = 0; i < iMax; i++) {
//             item = data.BCLSprofilesDynamic[i];
// console.log('item', item);
//             tr = document.createElement('tr');
//             profiletbodyNodeCAE.appendChild(tr);
//             td = document.createElement('td');
//             a = document.createElement('a');
//             a.setAttribute('href', '#' + removeSpaces(item.name));
//             content = document.createTextNode(item.name);
//             a.appendChild(content);
//             td.appendChild(a);
//             tr.appendChild(td);
//             td = document.createElement('td');
//             td.setAttribute('class', 'bcl-center');
//             content = document.createTextNode(item.videoRenditions);
//             td.appendChild(content);
//             tr.appendChild(td);
//             td = document.createElement('td');
//             td.setAttribute('class', 'bcl-center');
//             content = document.createTextNode(item.audioRenditions);
//             td.appendChild(content);
//             tr.appendChild(td);
//             td = document.createElement('td');
//             td.setAttribute('class', 'bcl-center');
//             content = document.createTextNode(item.imageRenditions);
//             td.appendChild(content);
//             tr.appendChild(td);
//             td = document.createElement('td');
//             content = document.createTextNode(item.description);
//             td.appendChild(content);
//             tr.appendChild(td);
//         }
//         fragment2.appendChild(newSectionNode);
//         mainSection.appendChild(fragment2);
//
//         tr = document.createElement('tr');
//         profiletheadNodeCAE.appendChild(tr);
//         th = document.createElement('th');
//         content = document.createTextNode('Profile Name');
//         th.appendChild(content);
//         tr.appendChild(th);
//         th = document.createElement('th');
//         content = document.createTextNode('Video');
//         th.appendChild(content);
//         tr.appendChild(th);
//         th = document.createElement('th');
//         content = document.createTextNode('Audio');
//         th.appendChild(content);
//         tr.appendChild(th);
//         th = document.createElement('th');
//         content = document.createTextNode('Image');
//         th.appendChild(content);
//         tr.appendChild(th);
//         th = document.createElement('th');
//         content = document.createTextNode('Description');
//         th.appendChild(content);
//         tr.appendChild(th);

    }
    function buildDetailTables() {
        // bclslog("building data tables");
        var section,
            fragment = document.createDocumentFragment(),
            sectionHeading,
            sectionSubHeading,
            sectionJsonHeading,
            sectionJsonP,
            sectionTableHeading,
            renditionList,
            renditionListNote,
            renditionListNoteA,
            renditionTable,
            renditionthead,
            renditiontbody,
            tr,
            th,
            td,
            ul,
            li,
            link,
            profilePre,
            profileCode,
            i, j, jMax, iMax,
            headings,
            profile,
            rendition,
            renditionProperty,
            text,
            str,
            re = /_/g;
            // static profiles
            iMax = data.BCLSprofilesStatic.length;
        for (i = 0; i < iMax; i++) {
            var headersArray = [],
                l,
                lMax;
            profile = data.BCLSprofilesStatic[i];
            // remove id's and other stuff from data
            delete profile.id;
            delete profile.version;
            delete profile.brightcove_standard;
            delete profile.date_created;
            delete profile.date_last_modified;
            delete profile.videoRenditions;
            delete profile.audioRenditions;
            delete profile.imageRenditions;
            delete profile.numRenditions;
            // profile.name = profile.name + ' Copy';
            profile.account_id = null;
            section = createEl("section", {class: "bcls-section"});
            sectionHeading = createEl("h2", {id: removeSpaces(profile.name)});
            sectionSubHeading = createEl("p");
            renditionList = createEl('p');
            text = document.createTextNode('Renditions included: ' + profile.dynamic_origin.renditions.join(', '));
            renditionList.appendChild(text);
            renditionListNote = createEl('p');
            renditionListNoteA = createEl('a', {href: 'https://support.brightcove.com/overview-dynamic-ingest-api-dynamic-delivery#ingestProfile'});
            text = document.createTextNode('Rendition Details for Dynamic Delivery');
            renditionListNoteA.appendChild(text);
            text = document.createTextNode('For details on the renditions created see ');
            renditionListNote.appendChild(text);
            renditionListNote.appendChild(renditionListNoteA);
            sectionJsonHeading = createEl("h4", {id: removeSpaces(profile.name) + "json"});
            text = document.createTextNode("JSON data for the profile");
            sectionJsonHeading.appendChild(text);
            sectionJsonP = createEl('p', {class: 'BCL-aside'});
            text = document.createTextNode('Note: if you copy and paste the JSON to make a new profile, you will need to replace the null value for "account_id" with your own account id, and replace the name with a new name!');
            sectionJsonP.appendChild(text);
            sectionTableHeading = createEl("h4");
            profileCode = createEl("textarea", {class: 'bcls-code', style: 'height:20em;'});
            section.appendChild(sectionHeading);
            section.appendChild(sectionSubHeading);
            section.appendChild(renditionList);
            section.appendChild(renditionListNote);
            section.appendChild(sectionTableHeading);
            renditionTable = createEl("table", {class: "bcls-table"});
            renditionthead = createEl("thead", {class: 'bcls-table__head'});
            renditiontbody = createEl("tbody", {class: 'bcls-table__body'});
            section.appendChild(renditionTable);
            renditionTable.appendChild(renditionthead);

            renditionTable.appendChild(renditiontbody);

            section.appendChild(sectionJsonHeading);
            section.appendChild(sectionJsonP);
            section.appendChild(profileCode);
            text = document.createTextNode(JSON.stringify(profile, false, "  "));
            profileCode.appendChild(text);
            fragment.appendChild(section);
            text = document.createTextNode(profile.name);
            sectionHeading.appendChild(text);
            link = createEl("a", {href: "#" + profile.name + "json"});
            text = document.createTextNode("View rendition information in JSON form");
            link.appendChild(text);
            sectionSubHeading.appendChild(link);
            text = document.createTextNode("Table of image rendition properties");
            sectionTableHeading.appendChild(text);
            // now do the reditions
            headersArray.push('renditions');
            jMax = profile.dynamic_origin.images.length;
            // get all properties and build the table headers
            for (j = 0; j < jMax; j++) {
                var prop;
                rendition = profile.dynamic_origin.images[j];
                for (prop in rendition) {
                    headersArray.push(prop);
                }
            }
            // dedupe the headers
            headersArray = dedupe(headersArray);
            // bclslog("deduped headers array", headersArray);
            // write the th elements to the string
            // create the table headers
            lMax = headersArray.length;
            tr = createEl("tr");
            for (l = 0; l < lMax; l++) {
                th = createEl("th");
                text = document.createTextNode(headersArray[l].replace(re, " "));
                th.appendChild(text);
                tr.appendChild(th);
            }
            renditionthead.appendChild(tr);
            // now add the body row for each rendition
            jMax = profile.dynamic_origin.images.length;
            for (j = 0; j < jMax; j++) {
                tr = createEl("tr");
                rendition = profile.dynamic_origin.images[j];
                for (l = 0; l < lMax; l++) {
                    td = createEl("td");
                    if (headersArray[l] === 'skip') {
                        var key,
                            skip = rendition[headersArray[l]];
                        ul = document.createElement('ul');
                        for (key in skip) {
                            if (skip.hasOwnProperty(key)) {
                                li = document.createElement('li');
                                text = document.createTextNode(key + ': ' + skip[key]);
                                li.appendChild(text);
                                ul.appendChild(li);
                            }
                        }
                        td.appendChild(ul);
                    } else {
                        str = isDefined(rendition[headersArray[l]]) ? rendition[headersArray[l]] : "";
                        text = document.createTextNode(str);
                        td.appendChild(text);
                    }
                    tr.appendChild(td);
                }
                renditiontbody.appendChild(tr);
            }
        }
        mainSection.appendChild(fragment);
        // bclslog("content built");
            // dynamic profiles
            iMax = data.BCLSprofilesStatic.length;
        for (i = 0; i < iMax; i++) {
            var headersArray = [],
                l,
                lMax;
            profile = data.BCLSprofilesStatic[i];
            // remove id's and other stuff from data
            delete profile.id;
            delete profile.version;
            delete profile.brightcove_standard;
            delete profile.date_created;
            delete profile.date_last_modified;
            delete profile.videoRenditions;
            delete profile.audioRenditions;
            delete profile.imageRenditions;
            delete profile.numRenditions;
            // profile.name = profile.name + ' Copy';
            profile.account_id = null;
            section = createEl("section", {class: "bcls-section"});
            sectionHeading = createEl("h2", {id: removeSpaces(profile.name)});
            sectionSubHeading = createEl("p");
            renditionList = createEl('p');
            text = document.createTextNode('Audio renditions included: ' + profile.dynamic_origin.renditions.join(', '));
            renditionList.appendChild(text);
            renditionListNote = createEl('p');
            renditionListNoteA = createEl('a', {href: 'https://support.brightcove.com/overview-dynamic-ingest-api-dynamic-delivery#ingestProfile'});
            text = document.createTextNode('Audio Rendition Details for Context Aware Encoding');
            renditionListNoteA.appendChild(text);
            text = document.createTextNode('For details on the audio renditions created see ');
            renditionListNote.appendChild(text);
            renditionListNote.appendChild(renditionListNoteA);
            sectionJsonHeading = createEl("h4", {id: removeSpaces(profile.name) + "json"});
            text = document.createTextNode("JSON data for the profile");
            sectionJsonHeading.appendChild(text);
            sectionJsonP = createEl('p', {class: 'BCL-aside'});
            text = document.createTextNode('Note: if you copy and paste the JSON to make a new profile, you will need to replace the null value for "account_id" with your own account id, and replace the name with a new name!');
            sectionJsonP.appendChild(text);
            sectionTableHeading = createEl("h4");
            profileCode = createEl("textarea", {class: 'bcls-code', style: 'height:20em;'});
            section.appendChild(sectionHeading);
            section.appendChild(sectionSubHeading);
            section.appendChild(renditionList);
            section.appendChild(renditionListNote);
            section.appendChild(sectionTableHeading);
            renditionTable = createEl("table", {class: "bcls-table"});
            renditionthead = createEl("thead", {class: 'bcls-table__head'});
            renditiontbody = createEl("tbody", {class: 'bcls-table__body'});
            section.appendChild(renditionTable);
            renditionTable.appendChild(renditionthead);

            renditionTable.appendChild(renditiontbody);

            section.appendChild(sectionJsonHeading);
            section.appendChild(sectionJsonP);
            section.appendChild(profileCode);
            text = document.createTextNode(JSON.stringify(profile, false, "  "));
            profileCode.appendChild(text);
            fragment.appendChild(section);
            text = document.createTextNode(profile.name);
            sectionHeading.appendChild(text);
            link = createEl("a", {href: "#" + profile.name + "json"});
            text = document.createTextNode("View rendition information in JSON form");
            link.appendChild(text);
            sectionSubHeading.appendChild(link);
            text = document.createTextNode("Table of image rendition properties");
            sectionTableHeading.appendChild(text);
            // now do the reditions
            headersArray.push('renditions');
            jMax = profile.dynamic_origin.images.length;
            // get all properties and build the table headers
            for (j = 0; j < jMax; j++) {
                var prop;
                rendition = profile.dynamic_origin.images[j];
                for (prop in rendition) {
                    headersArray.push(prop);
                }
            }
            // dedupe the headers
            headersArray = dedupe(headersArray);
            // bclslog("deduped headers array", headersArray);
            // write the th elements to the string
            // create the table headers
            lMax = headersArray.length;
            tr = createEl("tr");
            for (l = 0; l < lMax; l++) {
                th = createEl("th");
                text = document.createTextNode(headersArray[l].replace(re, " "));
                th.appendChild(text);
                tr.appendChild(th);
            }
            renditionthead.appendChild(tr);
            // now add the body row for each rendition
            jMax = profile.dynamic_origin.images.length;
            for (j = 0; j < jMax; j++) {
                tr = createEl("tr");
                rendition = profile.dynamic_origin.images[j];
                for (l = 0; l < lMax; l++) {
                    td = createEl("td");
                    if (headersArray[l] === 'skip') {
                        var key,
                            skip = rendition[headersArray[l]];
                        ul = document.createElement('ul');
                        for (key in skip) {
                            if (skip.hasOwnProperty(key)) {
                                li = document.createElement('li');
                                text = document.createTextNode(key + ': ' + skip[key]);
                                li.appendChild(text);
                                ul.appendChild(li);
                            }
                        }
                        td.appendChild(ul);
                    } else {
                        str = isDefined(rendition[headersArray[l]]) ? rendition[headersArray[l]] : "";
                        text = document.createTextNode(str);
                        td.appendChild(text);
                    }
                    tr.appendChild(td);
                }
                renditiontbody.appendChild(tr);
            }
        }
        mainSection.appendChild(fragment);
        // bclslog("content built");
        // get reference to codeBlocks
        setCodeBlocks();
        createInPageNav();
    }

    function setCodeBlocks () {
        var i,
            iMax;
        codeBlocks = document.getElementsByClassName('bcls-code');
        function selectCode() {
            this.select();
        }

        iMax = codeBlocks.length;
        for (i = 0; i < iMax; i++) {
            codeBlocks[i].addEventListener('click', selectCode);
        }
    }
    function getProfileData() {
        var httpRequest = new XMLHttpRequest(),
            proxyURL = "https://solutions.brightcove.com/bcls/bcls-proxy/bcls-proxy.php",
            i,
            iMax,
            tmpArr,
            item,
            getResponse = function () {
                // bclslog("getting data");
                try {
                    if (httpRequest.readyState === 4) {
                      if (httpRequest.status >= 200 && httpRequest.status < 300) {
                        // try {
                        //   bclslog('response', httpRequest.responseText);
                          tmpArr = JSON.parse(httpRequest.responseText);
                          iMax = tmpArr.length;
                          data.BCLSprofilesStatic = [];
                          data.BCLSprofilesDynamic = [];
                          for (i = 0; i < iMax; i += 1) {
                              item = tmpArr[i];
                              if (isDefined(item.dynamic_origin)) {
                                  if (isStatic(item)) {
                                      data.BCLSprofilesStatic.push(item);
                                  } else {
                                      data.BCLSprofilesDynamic.push(item);
                                  }
                              }
                          }
                          buildSummaryTable();
                          buildDetailTables();


                        // } catch (e) {
                        //   bclslog('invalid json', e);
                        //   // just use cached data and build the tables
                        //     data = bclsProfiles_cached;
                        //     buildSummaryTable();
                        //     buildDetailTables();
                        // }
                      } else {
                        bclslog("There was a problem with the request. Request returned: ", httpRequest.status);
                        // just use cached data and build the tables
                        data = bclsProfiles_cached;
                        buildSummaryTable();
                        buildDetailTables();

                      }
                    }
                  }
                  catch(e) {
                    bclslog('Caught Exception: ', e);
                  }
            };
        // set response handler
        httpRequest.onreadystatechange = getResponse;
        // open the request
        httpRequest.open("POST", proxyURL);
        // set headers
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // open and send request
        httpRequest.send(requestData);
    }
    getProfileData();
    // BCLSmain.createInPageNav();
    })(window, document, bclsProfiles_cached);
