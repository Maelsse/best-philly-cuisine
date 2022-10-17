// BEST PHILLY CUISINE

// Creating Map Object

var foodMarker = L.layerGroup([]);

var myMap = L.map("phillymap", {
  center: [39.9864, -75.1563],
  zoom: 11,
  layers: [foodMarker]
});

// Adding tile layer

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


function buildMaps() {
  var link = "https://raw.githubusercontent.com/Maelsse/best-philly-cuisine/main/data/Zipcodes_Poly.geojson";
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
        layer.bindPopup("<h1>" + feature.properties.Alias[0] + "<hr>" + feature.properties.CODE)
      }
    }).addTo(myMap);
  });
}

buildMaps();

function optionChanged() {
  updateLayers()
}
function onClick() {
  updateMetadata();
}

function updateMetadata() {
  var restaurants = "https://raw.githubusercontent.com/Maelsse/best-philly-cuisine/main/data/restaurants.json";
  d3.json(restaurants).then(function (data) {
    for (var i = 0; i < data.features.length; i++) {
      var restaurant = data.features[i].properties;
      var r_name = restaurant.name;
      var r_rating = restaurant.rating;
      var r_address = restaurant.address + restaurant.city + restaurant.zip_code
      console.log(`check: ${r_rating}`);
      var PANEL = d3.select("#sample-metadata");
      PANEL.html("");
      Object.entries(restaurant).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
    }
  });
}

function updateLayers(sample) {
  var restaurants = "https://raw.githubusercontent.com/Maelsse/best-philly-cuisine/main/data/restaurants.json";
  // be mindful of the spacings on the data
  d3.json(restaurants).then(function (data) {
    var features = data.features;
    var foodLayer = L.layerGroup([]).addTo(myMap);
    var optFood = $("input[name='type_food']:checked").val();
    $("input[name='type_food']").click(function () {
      function addMarkers(){
      var resultArray = features.filter(featuresObj => featuresObj.properties.categories.includes(optFood))
      resultArray.forEach(restaurant => {
        var resProp = restaurant.properties
        var res_name = resProp.name 
        var res_address = resProp.address + ", " + resProp.city + ", " + resProp.state + ", " + resProp.zip_code
        var res_lat = resProp.latitude
        var res_lon = resProp.longitude
        var foodMarker = L.marker([res_lat, res_lon])
        .bindPopup("<h3>" + res_name) //
        .addTo(foodLayer).on('click', function(e) {
          var PANEL = d3.select("#sample-metadata");
          PANEL.html("");
          Object.entries(resProp).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
          });
        });
      // console.log(restaurant)
      })
    }
    myMap.eachLayer((layer) => {
      if(layer['_latlng']!=undefined)
          layer.remove();
  });
    addMarkers();
  })
  
  var cuisineLayer = L.layerGroup([]).addTo(myMap);
  var optCuisine = $("input[name='type_cuisine']:checked").val();
  $("input[name='type_cuisine']:checked").click(function(){
    function addCuisineMarkers(){
      var resultArray = features.filter(featuresObj => featuresObj.properties.categories.includes(optCuisine))
      resultArray.forEach(restaurant => {
        var resProp = restaurant.properties
        var res_name = resProp.name 
        var res_address = resProp.address + ", " + resProp.city + ", " + resProp.state + ", " + resProp.zip_code
        var res_lat = resProp.latitude
        var res_lon = resProp.longitude
        var foodMarker = L.marker([res_lat, res_lon])
        .bindPopup("<h3>" + res_name)
        .addTo(cuisineLayer).on('click', function(e) {
          var PANEL = d3.select("#sample-metadata");
          PANEL.html("");
          Object.entries(resProp).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
          });
        });
      })
    }
    myMap.eachLayer((layer) => {
      if(layer['_latlng']!=undefined)
          layer.remove();
  });
  addCuisineMarkers();
})
  //  var typeFood = L.layerGroup(resultArray)
})
}
