let users = [];
let popup = "";
let userPasswordChange = "";

function loggedIn(user) {
    if(user === 'guest'){
        window.location.href = "summary.html";
    }
    else{
        checkUserExist('logIn');
    }
}

function userLogin() {
    
    
}


function backToLogin() {
    window.location.href = "login.html";
    document.getElementById("signUp").classList.remove("d-none");
}


function changeCheckBox(id) {
    let box = document.getElementById(id);
    let isChecked = box.getAttribute('src') === "../img/Check button.svg";
    box.src = isChecked ? "../img/checkButtenChecked.svg" : "../img/Check button.svg";
    document.getElementById("signUpBtn").disabled = !isChecked;
}


function changeInputPasswordToTxt(idImg, idInput) {
    let imgBox = document.getElementById(idImg);
    let inputBox = document.getElementById(idInput);
    switch(imgBox.getAttribute('src')) {
        case "../img/lock.svg":
            imgBox.src = "../img/visibility_off.svg";
            break;
        case "../img/visibility.svg":
            imgBox.src ="../img/visibility_off.svg";
            inputBox.type = "password";
            break;
        case "../img/visibility_off.svg":
            imgBox.src ="../img/visibility.svg";
            inputBox.type = "text";
            break;
    }    
}


function signUp() {
    document.getElementById("signUp").classList.add("d-none");
    document.getElementById("loginBox").innerHTML = signUpTemplate();
}


function forgotPasswordView() {
    let loginBox = document.getElementById("loginBox");
    document.getElementById("signUp").classList.add("d-none");
    loginBox.classList.add("loginBoxWide");
    loginBox.classList.remove("loginBox");
    loginBox.innerHTML = forgotPasswordTemplate();
}


function resetPasswordView() {
    document.getElementById("loginBox").innerHTML = resetPasswordTemplate();
}


function validatePassword(view) {
    let password = document.getElementById(view + "Password").value;
    let confirmPassword = document.getElementById(view + "ConfirmPassword").value;
    let confirmPasswordInput = document.getElementById(view + "ConfirmPassword");
    passwordMatchOrNot(password, confirmPassword , confirmPasswordInput, view);
    emptyCustomValidity(confirmPasswordInput);
}


function passwordMatchOrNot(password, confirmPassword , confirmPasswordInput, view) {
    if (password !== confirmPassword) {
        confirmPasswordInput.setCustomValidity("Passwords do not match");
    } else {
        confirmPasswordInput.setCustomValidity("");
        validatePasswordPath(view);
    }
}


function validatePasswordPath(view) {
    if(view === "signUp") {
        checkUserExist(view);
    }
    else {
        resetPassword();
    }
}


function emptyCustomValidity(input) {
    input.addEventListener("input", function () {
        input.setCustomValidity("");
    });
}


async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
    }
}


async function register() {
    users.push(setUserInfo());
    await setItem('users', JSON.stringify(users));
}


function setUserInfo() {
    let username = document.getElementById("signUpName").value;
    let usermail = document.getElementById("signUpEmail").value;
    let userpassword = document.getElementById("signUpPassword").value;
    let userInfo = {
        name: username,
        email: usermail,
        password: userpassword
    };
    return userInfo;
}


function checkUserExist(view) {
    let usermailInput = document.getElementById(view + "Email");
    let usermail = usermailInput.value;
    let emailExists = users.some(user => user.email === usermail);
    checkUserExistWhichView(emailExists, view, usermailInput, usermail);
    emptyCustomValidity(usermailInput);
}


async function checkUserExistWhichView(emailExists, view, usermailInput, usermail) {
    if (emailExists && view === "signUp") {
        usermailInput.setCustomValidity("Email already exists!");
    } 
    else if(view === "signUp"){
        popup = 'You Signed Up successfully';
        await register();
        showSuccessMessage();
    }
    else if(!emailExists && (view === "forgotPassword" || view === "logIn")){     
        usermailInput.setCustomValidity("Email doesn't exist");
    }
    else if(view === "forgotPassword"){
        popup = "An Email has been sent to you";
        userPasswordChange = usermail;
        showSuccessMessage();
    }
    else {
        checkEmailPasswordCompatibility(usermail);
    }
    
}

function checkEmailPasswordCompatibility(usermail) {
    let logInPassword = document.getElementById("logInPassword").value;
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        if(user.email === usermail) {
            let userPassword = user.password
            checkPassword(userPassword, logInPassword);
        }
    }
}

function checkPassword(userPassword, logInPassword) {
    if (userPassword === logInPassword) {
        window.location.href = "summary.html"
    }
    else {
        let logInPasswordInput = document.getElementById("logInPassword");
        logInPasswordInput.setCustomValidity("Wrong password Ups! Try again.");
        emptyCustomValidity(logInPasswordInput);
    }
    
}


function showSuccessMessage() {
    let successDivContainer = document.createElement('div');
    successDivContainer.id = 'popup';

    let successDiv = document.createElement('div');
    successDiv.textContent = popup;
    successDiv.classList.add('btnDark');
    successDiv.classList.add('widthFit');
    successDiv.classList.add('popupAnimation');

    successDivContainer.appendChild(successDiv);

    document.body.appendChild(successDivContainer);
    setTimeoutPopup(successDivContainer);
}

function setTimeoutPopup(successDivContainer) {
    setTimeout(() => {
        successDivContainer.remove();
        if(popup === "An Email has been sent to you") {
            resetPasswordView()
        }
        else{
            backToLogin();            
        }        
    }, 1000);
}


function resetPassword() {
    let newPassword = document.getElementById("resetPassword").value;
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        if(userPasswordChange === user.email) {
            user.password = newPassword;
            break;
        }
    }
    setItem('users', JSON.stringify(users));
    popup = "You reset your password";
    showSuccessMessage();
}