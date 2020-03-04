from jinja2 import StrictUndefined

from flask import Flask, render_template, request, flash, redirect, session, url_for
from flask_debugtoolbar import DebugToolbarExtension
from flask_cors import CORS

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

@app.route('/location') #all buildig types
def building_location():
    """Users select location of building"""
    
    return render_template("location.html")


@app.route('/building-type')
def building_type():
    """Allows users to select building type"""
    
    location = request.args.get('location')
    session['location'] = location
    print(session)
    return render_template("building.html")


@app.route('/redirect1') #only homeowners & commercial post request and then redirect to appropriate route
def redirect1():
    """Users select location of building"""
    

    building_type = request.args.get('building_type')
    session['building_type'] = building_type
    
    print(session)
    if building_type == 'renter':
        return redirect(url_for('home_efficient_products'))
    return render_template("solar-options.html")
    

@app.route('/redirect2') #only homeowners & commercial post request and then redirect to appropriate route
def redirect2():
    """Users select location of building"""
#if building_type = homeowner or building_type = commercial_property
    
    solar_type = request.args.get('solar_type')
    session['solar_type'] = solar_type
    print(session)

    if building_type == 'homeowner': #need to grab info from "redirect"
        return redirect(url_for('home_efficient_products'))
    return redirect(url_for('commercial_efficient_products'))

@app.route('/home-efficient-products') #only homes & renters
def home_efficient_products():
    """Users select what appliances and products they are interested in purchasing"""
    
    return render_template("home-products.html")

@app.route('/commercial-efficient-products') #only commercial buildings
def commercial_efficient_products():
    """Users select what appliances and products they are interested in purchasing"""
    
    return render_template("commercial-products.html")


@app.route('/results')
def results():
    """Presents summary and comments on cost payback/ carbon payback how to
    proceed with suggested products"""

    """ location / program info is pulled from the session here"""   

    
    cca = Program.query.filter_by(prog_area=session['location']).first()

    """solar options are pulled from session here """
    if session['building_type'] == 'homeowner' or session['building_type'] == 'commercial_property':
        solar = SolarIncentive.query.filter_by(solar_type=session['solar_type']).first()
    else:
        solar = None

  


    """product data is loaded below here"""
    washer = request.args.get('washer')
    dryer = request.args.get('dryer')
    dishwasher = request.args.get('dishwasher')
    refrigerator = request.args.get('refrigerator')
    ceiling_fan = request.args.get('ceiling_fan')
    furnace = request.args.get('furnace')
    thermostat = request.args.get('thermostat')
    lightulbs = request.args.get('lightulbs')
    boiler = request.args.get('boiler')
    airconditioner = request.args.get('lightulbs')

    """only display info about products listed in session"""
    session_prods = []
    home_product_list = [washer, dryer, dishwasher, refrigerator, ceiling_fan, 
                    furnace, thermostat, lightulbs]

    comm_product_list = [washer, boiler, dishwasher, airconditioner, thermostat]

    if session['building_type'] == 'homeowner' or session['building_type'] == 'renter':
        for product in home_product_list:
            if product != None:
                session[product] = str(product)
                prod= Product.query.filter_by(product_type=str(product)).filter_by(product_category='home').first()
                session_prods.append(prod)
                print(session_prods)
                
    else:
        for product in comm_product_list:
            if product != None:
                session[product] = str(product)
                prod= Product.query.filter_by(product_type=str(product)).filter_by(product_category='comm').first()
                session_prods.append(prod)
                print(session_prods)

    print(session_prods[0].product_link)
    return render_template("results.html",
                            cca=cca,
                            solar=solar,
                            session_prods=session_prods)
    


@app.route("/homepage")
def homepageJS():
    return render_template("homepage-JS.html")

@app.route("/App")
def PocketEnergy():
    return render_template("App.html")

@app.route("/Thinking", methods = ['POST'])
def thinking():
    print("Let's get it poppin")
    print(request.form.get('washer'))
    
    return '!!!!!!!!!!!!!!!!!!!!!!!!'

@app.route("/results-js")
def results_js():
    print("Let's get it poppin")
    print(request.form.get('washer'))
    
    return jsonify({'!!!!!!!!!!!!!' : '!!!!!!!!!!!'})
    


if __name__ == "__main__":
    # We have to set debug=True here, since it has to be True at the point
    # that we invoke the DebugToolbarExtension

    # Do not debug for demo
    app.debug = False

    connect_to_db(app)

    # Use the DebugToolbar
    DebugToolbarExtension(app)

    app.run(host="0.0.0.0")