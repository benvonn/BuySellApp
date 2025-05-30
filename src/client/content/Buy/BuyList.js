import React, { use, useEffect, useState } from "react";

function BuyList() { 
    const [buyList, setBuyList] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/buylist");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setBuyList(data);
            } catch (error) {
                console.error("Error fetching buy list:", error);
            }
        }
        fetchData();
    }
    , []);
    return (
        <div className="buy-list">
            <h2>Buy List</h2>
            <ul>
                {buyList.map((item, index) => (
                    <li key={index}>
                        <h3>{item.itemName}</h3>
                        <p>Price: ${item.price}</p>
                        <p>Seller: {item.sellerName}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default BuyList;