var location = null;
const launchButton = document.getElementById('button');
const text = document.getElementById('text');

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(success, error);
    } else {
        
    }
}