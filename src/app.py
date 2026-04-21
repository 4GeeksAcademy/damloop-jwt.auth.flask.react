import os
from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from api.routes import api
from api.models import db

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

app = Flask(
    __name__,
    instance_path=os.path.join(BASE_DIR, "instance"),
    instance_relative_config=True
)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
Migrate(app, db)
CORS(app)

app.register_blueprint(api, url_prefix="/api")

with app.app_context():
    db.create_all()

@app.route("/")
def home():
    return "Backend funcionando correctamente"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=True)
