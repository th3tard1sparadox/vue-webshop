import os
import stripe
from datetime import datetime, timedelta
from functools import wraps

from flask import Flask, jsonify, request, url_for, redirect, render_template
from flask_cors import CORS
from models import *

import jwt

# config
DEBUG = True

# app init
app = Flask(__name__)
# app.config.from_object(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./localdb.db'

# stripe init
stripe.api_key = 'sk_test_51KooyYKZBrT6aoPP4akBLCihOxEzz0K6kOZ9CGW8udYeUwqsxPBjuNYgnx0MKS5576Q6aybqqUtcx8lxLIWyUC7n00Ys7kfscb'

# database init
db.init_app(app)
with app.app_context():
    db.create_all()

# CORS init
CORS(app) # TODO: limit to specific origins

def token_required(f):
    @wraps(f)
    def _verify(*args, **kwargs):
        auth_headers = request.headers.get('Authorization', '').split()

        invalid_msg = {
            'message': 'Invalid token. Registeration and / or authentication required',
            'authenticated': False
        }
        expired_msg = {
            'message': 'Expired token. Reauthentication required.',
            'authenticated': False
        }

        if len(auth_headers) != 2:
            return jsonify(invalid_msg), 401

        try:
            token = auth_headers[1]
            data = jwt.decode(token, app.config['SECRET_KEY'])
            user = User.query.filter_by(email=data['sub']).first()
            if not user:
                raise RuntimeError('User not found')
            return f(user, *args, **kwargs)
        except jwt.ExpiredSignatureError:
            return jsonify(expired_msg), 401
        except (jwt.InvalidTokenError, Exception) as e:
            print(e)
            return jsonify(invalid_msg), 401

    return _verify

# ping test
@app.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify('pong')

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
                'path': '/stickers/' + str(product.id)
            }
        return jsonify(products_response)
    elif request.method == 'POST':
        print(request.data)
        p_id = request.get_json()
        product = Item.query.filter_by(id=p_id).first()
        return jsonify({
                'name': product.name,
                'picture': product.picture,
                'desc': product.description,
                'price': product.price,
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

    if not user:
        return jsonify({'message':'Invalid credentials', 'authenticated':False}), 401

    token = jwt.encode({
        'sub': user.email,
        'iat': datetime.utcnow(),
        'exp': datetime.utcnow() + timedelta(minutes=30)},
        app.config['SECRET_KEY'])
    return jsonify({ 'token': token.decode('UTF-8') })

@app.route('/profile', methods=['GET'])
@token_required
def profile(current_user):
    user = User.query.filter_by(id=current_user).first()
    return jsonify({'email': user.email})

@app.route('/sticker', methods=['GET'])
def sticker():
    return render_template('checkout.html')

@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    session = stripe.checkout.Session.create(
        line_items=[{
            'price_data': {
                'currency': 'sek',
                'product_data': {
                    'name': 'sticker',
                },
                'unit_amount': 500000,
            },
            'quantity': 1,
        }],
        mode='payment',
        success_url='https://localhost:3000/',
        cancel_url='https://localhost:3000/ping',
    )

    return redirect(session.url, code=303)

if __name__ == '__main__':
    app.run(port=4242)
