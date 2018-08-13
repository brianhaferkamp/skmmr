// //---------------------------------------
// // Main search function
// //---------------------------------------
//
// var apiKey = 'ab69fb9ba2d540aaabff5ec14e1f7e59';
// var q;
//
// function search() {
//
//   basicSearch();
//
//   // advanced search options
//   // advancedSearch();
//
//   // get results
//   getResults();
//
// }
//
//
// function basicSearch() {
//
//   q = '';
//
//   // get search input
//   $('.search-basic-input').on('keyup', function() {
//     // get initial value from user input
//     q = $('.search-basic-input').val();
//     // encode the search to pass to the API call
//     q = encodeURIComponent(q);
//     // console.log(searchTerm);
//   });
// }
//
// //---------------------------------------
// // run this to get and serve the results
// // to the page
// //---------------------------------------
//
// function getResults() {
//   $('.search-basic-submit').on('click', function() {
//
//     // hide filters
//     $('.news-filter').addClass('hide');
//
//     // clear old search results
//     $('.news-list').html('');
//
//     // get data from NewsAPI.org
//     // $.get('https://newsapi.org/v2/everything?q='+q+'&sources='+ sources +'&from='+searchFrom+'&to='+searchTo+'&sortBy='+sortBy+'&pageSize=100&language='+language+'&domains='+domains+'&apiKey='+ apiKey +'', function(data) {
//
//     $.get('https://newsapi.org/v2/everything?q='+q+'&pageSize=100&apiKey='+ apiKey +'', function(data) {
//
//       // var data = data;
//       console.log(data);
//
//       $.each(data.articles, function(i, val) {
//
//         // get separate articles as objects
//         var article = val;
//         // console.log(article);
//
//         // Set article data as variables
//         var articleTitle = article.title;
//         var articleSummary = article.description;
//         var articleDate = article.publishedAt;
//         if (article.urlToImage == null) {
//           var articleImage = 'assets/img/skmmr-placeholder-80.jpg';
//         } else {
//           articleImage = article.urlToImage;
//         }
//         var articleURL = article.url;
//         var articleSource = article.source.name;
//
//         // output search results to page
//         // $('.news-list').append('<div class="search-results-group"><a href="'+articleURL+'" target="_blank"><h1 class="search-results-headline">'+articleTitle+'</h1></a><p class="search-results-description">'+articleDescription+'</p><div class="search-results-image"><img src="'+ articleImage +'"></div><div><p>SOURCE: '+articleSource+'</p></div></div>');
//
//         $('.news-list').append('<section class="news-group"><a href="' + articleURL + '" target="_blank"><div class="news-image"><img src="' + articleImage +'"/></div></a><article class="news-text"><a href="' + articleURL + '" target="_blank"><h1 class="news-headline">' + articleTitle + '</h1></a><p class="news-lead">' + articleSummary + '</p><footer class="meta"><small class="timestamp">' + articleDate + '</small><small class="news-source">' + articleSource + '</small></footer></article></section>');
//
//         // if (language == 'he' || language == 'ar') {
//         //   $('.search-results-inner').addClass('rtl');
//         // } else {
//         //   $('.search-results-inner').removeClass('rtl');
//         // }
//       });
//
//
//     });
//     // show search header
//     // $('.news-search-title').html('').append('search | '+q+'');
//     // $('.search-advanced').addClass('hide');
//   });
//
// }
//
//
// // init search() function
// search();
