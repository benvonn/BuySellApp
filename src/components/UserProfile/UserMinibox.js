import React, { useState, useEffect, use } from "react";
import Login from "../userforms/login_form";
import Signupform from "../userforms/signup_form";
function UserMenu() {
    const [activePopup, setActivePopup] = useState(null);
    const showSignup = () => {
        setActivePopup("signup");
    }
    const showLogin = () => {
        setActivePopup("login");
    }

    return (
        <div className="user-menu">

            <div className="forms">
                <button className="btn btn-primary" onClick={showLogin}>Login</button>
                <button className="btn btn-secondary" onClick={showSignup}>Sign Up</button>

                {activePopup === "login" && <Login />}
                {activePopup === "signup" && <Signupform />}
            </div>
        </div>
    )
}

export default UserMenu;