// ==== Variables ====
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const closeLogin = document.getElementById('close-login');
const closeRegister = document.getElementById('close-register');
const userArea = document.getElementById('user-area');
const cartCountEl = document.getElementById('cart-count');
const featuredProductsEl = document.getElementById('featured-products');

const products = [
    {id:1,name:"Phở gà kho",price:50000,img:"phogakho.jpg"},
    {id:2,name:"Phở bò",price:70000,img:"phobo.png"},
    {id:3,name:"Bún bò Huế",price:65000,img:"bunbohue.jpg"},
    {id:4,name:"Cơm gà xối mỡ",price:60000,img:"comgaxoimo.jpg"},
    {id:5,name:"Cơm sườn",price:70000,img:"comsuon.jpg"},
    {id:6,name:"Hủ tiếu khô",price:55000,img:"hutieukho.jpg"}
];

function renderFeaturedProducts() {
    featuredProductsEl.innerHTML = '';
    products.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.innerHTML = `
            <img src="images/${p.img}" alt="${p.name}">
            <h4>${p.name}</h4>
            <p>Giá: ${p.price.toLocaleString()}₫</p>
            <button onclick="addToCart(${p.id})">Thêm nhanh</button>
        `;
        featuredProductsEl.appendChild(div);
    });
}

let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let users = JSON.parse(localStorage.getItem('users')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateHeader() {
    if(currentUser) {
        userArea.innerHTML = `<span>Xin chào, ${currentUser.name}</span> | <button onclick="logout()">Đăng xuất</button> | <a href="history.html" style="color:white;">Lịch sử</a>`;
    } else {
        userArea.innerHTML = `<button id="login-btn">Đăng nhập</button> <button id="register-btn">Đăng ký</button>`;
        document.getElementById('login-btn').onclick = () => loginModal.style.display='block';
        document.getElementById('register-btn').onclick = () => registerModal.style.display='block';
    }
    cartCountEl.textContent = cart.length;
}

function addToCart(productId) {
    if(!currentUser) {
        alert("Vui lòng đăng nhập trước khi thêm món!");
        loginModal.style.display = 'block';
        return;
    }
    const prod = products.find(p=>p.id===productId);
    cart.push({...prod, quantity:1});
    localStorage.setItem('cart', JSON.stringify(cart));
    updateHeader();
}

document.getElementById('login-form').onsubmit = function(e){
    e.preventDefault();
    const email = this[0].value;
    const pass = this[1].value;
    const user = users.find(u=>u.email===email && u.password===pass);
    if(user){ currentUser=user; localStorage.setItem('currentUser',JSON.stringify(user)); alert("Đăng nhập thành công!"); loginModal.style.display='none'; updateHeader(); }
    else alert("Email hoặc mật khẩu không đúng!");
};

document.getElementById('register-form').onsubmit = function(e){
    e.preventDefault();
    const name = this[0].value;
    const email = this[1].value;
    const pass = this[2].value;
    const pass2 = this[3].value;
    if(pass!==pass2){ alert("Mật khẩu không khớp!"); return; }
    if(users.find(u=>u.email===email)){ alert("Email đã tồn tại!"); return; }
    const newUser={name,email,password:pass};
    users.push(newUser);
    localStorage.setItem('users',JSON.stringify(users));
    alert("Đăng ký thành công! Vui lòng đăng nhập.");
    registerModal.style.display='none';
};

function logout() {
    currentUser=null;
    localStorage.removeItem('currentUser');
    updateHeader();
}

closeLogin.onclick = ()=>loginModal.style.display='none';
closeRegister.onclick = ()=>registerModal.style.display='none';
window.onclick = function(event){ if(event.target==loginModal) loginModal.style.display='none'; if(event.target==registerModal) registerModal.style.display='none'; }

renderFeaturedProducts();
updateHeader();