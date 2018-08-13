// This build system utilizes the jQuery library for javascript.
// Don't want to use jQuery? Just don't load it on the main pages
// You can also erase this and start writing vanilla JS

$(document).ready(function() {

  //------------------------------------------------------------
  // News Feed (New)
  // The news feed is pushed to the .news-list container
  //------------------------------------------------------------


  //----------------------------------------------------
  // Init
  //----------------------------------------------------

  var apiKey = 'ab69fb9ba2d540aaabff5ec14e1f7e59';

  // media source
  var lastSource = localStorage.getItem('source');

  if (lastSource) {
    var sources = lastSource;
  } else {
    var defaultSource = 'reuters';
    sources = defaultSource;
  }

  // My feed sources
  var savedFeed = localStorage.getItem('my-sources');

  if (localStorage.getItem('font-style')) {
    $('main').addClass('sans-serif');
    $('.font-style-choice').removeClass('font-style-active');
    $('.font-sans-serif').addClass('font-style-active');
  } else {
    $('.font-serif').addClass('font-style-active');
  }

  // text direction
  if (sessionStorage.getItem('textDirection')) {
    var textDirection = 'rtl';
  }


  // set filter
  // if (localStorage.getItem('latest')) {
  //   $('.filter').removeClass('news-filter-active');
  //   $('.filter-everything').addClass('news-filter-active');
  //   getEverything();
  // }

  getTopStories();


  //----------------------------------------------------
  // Filters
  //----------------------------------------------------

  // put 'active' class on clicked filter
  $('.filter').on('click', function() {
    var $this = $(this);
    $('.filter').removeClass('news-filter-active');
    $this.addClass('news-filter-active');
  });

  // when the user clicks the "latest" button
  $('.filter-everything').on('click', function() {
    $('.news-list').html('<p class="loader"><i class="zmdi zmdi-spinner zmdi-hc-spin"></i></p>');
    // localStorage.setItem('latest', 'yes');
    getEverything();
  });

  // when the user clicks the "top stories" button
  $('.filter-top-stories').on('click', function() {
    $('.news-list').html('<p class="loader"><i class="zmdi zmdi-spinner zmdi-hc-spin"></i></p>');
    // localStorage.removeItem('latest');
    getTopStories();
  });


  //----------------------------------------------------
  // Feedback
  //----------------------------------------------------

  // check to see if the user has already given feedback
  if ( localStorage.getItem('feedback-given') ) {
    // if the user has given feedback, hide .feedback container
    $('.feedback').addClass('hide');
  }

  // response to user on click
  $('.feedback-options p').on('click', function() {
    // thank you message for giving feedback
    $('.feedback').html('<p>Thanks for your feedback!</p>');
    // save user feedback event
    localStorage.setItem('feedback-given', 'yes');
  });

  //----------------------------------------------------
  // Masthead Links
  //----------------------------------------------------

  // refresh page
  $('.refresh-page').on('click', function() {
    window.location.reload();
  });

  // when the user clicks "build feed" button
  $('.build-feed-trigger').on('click', function() {
    var $this = $(this);
    sources = localStorage.getItem('my-sources');
    $('.navbar-view, .build-feed-trigger').addClass('hide');
    $('.navbar-item').removeClass('navbar-item-active');
    $('.news-list').html('<p class="loader"><i class="zmdi zmdi-spinner zmdi-hc-spin"></i></p>');

    // if there are checked sources, run the feed builder
    if (sources) {
      buildFeed();
    } else {
      // if the user clicks the button with no sources checked, simply reload the page
      window.location.reload();
    }

  });

  //----------------------------------------------------
  // To Top Link
  //----------------------------------------------------

  // show/hide back to top link
  $(window).scroll(function() {
    // if the user scrolls down farther than 100px, fire scroll event
    if ($(window).scrollTop() > 100) {
      // show back to top link
      $('.to-top').removeClass('hide');
    } else {
      // hide back to top link
      $('.to-top').addClass('hide');
    }
  });

  //----------------------------------------------------
  // Navbar
  //----------------------------------------------------

  // when user clicks navbar
  $('.navbar-item').on('click', function () {
    var $this = $(this);
    var itemID = $this.attr('data-item');

    // make clicked item active (change item color)
    $('.navbar-item').removeClass('navbar-item-active');
    $this.addClass('navbar-item-active');

    // open the corresponding view
    $('.view').addClass('hide');
    $('.' + itemID + '-view').removeClass('hide');
    $('.navbar-view').removeClass('hide');
  });

  // when user clicks navbar view close (X)
  $('.navbar-view-close').on('click', function() {
    $('.navbar-view, .build-feed-trigger').addClass('hide');
    $('.navbar-item').removeClass('navbar-item-active');
  });

  // view favorites
  // $('.my-feed-trigger').on('click', function() {
  //   var $this = $(this);
  //   sources = savedFeed;
  //   $('.navbar-view').addClass('hide');
  //   $('.news-list').html('<p class="loader"><i class="zmdi zmdi-spinner zmdi-hc-spin"></i></p>');
  //   window.location.reload();
  // });

  //----------------------------------------------------
  // Settings View
  //----------------------------------------------------

  // Settings: Font Style
  $('.font-style-choice').on('click', function() {
    var $this = $(this);
    $('.font-style-choice').removeClass('font-style-active');
    $this.addClass('font-style-active');

    if ($this.hasClass('font-sans-serif')) {
      $('main').addClass('sans-serif');
      localStorage.setItem('font-style', 'sans');
    } else {
      $('main').removeClass('sans-serif');
      localStorage.removeItem('font-style');
    }
  });

  // Settings: Font Size
  $('.font-size-choice').on('click', function() {
    var $this = $(this);
    var size = $this.text();
    $('.font-size-choice').removeClass('font-size-active');
    $this.addClass('font-size-active');

    localStorage.setItem('font-size', size);

    if ($this.hasClass('font-size-xl')) {
      xlargeFont();
    } else if ($this.hasClass('font-size-l')) {
      largeFont();
    } else if ($this.hasClass('font-size-m')) {
      $('.news-headline, .news-lead').css('font-size', 'inherit');
      $('.timestamp, .news-source').css('font-size', '.7rem');
      localStorage.removeItem('font-size');
    }
  });

  // Settings: Theme toggle
  $('.settings-theme .toggle').on('click', function() {
    $('.settings-theme .toggle-circle').toggleClass('toggle-highlight');
    $('body, .navbar').toggleClass('night');

    // load dark theme on page load (if activated)
    // clears when user closes the tab
    if ($('.settings-theme .toggle-circle').is('.toggle-highlight')) {
      sessionStorage.setItem('theme', 'dark');
    } else {
      sessionStorage.removeItem('theme');
    }
  });

  //----------------------------------------------------
  // Source List View
  //----------------------------------------------------

  // set the source on click
  $('.source-link-text').on('click', function() {
    var $this = $(this);
    var articleSource = $this.attr('data-source');
    var textDirection = $this.attr('data-direction');
    // is source link a rtl language?
    if (textDirection) {
      sessionStorage.setItem('textDirection', textDirection);
    } else {
      sessionStorage.removeItem('textDirection');
    }

    // set the source in localStorage on click
    // this gets loaded the next time the user opens the site
    localStorage.setItem('source', articleSource);

    // clear country data
    // sessionStorage.removeItem('countryID');
    // sessionStorage.removeItem('countryName');

    // reload the browser when source is clicked
    window.location.reload();
  });


  //---------------------------------------
  // My feed
  //---------------------------------------

  // var myFeedArray = [];
  var mySourcesArray = [];

  function myFeed() {

    // var myFeedName;
    //
    // // check to see if there are any sources favorited
    // if (localStorage.getItem('my-sources')) {
    //   var mySources = localStorage.getItem('my-sources');
    // } else {
    //   var mySources;
    // }

    // check to see if there are any feed names to display
    // if (localStorage.getItem('my-feed')) {
    //   var myFeed = localStorage.getItem('my-feed');
    // } else {
    //   var myFeed;
    // }

    // when the user clicks on the star in the Sources List view
    $('.source-link-favorite').on('click', function() {
      var $this = $(this);
      var clickedSource = $this.parent().prev('.source-link-text').attr('data-source');
      // console.log(clickedSource);
      var favorited = $this.next();
      var feedName = $this.parent().prev().text();
      // console.log(sourceName);

      // change start to active (orange)
      $this.addClass('hide');
      favorited.removeClass('hide');

      $('.build-feed-trigger').removeClass('hide');

      // push source name to sources array
      mySourcesArray.push(clickedSource);
      mySources = mySourcesArray.join(',');
      console.log(mySources);
      localStorage.setItem( 'my-sources', mySources);

      // push feed name to feed array
      // myFeedArray.push(feedName);
      // myFeed = myFeedArray;
      // console.log(myFeed);
      // localStorage.setItem('my-feed', JSON.stringify(myFeed));

      // reflect changes in my feed view
      // getMyFeed();

    });



    // when the user clicks on the active (orange) star in the Sources List view to remove a source
    $('.source-link-favorite-active').on('click', function() {
      var $this = $(this);
      var clickedSource = $this.parent().prev('.source-link-text').attr('data-source');
      // console.log(clickedSource);
      var favorited = $this.prev();
      var feedName = $this.parent().prev().text();
      // console.log(sourceName);

      // change start to empty star
      $this.addClass('hide');
      favorited.removeClass('hide');

      $('.build-feed-trigger').removeClass('hide');

      // remove the source from the sources array
      mySourcesArray.splice($.inArray(clickedSource, mySourcesArray), 1);
      // mySources = mySourcesArray.join(',');
      mySources = mySourcesArray;
      console.log(mySources);
      localStorage.setItem('my-sources', mySources);

      // remove feed name from the feed array
      // myFeedArray.splice($.inArray(feedName, myFeedArray), 1);
      // // myFeed = myFeedArray.join(',');
      // myFeed = myFeedArray;
      // console.log(myFeed)
      // localStorage.setItem('my-feed', JSON.stringify(myFeed));

      // reflect changes in my feed view
      // getMyFeed();

    });
  }

  myFeed();


  //----------------------------------------------------
  // Functions
  //----------------------------------------------------

  // run function to the top stories from sources(s)
  function getTopStories() {

    $('.loader').addClass('hide');
    $('.news-list').html('');



    $.getJSON( "https://newsapi.org/v2/top-headlines?sources="+ sources +"&pageSize=100&apiKey="+ apiKey +"", function( data ) {

      // Get all articles
      var pulledArticles = data.articles;
      console.log(data);

      // Loop through all the articles articles
      $.each(pulledArticles, function( index, val ) {

        // Get data from individual articles
        var article = val;

        // Set article data as variables
        var articleTitle = article.title;
        var articleSummary = article.description;
        var articleDate = article.publishedAt;
        var localDate = new Date(articleDate).toDateString();
        articleDate = localDate;
        if (article.urlToImage == null) {
          var articleImage = 'assets/img/skmmr-placeholder-80.jpg';
        } else {
          articleImage = article.urlToImage;
        }
        var articleURL = article.url;
        var articleSource = article.source.name;

        // Build each news article and fill with variables
        $('.news-list').append('<section class="news-group"><a href="' + articleURL + '" target="_blank"><div class="news-image"><img src="' + articleImage +'"/></div></a><article class="news-text"><a href="' + articleURL + '" target="_blank"><h1 class="news-headline">' + articleTitle + '</h1></a><p class="news-lead">' + articleSummary + '</p><footer class="meta"><small class="timestamp">' + articleDate + '</small><small class="news-source">' + articleSource + '</small></footer></article></section>');

      });

      // set theme on load
      setThemeOnLoad();
      // set text direction
      testForArabic();
      // load font size
      loadFontSize();

      // show footer, feedback, and email signup forms
      $('.site-footer, .feedback, .email-signup').removeClass('hide');
    });
  }


  // run function to get all stories from sources(s)
  function getEverything() {

    $('.loader').addClass('hide');

    $.getJSON( "https://newsapi.org/v2/everything?sources="+ sources +"&pageSize=100&pages=10&apiKey=ab69fb9ba2d540aaabff5ec14e1f7e59", function( data ) {

    // Get all articles
    var pulledArticles = data.articles;
    // console.log(data);

      // Loop through all the articles articles
      $.each(pulledArticles, function( index, val ) {

        // Get data from individual articles
        var article = val;

        // Set article data as variables
        var articleTitle = article.title;
        var articleSummary = article.description;
        var articleDate = article.publishedAt;
        var localDate = new Date(articleDate).toDateString();
        articleDate = localDate;
        if (article.urlToImage == null) {
          var articleImage = 'assets/img/skmmr-placeholder-80.jpg';
        } else {
          articleImage = article.urlToImage;
        }
        var articleURL = article.url;
        var articleSource = article.source.name;

        // Build each news article and fill with variables

        $('.news-list').append('<section class="news-group"><a href="' + articleURL + '"><div class="news-image"><img src="' + articleImage +'"/></div></a><article class="news-text"><a href="' + articleURL + '"><h1 class="news-headline">' + articleTitle + '</h1></a><p class="news-lead">' + articleSummary + '</p><footer class="meta"><small class="timestamp">' + articleDate + '</small><small class="news-source">' + articleSource + '</small></footer></article></section>');

      });

      // set theme on load
      setThemeOnLoad();
      // apply rtl styles, if necessary
      testForArabic();
      // load font size
      loadFontSize();

    });

  }

  // run function to the top stories from sources(s)
  function buildFeed() {

    $('.loader').addClass('hide');
    $('.news-list').html('');

    $.getJSON( "https://newsapi.org/v2/top-headlines?sources="+ sources +"&pageSize=100&apiKey="+ apiKey +"", function( data ) {

      // Get all articles
      var pulledArticles = data.articles;
      console.log(data);

      // Loop through all the articles articles
      $.each(pulledArticles, function( index, val ) {

        // Get data from individual articles
        var article = val;

        // Set article data as variables
        var articleTitle = article.title;
        var articleSummary = article.description;
        var articleDate = article.publishedAt;
        var localDate = new Date(articleDate).toDateString();
        articleDate = localDate;
        if (article.urlToImage == null) {
          var articleImage = 'assets/img/skmmr-placeholder-80.jpg';
        } else {
          articleImage = article.urlToImage;
        }
        var articleURL = article.url;
        var articleSource = article.source.name;

        // Build each news article and fill with variables
        $('.news-list').append('<section class="news-group"><a href="' + articleURL + '" target="_blank"><div class="news-image"><img src="' + articleImage +'"/></div></a><article class="news-text"><a href="' + articleURL + '" target="_blank"><h1 class="news-headline">' + articleTitle + '</h1></a><p class="news-lead">' + articleSummary + '</p><footer class="meta"><small class="timestamp">' + articleDate + '</small><small class="news-source">' + articleSource + '</small></footer></article></section>');
      });

      // set theme on load
      setThemeOnLoad();
      // apply rtl styles, if necessary
      testForArabic();
      // load font size
      loadFontSize();
    });

    // show footer, feedback, and email signup forms
    $('.site-footer, .feedback, .email-signup').removeClass('hide');
  }


  function testForArabic() {
    var newsGroup = $('.news-group');
    newsGroup.each(function() {
      var $this = $(this);
      var evalText = $this.find('.news-text h1').text();
      var regex = new RegExp(/[\u0600-\u06FF\u0590-\u05FF]/);
      var test = regex.test(evalText);
      if (test) {
        $(this).find('.news-headline, .news-lead').addClass('rtl');
      } else {
        $(this).find('.news-headline, .news-lead').removeClass('rtl');
      }
    });
  }

  function setThemeOnLoad() {
    // set theme
    if (sessionStorage.getItem('theme')) {
      $('.source-theme .toggle-circle').toggleClass('toggle-highlight');
      $('body, .navbar, .navbar-view').addClass('night');
    }
  }

  function loadFontSize() {
    if (localStorage.getItem('font-size')) {
      var initFontSize = localStorage.getItem('font-size');
      if (initFontSize == 'XL') {
        xlargeFont();
      } else if (initFontSize == 'L') {
        largeFont();
      }
    }
  }

  function largeFont() {
    $('.news-headline').css('font-size', '1.5rem');
    $('.news-lead').css('font-size', '1.2rem');
    $('.timestamp, .news-source').css('font-size', '1rem');
    $('.font-size-choice').removeClass('font-size-active');
    $('.font-size-l').addClass('font-size-active');
  }

  function xlargeFont() {
    $('.news-headline').css('font-size', '2rem');
    $('.news-lead').css({
      'font-size' : '1.5rem',
      'line-height' : '1.3'
    });
    $('.timestamp, .news-source').css('font-size', '1.2rem');
    $('.font-size-choice').removeClass('font-size-active');
    $('.font-size-xl').addClass('font-size-active');
  }



  //---------------------------------------
  // Main search function
  //---------------------------------------


  var q;
  // var sortBy = 'publishedAt';

  function search() {

    basicSearch();

    // advanced search options
    // advancedSearch();

    // get results
    getResults();

  }


  function basicSearch() {

    q = '';

    // get search input
    $('.search-basic-input').on('keyup', function() {
      // get initial value from user input
      q = $('.search-basic-input').val();
      // encode the search to pass to the API call
      searchTerm = encodeURIComponent(q);
      // console.log(searchTerm);
    });
  }

  //---------------------------------------
  // run this to get and serve the results
  // to the page
  //---------------------------------------

  function getResults() {
    $('.search-basic-submit').on('click', function() {

      // hide filters
      $('.news-filter, .navbar-view').addClass('hide');
      $('.navbar-item').removeClass('navbar-item-active');

      // clear old search results
      $('.news-list').html('');

      // show loding icon
      $('.news-list').html('<p class="loader"><i class="zmdi zmdi-spinner zmdi-hc-spin"></i></p>');

      // get data from NewsAPI.org
      // $.get('https://newsapi.org/v2/everything?q='+q+'&sources='+ sources +'&from='+searchFrom+'&to='+searchTo+'&sortBy='+sortBy+'&pageSize=100&language='+language+'&domains='+domains+'&apiKey='+ apiKey +'', function(data) {

      $.get('https://newsapi.org/v2/everything?q='+searchTerm+'&pageSize=100&sortBy=publishedAt&apiKey=ab69fb9ba2d540aaabff5ec14e1f7e59', function(data) {

        var data = data;
        console.log(data);

        $.each(data.articles, function(i, val) {

          // get separate articles as objects
          var article = val;
          // console.log(article);

          // Set article data as variables
          var articleTitle = article.title;
          var articleSummary = article.description;
          var articleDate = article.publishedAt;
          var localDate = new Date(articleDate).toDateString();
          articleDate = localDate;
          if (article.urlToImage == null) {
            var articleImage = 'assets/img/skmmr-placeholder-80.jpg';
          } else {
            articleImage = article.urlToImage;
          }
          var articleURL = article.url;
          var articleSource = article.source.name;

          // output search results to page
          // $('.news-list').append('<div class="search-results-group"><a href="'+articleURL+'" target="_blank"><h1 class="search-results-headline">'+articleTitle+'</h1></a><p class="search-results-description">'+articleDescription+'</p><div class="search-results-image"><img src="'+ articleImage +'"></div><div><p>SOURCE: '+articleSource+'</p></div></div>');

          $('.news-list').append('<section class="news-group"><a href="' + articleURL + '" target="_blank"><div class="news-image"><img src="' + articleImage +'"/></div></a><article class="news-text"><a href="' + articleURL + '" target="_blank"><h1 class="news-headline">' + articleTitle + '</h1></a><p class="news-lead">' + articleSummary + '</p><footer class="meta"><small class="timestamp">' + articleDate + '</small><small class="news-source">' + articleSource + '</small></footer></article></section>');

          // if (language == 'he' || language == 'ar') {
          //   $('.search-results-inner').addClass('rtl');
          // } else {
          //   $('.search-results-inner').removeClass('rtl');
          // }
        });
        // remove spinner
        $('.loader').addClass('hide');

      });
      // show search header
      // $('.news-search-header').html('').append('<p class="news-search-title">Search: <span class="search-label">'+q+'</span></p><ul class="news-search-filter"><li class="news-search-filter-link news-search-filter-recent news-search-filter-active">Recent</li><li class="news-search-filter-link news-search-filter-popular">Popular</li></ul>');

      $('.news-search-title').html('').append('Search: <span class="search-label">'+q+'</span>');

      // $('.search-advanced').addClass('hide');

    });
  }


  // init search() function
  search();



  // learn more link for advanced search
  $('.search-learn-more').on('click', function (e) {
    e.preventDefault();
    $('.advanced-search-info').toggleClass('hide');
  });


}); // end jQuery


