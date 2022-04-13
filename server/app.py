from flask import Flask, jsonify, request, url_for, redirect, render_template
from flask_cors import CORS
from models import *

# config
DEBUG = True

# app init
app = Flask(__name__)
app.config.from_object(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./localdb.db'

db.init_app(app)
with app.app_context():
    db.create_all()

# CORS
CORS(app) # TODO: limit to specific origins

# ping test
@app.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify('pong')

@app.route('/', methods=['GET'])
def show_all():
    return render_template('show_all.html', items = Item.query.all())

@app.route('/add_item', methods=['GET', 'POST'])
def add_item():
    if request.method == 'POST':
        name = request.form['name']
        quantity = int(request.form['quantity'])
        displayed = request.form['displayed'] == 'on'
        item = Item(name, quantity, displayed)
        db.session.add(item)
        db.session.commit()
        return redirect(url_for('show_all'))
    return render_template('temp_form.html')

if __name__ == '__main__':
    app.run()
