# Dependencies
##################################################

from flask import (Flask, jsonify, render_template, send_file, url_for)
import os
import json
# Create an instance of Flask

app = Flask(__name__)

# index 

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route("/api/datasets", methods=['GET', 'POST'])
def datasets():
    return render_template('datasets.html')

@app.route("/api/zips", methods=['GET', 'POST'])
def download():
    with open('data/Zipcodes_Poly.geojson') as f:
        data = json.load(f)
        return data

@app.route("/api/business", methods=['GET', 'POST'])
def business():
    with open('data/restaurants.json') as b:
        business_data = json.load(b)
        return business_data

@app.route("/api/categories", methods=['GET', 'POST'])
def category():
    with open('data/categories.json') as c:
        category = json.load(c)
        return category

@app.route("/vis", methods=['GET', 'POST'])
def vis():
    return render_template('vis.html')

if __name__ == "__main__":
    app.run(debug=True)