import React, { useEffect, useState } from "react";
import ItemDetails from "./item_details";

function BuyList() { 
    const [buyList, setBuyList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItemId, setSelectedItemId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5069/items/buylist");
                if (!response.ok) throw new Error("Network response was not ok");
                const data = await response.json();
                setBuyList(data);
            } catch (error) {
                console.error("Error fetching buy list:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const isExpired = (item) => {
        if (!item.isSold || !item.soldAt) return false;
        const soldDate = new Date(item.soldAt);
        const currentDate = new Date();
        const diffInDays = (currentDate - soldDate) / (1000 * 60 * 60 * 24);
        return diffInDays > 3;
    };

    const handleItemClick = (itemId) => {
        setSelectedItemId(itemId);
    };

    const backBtn = () => {
        setSelectedItemId(null);
    }

    return (
        <div className="buy-list">
            <h2>Buy List</h2>

            {selectedItemId ? (
                <ItemDetails itemId={selectedItemId} onBack={backBtn} />
            ) : (
                <ul style={{listStyleType: "none"}}>
                    {buyList
                        .filter(item => !isExpired(item))
                        .map((item, index) => (
                            <li
                                key={index}
                                className={`buy-item ${item.isSold ? "sold" : "clickable"}`}
                                onClick={() => {
                                    if (!item.isSold) handleItemClick(item.id);
                                }}
                            >
                                <h3>{item.itemName}</h3>
                                <p>
                                    {item.isSold ? (
                                        <span className="sold-label">❌ SOLD</span>
                                    ) : (
                                        <>
                                            Price:{" "}
                                            {item.price?.toLowerCase() === "negotiable"
                                                ? "Negotiable"
                                                : `${item.price} Garbanzo Bucks`}
                                        </>
                                    )}
                                </p>
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
}

export default BuyList;
