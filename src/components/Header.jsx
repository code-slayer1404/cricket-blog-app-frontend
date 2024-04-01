import { Link } from "react-router-dom";

export default function Header() {
    return (
        <>
            <div className="nav1">
                <h4 className="app-name">Cricket Blog</h4>
                <div className="d-flex">
                    <Link to="/" style={{ textDecoration: "none", color: "white" }}> <h5>Home</h5> </Link>
                    <Link to="/login" style={{ textDecoration: "none", color: "white" }}> <h5>Login</h5> </Link>
                    <Link to="/signup" style={{ textDecoration: "none", color: "white" }}> <h5>Sign Up</h5> </Link>
                    <h5>Logout</h5>
                </div>
            </div>
        </>
    )
}
