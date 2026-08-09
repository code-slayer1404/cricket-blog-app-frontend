import { JwtAuthResponse } from "@/types/dto/AuthDTO";
import { UserReadDTO } from "@/types/dto/UserDTO";

/**
 * Saves the login data to the local storage and executes the next function.
 * 
 * @param {JwtAuthResponse} loginData - The login response data (userDTO + token) to be saved to the local storage.
 * @param {Function} next - The function to be executed after saving the login data.
 * @returns {void}
*/

export function saveTokenAndUser(loginData: JwtAuthResponse) {
    localStorage.setItem("token", loginData.token);
    localStorage.setItem("user", JSON.stringify(loginData.user));
}

export function removeTokenAndUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

export function isLogged() {
    const token = localStorage.getItem("token");
    if (!token) { return false }

    // decode it to check the expiry
    const jwt = JSON.parse(atob(token.split('.')[1]));
    console.log(jwt);

    // Check if token is expired
    if (Date.now() >= jwt.exp * 1000) {
        console.error("Token expired");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return false;
    }
    return true;
}



export function getUserDetails(): UserReadDTO {

    const user = localStorage.getItem("user")
    if (user == null) {
        throw new Error("no user in storage")
    }
    return JSON.parse(user) as UserReadDTO;
}

