import React, { useState, useEffect } from "react";

function UserItems({ userId }) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserItems = async () => {
            try {
                const response = await fetch(`http://localhost:5069/items/user/${userId}`);
                if (!response.ok) throw new Error("Failed to load items");
                const data = await response.json();
                setItems(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUserItems();
    }, [userId]);

    const markItemAsSold = async (itemId) => {
    try {
        const res = await fetch(`http://localhost:5069/items/${itemId}/mark-sold`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) throw new Error("Failed to mark item as sold");

        // Update local state only after server success
        setItems((prev) =>
            prev.map((item) =>
                item.id === itemId ? { ...item, isSold: true } : item
            )
        );
    } catch (err) {
        setError(err.message);
    }
};

    const deleteItem = async (itemId) => {
        try {
            const res = await fetch(`http://localhost:5069/items/${itemId}/delete-item`, {
                method: "DELETE"
            });
            if (!res.ok) throw new Error("Delete failed");
            setItems((prev) => prev.filter((item) => item.id !== itemId));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="user-owned-items">
            <h2>Your displayed items:</h2>
            {error && <p className="error">{error}</p>}
            <ol>
                {items.map((item) => (
                    <li
                        key={item.id}
                        style={{
                            textDecoration: item.isSold ? "line-through" : "none",
                            opacity: item.isSold ? 0.6 : 1,
                        }}
                        >    
                        <h4>{item.itemName}</h4>
                        <p>
                            Price:{" "}
                            {item.price?.toLowerCase() === "negotiable"
                                ? "Negotiable"
                                : `${item.price} Garbanzo Bucks`}
                        </p>
                        <button onClick={() => markItemAsSold(item.id)} disabled={item.isSold}>
                            {item.isSold ? "Marked as Sold" : "Mark as Sold"}
                        </button>

                        <button onClick={() => deleteItem(item.id)}>Delete Item</button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default UserItems;
