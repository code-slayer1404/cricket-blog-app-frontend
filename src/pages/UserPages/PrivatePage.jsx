import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";

export default function PrivatePage({loginStatus}){
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