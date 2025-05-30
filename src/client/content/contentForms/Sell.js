import React, { useState } from 'react';

function SellForm() { 
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        itemName: "",
        quantity: "",
        price: "",
        sellerName: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const resetForm = () => {
        setFormData({
            itemName: "",
            quantity: "",
            price: "",
            sellerName: ""
        });
        setError(null);
    };

    return (
        <div className="sell-form">
            <h2>Sell Item</h2>
            <form>
                <input
                    type="text"
                    name="itemName"
                    placeholder="Item Name"
                    value={formData.itemName}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="sellerName"
                    placeholder="Your Name"
                    value={formData.sellerName}
                    onChange={handleChange}
                />
                <button type="submit" onClick={(e) => {
                    e.preventDefault();
                    // Add form submission logic here
                }}>Sell</button>
            </form>
            {error && <p className="error">{error}</p>}
            <button onClick={resetForm}>Reset</button>
        </div>
    );
}
export default SellForm;
