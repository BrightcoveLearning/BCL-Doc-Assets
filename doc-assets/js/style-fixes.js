var BCLS_style_fixes = ( function (window, document) {
  var header_block = document.querySelector('.full-width-headline'),
    header_text = document.getElementById('block-brightcoveheadlineblock'),
    side_nav_block = document.getElementById('block-inpagenavigationblock'),
    related_content_block = document.getElementById('block-views-block-related-content-block-1'),
    search_block = document.querySelector('.paragraph--type--search-block'),
    chevrons = document.querySelectorAll('.icon__chevron--down'),
    menu_items = document.querySelectorAll('.dropdown-menu>li.expanded'),
    menu_headers = document.querySelectorAll('#block-mainnavigation>ul>li>a'),
    training_headers = document.querySelectorAll('#block-mainnavigation>ul>li>a.dropdown-toggle'),
    code = document.querySelectorAll('code'),
    bod = document.querySelector('body'),
    nav_menu_items = document.querySelectorAll('.region-navigation-collapsible .nav li a'),
    linkedCode = document.querySelectorAll('a>code');


  if (header_block) {
    header_block.setAttribute('style', 'color:white;background-color:RGB(45, 59, 108);padding-top:10px;padding-botton:5px;margin-bottom:30px;');
    header_text.setAttribute('style', 'color:white;line-height:1;');
  }
  if (side_nav_block) {
    side_nav_block.setAttribute('style', 'background-color:transparent;');
  }
  if (related_content_block) {
    related_content_block.setAttribute('style', 'background-color:transparent;');
  }
  if (search_block) {
    search_block.setAttribute('style', 'padding-top:10px; padding-bottom:15px;');
  }
  if (chevrons) {
    var i = 0,
      iMax = chevrons.length;
      for (i; i < iMax; i++) {
        chevrons[i].setAttribute('style', 'width:1rem;');
      }
  }
  if (menu_headers) {
    var i = 0,
      iMax = menu_headers.length;
      for (i; i < iMax; i++) {
        menu_headers[i].setAttribute('style', 'font-size:1.6rem;color:RGB(45, 59, 108);font-weight:normal;');
      }
  }
  if (training_headers) {
    var i = 0,
      iMax = training_headers.length;
      for (i; i < iMax; i++) {
        training_headers[i].setAttribute('style', 'font-size:1.6rem;color:RGB(45, 59, 108);font-weight:normal;');
      }
  }
  if (menu_items) {
    var i = 0,
      iMax = menu_items.length;
      for (i; i < iMax; i++) {
        menu_items[i].setAttribute('style', 'white-space:nowrap;padding-bottom:0;clear:both;display:block;');
      }
  }
  if (nav_menu_items) {
    iMax = nav_menu_items.length;
    for (i; i < iMax; i++) {
      nav_menu_items[i].setAttribute('style', 'padding-bottom:1.2em;');
    }
  }
  if (code) {
    var i = 0,
    currentStyle,
    iMax = code.length;
    for (i; i < iMax; i++) {
      currentStyle = code[i].getAttribute('style');
      code[i].setAttribute('style', currentStyle + ';color:#dd712e;font-size:1.5rem;background-color:inherit;');
    }
  }
  // if (linkedCode) {
  //   var i = 0,
  //   iMax = code.length;
  //   for (i; i < iMax; i++) {
  //     code[i].setAttribute('style', 'color:RGB(155, 37, 86);text-decoration:underline;')
  //   }
  // }
  if (bod) {
    bod.setAttribute('style', '-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;');
  }
})(window, document);
