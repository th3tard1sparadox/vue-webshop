import json
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Item(db.Model):
    # __tablename__ = "item"
    id = db.Column('item_id', db.Integer, primary_key=True)
    name = db.Column('item_name', db.String(80))
    quantity = db.Column('quantity', db.Integer, nullable=False)
    displayed = db.Column('displayed', db.Boolean)

    def __init__(self, name, quantity=0, displayed=False):
        self.name = name
        self.quantity = quantity
        self.displayed = displayed

    def increase_quantity(self, q):
        self.quantity = self.quantity + q

    def decrease_quantity(self, q=1):
        new_q = self.quantity - q
        if new_q < 0:
            return 'quantity too low' #TODO: real error handling
        self.quantity = new_q

    def __repr__(self):
        return self.item_name
