let users = [];
let popup = "";


function loggedIn() {
    window.location.href = "summary.html";
}


function backToLogin() {
    window.location.href = "login.html";
    document.getElementById("signUp").classList.remove("d-none");
}


function changeCheckBox(id) {
    let box = document.getElementById(id);
    if (box.getAttribute('src') === "../img/Check button.svg") {
        box.src = "../img/checkButtenChecked.svg";
        document.getElementById("signUpBtn").disabled = false;
    }
    else{
        box.src = "../img/Check button.svg";
        document.getElementById("signUpBtn").disabled = true;
    }
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


function validatePassword(event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars (Seitenneuladen)
    let password = document.getElementById("signUpPassword").value;
    let confirmPassword = document.getElementById("signUpConfirmPassword").value;
    let confirmPasswordInput = document.getElementById("signUpConfirmPassword");
    if (password !== confirmPassword) {
        confirmPasswordInput.setCustomValidity("Passwords do not match");
    } else {
        confirmPasswordInput.setCustomValidity("");
        checkUserExistSignUp();
    }
    emptyCustomValidity(confirmPasswordInput);
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


async function checkUserExistSignUp() {
    let usermailInput = document.getElementById("signUpEmail");
    let usermail = usermailInput.value;
    let emailExists = users.some(user => user.email === usermail);
    if (emailExists) {
        usermailInput.setCustomValidity("Email already exists!");
    } else {
        usermailInput.setCustomValidity("");
        popup = 'You Signed Up successfully';
        await register();
        showSuccessMessage();
    }
    emptyCustomValidity(usermailInput);
}


function userExistForgotPassword(event) {
    event.preventDefault();
    let usermailInput = document.getElementById("forgotPasswordEmail");
    let usermail = usermailInput.value;
    let emailExists = users.some(user => user.email === usermail);
    if (!emailExists) {
        usermailInput.setCustomValidity("Email doesn't exist");
    } else {
        popup = "An Email has been sent to you";
        showSuccessMessage();
    }
    emptyCustomValidity(usermailInput);
}


function showSuccessMessage() {
    let successDivContainer = document.createElement('div');
    successDivContainer.id = 'popup';

    let successDiv = document.createElement('div');
    successDiv.textContent = popup;
    successDiv.classList.add('btnDark');
    successDiv.classList.add('widthFit');

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