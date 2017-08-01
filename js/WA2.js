$(document).ready(function(){

  //http://api.wunderground.com/api/68ee56d9823cd2c2/geolookup/q/-122.395234,37.776289.json
  var long;
  var lat;
  var temp;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      long = position.coords.latitude;
      lat = position.coords.longitude;
      console.log(long, lat);
      //Creating a weather API integrating the Open Weather API
      //8ffc498530cba7a0
      var opener = '8ffc498530cba7a0';
      var api = "http://api.wunderground.com/api/45c5de8110e6170c/geolookup/q/" + long + "," + lat + ".json";
     //var api ='https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=10ddf1a5e1f2aa9f4b606d5025f56ed5';
       console.log(api);
      $.getJSON(api,function(data){
        console.log(data);
        //JSON call for Open weather API
        // var kelvin = data.main.temp;
        // var windSpeed=data.wind.speed;
        // var city =data.name;

        //   console.log(api);
        //   console.log(city);
        //   console.log(windSpeed);
      });

    });

  }

});
