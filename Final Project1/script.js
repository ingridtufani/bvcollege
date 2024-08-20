function sendLoginInfo() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Login successful!');
        } else {
            alert('Invalid username or password.');
        }
    })
    .catch(error => console.error('Error:', error));
}

function sendSigninInfo() {
    const username = document.getElementById('signin-username').value;
    const password = document.getElementById('signin-password').value;
    const name = document.getElementById('signin-name').value;
    const phone = document.getElementById('signin-phone').value;
    const email = document.getElementById('signin-email').value;
    const role = document.querySelector('input[name="role"]:checked').value;

    fetch('/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, name, phone, email, role }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Sign-in successful!');
        } else {
            alert('Sign-in failed. Please try again.');
        }
    })
    .catch(error => console.error('Error:', error));
}


// forgot password
function checkUsername() {
    const username = document.getElementById('forgot-username').value;

    fetch('/forgot-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); 
        if (data.success) {
            alert(`Your password is: ${data.password}`);
        } else {
            alert('Username does not exist.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

    return false; 
}

