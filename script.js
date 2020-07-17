// Register service worker
// version 2.0.2
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
   .register('sw.js')
   .then(function() {
     console.log("Service Worker Registered");
   });
}

//----------------------------------------------------------
// Global Variables
//----------------------------------------------------------

var category;
var language;
var country;
var pageNumber;
var fontSize;


//----------------------------------------------------------
// Initialize User Settings (localStorage)
//----------------------------------------------------------

// set language
if (localStorage.getItem('skmmr-lang')) {
  language = localStorage.getItem('skmmr-lang');
} else {
  language = 'en';
}

// set category
if (localStorage.getItem('skmmr-category')) {
  category = localStorage.getItem('skmmr-category');
  
  if (category == 'latest') {
    $('.category-header h1').text('Latest News');
  } else {
    $('.category-header h1').text(category);
  }
  
}

// set layout
if (localStorage.getItem('skmmr-layout')) {
  var layout = localStorage.getItem('skmmr-layout');
  $('.feed').removeClass('magazine list titles');
  $('.feed').addClass(layout);
  
  if (layout == 'magazine') {
    $('.layout-select').val('magazine');
  } else if (layout == 'list') {
    $('.layout-select').val('list');
  } else if (layout == 'titles') {
    $('.layout-select').val('titles');
  }
}

// set font style
if (localStorage.getItem('skmmr-font-style')) {
  var fontStyle = localStorage.getItem('skmmr-font-style');
  $('body').removeClass();
  $('body').addClass(fontStyle);
  
  if (fontStyle == 'serif') {
    $('.font-style-select').val('serif');
  } else if (fontStyle == 'sans') {
    $('.font-style-select').val('sans');
  }
}

// set font size
if (localStorage.getItem('skmmr-font-size')) {
  fontSize = localStorage.getItem('skmmr-font-size');
  
  $('.font-size-list li').removeClass('active');
  
  if (fontSize == 'sm') {
    $('.font-size-list li:nth-child(1)').addClass('active');
  } else if (fontSize == 'md') {
    $('.font-size-list li:nth-child(2)').addClass('active');
  } else if (fontSize == 'lg') {
    $('.font-size-list li:nth-child(3)').addClass('active');
  } else if (fontSize == 'xl') {
    $('.font-size-list li:nth-child(4)').addClass('active');
  }
}

// set reading mode
if (localStorage.getItem('skmmr-reading-mode')) {
  var readingMode = localStorage.getItem('skmmr-reading-mode');
  $('.reading-mode-list li').removeClass('active');
  
  if (readingMode == 'dark') {
    $('.app').addClass('dark');
    $('.reading-mode-list li:nth-child(2)').addClass('active');
  } else if (readingMode == 'light') {
    $('.app').removeClass('dark');
    $('.reading-mode-list li:nth-child(1)').addClass('active');
  }
}

// set theme color
if (localStorage.getItem('skmmr-theme-color')) {
  var themeColor = localStorage.getItem('skmmr-theme-color');
  $('.theme-color-list li').removeClass('active');
  
  if (themeColor == 'default') {
    $('.app').removeClass('orange blue green');
    $('.theme-color-list li:nth-child(1)').addClass('active');
    
  } else if (themeColor == 'orange') {
    $('.app').removeClass('orange blue green');
    $('.theme-color-list li:nth-child(2)').addClass('active');    
    $('.app').addClass('orange');
    
  } else if (themeColor == 'blue') {
    $('.app').removeClass('orange blue green');
    $('.theme-color-list li:nth-child(3)').addClass('active');    
    $('.app').addClass('blue');
  
  } else if (themeColor == 'green') {
    $('.app').removeClass('orange blue green');
    $('.theme-color-list li:nth-child(4)').addClass('active');
    $('.app').addClass('green');
  }
}

//----------------------------------------------------------
// Main Nav
//----------------------------------------------------------


// Logo Link

$('.logo').on('click', function() {
  $('.feed').html('');
  pageNumber = '1';
  $(window).scrollTop(0);
  getData();
});

// $('.logo').hover(function() {
//   $(this).html('<i class="zmdi zmdi-replay"></i>');
// }, function() {
//   $(this).html('<span>s</span>');
// });


// Open languages panel

$('.languages-link').on('click', function() {
  $('.panel').removeClass('open');
  $('.languages').addClass('open');
});


// Language selection

