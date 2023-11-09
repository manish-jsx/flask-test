from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
app.static_folder = 'static'  # Set the static folder to 'static'
app.secret_key = 'your_secret_key'  # Change this to a secure secret key

# Configure your SQLite database URL (replace with your database file path)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db'

# Initialize the database

db = SQLAlchemy(app)

# Create a User model

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

# Simulated user creation (replace with real user registration)
def create_user(username, password):
    user = User(username=username, password=generate_password_hash(password))
    db.session.add(user)
    db.session.commit()

# Initialize the database
with app.app_context():
    db.create_all()

@app.route('/', methods=['GET', 'POST'])
def login():
    error = False  # Initialize the error variable

    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        user = User.query.filter_by(username=username).first()

        if user and check_password_hash(user.password, password):
            session['username'] = username  # Store the username in the session
            return redirect(url_for('dashboard'))
        else:
            return jsonify({"message": "User registration failed"}, 500)  # 500 indicates a server error


    return render_template('index.html', error=error)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        if not User.query.filter_by(username=username).first():
            create_user(username, password)
            return redirect(url_for('login'))
    
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    if 'username' in session:
        return render_template('index.html')
    else:
        return redirect(url_for('login'))
    

@app.route('/logout')
def logout():
    session.pop('username', None)  # Remove the username from the session
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run(debug=True)
