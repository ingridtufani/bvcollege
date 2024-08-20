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

<<<<<<< Updated upstream:Final Project1/script.js

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
=======
// Forgot password

document.getElementById("forgotPasswordForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Evita o envio do formulário

    const emailInput = document.getElementById("forgot-password-email").value;
    const responseMessage = document.getElementById("responseMessage");

    // Faz uma requisição ao backend para verificar o e-mail
    fetch(`/recover-password?email=${encodeURIComponent(emailInput)}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Exibe a mensagem de sucesso no frontend e alerta ao usuário
                responseMessage.textContent = data.message;
                responseMessage.style.color = "green";
                alert("Password recovery email has been sent successfully!");
            } else {
                // Exibe a mensagem de erro no frontend
                responseMessage.textContent = data.message;
                responseMessage.style.color = "red";
                alert("Error: Email not found. Please try again.");
            }
        })
        .catch(error => {
            console.error("Erro:", error);
            responseMessage.textContent = "Ocorreu um erro. Tente novamente.";
            responseMessage.style.color = "red";
            alert("An error occurred. Please try again.");
        });
});
>>>>>>> Stashed changes:Final Project/script.js

