from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from src.api import api
from src.api.models import db, bcrypt

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
    app.config["JWT_SECRET_KEY"] = "super-secret-key"

    db.init_app(app)
    bcrypt.init_app(app)
    JWTManager(app)
    CORS(app)

    app.register_blueprint(api, url_prefix="/api")

    with app.app_context():
        db.create_all()

    return app

app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=True)
