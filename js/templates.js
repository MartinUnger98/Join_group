function signUpTemplate() {
    return /*html*/ `
    <div class="backImg positionAbsolute">
        <img  onclick="backToLogin()" src="../img/Vector.svg" alt="">
    </div> 
    <form onsubmit="validatePassword(event)" class="d-flex justify-content-center flex-column align-items-center">
        <h1 class="h1WithBack">Sign Up</h1>
        <div class="separator m-32"></div>
        <div class="inputFields m-32 d-flex justify-content-between align-items-center">
            <input id="signUpName" required type="text" placeholder="Name"/>
            <div class="imgBox d-flex justify-content-center align-items-center">
            <img src="../img/person.svg" alt="">
            </div>          
        </div>
        <div class="inputFields m-32 d-flex justify-content-between align-items-center">
            <input id="signUpEmail" required type="email" placeholder="Email"/>
            <div class="imgBox d-flex justify-content-center align-items-center">
            <img src="../img/mail.svg" alt="">
            </div>          
        </div>
        <div class="inputFields m-32 d-flex justify-content-between align-items-center">
            <input required id="signUpPassword" type="password" placeholder="Password" id="password" pattern=".{8,}" title="Mindestens 8 Zeichen erforderlich"/>
            <div class="imgBox d-flex justify-content-center align-items-center">
            <img onclick="changeInputPasswordToTxt('signUpPasswordImg', 'signUpPassword')" id="signUpPasswordImg" class="curserPointer" src="../img/lock.svg" alt="">
            </div>
        </div>
        <div class="inputFields m-32 d-flex justify-content-between align-items-center" >
            <input required id="signUpConfirmPassword" type="password" placeholder="Confirm Password" id="confirm_password" pattern=".{8,}" title="Mindestens 8 Zeichen erforderlich"/>
            <div class="imgBox d-flex justify-content-center align-items-center">
            <img onclick="changeInputPasswordToTxt('signUpConfirmPasswordImg', 'signUpConfirmPassword')" id="signUpConfirmPasswordImg" class="curserPointer" src="../img/lock.svg" alt="">
            </div>
        </div>
        <div class="rememberForgot m-32 d-flex justify-content-evenly align-items-center">
            <div class="d-flex gap-3" >
                <div class="imgBox">
                    <img id="checkSignUp" onclick="changeCheckBox('checkSignUp')" class="curserPointer" src="../img/Check button.svg" alt="">
                </div>            
                <span>I accept the <b class="blueFont">Privacy Policy</b></span>
            </div>
        </div>
        <button id="signUpBtn" disabled class="btnDark m-32">Sign up</button>
    </form>
    `;
}


function forgotPasswordTemplate() {
    return /*html*/ `
    <div class="backImg positionAbsolute">
        <img  onclick="backToLogin()" src="../img/Vector.svg" alt="">        
    </div> 
    <form onsubmit="resetPasswordView()" class="d-flex justify-content-center align-items-center flex-column m-32">
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
    return /*html*/ `
    <div class="backImg positionAbsolute">
        <img  onclick="backToLogin()" src="../img/Vector.svg" alt="">        
    </div> 
    <form onsubmit="backToLogin()" class="d-flex justify-content-center align-items-center flex-column m-32">        
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