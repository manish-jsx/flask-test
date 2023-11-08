from flask import Flask, request, jsonify

app = Flask(__name__)

# Simulated user database (replace with a real database in production)
users = {}

@app.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if username in users:
        return jsonify({"message": "User already exists"}), 400
    users[username] = password
    return jsonify({"message": "User registered successfully"})

if __name__ == '__main__':
    app.run(debug=True)
