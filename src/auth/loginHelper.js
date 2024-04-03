export function saveTokenAndUser(loginData,next){
    localStorage.setItem("data",JSON.stringify(loginData));
    next();
}

export function isLogged(){
    return localStorage.getItem("data") != null;
}

export function getUserDetails(){
    return JSON.parse(localStorage.getItem("data")).userDTO;
}
export function logout(){
    localStorage.removeItem("data");
}