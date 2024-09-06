document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!username || !email || !password) {
        alert('All fields are required.');
        return;
    }

    const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    });

    const result = await response.json();
    if (result.success) {
        alert('Registration successful!');
        document.getElementById('registerForm').reset();
    } else {
        alert('Registration failed: ' + result.message);
    }
});

// Password Strength Indicator
document.getElementById('password').addEventListener('input', function () {
    const password = this.value;
    const strength = document.getElementById('passwordStrength');

    let strengthText = '';
    let strengthColor = '';

    if (password.length < 6) {
        strengthText = 'Password too short';
        strengthColor = 'red';
    } else if (password.length < 12) {
        strengthText = 'Weak password';
        strengthColor = 'orange';
    } else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{12,}$/.test(password)) {
        strengthText = 'Strong password';
        strengthColor = 'green';
    } else {
        strengthText = 'Moderate password';
        strengthColor = 'yellow';
    }

    // Update the password strength indicator
    strength.textContent = strengthText;
    strength.style.color = strengthColor;
});
