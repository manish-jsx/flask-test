from flask import Flask, request, jsonify

app = Flask(__name__)

# Simulated user database (replace with a real database in production)
users = {}

@app.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if username in users and users[username] == password:
        return jsonify({"message": "Login successful"})
    return jsonify({"message": "Login failed"}, 401)

if __name__ == '__main__':
    app.run(debug=True)
