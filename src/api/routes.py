from flask import Blueprint, request, jsonify
from api.models import db, User
from api.utils import generate_token, decode_token

api = Blueprint("api", __name__)

# -------------------------
# SIGNUP
# -------------------------
@api.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"msg": "Email y contraseña requeridos"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "El usuario ya existe"}), 400

    new_user = User(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Usuario creado correctamente"}), 201


# -------------------------
# LOGIN
# -------------------------
@api.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return jsonify({"msg": "Credenciales incorrectas"}), 401

    token = generate_token(user.id)

    return jsonify({
        "token": token,
        "user": user.serialize()
    }), 200


# -------------------------
# RUTA PRIVADA
# -------------------------
@api.route("/private", methods=["GET"])
def private():
    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return jsonify({"msg": "Token requerido"}), 401

    token = auth_header.split(" ")[1]
    user_id = decode_token(token)

    if not user_id:
        return jsonify({"msg": "Token inválido"}), 401

    user = User.query.get(user_id)

    return jsonify({
        "msg": "Acceso autorizado",
        "user": user.serialize()
    }), 200
