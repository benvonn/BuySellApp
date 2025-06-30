import React, { useState } from "react";
import Login from "../userforms/login_form";
import Signupform from "../userforms/signup_form";
function UserMenu({ setUserData }) {
    const [activePopup, setActivePopup] = useState(null);
    
    const closePopup = () => {
        setActivePopup(null);
    }
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

                {activePopup === "login" && <Login setUserData={setUserData} closePopup={closePopup} />}
                {activePopup === "signup" && <Signupform setUserData={setUserData} closePopup={closePopup} />}
        </div>
        </div>
    )
}

export default UserMenu;