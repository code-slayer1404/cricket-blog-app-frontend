import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "@/hooks/auth";

export default function PrivatePage(){
    const {loginStatus} = useAuth();
    return(
        <>
            <div style={{marginTop:"80px"}}>
                {loginStatus && (<Outlet></Outlet>)}
            </div>
        </>
    )
}

PrivatePage.propTypes={
    loginStatus : PropTypes.bool,
}