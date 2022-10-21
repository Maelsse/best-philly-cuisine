# Best Philly Cuisine Visualization Using Yelp Data Set


![Philly.jpg](static/img/Philly.jpg)


#### Contributors: 
Rosie Gianan, Myles Browne, Drew Blankenbiller, Mai Flynn, Ryan Kim, Nitin Kumar

####  Build with: 
Postgres, pgAdmin, Python, Pandas, csv files, json files, HTML, CSS, Flask API, leaflet, Bootstrap, Javascript, Visual Studio Code, Jupyter notebook 


Source Data: https://www.yelp.com/developers/documentation/v3/business


Restricted to Philadelphia only: [Zip Codes - Datasets - OpenDataPhilly](https://www.opendataphilly.org/dataset/zip-codes)


## Objectives:
Yelp is one of the most widely used restaurant and merchant information software across United States and provides us a comprehensive view about businesses, such as business information and location data, while also giving users an overall review score or ratings based on crowd sourced reviews. 


Our objective is to create an interactive web visualization that analyzes Philadelphia, PA food businesses using the available Yelp businesses json data and OpenDataPhilly. We wanted to only feature the top restaurants, so we are only analyzing and displaying the food businesses with at least a 3.5-star rating in their unique Philly neighborhood.
 
## Solution: 


We obtained our raw data from Yelp's business.json - Contains business data including location data, attributes, and categories


ETL:
Our Yelp json provided us with 14569 Philadelphia businesses. We extracted and renamed the columns needed for analysis, then cleaned up the data by dropping unnecessary listings that were not food businesses and only used desired attributes. We loaded our cleaned data in SQL and ran queries for cuisine type and food type. We then converted our data into a Geojson file to prepare for mapping. 


Mapping:
We used Leaflet to map out restaurants in the Philadelphia map. Our interactive map includes radio buttons for users to locate restaurants based on their cuisine preference, which pulls up restaurant information from the map pins. We also included our team's Recommendation List, where users can use an interactive carousel to narrow down their restaurant choices. 


