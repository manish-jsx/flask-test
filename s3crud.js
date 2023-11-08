function uploadFileToS3() {
    const fileInput = document.getElementById('upload-file');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file to upload.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerText = data.message;
    })
    .catch(error => {
        console.error(error);
        alert('File upload failed.');
    });
}

function downloadFileFromS3() {
    const fileKey = document.getElementById('file-key').value;

    if (!fileKey) {
        alert('Please enter an S3 file key to download.');
        return;
    }

    // Create a download link for the file
    const downloadLink = document.createElement('a');
    downloadLink.href = `/download?key=${fileKey}`;
    downloadLink.download = 'downloaded-file';
    downloadLink.click();
}

function updateFileInS3() {
    const fileKey = document.getElementById('file-key').value;

    if (!fileKey) {
        alert('Please enter an S3 file key to update.');
        return;
    }

    // You can implement the update logic here
    alert('Update functionality not implemented in this example.');
}

function deleteFileFromS3() {
    const fileKey = document.getElementById('file-key').value;

    if (!fileKey) {
        alert('Please enter an S3 file key to delete.');
        return;
    }

    // Confirm the deletion
    if (confirm('Are you sure you want to delete this file from S3?')) {
        // Implement the delete logic here
        alert('Delete functionality not implemented in this example.');
    }
}
