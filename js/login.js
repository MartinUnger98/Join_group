
function loggedIn() {
    window.location.href = "summary.html";
}


function backToLogin() {
    window.location.href = "login.html";
    document.getElementById("signUp").classList.remove("d-none");
}


function signInTemplate() {
    document.getElementById("signUp").classList.add("d-none");
    document.getElementById("loginBox").innerHTML = /*html*/ `
    <div class="backImg">
        <img  onclick="backToLogin()" src="../img/Vector.svg" alt="">
    </div> 
    <form onsubmit="validatePassword()" class="d-flex justify-content-center flex-column align-items-center">
        <h1 class="h1WithBack">Sign Up</h1>
        <div class="separator m-32"></div>
        <div class="inputFields m-32 d-flex justify-content-between align-items-center">
            <input required type="text" placeholder="Name"/>
            <div class="imgBox d-flex justify-content-center align-items-center">
            <img src="../img/person.svg" alt="">
            </div>          
        </div>
        <div class="inputFields m-32 d-flex justify-content-between align-items-center">
            <input required type="email" placeholder="Email"/>
            <div class="imgBox d-flex justify-content-center align-items-center">
            <img src="../img/mail.svg" alt="">
            </div>          
        </div>
        <div class="inputFields m-32 d-flex justify-content-between align-items-center">
            <input required type="password" placeholder="Password" id="password"/>
            <div class="imgBox d-flex justify-content-center align-items-center">
            <img src="../img/lock.svg" alt="">
            </div>
        </div>
        <div class="inputFields m-32 d-flex justify-content-between align-items-center">
            <input required type="password" placeholder="Confirm Password" id="confirm_password"/>
            <div class="imgBox d-flex justify-content-center align-items-center">
            <img src="../img/lock.svg" alt="">
            </div>
        </div>
        <div class="rememberForgot m-32 d-flex justify-content-evenly align-items-center">
            <div class="d-flex">
            <img class="curserPointer" src="../img/Check button.svg" alt="">
            <span>I accept the <b class="blueFont">Privacy Policy</b></span>
            </div>
        </div>
        <button class="btnDark m-32">Sign up</button>
    </form>
    `;
}


function forgotPasswordTemplate() {
    document.getElementById("signUp").classList.add("d-none");
    document.getElementById("loginBox").innerHTML = /*html*/ `
    <div class="backImg">
        <img  onclick="backToLogin()" src="../img/Vector.svg" alt="">
        <h1>I forgot my password</h1>
    </div> 
    
    <div class="separator m-32"></div>
    <span class="m-32">Don't worry! We will send you an email with the insturctions to reset your password.</span>
    <div class="inputFields m-32 d-flex justify-content-between align-items-center">
        <input required type="email" placeholder="Email"/>
        <div class="imgBox d-flex justify-content-center align-items-center">
        <img src="../img/mail.svg" alt="">
        </div>          
    </div>
    <button onclick="resetPasswordTemplate()" class="btnDark m-32">Send me the email</button>
    `;
}


function resetPasswordTemplate() {
    document.getElementById("loginBox").innerHTML = /*html*/ `
    <h1>Reset your password</h1>
    <div class="separator m-32"></div>
    <span class="m-32">Change your account password</span>
    <div class="inputFields m-32 d-flex justify-content-between align-items-center">
        <input required type="password" placeholder="New Password"/>
        <div class="imgBox d-flex justify-content-center align-items-center">
        <img src="../img/lock.svg" alt="">
        </div>
    </div>
    <div class="inputFields m-32 d-flex justify-content-between align-items-center">
        <input required type="password" placeholder="Confirm Password"/>
        <div class="imgBox d-flex justify-content-center align-items-center">
        <img src="../img/lock.svg" alt="">
        </div>
    </div>
    `;
}

let password = document.getElementById("password");
let confirm_password = document.getElementById("confirm_password");

function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}