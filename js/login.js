function loggedIn() {
    window.location.href = "summary.html";
}


function signInTemplate() {
    document.getElementById("loginBox").innerHTML = `
    <h1>Sign Up</h1>
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
        <input required type="password" placeholder="Password"/>
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
    <div class="rememberForgot m-32 d-flex justify-content-evenly align-items-center">
        <div class="d-flex">
        <img src="../img/Check button.svg" alt="">
        <p>I accept the <b class="blueFont">Privacy Policy</b></p>
        </div>
    </div>
    <button onclick="loggedIn()" class="btnDark m-32">Sign up</button>
    `;
}

function forgotPasswordTemplate() {
    document.getElementById("loginBox").innerHTML = `
    <h1>I forgot my password</h1>
    <div class="separator m-32"></div>
    <p class="m-32">Don't worry! We will send you an email with the insturctions to reset your password.</p>
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
    document.getElementById("loginBox").innerHTML = `
    <h1>Reset your password</h1>
    <div class="separator m-32"></div>
    <p class="m-32">Change your account password</p>
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