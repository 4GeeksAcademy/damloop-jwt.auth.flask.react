from flask import Blueprint

# Crear el Blueprint principal de la API
api = Blueprint('api', __name__)

# Importar las rutas para que Flask las registre
from . import routes
