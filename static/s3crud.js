// s3crud.js

// Initialize AWS Amplify with your AWS configuration
Amplify.configure({
    Auth: {
      // Configure your authentication settings
    },
    Storage: {
      AWSS3: {
        bucket: 'your-s3-bucket-name',
        region: 'your-s3-bucket-region',
      },
    },
  });
  
  function uploadFileToS3() {
    const fileInput = document.getElementById('upload-file');
    
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const fileKey = `uploads/${file.name}`;
  
      Storage.put(fileKey, file)
        .then(result => {
          // File uploaded successfully
          document.getElementById('response').textContent = 'File uploaded successfully.';
        })
        .catch(err => {
          console.error('Error uploading file:', err);
          document.getElementById('response').textContent = 'Error uploading file.';
        });
    }
  }
  
  function downloadFileFromS3() {
    const fileKey = document.getElementById('file-key').value;
  
    Storage.get(fileKey)
      .then(url => {
        // File found, you can provide a download link or display it
        document.getElementById('response').textContent = `File found: ${url}`;
      })
      .catch(err => {
        console.error('File not found or error:', err);
        document.getElementById('response').textContent = 'File not found or error.';
      });
  }
  
  function updateFileInS3() {
    const fileInput = document.getElementById('upload-file');
    const fileKey = document.getElementById('file-key').value;
  
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
  
      // Use the same key to overwrite the existing file
      Storage.put(fileKey, file)
        .then(result => {
          // File updated successfully
          document.getElementById('response').textContent = 'File updated successfully.';
        })
        .catch(err => {
          console.error('Error updating file:', err);
          document.getElementById('response').textContent = 'Error updating file.';
        });
    }
  }
  
  function deleteFileFromS3() {
    const fileKey = document.getElementById('file-key').value;
  
    Storage.remove(fileKey)
      .then(result => {
        // File deleted successfully
        document.getElementById('response').textContent = 'File deleted successfully.';
      })
      .catch(err => {
        console.error('Error deleting file:', err);
        document.getElementById('response').textContent = 'Error deleting file.';
      });
  }
  