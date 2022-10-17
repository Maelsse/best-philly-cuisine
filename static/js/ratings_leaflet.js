var myMap = L.map("ratingsmap", {
  center: [39.9864, -75.1563],
  zoom: 11
});
  

  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // Load the GeoJSON data.
  fetch("https://raw.githubusercontent.com/Maelsse/best-philly-cuisine/main/data/restaurants.json")
.then(response => {
   return response.json();
})
.then(function(data){
    let foodData = data.features;
  
    createMapFeatures(foodData);
  
});
  //----------------------------------------------------------------------------------------------------
  function createMapFeatures(foodData) {
  
    //--------------------------------------------------------------------------------------------------
    L.geoJson(foodData, {
      pointToLayer: set_pointToLayer_attributes,
      onEachFeature: set_onEachFeature_attributes     
    }).addTo(myMap);
  
    //--------------------------------------------------------------------------------------------------
    function set_pointToLayer_attributes(feature, latlng) {
      let rating = feature.properties.rating;
      let color = setMarkerColor(rating);
  
      let markerAttributes = {
      radius: (feature.properties.rating) * 3,
        fillColor: color,
        color: "black",
        weight: .75,
        opacity: 2,
        fillOpacity: 1
      }
      return L.circleMarker(latlng, markerAttributes);
    };
  
    //--------------------------------------------------------------------------------------------------
    function setMarkerColor(rating_) {
        switch (true) {
          case (rating_ == 3.5):
            return "purple";
          case (rating_ == 4.0):
            return "yellow";
          case (rating_ == 4.5):
            return "orange";
          case (rating_ == 5.0):
            return "blue";
          default:
            return "red";
        }
      };
  
// features-----------------------------------------------------------
    function set_onEachFeature_attributes(feature, layer){
      layer.bindPopup("<p>Name: " + feature.properties.name + "<br>" +
        "Location : " + feature.properties.address  + "<br>" +
        "City : " + feature.properties.city + "<br>" +
        "Zipcode : " + feature.properties.zip_code  + "<br>" +
        "Rating : " + feature.properties.rating + "<br></p>");
    };
// ratings---------------------------------------------------------
    let legend = L.control({ position: "topright" });
    legend.onAdd = function (myMap) {
      let div = L.DomUtil.create("div", "info legend"),
        r_ = [3.5, 4.0, 4.5, 5.0],
        labels = [];
  
      labels.push("<h7></h7><br>");
      for (let i = 0; i < r_.length; i++) {
        labels.push(
          '<li style="background:' + setMarkerColor(r_[i] + 1) + '">' +
          r_[i] + (r_[i + 1] ? '-' + r_[i + 1] + '<br>' : '+') + '</li>');
      }
  
      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
    };
  
    legend.addTo(myMap);
  
  };
  
