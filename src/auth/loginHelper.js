/**
 * Saves the login data to the local storage and executes the next function.
 * 
 * @param {Object} loginData - The login response data (userDTO + token) to be saved to the local storage.
 * @param {Function} next - The function to be executed after saving the login data.
 * @returns {undefined}
 */
export function saveTokenAndUser(loginData, next) {
    localStorage.setItem("data", JSON.stringify(loginData));
    next();
}

/**
 * Checks if the user is logged in.
 *
 * @returns {boolean} Returns true if the user is logged in, false otherwise.
 */
// export function isLogged(){
//     return localStorage.getItem("data") != null;
// }

export function isLogged() {
    const token = localStorage.getItem("data");
    if (token) {
        // decode it to check the expiry
        const jwt = JSON.parse(atob(token.split('.')[1]));

        // Check if token is expired
        if (Date.now() >= jwt.exp * 1000) {
            console.error("Token expired");
            localStorage.removeItem("data");
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}


/**
 * Retrieves the user details from local storage data.
 *
 * @return {Object} The userDTO object containing user details.
 */
export function getUserDetails(){
    return JSON.parse(localStorage.getItem("data")).userDTO;
}

/**
 * A function to log the user out by removing the "data" item from localStorage.
 *
 */
export function logout(next){
    localStorage.removeItem("data");
    next();
}