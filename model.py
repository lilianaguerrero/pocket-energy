"""Models and database functions for Pocket Energy project."""

from flask_sqlalchemy import SQLAlchemy #imports SQLAlchemy

from collections import defaultdict


# This is the connection to the PostgreSQL database; we're getting
# this through the Flask-SQLAlchemy helper library. On this, we can
# find the `session` object, where we do most of our interactions
# (like committing, etc.)

db = SQLAlchemy()

#####################################################################
# Model definitions where classes = tables

class Measure(db.Model):
    """Energy conservation measures containing carbon_payback & cost_payback"""

    __tablename__ = 'conservation_measures'

    c_id = db.Column(db.Integer,
                    autoincrement = True,
                    primary_key = True)
    measure_name = db.Column(db.String(64), nullable = False)
    carbon_payback = db.Column(db.String(64), nullable = True)
    cost_payback = db.Column(db.String(64), nullable = True)


    def __repr__(self):
        """respresentation of the info"""

        return f"<Energy Conservation Measure = {self.measure_name}, Carbon Payback (months) = {self.carbon_payback}, Cost Payback (USD$) = {self.cost_payback}>"

class SolarIncentive(db.Model):
    """Solar incentive programs containing rebates, for homeowners & commercial"""

    __tablename__ = "solar_incentives"

    sol_id = db.Column(db.Integer,
                        autoincrement = True,
                        primary_key = True)
    c_id = db.Column(db.Integer, db.ForeignKey('conservation_measures.c_id'))                                

    solar_type = db.Column(db.String(200),
                            nullable = False)

    rebate_link = db.Column(db.String(200),
                            nullable = True)

    solar_img = db.Column(db.String(200),
                            nullable = True)
    def __repr__(self):
        """respresentation of the info"""

        return f"Solar Type = {self.solar_type}, More Info On Available Rebates= {self.rebate_link}, Solar Image= {self.solar_img}"


class Product(db.Model):
    """Product reccomendations, for homeowners, commercial, and renters"""

    __tablename__ = "products"

    prod_id = db.Column(db.Integer,
                        autoincrement = True,
                        primary_key = True)
    c_id = db.Column(db.Integer, db.ForeignKey('conservation_measures.c_id'))
    product_category = db.Column(db.String(200),
                            nullable = False)
    product_type = db.Column(db.String(200),
                            nullable = False)
    product_brand = db.Column(db.String(200),
                            nullable = False)
    product_model = db.Column(db.String(200),
                            nullable = False)

    product_link = db.Column(db.String(200),
                            nullable = True)

    product_img = db.Column(db.String(200),
                            nullable = True)
    def __repr__(self):
        """respresentation of the info"""

        return f"Product Type = {self.product_type}, Brand = {self.product_brand}, Model = {self.product_model}, More Info = {self.product_link}, Pic = {self.product_img} "

class Program(db.Model):
    """General Efficiency programs,for homeowners, commercial, and renters"""

    __tablename__ = "programs"

    prog_id = db.Column(db.Integer,
                        autoincrement = True,
                        primary_key = True)
    c_id = db.Column(db.Integer, db.ForeignKey('conservation_measures.c_id'))

    prog_area = db.Column(db.String(64),
                            nullable = False)

    program_link = db.Column(db.String(64),
                            nullable = True)
    def __repr__(self):
        """respresentation of the info"""

        return f"Program Region = {self.prog_area}, More Info on Available Programs= {self.program_link}"

#####################################################################
# Helper functions

def connect_to_db(app):
    """Connect the database to our Flask app."""

    # Configure to use our PostgreSQL database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pocket_energy'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.app = app
    db.init_app(app)


if __name__ == "__main__":
    # As a convenience, if we run this module interactively, it will
    # leave you in a state of being able to work with the database
    # directly.

    from server import app
    connect_to_db(app)
    print("Connected to DB.")


    
