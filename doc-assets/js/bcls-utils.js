var BCLS_select_code = (function(window, document) {
    var codeBlocks = document.getElementsByClassName('bcls-code'),
        i,
        iMax;

    function selectCode() {
        this.select();
    }

    iMax = codeBlocks.length;
    for (i = 0; i < iMax; i++) {
        codeBlocks[i].addEventListener('click', selectCode);
    }
})(window, document);

var BCLS_expander = (function(window, document) {
    var expanderHeads = document.getElementsByClassName('bcls-expander-head'),
        i,
        iMax;
    iMax = expanderHeads.length;

    function toggleBody() {
        var expanderBody = this.nextElementSibling;
        if (expanderBody.getAttribute('style') === 'height:0;visibility:hidden;display:none;' || expanderBody.getAttribute('style') === null) {
            expanderBody.setAttribute('style', 'height:auto;visibility:visible;display:block;');
            this.setAttribute('class', 'bcls-expander-head changed');
        } else {
            expanderBody.setAttribute('style', 'height:0;visibility:hidden;display:none;');
            this.setAttribute('class', 'bcls-expander-head');
        }
    }

    for (i = 0; i < iMax; i++) {
        expanderHeads[i].addEventListener('click', toggleBody);
    }
})(window, document);

var BCLS_player_fix = ( function (window, document) {
    var vc,
        bp,
        sideNav = document.getElementsByClassName('side-nav')[0],
        vcContent = document.getElementsByClassName('video-cloud-only'),
        bpContent = document.getElementsByClassName('player-only'),
        toggleStr = '<li><button id="vc" class="bcls-button__version" style="background-color:#dd712e;">Video Cloud Version</button> <button id="bp" class="bcls-button__version">Brightcove Player Version</button> <a style="font-size:smaller;" href="//docs.brightcove.com/en/player/brightcove-player/versions.html">(What\'s the difference?)</a><hr></li>',
        iMax, i;

    function hideElements(elements) {
        var iMax = elements.length, i;
        for (i = 0; i < iMax; i++) {
            elements[i].setAttribute('style', 'display:none');
        }
    }
    function showElements(elements) {
        var iMax = elements.length, i;
        for (i = 0; i < iMax; i++) {
            elements[i].setAttribute('style', 'display:block');
        }
    }
    function addStyle(e) {
        var bgColor;
        if (e === vc) {
            bgColor = '#dd712e';
        } else {
            bgColor = '#293b70';
        }
        e.setAttribute('style', 'background-color:' + bgColor +';');
    }

    function removeStyle(e) {
        e.removeAttribute('style');
    }

    if (vcContent.length !== 0 || bpContent.length !== 0) {
        sideNav.insertAdjacentHTML('afterBegin', toggleStr);
        vc = document.getElementById('vc');
        bp = document.getElementById('bp');
        showElements(vcContent);
        hideElements(bpContent);
        vc.addEventListener('click', function() {
            showElements(vcContent);
            hideElements(bpContent);
            addStyle(vc);
            removeStyle(bp);
        });

        bp.addEventListener('click', function() {
            var j, jMax;
            showElements(bpContent);
            hideElements(vcContent);
            addStyle(bp);
            removeStyle(vc);
        });

    }
})(window, document);


var BCLS_faq = (function (window, document) {
    'use strict';
    var // elements
        questions = document.getElementsByClassName('bcls-question'),
        answers = document.getElementsByClassName('bcls-answer');
    function showAnswer(evt) {
        var answerNumber = parseInt(this.id.substring(1)),
            i = 0,
            iMax = answers.length;
        // hide all answers except the one for the selected question
        for (i = 0; i < iMax; i++) {
            if (i === answerNumber) {
                answers[i].style.display = 'block';
            } else {
                answers[i].style.display = 'none';
            }
        }
    }
    function init() {
        var i = 0, iMax = 0;
        if (questions) {
            iMax = questions.length;
        }

        // add IDs
        for (i = 0; i < iMax; i++) {
            // set ids for answers
            answers[i].setAttribute('id', ('a' + i.toString()));
            // hide all answers initially
            answers[i].setAttribute('style', 'display:none');
            // set ids for questions
            questions[i].setAttribute('id', ('q' + i.toString()));
            // add styling to questions
            questions[i].setAttribute('style', 'margin-top:1em;margin-bottom:1em;');
            // add event listeners
            questions[i].addEventListener('click', showAnswer);
        }
    }
    // call init to kick things off
    init();
})(window, document);
