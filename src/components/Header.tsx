import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/auth";


export default function Header() {
    const myStyle = {
        textDecoration: "none",
        color: "#333"
    }

    const { loginStatus, logout, loggedUser } = useAuth();

    console.log("logged user:", loggedUser?.name);



    function capitalizeFirstLetterOfEachWord(str: string) {
        if (str == null) {
            console.log("name is null");
            return ""
        }
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }


    return (
        <>
            <div className="nav1">
                <h5>Cricket Blog</h5>

                <div className="d-flex">
                    <Link to="/" style={myStyle}> <h5>Home</h5> </Link>
                    {loginStatus ?
                        <Link to="/user/dashboard" style={myStyle}>
                            {/* {loggedUser && (<h5>
                                    {capitalizeFirstLetterOfEachWord(loggedUser.name)}
                            </h5>)} */}
                            <h5>
                                {loggedUser?.name ? capitalizeFirstLetterOfEachWord(loggedUser.name) : capitalizeFirstLetterOfEachWord("null")}
                            </h5>
                        </Link>
                        : <Link to="/login" style={myStyle}> <h5>Login</h5> </Link>}
                    {loginStatus ? <Link to="/login" onClick={logout} style={myStyle}><h5>Logout</h5></Link> : <Link to="/signup" style={myStyle}> <h5>Sign Up</h5> </Link>}
                </div>
            </div>
        </>
    )
}
