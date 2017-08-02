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
if(navigator.geolocation) {
navigator.geolocation.getCurrentPosition(function(position) {
long = position.coords.longitude;
lat = position.coords.latitude;
$("#data").html("latitude:"+lat+"<br>longitude:"+long);
console.log(long,lat);
weather(lat, long);
});
};

// //version two
// $.getJSON("http://ip-api.com/json", function(data2){
//   lat = data2.lat;
//   long = data2.lon;

  //JSON call for Open weather API
  var weather = function(lat, lon){
  //=> trying to use another api
    // Openweatherapi key and api
    // var apiKey = "&appid=10ddf1a5e1f2aa9f4b606d5025f56ed5";
    // var api ='https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=' +lat+'&lon=' +long+ apiKey;
    var api = "https://fcc-weather-api.glitch.me/api/current?lat=" +lat+'&lon=' +long;
    //

    // //Darkskies api
    // var apiKey ="8fe3e553c2f7b48c94cdade366520eb2";
    // // https://api.darksky.net/forecast/8fe3e553c2f7b48c94cdade366520eb2/37.8267,-122.4233
    // var api = "https://api.darksky.net/forecast/8fe3e553c2f7b48c94cdade366520eb2/37.8267,-122.4233";
    $.getJSON(api,function(data){
      var weatherType= data.weather[0].description;
      //matching background to weather description
      if(weatherType =="clear sky"){
        $('body').css('background-image','url(https://farm5.staticflickr.com/4316/35810956960_7b8a39ad75_h.jpg)');//This link wrks
      }else if(weatherType =="few clouds"){
        $('body').css('background-image','url(https://farm5.staticflickr.com/4322/36203444075_b3b0b4a88c_h.jpg)');//This link wrks
      }else if(weatherType =="scattered clouds"){
        $('body').css('background-image','url(https://farm5.staticflickr.com/4316/35810956060_f3217c1dba_h.jpg)');//This link wrks
      }else if(weatherType =="broken clouds"){
        $('body').css('background-image','url(https://farm5.staticflickr.com/4306/36203442645_1aa47b94da_b.jpg)');//This link wrks
      }else if(weatherType =="shower rain"){
        $('body').css('background-image','url(https://farm5.staticflickr.com/4293/35810955130_3da21a141e_b.jpg)');//This link wrks
      }else if(weatherType =="rain"){
        $('body').css('background-image','url(https://farm5.staticflickr.com/4310/36203441755_63192dd4ab_b.jpg)');//This link wrks
      }else if(weatherType =="thunderstorm"){
        $('body').css('background-image','url(https://farm5.staticflickr.com/4321/35810954050_82183a271b_b.jpg)');//This link wrks
      }else if(weatherType =="snow"){
        $('body').css('background-image','url(https://farm5.staticflickr.com/4315/36203440875_12531c3b7d_b.jpg)');//This link wrks
      }else if(weatherType =="mist"){
        $('body').css('background-image','url(https://farm5.staticflickr.com/4321/36069119531_2c47513745_b.jpg)');//This link wrks
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
      // var kTemp= data.main.temp; => this was from the old weather Api
      var cTemp = data.main.temp;
      console.log(cTemp);
      // fTemp= (kTemp*(9/5)-459.67).toFixed(1);
      var fTemp = Math.round((cTemp*1.8)+32);

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
      var url = "https://crossorigin.me/http://openweathermap.org/img/w/" + iconChange + ".png";
      // Writing it to html
      $(".weather-icon").attr("src",iconChange);
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
