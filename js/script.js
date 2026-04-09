const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const closeLogin = document.getElementById('close-login');
const closeRegister = document.getElementById('close-register');

loginBtn.onclick = () => loginModal.style.display = 'block';
registerBtn.onclick = () => registerModal.style.display = 'block';
closeLogin.onclick = () => loginModal.style.display = 'none';
closeRegister.onclick = () => registerModal.style.display = 'none';

window.onclick = function(event) {
    if (event.target == loginModal) loginModal.style.display = 'none';
    if (event.target == registerModal) registerModal.style.display = 'none';
}

