"serviceWorker"in navigator&&navigator.serviceWorker.register("../sw.js").then(function(){}),$(document).ready(function(){var e,s="ab69fb9ba2d540aaabff5ec14e1f7e59",t="1",a=localStorage.getItem("source");e=a||"reuters";localStorage.getItem("my-sources");localStorage.getItem("font-style")?($("main").addClass("sans-serif"),$(".font-style-choice").removeClass("font-style-active"),$(".font-sans-serif").addClass("font-style-active")):$(".font-serif").addClass("font-style-active"),sessionStorage.getItem("textDirection"),o(),$(".filter").on("click",function(){var e=$(this);$(".filter").removeClass("news-filter-active"),e.addClass("news-filter-active")}),$(".filter-everything").on("click",function(){t="1",l(),l(),$.get("https://newsapi.org/v2/everything?sources="+e+"&pageSize=20&page="+t+"&apiKey=ab69fb9ba2d540aaabff5ec14e1f7e59",function(e){var s=e.articles;$.each(s,function(e,s){var t=s,a=t.title,i=t.description,n=t.publishedAt,n=new Date(n).toDateString(),o=null==t.urlToImage?"assets/img/skmmr-placeholder-80.jpg":t.urlToImage,l=t.url,r=t.source.name;$(".news-list").append('<section class="news-group"><a href="'+l+'"><div class="news-image"><img src="'+o+'"/></div></a><article class="news-text"><a href="'+l+'"><h1 class="news-headline">'+a+'</h1></a><p class="news-lead">'+i+'</p><footer class="meta"><div><small class="timestamp">'+n+'</small><small class="news-source">'+r+'</small></div><div class="news-social-share"><a class="twitter-share-button" href="https://twitter.com/intent/tweet?text='+a+"&url="+l+'&via=skmmrnews">Tweet</a></div></footer></article></section>')})},"json").done(function(){$(".load-more-button").show(),$(".load-more-button button").removeClass("top-stories").addClass("latest-stories"),c()}),m(),c(),d()}),$(".filter-top-stories").on("click",function(){t="1",o()}),$(".refresh-page").on("click",function(){window.location.reload()}),$(".build-feed-trigger").on("click",function(){$(this);e=localStorage.getItem("my-sources"),$(".navbar-view, .build-feed-trigger").addClass("hide"),$(".navbar-item").removeClass("navbar-item-active"),$(".news-list").html('<p class="loader"><i class="zmdi zmdi-spinner zmdi-hc-spin"></i></p>'),e?(l(),r(),m(),d()):window.location.reload()}),$(window).scroll(function(){100<$(window).scrollTop()?$(".to-top").removeClass("hide"):$(".to-top").addClass("hide")}),$(".navbar-item").on("click",function(){var e=$(this),s=e.attr("data-item");$(".navbar-item").removeClass("navbar-item-active"),e.addClass("navbar-item-active"),$(".view").addClass("hide"),$("."+s+"-view").removeClass("hide"),$(".navbar-view").removeClass("hide")}),$(".navbar-view-close").on("click",function(){$(".navbar-view, .build-feed-trigger").addClass("hide"),$(".navbar-item").removeClass("navbar-item-active")}),$(".font-style-choice").on("click",function(){var e=$(this);$(".font-style-choice").removeClass("font-style-active"),e.addClass("font-style-active"),e.hasClass("font-sans-serif")?($("main").addClass("sans-serif"),localStorage.setItem("font-style","sans")):($("main").removeClass("sans-serif"),localStorage.removeItem("font-style"))}),$(".font-size-choice").on("click",function(){var e=$(this),s=e.text();$(".font-size-choice").removeClass("font-size-active"),e.addClass("font-size-active"),localStorage.setItem("font-size",s),e.hasClass("font-size-xl")?f():e.hasClass("font-size-l")?h():e.hasClass("font-size-m")&&($(".news-headline, .news-lead").css("font-size","inherit"),$(".timestamp, .news-source").css("font-size",".7rem"),localStorage.removeItem("font-size"))}),$(".settings-theme .toggle").on("click",function(){$(".settings-theme .toggle-circle").toggleClass("toggle-highlight"),$("body, .navbar").toggleClass("night"),$(".settings-theme .toggle-circle").is(".toggle-highlight")?sessionStorage.setItem("theme","dark"):sessionStorage.removeItem("theme")}),$(".source-link-text").on("click",function(){var e=$(this),s=e.attr("data-source"),t=e.attr("data-direction");t?sessionStorage.setItem("textDirection",t):sessionStorage.removeItem("textDirection"),localStorage.setItem("source",s),window.location.reload()}),$(".load-more-button button").on("click",function(){$(this);t++,$(this).hasClass("latest-stories")?$.get("https://newsapi.org/v2/everything?sources="+e+"&pageSize=20&page="+t+"&apiKey=ab69fb9ba2d540aaabff5ec14e1f7e59",function(e){var s=e.articles;$.each(s,function(e,s){var t=s,a=t.title,i=t.description,n=t.publishedAt,n=new Date(n).toDateString(),o=null==t.urlToImage?"assets/img/skmmr-placeholder-80.jpg":t.urlToImage,l=t.url,r=t.source.name;$(".news-list").append('<section class="news-group"><a href="'+l+'"><div class="news-image"><img src="'+o+'"/></div></a><article class="news-text"><a href="'+l+'"><h1 class="news-headline">'+a+'</h1></a><p class="news-lead">'+i+'</p><footer class="meta"><div><small class="timestamp">'+n+'</small><small class="news-source">'+r+'</small></div><div class="news-social-share"><a class="twitter-share-button" href="https://twitter.com/intent/tweet?text='+a+"&url="+l+'&via=skmmrnews">Tweet</a></div></footer></article></section>')})}).done(function(){}):$(this).hasClass("top-stories")&&$.get("https://newsapi.org/v2/top-headlines?sources="+e+"&pageSize=20&page="+t+"&apiKey=ab69fb9ba2d540aaabff5ec14e1f7e59",function(e){var s=e.articles;$.each(s,function(e,s){var t=s,a=t.title,i=t.description,n=t.publishedAt,n=new Date(n).toDateString(),o=null==t.urlToImage?"assets/img/skmmr-placeholder-80.jpg":t.urlToImage,l=t.url,r=t.source.name;$(".news-list").append('<section class="news-group"><a href="'+l+'"><div class="news-image"><img src="'+o+'"/></div></a><article class="news-text"><a href="'+l+'"><h1 class="news-headline">'+a+'</h1></a><p class="news-lead">'+i+'</p><footer class="meta"><div><small class="timestamp">'+n+'</small><small class="news-source">'+r+'</small></div><div class="news-social-share"><a class="twitter-share-button" href="https://twitter.com/intent/tweet?text='+a+"&url="+l+'&via=skmmrnews">Tweet</a></div></footer></article></section>')})}).done(function(){})});var i,n=[];function o(){l(),r(),m(),c(),d()}function l(){$(".loader").removeClass("hide"),$(".news-list").html("")}function r(){$.get("https://newsapi.org/v2/top-headlines?sources="+e+"&pageSize=20&page="+t+"&apiKey="+s,function(e){var s=e.articles;$.each(s,function(e,s){var t=s,a=t.title,i=t.description,n=t.publishedAt,n=new Date(n).toDateString(),o=null==t.urlToImage?"assets/img/skmmr-placeholder-80.jpg":t.urlToImage,l=t.url,r=t.source.name;$(".news-list").append('<section class="news-group"><a href="'+l+'" target="_blank"><div class="news-image"><img src="'+o+'"/></div></a><article class="news-text"><a href="'+l+'" target="_blank"><h1 class="news-headline">'+a+'</h1></a><p class="news-lead">'+i+'</p><footer class="meta"><div><small class="timestamp">'+n+'</small><small class="news-source">'+r+'</small></div><div class="news-social-share"><a class="twitter-share-button" href="https://twitter.com/intent/tweet?text='+a+"&url="+l+'&via=skmmrnews">Tweet</a></div></footer></article></section>')})}).done(function(){$(".load-more-button").hide(),$("main").css({"padding-bottom":"5rem"}),c()})}function c(){$(".news-group").each(function(){var e=$(this).find(".news-text h1").text();new RegExp(/[\u0600-\u06FF\u0590-\u05FF]/).test(e)?$(this).find(".news-headline, .news-lead").addClass("rtl"):$(this).find(".news-headline, .news-lead").removeClass("rtl")})}function m(){sessionStorage.getItem("theme")&&($(".source-theme .toggle-circle").toggleClass("toggle-highlight"),$("body, .navbar, .navbar-view").addClass("night"))}function d(){var e;localStorage.getItem("font-size")&&("XL"==(e=localStorage.getItem("font-size"))?f():"L"==e&&h())}function h(){$(".news-headline").css("font-size","1.5rem"),$(".news-lead").css("font-size","1.2rem"),$(".timestamp, .news-source").css("font-size","1rem"),$(".font-size-choice").removeClass("font-size-active"),$(".font-size-l").addClass("font-size-active")}function f(){$(".news-headline").css("font-size","2rem"),$(".news-lead").css({"font-size":"1.5rem","line-height":"1.3"}),$(".timestamp, .news-source").css("font-size","1.2rem"),$(".font-size-choice").removeClass("font-size-active"),$(".font-size-xl").addClass("font-size-active")}$(".source-link-favorite").on("click",function(){var e=$(this),s=e.parent().prev(".source-link-text").attr("data-source"),t=e.next();e.parent().prev().text();e.addClass("hide"),t.removeClass("hide"),$(".build-feed-trigger").removeClass("hide"),n.push(s),mySources=n.join(","),localStorage.setItem("my-sources",mySources)}),$(".source-link-favorite-active").on("click",function(){var e=$(this),s=e.parent().prev(".source-link-text").attr("data-source"),t=e.prev();e.parent().prev().text();e.addClass("hide"),t.removeClass("hide"),$(".build-feed-trigger").removeClass("hide"),n.splice($.inArray(s,n),1),mySources=n,localStorage.setItem("my-sources",mySources)}),$(".search-learn-more").on("click",function(e){e.preventDefault(),$(".advanced-search-info").toggleClass("hide")}),i="",$(".search-basic-input").on("keyup",function(){i=$(".search-basic-input").val(),searchTerm=encodeURIComponent(i)}),$(".search-basic-submit").on("click",function(){$(".news-filter, .navbar-view").addClass("hide"),$(".navbar-item").removeClass("navbar-item-active"),$(".news-list").html(""),$(".news-list").html('<p class="loader"><i class="zmdi zmdi-spinner zmdi-hc-spin"></i></p>'),$.get("https://newsapi.org/v2/everything?q="+searchTerm+"&pageSize=100&sortBy=publishedAt&apiKey=ab69fb9ba2d540aaabff5ec14e1f7e59",function(e){e=e;$.each(e.articles,function(e,s){var t=s,a=t.title,i=t.description,n=t.publishedAt,n=new Date(n).toDateString(),o=null==t.urlToImage?"assets/img/skmmr-placeholder-80.jpg":t.urlToImage,l=t.url,r=t.source.name;$(".news-list").append('<section class="news-group"><a href="'+l+'" target="_blank"><div class="news-image"><img src="'+o+'"/></div></a><article class="news-text"><a href="'+l+'" target="_blank"><h1 class="news-headline">'+a+'</h1></a><p class="news-lead">'+i+'</p><footer class="meta"><div><small class="timestamp">'+n+'</small><small class="news-source">'+r+'</small></div><div class="news-social-share"><a class="twitter-share-button" href="https://twitter.com/intent/tweet?text='+a+"&url="+l+'&via=skmmrnews">Tweet</a></div></footer></article></section>')}),$(".loader").addClass("hide")},"json").done(function(){$(".load-more-button").show(),$(".load-more-button button").removeClass("top-stories").addClass("latest-stories"),$(".news-search-title").html("").append('Search: <span class="search-label">'+i+"</span>"),c()})})});