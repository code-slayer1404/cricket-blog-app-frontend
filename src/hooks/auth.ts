import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export function useAuth(){
    const authCtx = useContext(AuthContext);
    if(!authCtx){
        throw new Error("useAuth must be used within AuthProvider")
    }
    return authCtx
}