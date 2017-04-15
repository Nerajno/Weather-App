$(document).ready(function(){
var long;
var lat;
//get location code from freeCodecamp = http://bit.ly/2nxT7pG
  if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
  var long = position.coords.longitude;
  var lat = position.coords.latitude;
  $("#data").html("latitude:"+lat+"<br>longitude:"+long);
  //console.log(long);


});
}

//JSON call for Open weather API
var api ='http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=32317440735df175bc0a92379a41137c';
   $.getJSON(api,function(data){
    alert(data.coords.lat);
    console.log(api);
   //api.openweathermap.org/data/2.5/weather?lat=35&lon=139

 });
 });
