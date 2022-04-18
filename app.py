from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
from api import api

app = Flask(__name__)
CORS(app)

app.config.from_pyfile('base_config.py')
mongo = PyMongo(app)
app.db = mongo.db
app.register_blueprint(api)

if __name__ == '__main__':
    app.run(debug=True)
