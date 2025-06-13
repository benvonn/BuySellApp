import React from "react";

function Login() {
    const [formData, setFormData] = React.useState({
        username: "",
        password: "",
    });
    const [userData, setUserData] = React.useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await fetch("http://localhost:5007/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                username: formData.username,
                password: formData.password,
            }),
        });
        

        if (!res.ok) {
            console.log("Login Failed");
        } else {
            const loginData = await res.json();
            console.log("Full data", loginData);
            const userId = loginData.userId;

            console.log("Login Successful", userId);
            const userRes = await fetch(`http://localhost:5007/user/${formData.username}`, {
                method: "GET",
                credentials: "include",
            }
            );
            if (userRes.ok) {
                const data = await userRes.json();
                setUserData(data);
                console.log("User Data:", data);
            } else {
                console.log("Failed to fetch user data");
            }
        }
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <form>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Password"
                    required
                />
                <button type="submit" onClick={handleSubmit}>Login</button>
            </form>
        </div>
    );
}

export default Login;
