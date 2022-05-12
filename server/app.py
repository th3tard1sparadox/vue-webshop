import os
import stripe
from datetime import datetime, timedelta
from functools import wraps

from flask import Flask, jsonify, request, url_for, redirect, render_template
from flask_cors import CORS
from models import *

from flask_jwt_extended import create_access_token, create_refresh_token, set_access_cookies, set_refresh_cookies, unset_jwt_cookies, jwt_required, JWTManager, get_jwt_identity

# config
DEBUG = True

# app init
app = Flask(__name__)
# app.config.from_object(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./localdb.db'
app.config['JWT_SECRET_KEY'] = 'abc123'
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_COOKIE_CSRF_PROTECT'] = False

# jwt init
jwt = JWTManager(app)

# stripe init
stripe_keys = {
    'secret_key': 'sk_test_51KooyYKZBrT6aoPP4akBLCihOxEzz0K6kOZ9CGW8udYeUwqsxPBjuNYgnx0MKS5576Q6aybqqUtcx8lxLIWyUC7n00Ys7kfscb',
    'publishable_key': 'pk_test_51KooyYKZBrT6aoPPcJXpMc0Yfw1djwju0OdtEeR1LmA1AxySmsWKBIhvbpq1R26SqKfj2EYrujqIug4E7iiHh0mM00NsBFiTGI',
}
stripe.api_key = stripe_keys['secret_key']

# database init
db.init_app(app)
with app.app_context():
    db.create_all()

# CORS init
CORS(app, origins=["http://localhost:3000", "http://localhost:5000"], allow_headers=["Content-Type", "Authorization", "Access-Control-Allow-Credentials"], supports_credentials=True)

# ping test
@app.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify('pong')

# stripe keys
@app.route('/get_key', methods=['GET'])
def get_publishable_key():
    stripe_config = {'publicKey': stripe_keys['publishable_key']}
    return jsonify(stripe_config)

@app.route('/products', methods=['GET', 'POST'])
def get_obj():
    if request.method == 'GET':
        products = []
        products = Item.query.filter_by(displayed=True)
        products_response = {}
        for product in products:
            products_response[product.id] = {
                'name': product.name,
                'picture': product.picture,
                'desc': product.description,
                'price': product.price,
                'path': '/stickers/' + str(product.id),
                'id': product.id
            }
        return jsonify(products_response)
    elif request.method == 'POST':
        p_id = request.get_json()
        product = Item.query.filter_by(id=p_id).first()
        return jsonify({
                'name': product.name,
                'picture': product.picture,
                'desc': product.description,
                'price': product.price,
                'path': '/stickers/' + str(product.id),
                'id': product.id
            })

@app.route('/', methods=['GET'])
def show_all():
    return render_template('show_all.html', items = Item.query.all())

@app.route('/add_item', methods=['GET', 'POST'])
def add_item():
    if request.method == 'POST':
        name = request.form['name']
        quantity = int(request.form['quantity'])
        try:
            displayed = request.form['displayed'] == 'on'
        except Exception:
            displayed = False
        description = request.form['description']
        price = request.form['price']
        picture = request.form['picture']
        item = Item(name, description, price, picture, quantity, displayed)
        db.session.add(item)
        db.session.commit()
        return redirect(url_for('show_all'))
    return render_template('temp_form.html')

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    user = User(**data)
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.authenticate(**data)

    if user:
        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)

        response = jsonify()
        set_access_cookies(response, access_token)
        set_refresh_cookies(response, refresh_token)
        return response, 201
    else:
        return jsonify(message="Unauthorized"), 401

@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    response = jsonify()
    unset_jwt_cookies(response)
    return response, 200

@app.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()
    return jsonify({'email': user.email}), 200

@app.route('/add_to_wishlist', methods=['POST'])
@jwt_required()
def add_to_wishlist():
    user_id = get_jwt_identity()
    p_id = request.get_json()
    user = User.query.filter_by(id=user_id).first()
    product = Item.query.filter_by(id=p_id).first()
    user.wishes.append(product)
    db.session.commit()
    return jsonify(p_id), 200

@app.route('/remove_from_wishlist', methods=['POST'])
@jwt_required()
def remove_from_wishlist():
    user_id = get_jwt_identity()
    p_id = request.get_json()
    user = User.query.filter_by(id=user_id).first()
    product = Item.query.filter_by(id=p_id).first()
    user.wishes.remove(product)
    db.session.commit()
    return jsonify(p_id), 200

@app.route('/wishlist', methods=['GET'])
@jwt_required()
def get_wishes():
    user_id = get_jwt_identity()
    products = []
    products = Item.query.filter(Item.wishers.any(id=user_id)).all()
    products_response = {}
    for product in products:
        products_response[product.id] = {
            'name': product.name,
            'picture': product.picture,
            'desc': product.description,
            'price': product.price,
            'path': '/stickers/' + str(product.id),
            'id': product.id
        }
    return jsonify(products_response)

@app.route('/sticker', methods=['GET'])
def sticker():
    return render_template('checkout.html')

@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    cart = request.get_json()
    session = stripe.checkout.Session.create(
        line_items = [{
                'name': item['name'],
                'quantity': item['quantity'],
                'currency': 'sek',
                'amount': item['price'] * 100,
            } for item in cart],
        mode='payment',
        success_url='http://localhost:3000/',
        cancel_url='http://localhost:3000/ping',
    )

    return jsonify({'sessionId': session['id']})

if __name__ == '__main__':
    app.run(port=4242)
