function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}
function validatePassword(password) {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=]/.test(password);

    return (
        password.length >= minLength &&
        hasUppercase &&
        hasLowercase &&
        hasNumber &&
        hasSpecialChar
    );
}

function  useValideUser(user) {
    let isValidUser = true;

    // validate Name of User
    if (user.name > 100) {
        isValidUser = false;
    }

    //validate Name of Email
    if (!validateEmail(user.email)) {
        isValidUser = false;
    }

    //validate Name of Password
    if (!validatePassword(user.password)) {
        isValidUser = false;
    }

    if (isValidUser) {
        return user;
    }

    return null;
}
export default useValideUser;