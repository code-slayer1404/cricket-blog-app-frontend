import { myAxios } from "./helper";

export  function signup(data){
    return myAxios.post("/api/auth/register",data).then(response=>response)
    //this response is already json. see response schema of axios
}
export function login(data){
    return myAxios.post("/api/auth/login",data).then(response=>response)
}