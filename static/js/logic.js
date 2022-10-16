// BEST PHILLY CUISINE

// Creating Map Object

var myMap = L.map("phillymap", {
  center: [39.9864, -75.1563],
  zoom: 11
});

// Adding tile layer

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


function buildMaps() {

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
  });
}

buildMaps();

function optionChanged(newSample) {
  updateLayers(newSample);

}


function onClick() {
  updateMetadata(newSample);
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
      Object.entries(restaurant).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
    }
  });
}

/* 
var cuisine = L.layerGroup(['Afghan', 'African', 'American(New)', 'Arabic', 'Argentine', 'Armenian', 'Asian Fusion', 'Australian', 'Austrian', 'Bangladeshi', 'Belgian', 'Brazilian', 'British', 'Burmese', 'Cambodian', 'Cantonese', 'Caribbean', 'Chinese', 'Colombian', 'Cuban', 'Dominican', 'Egyptian', 'Ethiopian', 'Filipino', 'French', 'German', 'Greek', 'Hainan', 'Haitian', 'Hawaiian', 'Himalayan/Nepalnese', 'Honduran', 'Iberian', 'Indian', 'Indonesian', 'Israeli', 'Italian', 'Japanese', 'Korean', 'Laotian', 'Latin American', 'Lebanese', 'Malaysian', 'Meditteranean', 'Mexican', 'Middle Eastern', 'Modern European', 'Mongolian', 'Moroccan', 'New Mexican Cuisine', 'Pakistani', 'Pan Asian', 'Peruvian', 'Polish', 'Portuguese', 'Poutineries', 'Puerto Rican', 'Russian', 'Salvadoran', 'Sardinian', 'Scandinavian', 'Shanghainese', 'Sicilian', 'Singaporean', 'South African', 'Southern', 'Spanish', 'Szechuan', 'Taiwanese', 'Thai', 'Trinidadian', 'Turkish', 'Ukrainian', 'Uzbek', 'Venezuelan', 'Vietnamese']);
var foodType = L.layerGroup(['Acai Bowls', 'Bagels', 'Bakeries', 'Barbeque', 'Bars', 'Bed & Breakfast', 'Bistros', 'Breakfasst & Brunch', 'Breweries', 'Bubble Tea', 'Buffets', 'Burgers', 'Cafes', 'Cajun/Creole', 'Cheesesteaks', 'Chicken Shop', 'Chicken Wings', 'Cocktail Bars', 'Coffee & Tea', 'Comfort Food', 'Creperies', 'Cupcakes', 'Delis', 'Desserts', 'Dim Sum', 'Diners', 'Donuts', 'Empanadas', 'Ethnic Food', 'Falafel', 'Fast Food', 'Fish & Chips', 'Food Court', 'Food Trucks', 'Fruits & Veggies', 'Gastropubs', 'Gelato', 'Halal', 'Hot Dogs', 'Hot Pot', 'Ice Cream & Frozen Yogurt', 'Internet Cafes', 'Irish Pub', 'Japanese Curry', 'Juice Bars & Smoothies', 'Kosher', 'Macarons', 'Noodles', 'Pizza', 'Pretzels', 'Pubs', 'Ramen', 'Restaurants', 'Salad', 'Sandwiches', 'Seafood', 'Smokehouse', 'Soul Food', 'Soup', 'Specialty Food', 'Steakhouses', 'Sushi Bars', 'Tacos', 'Tapas Bars', 'Tapas/Small Plates', 'Tea Rooms', 'Teppanyaki', 'Tex-Mex', 'Vegan', 'Vegetarian', 'Waffles']);
*/

function updateLayers(sample) {
  $('input[name=type_food]').click(function(){
    
  })

  var restaurants = "/api/business";
  d3.json(restaurants).then(function (data) {

  })

  d3.json(restaurants).then(function (data) {
    for (var i = 0; i < data.features.length; i++) {
      var resFil = data.features[i].properties;
      var r_lat = resFil.latitude;
      var r_lon = resFil.longitude;
      var r_name = resFil.name;
      /*  console.log(r_lat)
        console.log(r_lon)
        console.log(r_name) */
      L.marker([r_lat, r_lon])
        .bindPopup(`<h1>${r_name}</h1>`)
        .addTo(myMap)
      /* console.log(data.features[0].properties.latitude)
      /* console.log(restaurants.features) */
    };
  })
}