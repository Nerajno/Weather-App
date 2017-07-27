$(document).ready(function(){
  var long;
  var lat;
  var cTemp;
  var fTemp;

  //DATE AND TIME//
  //Converted into days, months, hours, day-name, AM/PM
  var dt = new Date()
  var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  $('#day').html(days[dt.getDay()]);

  //get location code from freeCodecamp = http://bit.ly/2nxT7pG
  //version one
  /*if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
  long = position.coords.longitude;
  lat = position.coords.latitude;
  $("#data").html("latitude:"+lat+"<br>longitude:"+long);
  //console.log(long,lat);
  weather(lat, long);
});
};*/

//version two
$.getJSON("http://ip-api.com/json", function(data2){
  lat = data2.lat;
  long = data2.lon;

  //JSON call for Open weather API
  var weather = function(lat, lon){
    var apiKey = "&appid=10ddf1a5e1f2aa9f4b606d5025f56ed5";
    var api ='http://api.openweathermap.org/data/2.5/weather?lat=' +lat+'&lon=' +long+ apiKey;
    $.getJSON(api,function(data){
      var weatherType= data.weather[0].description;
      //matching background to weather description
      if(weatherType =="clear sky"){
        $('body').css('background-image','url(https://static.pexels.com/photos/382085/pexels-photo-382085.jpeg)');//This link wrks
      }else if(weatherType =="few clouds"){
        $('body').css('background-image','url(https://static.pexels.com/photos/197505/pexels-photo-197505.jpeg)');//This link wrks
      }else if(weatherType =="scattered clouds"){
        $('body').css('background-image','url(https://static.pexels.com/photos/491573/pexels-photo-491573.jpeg)');//This link wrks
      }else if(weatherType =="broken clouds"){
        $('body').css('background-image','url(https://static.pexels.com/photos/464431/pexels-photo-464431.jpeg)');//This link wrks
      }else if(weatherType =="shower rain"){
        $('body').css('background-image','url(https://static.pexels.com/photos/7816/pexels-photo.jpg)');//This link wrks
      }else if(weatherType =="rain"){
        $('body').css('background-image','url(https://static.pexels.com/photos/516709/pexels-photo-516709.jpeg)');//This link wrks
      }else if(weatherType =="thunderstorm"){
        $('body').css('background-image','url(https://static.pexels.com/photos/496383/pexels-photo-496383.jpeg)');//This link wrks
      }else if(weatherType =="snow"){
        $('body').css('background-image','url(https://static.pexels.com/photos/488110/pexels-photo-488110.jpeg)');//This link wrks
      }else if(weatherType =="mist"){
        $('body').css('background-image','url(https://static.pexels.com/photos/487946/pexels-photo-487946.jpeg)');//This link wrks
      }else{
        $('body').css('background-image','url(https://static.pexels.com/photos/295028/pexels-photo-295028.jpeg)');//This link wrks
      }
      // experiment
      console.log(weatherType);

      //experiment weather decription
      var weatherId = data.weather[0].id;
      console.log(weatherId);

      //Temperature in Kelvin
      var tempSwap=true;
      var kTemp= data.main.temp;
      cTemp= (kTemp-273).toFixed(1);
      fTemp= (kTemp*(9/5)-459.67).toFixed(1);

      //temperature and you clicking on it to change between fTemp and cTemp
      $("#fTemp").html(fTemp + " &#x2109");
      $("#fTemp").click(function() {
        console.log(tempSwap);
        if(tempSwap===true){
          console.log(" mej");
          $("#fTemp").html(cTemp + " &#x2103");
          console.log('tempSwap was true, switching it to false');
          tempSwap=false;
        }
        else {
          $("#fTemp").html(fTemp + " &#x2109");
          console.log('tempSwap was false, switching it to true');
          tempSwap=true;
        }
      });

      //Other Stuff
      var windSpeed= data.wind.speed;
      var humidity = data.main.humidity;
      var pressure = data.main.pressure;
      var city = data.name;

      //To get and convert the time from UTC to actual/current time.
      //==> AM version
      var sunriseTime= new Date(1000 * data.sys.sunrise);
      sunriseTime= sunriseTime.getHours() + ":" + sunriseTime.getMinutes();
      //==> PM version
      var sunsetTime= new Date(1000 * data.sys.sunset);
      var sunsetHr = sunsetTime.getHours();
      if (sunsetHr <= 11){
        console.log("fix me please");
      }else(sunsetHr > 11)
      sunsetHr = sunsetHr -12;
      sunsetTime= sunsetHr + ":" + sunsetTime.getMinutes();

      //Change the icon based on the weather description icon
      // there has to be a shorter way todo this
      var iconChange = data.weather[0].icon;
      var url = "http://openweathermap.org/img/w/" + iconChange + ".png";
      // Writing it to html
      $(".weather-icon").attr("src",url);
      console.log(iconChange);
      console.log(api);

      //experiment 2
      if( weatherType == "scattered clouds"|| iconChange =="03d"){
        console.log("this is interstint");
      }else {
        console.log("crap");
      }

      //Writing them to Html
      $("#city").html(city);
      $("#weatherType").html(weatherType);

      //windspeed and its conversion to miles per hour
      windSpeed =(2.237*(windSpeed)).toFixed(1);
      $(".windSpeed").html(windSpeed + " mph");
      //humidity
      $(".humidity").html(humidity + " %");
      //air pressure
      $(".pressure").html(pressure + " hPa");

      //Sunset and sunriseTime
      $('.sunriseTime').html(sunriseTime + " am");
      $('.sunsetTime').html(sunsetTime + " pm");
      //DATE AND TIME//
      //Converted into days, months, hours, day-name, AM/PM
      //Understood it but it took too long to code.
      var dt = new Date()
      var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      $('#day').html(days[dt.getDay()]);
      var months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
      $('#date').html(months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear());
      $('#time').html((dt.getHours()>12?(dt.getHours()-12):dt.getHours()).toString() + ":" + ((dt.getMinutes() < 10 ? '0' : '').toString() + dt.getMinutes().toString()) + (dt.getHours() < 12 ? ' AM' : ' PM').toString());
    });
  };
  //calling the function
  weather(lat,long);
});

});
