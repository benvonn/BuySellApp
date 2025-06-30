import React, { useState, useEffect } from "react";
import UserItems from "./UserItems";

function UserProfile() {
    const [userData, setUserData] = useState(null);
    const [timedOut, setTimedOut] = useState(false);
    const [formData, setFormData] = useState({
        preferredContact: ""
    });
    const [submitStatus, setSubmitStatus] = useState("");

    useEffect(() => {
    const loadUserFromStorage = () => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUserData(parsedUser);
                setFormData(prev => ({
                    ...prev,
                    userId: parsedUser.id,
                    preferredContact: parsedUser.preferredContact || "None"
                }));
            } catch (err) {
                console.error("Failed to parse user from localStorage", err);
                setUserData(null);
            }
        } else {
            setUserData(null);
        }
    };
    

    // Initial load
    loadUserFromStorage();

    // Listen for changes across tabs or manual trigger
    window.addEventListener("storage", loadUserFromStorage);

    // Optional: also check every second for changes in the same tab
    const interval = setInterval(loadUserFromStorage, 1000);

    // Timeout fallback
    const timeout = setTimeout(() => {
        if (!localStorage.getItem("user")) setTimedOut(true);
    }, 5000);

    return () => {
        window.removeEventListener("storage", loadUserFromStorage);
        clearInterval(interval);
        clearTimeout(timeout);
    };
}, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            const res = await fetch("http://localhost:5069/update/user/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(
                    {
                        userId: userData.id,
                        preferredContact: formData.preferredContact,
                    }
                ),
            });

            if (res.ok) {
                setSubmitStatus("Contact saved!");
            } else {
                setSubmitStatus("Failed to save contact.");
            }
        } catch (err) {
            console.error("Error submitting contact information:", err);
            setSubmitStatus("Error occurred while saving.");
        }
    };

    if (timedOut && !userData) {
        return <div>Failed to load user. Please refresh to try again, or try logging in again</div>;
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-profile">
            <h2>User Profile</h2>
            <p><strong>Name:</strong> {userData.username || "N/A"}</p>
            <p><strong>Email:</strong> {userData.email || "N/A"}</p>

            <div className="user-profile-Contact-info">
                <h3>Contact Information</h3>
                {formData.preferredContact === "None" || formData.preferredContact === null ? (
    <>
                    <label>Preferred Contact:</label>
                    <input
                        type="text"
                        name="preferredContact"
                        value={formData.preferredContact}
                        onChange={handleChange}
                        placeholder="Enter preferred contact"
                    />
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                    {submitStatus && <p>{submitStatus}</p>}
                </>
            ) : (
                <p><strong>Preferred Contact:</strong> {formData.preferredContact}</p>
            )}
            </div>
            <div className="user-profile-items">
            <UserItems userId={userData.id} />
            </div>
        </div>
    );
}

export default UserProfile;
