from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
from api.models import db, User, bcrypt

app = Flask(__name__)

# CONFIG
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "super-secret-key"

db.init_app(app)
jwt = JWTManager(app)

# CORS
CORS(app, resources={r"/api/*": {"origins": "*"}})

with app.app_context():
    db.create_all()


# SIGNUP
@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"msg": "Faltan datos"}), 400

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"msg": "Usuario ya registrado"}), 400

    new_user = User(email=email)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Usuario creado correctamente"}), 201


# LOGIN
@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return jsonify({"msg": "Credenciales incorrectas"}), 401

    token = create_access_token(identity=str(user.id))

    return jsonify({
        "msg": "ok",
        "token": token,
        "user": user.serialize()
    }), 200


# PRIVATE
@app.route("/api/private", methods=["GET"])
@jwt_required()
def private():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)

    return jsonify({
        "msg": f"Hola {user.email}, este es contenido privado."
    }), 200


# RUN
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=True)