$(document).ready(function() {
//---------------------------------------
// Main search function
//---------------------------------------


var q;
// var sortBy = 'publishedAt';

function search() {

  basicSearch();

  // advanced search options
  // advancedSearch();

  // get results
  getResults();

}


function basicSearch() {

  q = '';

  // get search input
  $('.search-basic-input').on('keyup', function() {
    // get initial value from user input
    q = $('.search-basic-input').val();
    // encode the search to pass to the API call
    searchTerm = encodeURIComponent(q);
    // console.log(searchTerm);
  });
}

//---------------------------------------
// run this to get and serve the results
// to the page
//---------------------------------------

function getResults() {
  $('.search-basic-submit').on('click', function() {

    // hide filters
    $('.news-filter, .navbar-view').addClass('hide');
    $('.navbar-item').removeClass('navbar-item-active');

    // clear old search results
    $('.news-list').html('');

    // show loding icon
    $('.news-list').html('<p class="loader"><i class="zmdi zmdi-spinner zmdi-hc-spin"></i></p>');

    // get data from NewsAPI.org
    // $.get('https://newsapi.org/v2/everything?q='+q+'&sources='+ sources +'&from='+searchFrom+'&to='+searchTo+'&sortBy='+sortBy+'&pageSize=100&language='+language+'&domains='+domains+'&apiKey='+ apiKey +'', function(data) {

    $.get('https://newsapi.org/v2/everything?q='+searchTerm+'&pageSize=100&sortBy=publishedAt&apiKey=ab69fb9ba2d540aaabff5ec14e1f7e59', function(data) {

      var data = data;
      console.log(data);

      $.each(data.articles, function(i, val) {

        // get separate articles as objects
        var article = val;
        // console.log(article);

        // Set article data as variables
        var articleTitle = article.title;
        var articleSummary = article.description;
        var articleDate = article.publishedAt;
        var localDate = new Date(articleDate).toDateString();
        articleDate = localDate;
        if (article.urlToImage == null) {
          var articleImage = 'assets/img/skmmr-placeholder-80.jpg';
        } else {
          articleImage = article.urlToImage;
        }
        var articleURL = article.url;
        var articleSource = article.source.name;

        // output search results to page
        // $('.news-list').append('<div class="search-results-group"><a href="'+articleURL+'" target="_blank"><h1 class="search-results-headline">'+articleTitle+'</h1></a><p class="search-results-description">'+articleDescription+'</p><div class="search-results-image"><img src="'+ articleImage +'"></div><div><p>SOURCE: '+articleSource+'</p></div></div>');

        $('.news-list').append('<section class="news-group"><a href="' + articleURL + '" target="_blank"><div class="news-image"><img src="' + articleImage +'"/></div></a><article class="news-text"><a href="' + articleURL + '" target="_blank"><h1 class="news-headline">' + articleTitle + '</h1></a><p class="news-lead">' + articleSummary + '</p><footer class="meta"><small class="timestamp">' + articleDate + '</small><small class="news-source">' + articleSource + '</small></footer></article></section>');

        // if (language == 'he' || language == 'ar') {
        //   $('.search-results-inner').addClass('rtl');
        // } else {
        //   $('.search-results-inner').removeClass('rtl');
        // }
      });
      // remove spinner
      $('.loader').addClass('hide');

    });
    // show search header
    // $('.news-search-header').html('').append('<p class="news-search-title">Search: <span class="search-label">'+q+'</span></p><ul class="news-search-filter"><li class="news-search-filter-link news-search-filter-recent news-search-filter-active">Recent</li><li class="news-search-filter-link news-search-filter-popular">Popular</li></ul>');

    $('.news-search-title').html('').append('Search: <span class="search-label">'+q+'</span>');

    // $('.search-advanced').addClass('hide');

  });
}


// init search() function
search();



// learn more link for advanced search
$('.search-learn-more').on('click', function (e) {
  e.preventDefault();
  $('.advanced-search-info').toggleClass('hide');
});


// function newsSearchFilter() {
//   $('.news-search-filter-link').on('click', function() {
//     var $this = $(this);
//     $('.news-search-filter-link').removeClass('news-search-filter-active');
//     $this.addClass('news-search-filter-active');
//
//     if ($this.hasClass('.news-search-filter-popular')) {
//       sortBy = 'popularity';
//     } else if ($this.hasClass('.news-search-filter-recent')) {
//       sortBy = 'publishedAt';
//     }
//
//
//
//   });
// }




}); // end jQuery
