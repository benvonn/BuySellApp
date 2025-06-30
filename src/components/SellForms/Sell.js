import React, { useState, useEffect } from 'react';

function SellForm() {
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [formData, setFormData] = useState({
        itemName: "",
        description: "",
        priceOption: "set",   // "set" or "negotiable"
        price: "",
        userId: "",
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setFormData(prev => ({ ...prev, userId: Number(user.id) }));
        }
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const finalPrice = formData.priceOption === "negotiable" ? "Negotiable" : formData.price;

        if (!formData.itemName || !formData.description || !finalPrice) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            const res = await fetch("http://localhost:5069/items/selling/details", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    itemName: formData.itemName,
                    description: formData.description,
                    price: finalPrice,
                    userId: formData.userId
                })
            });

            if (!res.ok) throw new Error("Failed to submit item.", console.log(res));

            setSuccessMsg("Item listed successfully!");
            resetForm();
        } catch (err) {
            setError(err.message);
        }
    };

    const resetForm = () => {
        setFormData({
            itemName: "",
            description: "",
            priceOption: "set",
            price: "",
            userId: formData.userId
        });
        setError(null);
        setSuccessMsg(null);
    };

    return (
        <div className="sell-form">
            <h2>Sell Item</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="itemName"
                    placeholder="Item Name"
                    value={formData.itemName}
                    onChange={handleChange}
                />
                <textarea
                    name="description"
                    placeholder="Description (Max 250 characters)"
                    maxLength={250}
                    value={formData.description}
                    onChange={handleChange}
                />
                <label>Price Option:</label>
                <select name="priceOption" value={formData.priceOption} onChange={handleChange}>
                    <option value="set">Set Price</option>
                    <option value="negotiable">Negotiable</option>
                </select>

                {formData.priceOption === "set" && (
                    <input
                        type="number"
                        name="price"
                        placeholder="Enter price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                )}

                <button type="submit">Sell</button>
            </form>
            {error && <p className="error">{error}</p>}
            {successMsg && <p className="success">{successMsg}</p>}
            <button onClick={resetForm}>Reset</button>
        </div>
    );
}

export default SellForm;