$('.languages-list li').on('click', function() {
  var $this = $(this);
  language = $this.attr('data-lang');
  localStorage.setItem('skmmr-lang', language);
  // console.log(language);
  localize();
  $('.feed').html('');
  pageNumber = '1';
  getData();
  $(window).scrollTop(0);
  $('.panel').removeClass('open');
});


// Open categories panel

$('.categories-link').on('click', function() {
  $('.panel').removeClass('open');
  $('.categories').addClass('open');
});


// Categories selection

$('.categories-list li').on('click', function() {
  var $this = $(this);
  category = $this.attr('data-category');
  
  if (category == 'latest') {
    category = 'general,technology,lifestyle,business,science,entertainment,sports,finance,politics,health';
    $('.category-header h1').text('Latest News');
  } else {    
    $('.category-header h1').text(category);
  }
  
  localStorage.setItem('skmmr-category', category);
  // console.log(category);
  $('.feed').html('');
  pageNumber = '1';
  getData();
  $(window).scrollTop(0);
  $('.panel').removeClass('open');
});


// Open settings panel

$('.settings-link').on('click', function() {
  $('.panel').removeClass('open');
  $('.settings').addClass('open');
});


// Settings - set active on click

$('.settings-list li').on('click', function() {
  var $this = $(this);
  $this.siblings('li').removeClass('active');
  $this.addClass('active');
});


// Layout settings

$('.layout-select').change(function() {
  var layout = $(this).val();
  localStorage.setItem('skmmr-layout', layout);
  // console.log(layout);
  $('.feed').removeClass('magazine list titles');
  $('.feed').addClass(layout);
  $('.panel').removeClass('open');
});


// Font style settings

$('.font-style-select').change(function() {
  var fontStyle = $(this).val();
  localStorage.setItem('skmmr-font-style', fontStyle);
  // console.log(layout);
  $('body').removeClass();
  $('body').addClass(fontStyle);
  $('.panel').removeClass('open');
});


// Font size settings

$('.font-size-list li').on('click', function() {
  var $this = $(this);
  var fontSize = $this.attr('data-fsize');
  localStorage.setItem('skmmr-font-size', fontSize);
  $('.feed-group').removeClass('sm md lg xl');
  $('.feed-group').addClass(fontSize);  
  $('.panel').removeClass('open');
});


// Reading mode settings

$('.reading-mode-list li').on('click', function() {
  var $this = $(this);
  var readingMode = $this.attr('data-mode');  
  localStorage.setItem('skmmr-reading-mode', readingMode);
  
  if (readingMode == 'dark') {
    $('.app').addClass('dark');
  } else if (readingMode == 'light') {
    $('.app').removeClass('dark');
  }
  
  $('.panel').removeClass('open');
});


// Theme color settings

$('.theme-color-list li').on('click', function() {
  var $this = $(this);
  var themeColor = $this.attr('data-theme');
  localStorage.setItem('skmmr-theme-color', themeColor);
  
  if (themeColor == 'default') {
    $('.app').removeClass('orange blue green');
  } else if (themeColor == 'orange') {
    $('.app').removeClass('orange blue green');
    $('.app').addClass('orange')
  } else if (themeColor == 'blue') {
    $('.app').removeClass('orange blue green');
    $('.app').addClass('blue')
  } else if (themeColor == 'green') {
    $('.app').removeClass('orange blue green');
    $('.app').addClass('green')
  }
  
  $('.panel').removeClass('open');
});


// Close panel

$('.panel-close').on('click', function() {
  $('.panel').removeClass('open');
});


//----------------------------------------------------------
// Localization
//----------------------------------------------------------

