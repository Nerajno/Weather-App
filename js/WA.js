$(document).ready(function(){
var long;
var lat;
//get location code from freeCodecamp = http://bit.ly/2nxT7pG
  if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    long = position.coords.longitude;
    lat = position.coords.latitude;
  $("#data").html("latitude:"+lat+"<br>longitude:"+long);
  console.log(long,lat);

weather(lat, long);


});
}

//JSON call for Open weather API
var weather = function (lat, lon) {
    var api ='http://api.openweathermap.org/data/2.5/weather?lat=' +lat+'&lon=' +long+'&appid=10ddf1a5e1f2aa9f4b606d5025f56ed5';
       $.getJSON(api,function(data){
      //  alert(data.coords.lat);
        console.log(data);
       //api.openweathermap.org/data/2.5/weather?lat=35&lon=139

     });
}



 });
