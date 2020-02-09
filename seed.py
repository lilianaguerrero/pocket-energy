"""this file holds information to be pushed into the data tables"""

import datetime, requests, os
from sqlalchemy import func

from model import Measure, SolarIncentive, Product, Program, connect_to_db, db
from server import app


# from model import User, Rating, Movie, connect_to_db, db
from server import app

def load_solar_incentives():
    print('Solar Incentives')
    file = open("seed_data/u.solarincentives")

    for row in file:
        row = row.rstrip()
        solar_type, rebate_link = row.split(' = ')

        solar_incentive = SolarIncentive(solar_type = solar_type,
                                        rebate_link = rebate_link)
        db.session.add(solar_incentive)
        db.session.commit()
    db.session.commit()




def load_products1():
    """Load products from u.products to database"""
    print('Products')
    file = open("seed_data/u.products1")


    for row in file:
        
        row = row.rstrip()
        product_category, product_type, product_route = row.split(" = ")

        url = 'https://data.energystar.gov/resource/' + product_route
            
        response = requests.get(url)
        data = response.json()
        

        top_3_products = [] #appends the keys & values for three products 
        counter = 0 #ensures only three results
        index = 0 
        for product in data: #loops over json string
            
            if data[index]['meets_most_efficient_criteria'] == 'Yes' and counter < 3: #if this is the most efficient product and there are less than three products in the list
                top_3_products.append(product['brand_name']) #add brand to product list
                top_3_products.append(product['model_number'])
                top_3_products.append('https://www.google.com/search?q=' + product['brand_name'] + '+' + product['model_number'])
                counter += 1 ##add one to the counter
            
                product_brand = top_3_products[0]
                product_model = top_3_products[1]
                product_link = top_3_products[2]

                product = Product(product_category = product_category,
                            product_type = product_type,
                            product_brand = product_brand,
                            product_model = product_model,
                            product_link = product_link)

                db.session.add(product)
                db.session.commit()

            index += 1
    db.session.commit()



def load_products2():
    """Load products from u.products to database"""
    print('Products')
    file = open("seed_data/u.products2")


    for row in file:
        
        row = row.rstrip()
        product_category, product_type, product_route = row.split(" = ")

        url = 'https://data.energystar.gov/resource/' + product_route
            
        response = requests.get(url)
        data = response.json()
        

        top_3_products = [] #appends the keys & values for three products 
        counter = 0 #ensures only three results
        index = 0
        for product in data: #loops over json string
            
            if counter < 3: #if this is the most efficient product and there are less than three products in the list
                top_3_products.append(product['brand_name']) #add brand to product list
                top_3_products.append(product['model_number'])
                top_3_products.append('https://www.google.com/search?q=' + product['brand_name'] + '+' + product['model_number'])
                counter += 1 ##add one to the counter


                product_brand = top_3_products[0]
                product_model = top_3_products[1]
                product_link = top_3_products[2]

                product = Product(product_category = product_category,
                            product_type = product_type,
                            product_brand = product_brand,
                            product_model = product_model,
                            product_link = product_link)

                db.session.add(product)
                db.session.commit()

            index += 1

    db.session.commit()
            
def load_programs():
    print('Utility Green Energy Programs')
    file = open("seed_data/u.programs")

    for row in file:
        row = row.rstrip()
        prog_area, program_link = row.split(' = ')

        program = Program(prog_area = prog_area,
                        program_link = program_link)
        db.session.add(program)
        db.session.commit()
    db.session.commit()



if __name__ == "__main__":
    connect_to_db(app)
    db.create_all()

    load_solar_incentives()
    load_products1()
    load_products2()
    load_programs()
    
    
