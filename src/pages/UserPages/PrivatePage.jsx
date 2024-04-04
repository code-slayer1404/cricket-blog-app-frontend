import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";

export default function PrivatePage({loginStatus}){
    return(
        <>
            {loginStatus && (<Outlet></Outlet>) }
        </>
    )
}

PrivatePage.propTypes={
    loginStatus : PropTypes.bool,
}