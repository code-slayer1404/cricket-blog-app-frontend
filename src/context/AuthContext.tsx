import { createContext, ReactNode, useState } from "react";
import { getUserDetails, isLogged, saveTokenAndUser, removeTokenAndUser } from "@/lib/loginHelper";
import { JwtAuthResponse } from "@/types/dto/AuthDTO";
import { UserReadDTO } from "@/types/dto/UserDTO";

interface AuthContextType{
    loginStatus : boolean;
    loggedUser : UserReadDTO | null;
    persistLogin : (data:JwtAuthResponse)=>void;
    logout : ()=>void;
}

export const AuthContext = createContext<AuthContextType|null>(null)

export default function AuthProvider({children}:{children:ReactNode}){

    const [loginStatus, setLoginStatus] = useState(isLogged())
    const [loggedUser, setLoggedUser] = useState<UserReadDTO | null>(
        loginStatus ? getUserDetails() : null
    );

    function logout(){
        removeTokenAndUser();
        setLoginStatus(false)
    }

    function persistLogin(data:JwtAuthResponse){
        saveTokenAndUser(data)
        setLoginStatus(true)
        setLoggedUser(data.user)
    }

    const value = {loginStatus, loggedUser, persistLogin, logout}
    
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}