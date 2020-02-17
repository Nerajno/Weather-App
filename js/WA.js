$(document).ready(function(){
  let long;
  let lat;
  let cTemp;
  let fTemp;

  let dt = new Date();
  let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  $('#day').html(days[dt.getDay()]);


if(navigator.geolocation) {
navigator.geolocation.getCurrentPosition(function(position){
  long = position.coords.longitude.toFixed(2);
  lat = position.coords.latitude.toFixed(2);
$("#data").html("latitude:"+lat+"<br>longitude:"+long);
weather(lat, long);
});
}

let weather = function(lat, long){
    let api = "https://fcc-weather-api.glitch.me/api/current?lat="+lat+'&lon='+long;
    $.getJSON(api,function(data){
      let weatherType = data.weather[0].description;
      console.log(weatherType, data);
      
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

      let weatherId = data.weather[0].id;
      console.log(weatherId);
      
      let tempSwap=false;
      cTemp = (data.main.temp).toPrecision(2);
      fTemp = (cTemp * 9 / 5 + 32).toPrecision(2);
      
  
      

     
      $("#fTemp").html(fTemp + " &#x2109");
      $("#fTemp").click(function() {
        if(tempSwap===true){
          $("#fTemp").html(cTemp + " &#x2103");
          tempSwap=false;
        }
        else {
          $("#fTemp").html(fTemp + " &#x2109");
          tempSwap=true;
        }
      });


      let windSpeed= data.wind.speed;
      let humidity = data.main.humidity;
      let pressure = data.main.pressure;
      let city = data.name;

      //To get and convert the time from UTC to actual/current time.
      //==> AM version
      let sunriseTime= new Date(1000 * data.sys.sunrise);
      sunriseTime= sunriseTime.getHours() + ":" + sunriseTime.getMinutes();
      //==> PM version
      let sunsetTime= new Date(1000 * data.sys.sunset);
      let sunsetHr = sunsetTime.getHours();
      if (sunsetHr <= 11){
      }else(sunsetHr > 11);
      sunsetHr = sunsetHr -12;
      sunsetTime= sunsetHr + ":" + sunsetTime.getMinutes();

      //Change the icon based on the weather description icon
      let iconChange = data.weather[0].icon;
      let url = "https://crossorigin.me/http://openweathermap.org/img/w/" + iconChange + ".png";
      // Writing it to html
      $(".weather-icon").attr("src",iconChange);

      //experiment 2
      if( weatherType == "scattered clouds"|| iconChange =="03d"){
      }else {
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
      let dt = new Date();
      let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      $('#day').html(days[dt.getDay()]);
      let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      $('#date').html(months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear());
      $('#time').html((dt.getHours()>12?(dt.getHours()-12):dt.getHours()).toString() + ":" + ((dt.getMinutes() < 10 ? '0' : '').toString() + dt.getMinutes().toString()) + (dt.getHours() < 12 ? ' AM' : ' PM').toString());
    });
  };
  //calling the function
  weather(lat,long);
});
