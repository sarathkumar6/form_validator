const form = document.getElementById("registration-form");
const userName = document.getElementById("user-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
//https://www.the-art-of-web.com/javascript/validate-password
const passwordRegexPattern = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/);

//TODO: Add JS Doc 
function showError(inputElement, optionalErrMsg) {
    if (inputElement) {
        const formControl = inputElement.parentElement;
        const smallElement = formControl.querySelector('small');
        formControl.className = 'form-control error';
        smallElement.innerText = optionalErrMsg || `${inputElement.name} is required` ;
    }
}
//TODO: Add JS Doc
function showSuccess(inputElement) {
    if (inputElement) {
        const formControl = inputElement.parentElement;
        formControl.className = 'form-control success';
    }
}
//TODO: Add JS Doc
function validateUserName() {
    if (userName) {
        userName.value === '' ?
        showError(userName) : 
        showSuccess(userName);
    }
}
//TODO: Add JS Doc
function invalidOrEmptyInputValue(inputElemet, optionalErrMsg) {
    if (inputElemet) {
        inputElemet.value === '' ? 
        showError(inputElemet) :
        showError(inputElemet, optionalErrMsg);
    } 
}
//TODO: Add JS Doc
function validateEmail() {
    //https://ui.dev/validate-email-address-javascript/
    if (email) {
        const emailPatternRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        emailPatternRegex.test(email.value) ? 
        showSuccess(email) :
        invalidOrEmptyInputValue(email);
    }
}
//TODO: Add JS Doc
function validatePassword() {
    if (password) {
        passwordRegexPattern.test(password.value) ?
        showSuccess(password) :
        invalidOrEmptyInputValue(password);
    }
}
//TODO: Add JS Doc
function validateConfirmPassword() {
    if (passwordRegexPattern) {
        passwordRegexPattern.test(confirmPassword.value) &&
        confirmPassword.value === password.value ?
        showSuccess(confirmPassword) :
        invalidOrEmptyInputValue(confirmPassword, 'Password do not match');
    }
}


/**
 * Event propagation - A stack of events fired in a web browser
 * Say, you have a button which is wrapped inside a div and
 * both have some click handlers.
 * in this case clicking on the button will fire both button handler
 * and div handler
 * And this movement of events up from the most-nested element
 * is called Event Bubbling
 */
//TODO: Add JS Doc
form.addEventListener("submit", function(event) {
    const fieldValidationFuncList = [
        validateUserName,
        validateEmail,
        validatePassword,
        validateConfirmPassword
    ]
    event.preventDefault();

    fieldValidationFuncList.forEach(validationFunction => validationFunction());
});
