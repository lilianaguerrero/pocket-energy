from jinja2 import StrictUndefined

from flask import Flask, render_template, request, flash, redirect, session, url_for
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
    """Gives rundown of app & allows them to opt in"""

    return render_template("homepage.html")

@app.route('/location', methods=['GET','POST']) #all buildig types
def building_location():
    """Users select location of building"""
    

    return render_template("location.html")


@app.route('/building-type', methods=['GET','POST'])
def building_type():
    """Allows users to select building type"""
    location = request.form.get('location')

    return render_template("building.html")


@app.route('/redirect1', methods=['GET','POST']) #only homeowners & commercial post request and then redirect to appropriate route
def redirect1():
    """Users select location of building"""
#if building_type = homeowner or building_type = commercial_property
    building_type = request.form.get('building_type')
    

    if building_type == 'renter':
        return redirect(url_for('home_efficient_products'))
    return render_template("solar-options.html")
    

@app.route('/redirect2', methods=['GET','POST']) #only homeowners & commercial post request and then redirect to appropriate route
def redirect2():
    """Users select location of building"""
#if building_type = homeowner or building_type = commercial_property
    solar_option = request.form.get('solar_type')

    if building_type == 'homeowner': #need to grab info from "redirect"
        return redirect(url_for('home_efficient_products'))
    return redirect(url_for('commercial-efficient-products'))

@app.route('/home-efficient-products', methods=['GET','POST']) #only homes & renters
def home_efficient_products():
    """Users select what appliances and products they are interested in purchasing"""
    
    return render_template("home-products.html")

@app.route('/commercial-efficient-products', methods=['GET','POST']) #only commercial buildings
def commercial_efficient_products():
    """Users select what appliances and products they are interested in purchasing"""
    
    return render_template("commercial-products.html")


@app.route('/results', methods=['GET','POST'])
def results():
    """Presents summary and comments on cost payback/ carbon payback how to
    proceed with suggested products"""
    
    #look into data migration to add collumns, not needing to dropdb for every edits
    #index the location for efficient runtime
    #USE SESSION FOR COLLECTING INFORMATION!!!!!!!!!
    #START WITH DISPLAYING PRODUCT TYPES
    # location
    # solar_option
    product_types = request.form.get('product_types')
    print(product_types)


    # if building_type == 'renter' or building_type = 'homeowner': 
    #     for XXX in product_types:
    #     home_product = Product.query.with_entities(Product.product_category)

    return render_template("results.html",
                            product_types=product_types)



if __name__ == "__main__":
    # We have to set debug=True here, since it has to be True at the point
    # that we invoke the DebugToolbarExtension

    # Do not debug for demo
    app.debug = True

    connect_to_db(app)

    # Use the DebugToolbar
    DebugToolbarExtension(app)

    app.run(host="0.0.0.0")