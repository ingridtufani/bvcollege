// forgot password
function checkUsername() {
    const email = document.getElementById('forgot-email').value;

    fetch('/forgot-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); 
        if (data.success) {
            alert('Email sent successfully!');
        } else {
            alert('Username does not exist.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

    return false; 
}

// Login and Sign in
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

function checkAvailability(username, email, phone) {
    return fetch('/check-availability', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, phone }),
    })
    .then(response => response.json());
}

function showError(inputId, errorMessage) {
    document.getElementById(inputId + '-error').textContent = errorMessage;
}

function clearError(inputId) {
    document.getElementById(inputId + '-error').textContent = '';
}

function validateUsername() {
    const username = document.getElementById('signin-username').value;
    if (username.trim() === '') {
        showError('username', 'Username cannot be empty.');
    } else {
        clearError('username');
        checkAvailability(username, null, null)
        .then(data => {
            if (!data.success && data.message.includes('Username')) {
                showError('username', 'Username already exists.');
            } else {
                clearError('username');
            }
        });
    }
}

function validateEmail() {
    const email = document.getElementById('signin-email').value;
    if (email.trim() === '') {
        showError('email', 'Email cannot be empty.');
    } else {
        clearError('email');
        checkAvailability(null, email, null)
        .then(data => {
            if (!data.success && data.message.includes('Email')) {
                showError('email', 'Email already exists.');
            } else {
                clearError('email');
            }
        });
    }
}

function validatePhone() {
    const phone = document.getElementById('signin-phone').value;
    if (phone.trim() === '') {
        showError('phone', 'Phone cannot be empty.');
    } else {
        clearError('phone');
        checkAvailability(null, null, phone)
        .then(data => {
            if (!data.success && data.message.includes('Phone')) {
                showError('phone', 'Phone number already exists.');
            } else {
                clearError('phone');
            }
        });
    }
}

function sendSigninInfo() {
    const username = document.getElementById('signin-username').value;
    const password = document.getElementById('signin-password').value;
    const name = document.getElementById('signin-name').value;
    const phone = document.getElementById('signin-phone').value;
    const email = document.getElementById('signin-email').value;
    const role = document.querySelector('input[name="role"]:checked').value;

    if (username.trim() === '' || email.trim() === '' || phone.trim() === '' || password.trim() === '') {
        alert('Please fill in all required fields.');
        return;
    }

    checkAvailability(username, email, phone)
    .then(data => {
        if (data.success) {
            return fetch('/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, name, phone, email, role }),
            });
        } else {
            alert(`Sign-in failed: ${data.message}`);
            throw new Error(data.message);
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Sign-in successful!');

            document.getElementById('signin-username').value = '';
            document.getElementById('signin-password').value = '';
            document.getElementById('signin-name').value = '';
            document.getElementById('signin-phone').value = '';
            document.getElementById('signin-email').value = '';
            document.querySelector('input[name="role"]:checked').checked = false;
            clearError('username');
            clearError('email');
            clearError('phone');
        } else {
            alert('Sign-in failed. Please try again.');
        }
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById('signin-username').addEventListener('input', validateUsername);
document.getElementById('signin-email').addEventListener('input', validateEmail);
document.getElementById('signin-phone').addEventListener('input', validatePhone);
