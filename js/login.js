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

    const password = document.getElementById("signUpPassword").value;
    const confirmPassword = document.getElementById("signUpConfirmPassword").value;
    const confirmPasswordInput = document.getElementById("signUpConfirmPassword");

    if (password !== confirmPassword) {
        confirmPasswordInput.setCustomValidity("Passwort stimmt nicht überein");
    } else {
        confirmPasswordInput.setCustomValidity("");
        setUserInfo();
    }

    confirmPasswordInput.addEventListener("input", function () {
        confirmPasswordInput.setCustomValidity(""); // Zurücksetzen der benutzerdefinierten Validierungsnachricht bei Änderung
    });
}


function setUserInfo() {
    let key = 'userInfo' + usermail;
    let username = document.getElementById("signUpName").value;
    let usermail = document.getElementById("signUpEmail").value;
    let userpassword = document.getElementById("signUpPassword").value;
    let userInfo = {
        name: username,
        email: usermail,
        password: userpassword
    };
    setItem(key, JSON.stringify(userInfo));
}


async function checkUserExist() {
    let usermail = document.getElementById("signUpEmail").value;
    let userInfo = await getItem('userInfo' + usermail);
    let userInfoMail = JSON.parse(userInfo.data.value).email;

}