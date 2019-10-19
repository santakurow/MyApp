$(function(){

  function newsHTML(data, i) {
    var author = data.articles[i].author;
    var title = data.articles[i].title;
    var description = data.articles[i].description;
    var url = data.articles[i].url;
    var image = data.articles[i].urlToImage;
    var published = data.articles[i].publishedAt;

    var html = `<a href="${url}" class="jump-to-url">
                  <li class="media headline" data-id=${i}>
                    <img src="${image}" mr-3 width="100" height="100" alt="">
                    <div class="media-body ml-3 news">
                      <h5 class="mt-0 mb-1 news__title">${title}</h5>
                      <p class="news__desc">${description}</p>
                    </div>
                  </li>
                </a>`
    re = new RegExp(published);
    console.log(re);
    return html;
  }

  var url = "https://newsapi.org/v2/top-headlines?country=jp&category=technology&apiKey=84da2395beae4e49885fd5a42b2f550b";
    $.ajax({
      url: url,
      dataType: "json",
      type: "GET"
    })
    .done(function(data) {
      // console.log(data.articles[0]);
      var innerHTML = "";
      for(var i = 0; i < data.articles.length; i += 1) {
        innerHTML += newsHTML(data, i);
      }
      $("#news").append(innerHTML);
    })
    .fail(function(data) {

    })

    // setInterval(reloadNews, 5000);
})