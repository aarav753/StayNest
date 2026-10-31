
mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/standard",
    center: listing.geometry.coordinates,
    zoom: 9
});

const zoomBasedReveal = (value) => {
    return [
        "interpolate",
        ["linear"],
        ["zoom"],
        11, 0.0,
        13, value
    ];
};

map.on("style.load", () => {
    console.log("Map style loaded");

    map.setSnow({
        density: 0.85,
        intensity: 1.0,
        "center-thinning": 0.1,
        direction: [0, 50],
        opacity: 1.0,
        color: "#ffffff",
        "flake-size": 0.71,
        vignette: 0.3,
        "vignette-color": "#ffffff"
    });

    console.log("Snow settings:", map.getSnow());
});

const marker1 = new mapboxgl.Marker({ color: "red" })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h4>${listing.title}</h4>
                 <p>Exact location will be provided after booking</p>`
            )
    )
    .addTo(map);
