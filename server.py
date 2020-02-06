from jinja2 import StrictUndefined

from flask import Flask, render_template, request, flash, redirect, session
from flask_debugtoolbar import DebugToolbarExtension

from model import connect_to_db, db, Measure, SolarIncentive, Product, Program


app = Flask(__name__)

# Required to use Flask sessions and the debug toolbar
app.secret_key = "SHHHH"

# Normally, if you use an undefined variable in Jinja2, it fails silently.
# This is horrible. Fix this so that, instead, it raises an error.
app.jinja_env.undefined = StrictUndefined


@app.route('/')
def homepage():
    """Users select building type"""

    return render_template("homepage.html")

@app.route('/solar-options')
def solar_options():
    """Users select location of building"""
#if building_type = homeowner or building_type = commercial_property

    return render_template("solar.html")

@app.route('/location')
def building_location():
    """Users select location of building"""

    return render_template("location.html")

@app.route('/home-efficient-products')
def home_efficient_products():
    """Users select what appliances and products they are interested in purchasing"""
    
    return render_template("home-products.html")

@app.route('/commercial-efficient-products')
def commercial_efficient_products():
    """Users select what appliances and products they are interested in purchasing"""
    
    return render_template("commercial-products.html")

app.route('/results')
def efficient_products():
    """Presents summary and comments on cost payback/ carbon payback how to proceed with suggested products"""
    
    return render_template("results.html")



if __name__ == "__main__":
    # We have to set debug=True here, since it has to be True at the point
    # that we invoke the DebugToolbarExtension

    # Do not debug for demo
    app.debug = True

    connect_to_db(app)

    # Use the DebugToolbar
    DebugToolbarExtension(app)

    app.run(host="0.0.0.0")