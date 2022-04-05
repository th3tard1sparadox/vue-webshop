from flask import Flask, jsonify
from flask_cors import CORS

# config
DEBUG = True

# app init
app = Flask(__name__)
app.config.from_object(__name__)

# CORS
CORS(app, resources={r'/*': {'origins': '*'}})

# ping test
@app.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify('pong')

if __name__ == '__main__':
    app.run()
