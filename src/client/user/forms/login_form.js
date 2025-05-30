import React from "react";

function Login() {
    return (
        <div className="login-form">
            <h2>Login</h2>
            <form>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;