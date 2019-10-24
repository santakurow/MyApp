$(function(){


  function convert_japanese_weather_main(data, i, today_flag) {

    var conditions = { Clear: "晴れ", 
                       Clouds: "曇り", 
                       Rain: "雨", 
                       Snow: "雪", 
                       Drizzle: "霧雨", 
                       Thunderstorm: "雷", 
                       Mist: "靄(もや)", 
                       Smoke: "スモッグ",
                       Haze: "霞(かすみ)",
                       dust: "砂塵",
                       Fog: "霧",
                       Sand: "砂嵐",
                       Ash: "火山灰",
                       Squall: "突風",
                       Tornado: "竜巻" };

    if (!today_flag) {
      for (var x = 0; x < Object.keys(conditions).length; x += 1) {
        if (data.list[i].weather[0].main == Object.keys(conditions)[x]) {
            data.list[i].weather[0].main = conditions[Object.keys(conditions)[x]];
        }
      }
    }
    else {
      for (var x = 0; x < Object.keys(conditions).length; x += 1) {
        if (data.weather[0].main == Object.keys(conditions)[x]) {
            data.weather[0].main = conditions[Object.keys(conditions)[x]];
        }
      }
    }
  }

  var convert_japanese_city_name = function(city_name) {
    var citys = $("#city-name").data("citys");
    for (var i = 0; i < citys.length; i++) {
      if (city_name == citys[i].roman.toLowerCase()) {
        return citys[i].name;
      }
    }
  }

  var revers_convert_roman = function(city_name) {
    var citys = $("#city-name").data("citys");
    for (var i = 0; i < citys.length; i++) {
      if (city_name == citys[i].name) {
        return citys[i].roman;
      }
    }
  }


  var sample = function(hour) {
    switch(true) {
      // 早朝
      case 5 <= hour && hour <= 6:

      return "#17dbfe, #4d12bc";
      
      // 朝
      case 7 <= hour && hour <= 11:

      return "#abdcff, #0296ff";

      // 昼
      case 12 <= hour && hour <= 16:

      return "#63a1ff, #7cdbfe"; 

      // 夕方
      case 17 <= hour && hour <= 18:
        
      return "#ffd26e, #3676ff";

      // 夜
      case 19 <= hour && hour <= 23:

      return "#6b72ff, #000cff";

      // 深夜  
      case 0 <= hour && hour <= 4:
          
      return "#90218c, #009b90";
    }
  }

  function showDate() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var hour = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    var format = `${year}年${month}月${day}日`;
    $("#date p").text(format);

    $('.card').css("background", `linear-gradient(${sample(hour)})`);
  }


  function buildHTML(data, i) {
    var week = new Array("（日）","（月）","（火）","（水）","（木）","（金）","（土）");
    var date = new Date(data.list[i].dt_txt);
    date.setHours(date.getHours() + 9);
    var month = date.getMonth() + 1;
    var day = month + "月" + date.getDate() + "日" + week[date.getDay()] + date.getHours() + ":00";
    var icon = data.list[i].weather[0].icon;
    convert_japanese_weather_main(data, i, false);
    var html = `<div class="weather-report">
                  <img src="https://openweathermap.org/img/w/${icon}.png">
                  <div class="weather-report__date">${date.getHours() + ":00"}</div>
                  <div class="weather-report__main">${data.list[i].weather[0].main}</div>
                  <div class="weather-report__temp">${Math.round(data.list[i].main.temp)}℃</div>
                </div>`;
    return html;
  }

  function todayWeatherHTML(data) {
    var icon = data.weather[0].icon;
    convert_japanese_weather_main(data, 0, true);
    var weather = data.weather[0].main;
    var date = new Date;
    date.setHours(date.getHours() + 9);

    var html = `<div class="today-weather-report">
                  <div class="today-content">
                    <h4 class="today-header">現在の天気</h4>
                    <img src="https://openweathermap.org/img/w/${icon}.png" width="100" height="100" class="today-weather-report__icon">
                    <div class="today-weather-report__main">${weather}</div>
                    <div class="today-weather-report__temp">${Math.round(data.main.temp)}℃</div>
                  </div>
                </div>`;
    return html;
  }

 
  // ５日間の天気 (１週間の天気もあるようだがAPIが有料になるため割愛 ^^;）
  function showWeather(city_id, city_name, api_key) {

    // 日本語からローマ字に変換
    var city_conv_id = revers_convert_roman(city_id);
    if (revers_convert_roman(city_id) == undefined) {
      console.log("fail");
    }
    else {
      console.log(city_conv_id);
      var url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city_conv_id + ',jp&units=metric&lang=ja&APPID=' + api_key;
      $.ajax({
        url: url,
        dataType: "json",
        type: "GET"
      })
      .done(function(data){
        // console.log(city_name);
        var insertHTML = "";

        // 地域名の表示
        if (data.city.name == revers_convert_roman(city_name)) {
          // data.city.name = city_name;
          console.log(city_name);
          var cityName = `<h2>${city_name}</h2>`;
          $("#city-name").html(cityName);
        }
        
        // 3時間ごとの天気
        for (var i = 0; i <= 8; i += 1) {
          insertHTML += buildHTML(data, i);
        }
        $('#weather').html(insertHTML);
        $("#no-select").prop("disabled", true);
      })
      .fail(function(data){
        console.log("失敗しました");
      });
    }
  }

  // 今日の天気
  function showTodayWeather(city_id, city_name, api_key) {
    var city_conv_id = revers_convert_roman(city_id);
    if (revers_convert_roman(city_id) == undefined) {
      console.log("today fail")
    }
    else {
      var today_url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city_conv_id + ',jp&units=metric&lang=ja&APPID=' + api_key;
      $.ajax({
        url: today_url,
        dataType: "json",
        type: "GET"
      })
      .done(function(data) {
        var insertHTML = todayWeatherHTML(data);
        $('#today-weather').html(insertHTML);
        
      })
      .fail(function(data){
        
      });
    }
  }

  var API_KEY = "f7510bfde5d75e003a1eae68b3a7174a";
  var city_id = "渋谷区";
  var city_name = "渋谷区";

  // $(".custom-select").on("change", function(){
  //   if ($.trim($(this).val()) === "") {
  //   }
  //   else {
  //     city_id = $(this).val();
  //     city_name = $(".custom-select option:selected").text();
  //     showWeather(city_id, city_name, API_KEY);
  //     showTodayWeather(city_id, API_KEY);
  //     // console.log(city_id);
  //   }
  // });

  $(".search-btn").on("change", function(){
    if ($.trim($(this).val()) === "") {
    }
    else {
      city_id = $(this).val();
      city_name = $(this).val();
      showWeather(city_id, city_name, API_KEY);
      showTodayWeather(city_id, city_name, API_KEY);
      // console.log(city_id);
      
    }
  });

  showWeather(city_id, city_name, API_KEY);

  showTodayWeather(city_id, city_name, API_KEY);

  setInterval(showDate, 1000);

})