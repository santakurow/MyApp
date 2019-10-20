$(function(){

  function newsHTML(data, i) {
    var author = data.articles[i].author;
    var title = data.articles[i].title;
    var description = data.articles[i].description;
    var url = data.articles[i].url;
    var image = data.articles[i].urlToImage;
    var published = data.articles[i].publishedAt;
    var re = published.replace(/T/, " ").replace(/Z/, " ");

    var date = new Date(re);
    date.setHours(date.getHours() + 9);

    var html = `<a href="${url}" class="jump-to-url">
                  <li class="media headline" data-id=${i}>
                    <img src="${image}" mr-3 width="100" height="100" alt="">
                    <div class="media-body ml-3 news">
                      <h5 class="mt-0 mb-1 news__title">${title}</h5>
                      <p class="news__desc">${description}</p>
                      <p class="news__published">${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:00</p>
                    </div>
                  </li>
                </a>`
    
    return html;
  }

  var urls = {
    tech: "https://newsapi.org/v2/top-headlines?country=jp&category=technology&apiKey=84da2395beae4e49885fd5a42b2f550b",
    business: "https://newsapi.org/v2/top-headlines?country=jp&category=business&apiKey=84da2395beae4e49885fd5a42b2f550b",
    entertainment: "https://newsapi.org/v2/top-headlines?country=jp&category=entertainment&apiKey=84da2395beae4e49885fd5a42b2f550b",
    health: "https://newsapi.org/v2/top-headlines?country=jp&category=health&apiKey=84da2395beae4e49885fd5a42b2f550b",
    science: "https://newsapi.org/v2/top-headlines?country=jp&category=science&apiKey=84da2395beae4e49885fd5a42b2f550b",
    sports: "https://newsapi.org/v2/top-headlines?country=jp&category=sports&apiKey=84da2395beae4e49885fd5a42b2f550b" 
  };

  function newsContent(url, news_kind) {
    $.ajax({
      url: url,
      dataType: "json",
      type: "GET"
    })
    .done(function(data) {
      var innerHTML = "";
      for(var i = 0; i < data.articles.length; i += 1) {
        innerHTML += newsHTML(data, i);
      }
      $(`#${news_kind}`).append(innerHTML);
    })
    .fail(function(data) {
  
    })
  }

  var tech_url = urls.tech;
  newsContent(tech_url, "tech");

  var business_url = urls.business;
  newsContent(business_url, "business");

  var science_url = urls.science;
  newsContent(science_url, "science");

  var health_url = urls.health;
  newsContent(health_url, "health");
})