function localize() {
  
  if (language == 'en') {
    
    $('.category-header h1').text('Latest News').css({
      'text-align' : 'left'
    });
    
    $('.categories .panel-header h2').text('Choose Category').css({
      'text-align' : 'left'
    });
    
    $('.languages .panel-header h2').text('Choose Language').css({
      'text-align' : 'left'
    });    
    
    $('.settings .panel-header h2').text('Settings').css({
      'text-align' : 'left'
    });
    
    $('.layout-group .settings-label').text('Layout');
    
    $('.layout-select option:nth-child(1)').text('Magazine');
    $('.layout-select option:nth-child(2)').text('List');
    $('.layout-select option:nth-child(3)').text('Titles');
    
    $('.font-style-group .settings-label').text('Font Style');
    
    $('.font-style-select option:nth-child(1)').text('Serif');
    $('.font-style-select option:nth-child(2)').text('Sans');
    
    $('.font-size-group .settings-label').text('Font Size');
    
    $('.reading-mode-group .settings-label').text('Reading Mode');
    
    $('.reading-mode-list li:nth-child(1)').text('Light');
    $('.reading-mode-list li:nth-child(2)').text('Dark');
    
    $('.theme-color-group .settings-label').text('Theme Color');
    
    $('.categories-list li span, .languages-list li span').css({
      'text-align' : 'left',
      'order' : 'initial'
    });
    
    $('.categories-list li i, .languages-list li i').css({
      'transform' : 'rotate(0)'
    });
    
    $('.feed-link a span').text('Read Article');
    
    $('.feed-link a i').css({
      'transform' : 'rotate(0)'
    });
    
    $('.panel-close').css({
      'text-align' : 'right'
    });
    
    
    
    // category labels (panel)
    
    $('[data-category="general"] span').text('General');
    $('[data-category="world"] span').text('World');
    $('[data-category="politics"] span').text('Politics');
    $('[data-category="technology"] span').text('Technology');
    $('[data-category="business"] span').text('Business');
    $('[data-category="finance"] span').text('Finance');
    $('[data-category="sports"] span').text('Sports');
    $('[data-category="entertainment"] span').text('Entertainment');
    $('[data-category="lifestyle"] span').text('Lifestyle');
    $('[data-category="science"] span').text('Science');
    $('[data-category="health"] span').text('Health');
    
    // language labels (panel)
    
    $('[data-lang="en"] span').text('English');
    $('[data-lang="ar"] span').text('Arabic');
    $('[data-lang="zh"] span').text('Chinese');
    $('[data-lang="nl"] span').text('Dutch');
    $('[data-lang="fi"] span').text('Finnish');
    $('[data-lang="fr"] span').text('French');
    $('[data-lang="de"] span').text('German');
    $('[data-lang="hi"] span').text('Hindi');
    $('[data-lang="it"] span').text('Italian');
    $('[data-lang="ja"] span').text('Japanese');
    $('[data-lang="ko"] span').text('Korean');
    $('[data-lang="msa"] span').text('Malay');
    $('[data-lang="pt"] span').text('Portuguese');
    $('[data-lang="ru"] span').text('Russian');
    $('[data-lang="es"] span').text('Spanish');
    
  } else if (language == 'ar') {
    
    // Arabic
    
    $('.body').css({
      'direction' : 'rtl'
    });
    $('.category-header h1').text('أحدث الأخبار').css({
      'text-align' : 'right'
    });
    $('.feed-link a span').text('اقرأ المقال').css({
      'text-align' : 'right',
      'order' : '2'
    });
    $('.feed-link a i').css({
      'transform' : 'rotate(180deg)'
    });
    $('.feed-headline, .feed-description, .feed-time').css({
      'text-align' : 'right'
    });
    
    $('.panel-close').css({
      'text-align' : 'left'
    });
    
    $('.categories .panel-header h2').text('اختر الفئة').css({
      'text-align' : 'right'
    });
    $('.languages .panel-header h2').text('اختر اللغة').css({
      'text-align' : 'right'
    });
    
    $('.categories-list li span, .languages-list li span').css({
      'text-align' : 'right',
      'order' : '2'
    });
    
    $('.categories-list li i, .languages-list li i').css({
      'transform' : 'rotate(180deg)'
    });
    
    // category labels (panel)
    
    $('[data-category="general"] span').text('جنرال لواء');
    $('[data-category="world"] span').text('العالمية');
    $('[data-category="politics"] span').text('سياسة');
    $('[data-category="technology"] span').text('تقنية');
    $('[data-category="business"] span').text('اعمال');
    $('[data-category="finance"] span').text('المالية');
    $('[data-category="sports"] span').text('رياضات');
    $('[data-category="entertainment"] span').text('وسائل الترفيه');
    $('[data-category="lifestyle"] span').text('أسلوب الحياة');
    $('[data-category="science"] span').text('علم');
    $('[data-category="health"] span').text('الصحة');
    
    // language labels (panel)
    
    $('[data-lang="en"] span').text('اللغة الانجليزية');
    $('[data-lang="ar"] span').text('اللغة العربية');
    $('[data-lang="zh"] span').text('اللغة الصينية');
    $('[data-lang="nl"] span').text('لغة هولندية');
    $('[data-lang="fi"] span').text('اللغة الفنلندية');
    $('[data-lang="fr"] span').text('اللغة الفرنسية');
    $('[data-lang="de"] span').text('اللغة الالمانية');
    $('[data-lang="hi"] span').text('لغة هندية');
    $('[data-lang="it"] span').text('اللغة الايطالية');
    $('[data-lang="ja"] span').text('اللغة اليابانية');
    $('[data-lang="ko"] span').text('اللغة الكورية');
    $('[data-lang="msa"] span').text('لغة الملايو');
    $('[data-lang="pt"] span').text('اللغة اللغة البرتغالية');
    $('[data-lang="ru"] span').text('اللغة اللغة الروسية');
    $('[data-lang="es"] span').text('اللغة الإسبانية');
    
  } else if (language == 'zh') {
    
    // Chinese
    
    $('.category-header h1').text('最新消息').css({
      'text-align' : 'left'
    });
    
    $('.categories .panel-header h2').text('选择类别').css({
      'text-align' : 'left'
    });
    
    $('.languages .panel-header h2').text('选择语言').css({
      'text-align' : 'left'
    });
    
    $('.categories-list li span, .languages-list li span').css({
      'text-align' : 'left',
      'order' : 'initial'
    });
    
    $('.categories-list li i, .languages-list li i').css({
      'transform' : 'rotate(0)'
    });
    
    // read article link    
    $('.feed-link a span').text('阅读文章');
    
    $('.feed-link a i').css({
      'transform' : 'rotate(0)'
    });
    
    $('.panel-close').css({
      'text-align' : 'right'
    });
    
    // category labels (panel)    
    $('[data-category="general"] span').text('总');
    $('[data-category="world"] span').text('世界');
    $('[data-category="politics"] span').text('政治');
    $('[data-category="technology"] span').text('技术');
    $('[data-category="business"] span').text('商业');
    $('[data-category="finance"] span').text('金融');
    $('[data-category="sports"] span').text('体育');
    $('[data-category="entertainment"] span').text('娱乐');
    $('[data-category="lifestyle"] span').text('生活方式');
    $('[data-category="science"] span').text('科学');
    $('[data-category="health"] span').text('健康');
    
    // language labels (panel)    
    $('[data-lang="en"] span').text('英语');
    $('[data-lang="ar"] span').text('阿拉伯语');
    $('[data-lang="zh"] span').text('中文');
    $('[data-lang="nl"] span').text('荷兰语');
    $('[data-lang="fi"] span').text('芬兰语');
    $('[data-lang="fr"] span').text('法语');
    $('[data-lang="de"] span').text('德国的语言');
    $('[data-lang="hi"] span').text('印地语');
    $('[data-lang="it"] span').text('意大利语');
    $('[data-lang="ja"] span').text('日语');
    $('[data-lang="ko"] span').text('朝鲜语');
    $('[data-lang="msa"] span').text('马来语');
    $('[data-lang="pt"] span').text('葡萄牙语');
    $('[data-lang="ru"] span').text('俄语');
    $('[data-lang="es"] span').text('西班牙语'); 
    
  } else if (language == 'nl') {
    
    // Dutch
    
    $('.category-header h1').text('Laatste nieuws').css({
      'text-align' : 'left'
    });
    
    $('.categories .panel-header h2').text('Kies categorie').css({
      'text-align' : 'left'
    });
    
    $('.languages .panel-header h2').text('Kies een taal').css({
      'text-align' : 'left'
    });
    
    $('.categories-list li span, .languages-list li span').css({
      'text-align' : 'left',
      'order' : 'initial'
    });
    
    $('.categories-list li i, .languages-list li i').css({
      'transform' : 'rotate(0)'
    });
    
    // read article link    
    $('.feed-link a span').text('Lees artikel');
    
    $('.feed-link a i').css({
      'transform' : 'rotate(0)'
    });
    
    $('.panel-close').css({
      'text-align' : 'right'
    });
    
    // category labels (panel)    
    $('[data-category="general"] span').text('Algemeen');
    $('[data-category="world"] span').text('Wereld');
    $('[data-category="politics"] span').text('Politiek');
    $('[data-category="technology"] span').text('Technologie');
    $('[data-category="business"] span').text('Bedrijf');
    $('[data-category="finance"] span').text('Financiën');
    $('[data-category="sports"] span').text('Sport');
    $('[data-category="entertainment"] span').text('Entertainment');
    $('[data-category="lifestyle"] span').text('Levensstijl');
    $('[data-category="science"] span').text('Wetenschap');
    $('[data-category="health"] span').text('Gezondheid');
    
    // language labels (panel)    
    $('[data-lang="en"] span').text('Engels');
    $('[data-lang="ar"] span').text('Arabisch');
    $('[data-lang="zh"] span').text('Chinese');
    $('[data-lang="nl"] span').text('Nederlands');
    $('[data-lang="fi"] span').text('Fins');
    $('[data-lang="fr"] span').text('Frans');
    $('[data-lang="de"] span').text('Duitse');
    $('[data-lang="hi"] span').text('Hindi');
    $('[data-lang="it"] span').text('Italiaans');
    $('[data-lang="ja"] span').text('Japans');
    $('[data-lang="ko"] span').text('Koreaans');
    $('[data-lang="msa"] span').text('Maleis');
    $('[data-lang="pt"] span').text('Portugees');
    $('[data-lang="ru"] span').text('Russisch');
    $('[data-lang="es"] span').text('Spaans');    
  }
  
}


