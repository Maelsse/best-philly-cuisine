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

@app.route("/zips", methods=['GET', 'POST'])
def download():
    with open('data/Zipcodes_Poly.geojson') as f:
        data = json.load(f)
        return data

@app.route("/vis", methods=['GET', 'POST'])
def vis():
    return render_template('vis.html')

if __name__ == "__main__":
    app.run(debug=True)