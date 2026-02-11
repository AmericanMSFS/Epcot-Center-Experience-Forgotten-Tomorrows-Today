const launchButton = document.getElementById("button");
const text = document.getElementById("text");

let watchId = null;
let zones = [
    {
        name: "Test Zone",
        polygon: [
            [-76.14465994414513, 36.520068852447494],
            [-76.14465994414513, 36.51504213727992],
            [-76.13625251076678, 36.51504213727992],
            [-76.13625251076678, 36.520068852447494],
            [-76.14465994414513, 36.520068852447494]
        ]
    },
];
let currentZone = null;

function findZone(lat, lon) {
    for (const zone of zones) {
        if (isPointInPolygon(lat, lon, zone.polygon)) {
            return zone;
        }
    }
    return null;
}

function pointInZoneCalc(lat,lon,polygon) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i][1], yi = polygon[i][0];
        const xj = polygon[j][1], yj = polygon[j][0];

        const intersect =
            ((xi > lat) != (xj > lat)) &&
            (lon < ((yj - yi) * (lat - xi)) / (xj - xi) + yi);

        if (intersect) inside = !inside;
    }
    return inside;
}

button.addEventListener("click", () => {
    if (!navigator.geolocation) {
        text.textContent = "Geolocation not supported.";
        return;
    }

    text.textContent = "Locating you...";

    navigator.geolocation.watchPosition(
        position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const zone = findZone(lat, lon);

            if (zone && (!currentZone || zone.name !== currentZone.name)) {
                currentZone = zone;
                text.innerHTML = `You are in <strong>${zone.name}</strong>`;
            }

            if (!zone && currentZone !== null) {
                currentZone = null;
                text.textContent = "You are not in a defined zone.";
            }
        },
        error => {
            text.textContent = "Location access denied or unavailable.";
        },
        {
            enableHighAccuracy: true
        }
    );
});
