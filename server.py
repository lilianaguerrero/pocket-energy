from jinja2 import StrictUndefined

from flask import Flask, render_template, request, flash, redirect, session, url_for, jsonify
from flask_debugtoolbar import DebugToolbarExtension

from model import connect_to_db, db, Measure, SolarIncentive, Product, Program


app = Flask(__name__)

# Required to use Flask sessions and the debug toolbar
app.secret_key = "SHHHH"

# Normally, if you use an undefined variable in Jinja2, it fails silently.
# This is horrible. Fix this so that, instead, it raises an error.
app.jinja_env.undefined = StrictUndefined



@app.route("/")
def homepageJS():
    return render_template("homepage-JS.html")

@app.route("/App")
def PocketEnergy():
    return render_template("App.html")

@app.route("/results-js.json", methods = ['POST'])
def thinking():
    print("Let's go!")
   
    #testing area below
    
    for key in request.form.keys():
        for value in request.form.getlist(key):
            print(key, value)

    print(request.form.get('loc'))
    print(request.form.get('housingType'))


    # Location component info loaded below 
    
    ccag = Program.query.filter_by(prog_area=request.form.get('loc')).first()
    if ccag: 
        ccag = ccag.program_link
    

    # Solar component info handling loaded below
    print(request.form.get('solar'))
    solary = SolarIncentive.query.filter_by(solar_type=request.form.get('solar')).first()
    print(solary)
    if solary: 
        sol = solary.rebate_link
        solar_pic = solary.solar_img
    else:
        sol = ''
        solar_pic = ''


    """product data is loaded below here"""

    result_prods = {}
    for key in request.form:
        if request.form.get(key) == 'true':
            result_prods[key] = request.form.get(key)
    print(result_prods)


    session_prods = []
    for product in result_prods.keys():
        if request.form.get('housingType') == 'commercial_property':

            prod= Product.query.filter_by(product_type=product).filter_by(product_category='comm').first()
        else:
            prod= Product.query.filter_by(product_type=product).filter_by(product_category='home').first()
        session_prods.append(prod)
    print(session_prods)


    result = {'program_link': ccag, 'solar': sol, 'solar_pic': solar_pic}
    products = []
    for x in range(0, (len(session_prods))):
        current_results = {}
        current_results['product_img'] = session_prods[x].product_img, 
        current_results['product_type'] = session_prods[x].product_type,
        current_results['product_brand'] = session_prods[x].product_brand, 
        current_results['product_model'] = session_prods[x].product_model, 
        current_results['product_link'] = session_prods[x].product_link 
        products.append(current_results)
        print(current_results['product_link'])
    result['products'] = products
    return jsonify(result)



if __name__ == "__main__":
    # We have to set debug=True here, since it has to be True at the point
    # that we invoke the DebugToolbarExtension

    # Do not debug for demo
    app.run()

    connect_to_db(app)

    # Use the DebugToolbar
    DebugToolbarExtension(app)

    app.run(host="0.0.0.0")