//----------------------------------------------------------
// Currents API
//----------------------------------------------------------


// Function for getting data

country = 'us';
pageNumber = '1';

// get the data on load
getData();
    
function getData() {
  var k = '6o2wgRzMOmyi6WuhRwrNByQOCEXGDivXf4kW8VBWk7UZdns_';
  
  // load spinner icon
  $('.feed').append('<aside id="loader" class="loader"><i class="zmdi zmdi-spinner zmdi-hc-spin"></i></aside>');
  
  var loadData =
      
  $.getJSON('https://api.currentsapi.services/v1/latest-news?category='+category+'&language='+language+'&country='+country+'&page_number='+pageNumber+'&apiKey='+ k +'', function(data) {
         
      
  // $.getJSON('https://api.currentsapi.services/v1/search?category='+category+'&type=1&country='+country+'&language='+language+'&page_number='+pageNumber+'&apiKey='+ k +'', function(data) {
    
    console.log(data);

    var newsFeed = data.news;

    $.each(newsFeed, function(i, val) {
      // console.log(val);
      
      
      if (val.image == 'None') {
        var feedImage = 'https://assets.codepen.io/495197/skmmr-placeholder-80.jpg';
      } else {
        var feedImage = val.image;
        feedImage = feedImage.split("?")[0];
      }
      
      // console.log(feedImage);
      var feedHeadline = val.title;
      // console.log(feedHeadline);
      var feedDescription = val.description;
      // console.log(feedDescription);
      var feedURL = val.url;      
      // console.log(feedURL);
      var feedTime = val.published;
      // console.log(feedTime);
      feedTime = new Date(feedTime);
      feedTime = feedTime.toDateString(feedTime);
      
      // hide spinner icon
      $('.loader').fadeOut(200);
      
      // display the feed group
      $('.feed').append(`
        <article class="feed-group md">
          <img class="feed-image" src="${feedImage}"/>
          <h2 class="feed-headline">${feedHeadline}</h2>
          <p class="feed-description">${feedDescription}</p>
          <p class="feed-time">${feedTime}</p>
          <div class="feed-link"> 
            <a href="${feedURL}" target="_blank"><span>Read Article</span> <i class="zmdi zmdi-chevron-right zmdi-hc-fw"></i></a>
          </div>
        </article>      
      `)
      
    });

  });
  
  loadData.done(function() {
    
    
    
    // Add load more button to end of feed
    $('.feed').append(`      
      <div class="load-more">
        <button class="load-more-button">More Articles</button
      </div>      
    `);
    
    // load more stories function
    $('.load-more').on('click', function() {
      pageNumber++;      
      $('.load-more').remove();    
      getData();
    });
    
    // set saved font size on load
    var fontSize = localStorage.getItem('skmmr-font-size');
    $('.feed-group').removeClass('sm md lg xl');
    $('.feed-group').addClass(fontSize);
    
  });
}


//----------------------------------------------------------
// Localization
//----------------------------------------------------------

var localize = {
  
 languages: [{
   name: "english",
   code: "en"
 },
 {
   name: "arabic",
   code: "ar"
 },
 {
   name: "chinese",
   code: "zh"
 },
 {
   name: "dutch",
   code: "nl"
 },
 {
   name: "finnish",
   code: "fi"
 },
 {
   name: "french",
   code: "fr"
 },
 {
   name: "german",
   code: "de"
 },
 {
   name: "hindi",
   code: "hi"
 },
 {
   name: "italian",
   code: "it"
 },
 {
   name: "japanese",
   code: "ja"
 },
 {
   name: "korean",
   code: "ko"
 },
 {
   name: "malay",
   code: "msa"
 },
 {
   name: "portuguese",
   code: "pt"
 },
 {
   name: "russian",
   code: "ru"
 },
 {
   name: "spanish",
   code: "es"
 }]
}
