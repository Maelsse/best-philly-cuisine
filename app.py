#################################################
# Dependencies
##################################################

from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/philly_cuisine"
mongo = PyMongo(app)

#################################################
# Flask Routes
#################################################



if __name__ == "__main__":
    app.run(debug=True)