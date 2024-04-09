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
export function isLogged(){
    return localStorage.getItem("data") != null;
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