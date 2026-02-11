const launchButton = document.getElementById('button');
const text = document.getElementById('text');

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(success, error);
    } else {
        text.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function success(position) {
  text.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
}

function error() {
  text.innerHTML = "Unable to retrieve your location.";
}
