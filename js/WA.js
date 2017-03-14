$(document).ready(function() {
var long;
var lat;
//get location code from freeCodecamp = http://bit.ly/2nxT7pG
  if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(function(position) {
   long = position.coords.longitude;
   lat = position.coords.latitude;
  $("#data").html("latitude: " + lat+ "<br>longitude: " + long);

});
}

//JSON call for Open weather API
var api ="http://api.openweathermap.org/data/2.5/weather?q=30349,us&appid=32317440735df175bc0a92379a41137c";
   $.getJSON(api,function(data){

    //alert(data.coord.lat);
    console.log(api);
   });
 });
