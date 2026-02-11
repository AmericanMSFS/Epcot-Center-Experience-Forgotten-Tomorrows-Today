const launchButton = document.getElementById("button");
const text = document.getElementById("text");

let watchId = null;
let zones = [];

function startExperience() {
    if (!navigator.geolocation) {
        text.textContent = "Geolocation is not supported by this browser.";
        return;
    }

    text.textContent = "Locating you...";

    watchId = navigator.geolocation.watchPosition(
        onSuccess,
        onError,
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 10000
        }
    );
}

function onSuccess(position) {
    const lat = position.coords.latitude.toFixed(6);
    const lon = position.coords.longitude.toFixed(6);

    text.innerHTML =
        `Latitude: ${lat}<br>` +
        `Longitude: ${lon}`;
}

function onError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            text.textContent = "Location access denied.";
            break;
        case error.POSITION_UNAVAILABLE:
            text.textContent = "Location information unavailable.";
            break;
        case error.TIMEOUT:
            text.textContent = "Location request timed out.";
            break;
        default:
            text.textContent = "An unknown error occurred.";
    }
}

launchButton.addEventListener("click", startExperience);
