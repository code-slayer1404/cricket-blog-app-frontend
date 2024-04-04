import { Link } from "react-router-dom";
import { getUserDetails, logout } from "../auth/loginHelper";
import PropTypes from 'prop-types'

export default function Header({ loginStatus, updateLoginStatus }) {
    const myStyle ={
        textDecoration: "none",
        color: "white"
    }

    function localLogOut(){
        logout();
        updateLoginStatus();
    }

    return (
        <>
            <div className="nav1">
                <h4 className="app-name">Cricket Blog</h4>
                <div className="d-flex">
                    <Link to="/" style={myStyle}> <h5>Home</h5> </Link>
                    {loginStatus ? <Link to="/user/dashboard" style={myStyle}><h5>{getUserDetails().name}</h5></Link> : <Link to="/login" style={myStyle}> <h5>Login</h5> </Link>}
                    {loginStatus ? <Link to="/login" onClick={localLogOut} style={myStyle}><h5>Logout</h5></Link> : <Link to="/signup" style={myStyle}> <h5>Sign Up</h5> </Link>}
                </div>
            </div>
        </>
    )
}

Header.propTypes = {
    loginStatus: PropTypes.bool,
    updateLoginStatus: PropTypes.func
}
