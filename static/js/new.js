/* BEST PHILLY CUISINE

STEPS: 

1: Function to build maps
2: Function to populate maps with clicked radio buttons (Create Layer Groups?)
3: Function to switch things around etc
*/

function buildMaps() {
    var myMap = L.map("phillymap", {
        center: [39.9864, -75.1563],
        zoom: 11
      });
  
      // Adding tile layer
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(myMap);
      
    var link = "/api/zips";
    // Getting our GeoJSON data
    d3.json(link).then(function (data) {
        // Creating a GeoJSON layer with the retrieved data
        L.geoJson(data, {
            // Passing in our style object
            style: function (feature) {
                return {
                    color: "white",
                    fillColor: "green",
                    fillOpacity: 0.5,
                    weight: 1.5
                };
            },
            onEachFeature: function (feature, layer) {
                // Set mouse events to change styling
                layer.on({
                    mouseover: function (event) {
                        layer = event.target;
                        layer.setStyle({
                            fillOpacity: 0.9
                        });
                    },
                    mouseout: function (event) {
                        layer = event.target;
                        layer.setStyle({
                            fillOpacity: 0.5
                        });
                    },
                    click: function (event) {
                        myMap.fitBounds(event.target.getBounds());
                    }
                });
                layer.bindPopup("<h1>" + feature.properties.Alias + "<hr>" + feature.properties.CODE)
            }
        }).addTo(myMap);
    })
};

buildMaps();

var baseMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

var layers = {
    foodType: new L.layerGroup(),
    cuisine: new L.layerGroup(),
}

var myMap = L.map("phillymap", {
    center: [39.9864, -75.1563],
    zoom: 11,
    layers: [
        layers.foodType,
        layers.cuisine
    ]
  });

baseMap.addTo(myMap)

var overlays = {
    "Food Type": layers.foodType,
    "Cuisine": layers.cuisine,
};

L.control.layers(null, overlays).addTo(myMap);

var info = L.control({
    position: "bottomright"
});

info.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    return div
}



/*
function init() {
    var selector = d3.select(#selDatset);
    var category = "/api/categories";
    d3.json(category).then(function (data){
        for (var i=0; i< data.length; i++){
            var categories = data.category 
        }
    })

};

init();

function optionChanged(newSample) {
    updateMetadata(newSample);
    updateMarkers(newSample);
};

// To be able to search through each category in a JS object to find what I need
// Then to be able to add it to that search function with a radio button? 
// What else? 

/* Layergroups 
- Retrieve a list of categories with d3 json
- */

function optionChanged(){
    updateMarkers(newSample)
    updateMetadata(newSample)
}

function updateMarkers(sample) {

};



function buildLayers(){
    var business = "/api/business";
    d3.json(business).then(function (data){
        for (var i = 0; i< data.features.length; i++) {
            var categories = data.features[i].properties.categories
            console.log(`check: ${categories} === 'Italian'`);
        }
    })
} 



function updateMetadata(sample) {
    var restaurants = "/api/business";
    d3.json(restaurants).then(function (data) {
      for (var i = 0; i < data.features.length; i++) {
        var restaurant = data.features[i].properties;
        var r_name = restaurant.name;
        var r_rating = restaurant.rating;
        var r_address = restaurant.address + restaurant.city + restaurant.zip_code
        console.log(`check: ${r_rating}`);
        var PANEL = d3.select("#sample-metadata");
        PANEL.html("");
        Object.entries(result).forEach(([key, value]) => {
          PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
      }
    });
  }
