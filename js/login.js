
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
    <form onsubmit="validatePassword(event)" class="widthLoginbox d-flex justify-content-center flex-column align-items-center">
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
            <input required type="password" placeholder="Password" id="password" pattern=".{8,}" title="Mindestens 8 Zeichen erforderlich"/>
            <div class="imgBox d-flex justify-content-center align-items-center">
            <img src="../img/lock.svg" alt="">
            </div>
        </div>
        <div class="inputFields m-32 d-flex justify-content-between align-items-center" >
            <input required type="password" placeholder="Confirm Password" id="confirm_password" pattern=".{8,}" title="Mindestens 8 Zeichen erforderlich"/>
            <div class="imgBox d-flex justify-content-center align-items-center">
            <img src="../img/lock.svg" alt="">
            </div>
        </div>
        <div class="rememberForgot m-32 d-flex justify-content-evenly align-items-center">
            <div class="d-flex gap-3" >
                <div class="imgBox">
                    <img id="checkSignIn" onclick="changeCheckBox('checkSignIn')" class="curserPointer" src="../img/Check button.svg" alt="">
                </div>            
                <span>I accept the <b class="blueFont">Privacy Policy</b></span>
            </div>
        </div>
        <button class="btnDark m-32">Sign up</button>
    </form>
    `;
}


function forgotPasswordTemplate() {
    let loginBox = document.getElementById("loginBox");
    document.getElementById("signUp").classList.add("d-none");
    loginBox.classList.add("loginBoxWide");
    loginBox.classList.remove("loginBox");
    loginBox.innerHTML = /*html*/ `
    <form onsubmit="resetPasswordTemplate()" class="d-flex justify-content-center align-items-center flex-column m-32">
        <div class="backImg">
            <img  onclick="backToLogin()" src="../img/Vector.svg" alt="">        
        </div> 
        <h1 class="h1WithBack">I forgot my password</h1>    
        <div class="separator m-32"></div>
        <span class="m-32">Don't worry! We will send you an email with the insturctions to reset your password.</span>
        <div class="inputFields m-32 d-flex justify-content-between align-items-center">
            <input required type="email" placeholder="Email"/>
            <div class="imgBox d-flex justify-content-center align-items-center">
            <img src="../img/mail.svg" alt="">
            </div>          
        </div>
        <button class="btnDark m-32">Send me the email</button>
    </form>
    `;
}


function resetPasswordTemplate() {
    document.getElementById("loginBox").innerHTML = /*html*/ `
    <form onsubmit="backToLogin()" class="d-flex justify-content-center align-items-center flex-column m-32">
        <div class="backImg">
            <img  onclick="backToLogin()" src="../img/Vector.svg" alt="">        
        </div> 
        <h1 class="h1WithBack">Reset your password</h1>
        <div class="separator m-32"></div>
        <span class="m-32">Change your account password</span>
        <div class="inputFields m-32 d-flex justify-content-between align-items-center">
            <input required type="password" placeholder="New Password" pattern=".{8,}" title="Mindestens 8 Zeichen erforderlich"/>
            <div class="imgBox d-flex justify-content-center align-items-center">
            <img src="../img/lock.svg" alt="">
            </div>
        </div>
        <div class="inputFields m-32 d-flex justify-content-between align-items-center">
            <input required type="password" placeholder="Confirm Password" pattern=".{8,}" title="Mindestens 8 Zeichen erforderlich"/>
            <div class="imgBox d-flex justify-content-center align-items-center">
            <img src="../img/lock.svg" alt="">
            </div>
        </div>
        <button class="btnDark m-32">Continue</button>
    </form>
    `;
}

function changeCheckBox(id) {
    let box = document.getElementById(id);
    if (box.getAttribute('src') === "../img/Check button.svg") {
        box.src = "../img/checkButtenChecked.svg";
    }
    else{
        box.src = "../img/Check button.svg";
    }
}

function validatePassword(event) {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;
    const confirmPasswordInput = document.getElementById("confirm_password");

    if (password !== confirmPassword) {
        confirmPasswordInput.setCustomValidity("Passwort stimmt nicht überein");
    } else {
        confirmPasswordInput.setCustomValidity("");
    }

    confirmPasswordInput.addEventListener("input", function () {
        confirmPasswordInput.setCustomValidity(""); // Zurücksetzen der benutzerdefinierten Validierungsnachricht bei Änderung
    });
}
