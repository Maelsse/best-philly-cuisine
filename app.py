# Dependencies
##################################################

from flask import (Flask, jsonify, render_template, send_file, url_for)
import os
import json
# Create an instance of Flask

app = Flask(__name__)

# index 

@app.route('/')
def index():
    return render_template('index.html')

# about
@app.route('/about')
def about():
    return render_template('about.html')

@app.route("/zips")
def download():
    with open('data/Zipcodes_Poly.geojson') as f:
        data = json.load(f)
        return data

if __name__ == "__main__":
    app.run(debug=True)