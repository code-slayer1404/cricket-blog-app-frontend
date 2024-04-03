import { Link } from "react-router-dom";
import { getUserDetails, logout } from "../auth/loginHelper";
import PropTypes from 'prop-types'

export default function Header({ loginStatus }) {
    return (
        <>
            <div className="nav1">
                <h4 className="app-name">Cricket Blog</h4>
                <div className="d-flex">
                    <Link to="/" style={{ textDecoration: "none", color: "white" }}> <h5>Home</h5> </Link>
                    {loginStatus ? <h5>{getUserDetails().name}</h5> : <Link to="/login" style={{ textDecoration: "none", color: "white" }}> <h5>Login</h5> </Link>}
                    {loginStatus ? <a onClick={logout} href="/" style={{ textDecoration: "none", color: "white" }}><h5>Logout</h5></a> : <Link to="/signup" style={{ textDecoration: "none", color: "white" }}> <h5>Sign Up</h5> </Link>}
                </div>
            </div>
        </>
    )
}

Header.propTypes = {
    loginStatus: PropTypes.bool
}
