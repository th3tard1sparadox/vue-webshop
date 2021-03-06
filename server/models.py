import json
from flask_sqlalchemy import SQLAlchemy

from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

wishes = db.Table('wishes',
    db.Column('item_id', db.Integer, db.ForeignKey('item.item_id'), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True)
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    wishes = db.relationship('Item', secondary=wishes, backref='wishers')

    def __init__(self, email, password):
        self.email = email
        self.password = generate_password_hash(password, method='sha256')

    @classmethod
    def authenticate(cls, **kwargs):
        email = kwargs.get('email')
        password = kwargs.get('password')

        if not email or not password:
            return None

        user = cls.query.filter_by(email=email).first()
        if not user or not check_password_hash(user.password, password):
            return None

        return user

    def to_dict(self):
        return dict(id=self.id, email=self.email)


class Item(db.Model):
    id = db.Column('item_id', db.Integer, primary_key=True)
    name = db.Column('item_name', db.String(80))
    description = db.Column('item_desc', db.String(200))
    price = db.Column('item_price', db.Integer)
    picture = db.Column('item_picture', db.String(200)) # link to picture
    quantity = db.Column('quantity', db.Integer, nullable=False)
    displayed = db.Column('displayed', db.Boolean)
    reserved = db.Column('reserved', db.Integer)

    def __init__(self, name, description, price, picture, quantity=0, displayed=False):
        self.reserved = 0
        self.name = name
        self.quantity = quantity
        self.displayed = displayed
        self.description = description
        self.price = price
        self.picture = picture

    def increase_reserved(self, q):
        self.reserved += q

    def increase_quantity(self, q):
        self.quantity = self.quantity + q

    def decrease_quantity(self, q=1):
        # sanity checks are made outside of database
        self.quantity -= q
        self.reserved -= q
        if(self.quantity == 0):
            self.displayed = False

    def set_display(self):
        self.displayed = true

    def __repr__(self):
        return self.item_name
