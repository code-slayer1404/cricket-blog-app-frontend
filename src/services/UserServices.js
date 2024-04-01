import { myAxios } from "./helper";

export default function signup(data){
    return myAxios.post("/api/auth/register",data).then(response=>response)
}