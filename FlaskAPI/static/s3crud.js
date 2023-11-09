require('dotenv').config();
const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

// Function to list files in the S3 bucket
function listFiles() {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME
    };

    s3.listObjects(params, (err, data) => {
        if (err) {
            console.error('Error listing files:', err);
            return;
        }

        data.Contents.forEach((file) => {
            console.log('File Key:', file.Key);
        });
    });
}

// Function to upload a file to S3
function uploadFile(filePath, s3Key) {
    const fileStream = fs.createReadStream(filePath);
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: s3Key,
        Body: fileStream
    };

    s3.upload(params, (err, data) => {
        if (err) {
            console.error('Error uploading file:', err);
            return;
        }
        console.log('File uploaded:', data.Location);
    });
}

// Function to download a file from S3
function downloadFile(s3Key, localFilePath) {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: s3Key
    };

    s3.getObject(params, (err, data) => {
        if (err) {
            console.error('Error downloading file:', err);
            return;
        }
        fs.writeFileSync(localFilePath, data.Body);
        console.log('File downloaded:', localFilePath);
    });
}

// Function to delete a file from S3
function deleteFile(s3Key) {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: s3Key
    };

    s3.deleteObject(params, (err, data) => {
        if (err) {
            console.error('Error deleting file:', err);
            return;
        }
        console.log('File deleted:', s3Key);
    });
}

// Call the listFiles function to display the initial list of files
listFiles();

// Usage examples:
// uploadFile('path/to/local/file.txt', 's3-key/file.txt');
// downloadFile('s3-key/file.txt', 'path/to/local/file.txt');
// deleteFile('s3-key/file.txt');
