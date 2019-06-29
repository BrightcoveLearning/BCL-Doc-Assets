jQuery(document).ready(function () {
  jQuery('.tabs .tab-links a').on('click', function (e) {
    var currentAttrValue = {h} ? h : jQuery(this).attr('href');
    console.log('h', currentAttrValue);
    
    // prevent default click action for links
    e.preventDefault();
    // Show/Hide Tabs
    jQuery('.tabs ' + currentAttrValue).slideDown(400).siblings().slideUp(400);
    // Change/remove current tab to active
    jQuery(this).parent('li').addClass('active').siblings().removeClass('active');
    // add hash to url
    if(history.replaceState) {
      var s = history.state,
        l = location.host + location.pathname,
        t = document.title;
      history.replaceState(s, t, l + currentAttrValue);
  } else {
      location.hash = currentAttrValue;
  }
  });

  // check to see if the URL has a hash and if so, open that tab
  var h = window.location.hash,
  tabLinks = document.querySelectorAll('.tabs .tab-links a');
  
  if (h.length > 0) {
    var iMax = tabLinks.length,
      i;
    for (i = 0; i < iMax; i++) {
      if (tabLinks[i].getAttribute('href') === h) {
        tabLinks[i].click();
      }
    }
  }
});
