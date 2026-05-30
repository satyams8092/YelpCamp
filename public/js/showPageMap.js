// ✅ Guard against missing geometry
if (!campground.geometry || !campground.geometry.coordinates) {
    console.log('No geometry data for this campground');
} else {
    maptilersdk.config.apiKey = maptilerApiKey;

    const map = new maptilersdk.Map({
        container: 'map',
        style: maptilersdk.MapStyle.BRIGHT,
        center: campground.geometry.coordinates,
        zoom: 10
    });

    new maptilersdk.Marker()
        .setLngLat(campground.geometry.coordinates)
        .setPopup(
            new maptilersdk.Popup({ offset: 25 })
                .setHTML(`<h3>${campground.title}</h3><p>${campground.location}</p>`)
        )
        .addTo(map)
}