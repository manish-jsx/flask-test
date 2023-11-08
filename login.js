function registerUser() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;

    const data = {
        username: username,
        password: password
    };

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerText = data.message;
    })
    .catch(error => {
        console.error(error);
        alert('User registration failed.');
    });
}

function loginUser() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const data = {
        username: username,
        password: password
    };

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerText = data.message;
    })
    .catch(error => {
        console.error(error);
        alert('Login failed.');
    });
}
