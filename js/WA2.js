$(document).ready(function(){

  var long;
  var lat;
  var temp;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      long = position.coords.latitude;
      lat = position.coords.longitude;

      //Creating a weather API integrating the Open Weather API
     var api ='https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=10ddf1a5e1f2aa9f4b606d5025f56ed5';
      $.getJSON(api,function(data){
        //JSON call for Open weather API
        var kelvin = data.main.temp;
        var windSpeed=data.wind.speed;
        var city =data.name;

          console.log(api);
          console.log(city);
          console.log(windSpeed);
      });

    });

  }

});
