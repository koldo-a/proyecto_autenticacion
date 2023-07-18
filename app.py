from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Configura la conexión a la base de datos MySQL
db = mysql.connector.connect(
    host='127.0.0.1',
    port='3306',
    user='root',
    password='estibaliZ1.',
    database='fullstack_bottega'
)

# Ruta para el registro de usuarios
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data['email']
    
    # Verifica si el usuario ya está registrado
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users WHERE email_users=%s", (email,))
    result = cursor.fetchone()
    
    if result is not None:
        return jsonify({'message': 'El usuario ya está registrado'}), 400
    
    # Inserta el nuevo usuario en la base de datos
    cursor.execute("INSERT INTO users (email_users) VALUES (%s)", (email,))
    db.commit()
    
    return jsonify({'message': 'Registro exitoso'}), 200

# Ruta para la autenticación de usuarios
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    
    # Verifica si el usuario existe en la base de datos
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users WHERE email_users=%s", (email,))
    result = cursor.fetchone()
    
    if result is None:
        return jsonify({'message': 'Usuario no encontrado'}), 404
    
    return jsonify({'message': 'Inicio de sesión exitoso'}), 200

# Ruta para el cierre de sesión
@app.route('/logout', methods=['GET'])
def logout():
    # Realiza las acciones necesarias para cerrar sesión, como limpiar las cookies o el estado de autenticación
    return jsonify({'message': 'Sesión cerrada exitosamente'}), 200

# Ruta para verificar el estado de autenticación
@app.route('/check-authentication', methods=['GET'])
def check_authentication():
    # Aquí puedes realizar la lógica para verificar si el usuario está autenticado o no
    # Puedes usar cookies, tokens u otros métodos de autenticación según tu implementación
    # En este ejemplo, simplemente devolvemos un estado de autenticación aleatorio para demostración
    is_authenticated = True  # Aquí debes implementar tu propia lógica de autenticación
    
    return jsonify({'isLoggedIn': is_authenticated}), 200


if __name__ == '__main__':
    app.run(debug=True)
