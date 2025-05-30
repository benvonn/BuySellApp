import React from "react";

function Signupform() {
    const [error, setError] = React.useState(null);
    const [formData, setFormData] = React.useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const resetForm = () => {
        setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        });
        setError(null);
    }
    return (
        <div className="signup-form">
            <h2>Sign Up</h2>
            <form>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
                <button type="submit" onClick={(e) => {
                    e.preventDefault();
                    if (formData.password !== formData.confirmPassword) {
                        setError("Passwords do not match");
                    } else {
                        // Handle signup logic here
                        console.log("Form submitted", formData);
                        resetForm();
                    }
                }}>Sign Up</button>
            </form>
            </div>
            )
        }

        export default Signupform;