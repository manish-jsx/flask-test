# Load environment variables from the .env file
load_dotenv()
import os
import boto3
from flask import Flask, request, jsonify
from botocore.exceptions import NoCredentialsError

from dotenv import load_dotenv

load_dotenv()
app = Flask(__name)

# Access environment variables using os.getenv()
S3_BUCKET_NAME = os.getenv('S3_BUCKET_NAME')
S3_REGION = os.getenv('S3_REGION')
S3_ACCESS_KEY = os.getenv('S3_ACCESS_KEY')
S3_SECRET_KEY = os.getenv('S3_SECRET_KEY')


# Configure AWS credentials and S3 client
s3 = boto3.client('s3', aws_access_key_id='YOUR_ACCESS_KEY', aws_secret_access_key='YOUR_SECRET_KEY')

@app.route('/')
def home():
    return "Hello, this is the root URL."


def check_s3_credentials():
    # Check if AWS S3 credentials are valid
    try:
        s3.head_bucket(Bucket=S3_BUCKET_NAME)
        return True
    except NoCredentialsError:
        return False

def upload_file_to_s3(file, file_name):
    # Upload a file to the S3 bucket
    if not check_s3_credentials():
        return jsonify({"message": "Invalid AWS credentials"}), 401

    try:
        s3.upload_fileobj(file, S3_BUCKET_NAME, file_name)
        return jsonify({"message": "File uploaded successfully"})
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@app.route('/upload', methods=['POST'])
def upload_file():
    # Handle file upload and save it to the user's S3 bucket
    # Ensure authentication and authorization for the user

    if 'file' not in request.files:
        return jsonify({"message": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"message": "No selected file"}), 400

    # Ensure unique file name, you can use the user's information to make it unique
    user_id = 'user123'  # Replace with the user's ID
    file_name = f"{user_id}_{file.filename}"

    return upload_file_to_s3(file, file_name)

@app.route('/download', methods=['GET'])
def download_file():
    # Download a file from the user's S3 bucket
    # Ensure authentication and authorization for the user

    file_name = 'user123_example.jpg'  # Replace with the user's file name
    if not check_s3_credentials():
        return jsonify({"message": "Invalid AWS credentials"}), 401

    try:
        response = s3.get_object(Bucket=S3_BUCKET_NAME, Key=file_name)
        return response
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@app.route('/update', methods=['PUT'])
def update_file():
    # Update a file in the user's S3 bucket
    # Ensure authentication and authorization for the user

    file_name = 'user123_example.jpg'  # Replace with the user's file name
    new_file_name = 'user123_updated.jpg'  # Replace with the new file name

    if not check_s3_credentials():
        return jsonify({"message": "Invalid AWS credentials"}), 401

    try:
        s3.copy_object(CopySource={'Bucket': S3_BUCKET_NAME, 'Key': file_name},
                       Bucket=S3_BUCKET_NAME, Key=new_file_name)
        return jsonify({"message": "File updated successfully"})
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@app.route('/delete', methods=['DELETE'])
def delete_file():
    # Delete a file from the user's S3 bucket
    # Ensure authentication and authorization for the user

    file_name = 'user123_example.jpg'  # Replace with the user's file name

    if not check_s3_credentials():
        return jsonify({"message": "Invalid AWS credentials"}), 401

    try:
        s3.delete_object(Bucket=S3_BUCKET_NAME, Key=file_name)
        return jsonify({"message": "File deleted successfully"})
    except Exception as e:
        return jsonify({"message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
