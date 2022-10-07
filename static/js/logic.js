// BEST PHILLY CUISINE

// Creating Map Object

var myMap = L.map("phillymap", {
    center: [39.9526, -75.1652],
    zoom: 11
  });

// Adding tile layer

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use this link to get the GeoJSON data.
var link = "/zips";


// Getting our GeoJSON data
d3.json(link).then(function(data) {
  // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data, {
    // Passing in our style object
    style: function(feature) {
      return {
        color: "white",
        fillColor: "green",
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    onEachFeature: function(feature, layer) {
      // Set mouse events to change styling
      layer.on({
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
          mouseout: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.5
            });
          },
          click: function(event) {
            myMap.fitBounds(event.target.getBounds());
          }
      });
      layer.bindPopup("<h1>" + feature.properties.CODE)
    }
  }).addTo(myMap);
});


