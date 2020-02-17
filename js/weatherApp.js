// location
// time
// temperature
// wind speed 
// humidty
// pressure 
// Sun up 
// sun down

let location = getLocation() => {
   
    function success(position) {
      const latitude  = position.coords.latitude.toFixed(2);
      const longitude = position.coords.longitude.toFixed(2);
  
      mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    }
  
    function error() {
      status.textContent = 'Unable to retrieve your location';
    }
  
    if (!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
  
  };

  console.log(location);
  

  var watchID = navigator.geolocation.watchPosition(function(position) {
    do_something(position.coords.latitude, position.coords.longitude);
  });