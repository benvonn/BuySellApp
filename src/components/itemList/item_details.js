import react, { useState, useEffect } from "react";
function ItemDetails({ itemId, onBack }) {
    const [itemDetails, setItemDetails] = useState(null);
    const [error, setError] = useState(null);
    const [activePopup, setActivePopup] = useState(false);

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5069/items/${itemId}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setItemDetails(data);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchItemDetails();
    }, [itemId]);
    const showSellerInfo = () => setActivePopup('sellerInfo');

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!itemDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="item-details">
            <button className="back-btn" onClick={onBack}>Back</button>
            <h2>{itemDetails.itemName}</h2>
            <p>
            Price:{" "}
            {itemDetails.price?.trim().toLowerCase() === "negotiable"
                ? "Negotiable"
                : `$${itemDetails.price}`}
            </p>
            <p>Description: {itemDetails.description}</p>
            <p>Seller: {itemDetails.sellerUsername}</p>

            <button className="interested-btn" onClick={showSellerInfo}>Interested!</button>

            {activePopup === 'sellerInfo' && (
            <div className="popup">
                <h3>Seller Information</h3>
                <p>Username: {itemDetails.sellerUsername}</p>
                <p>Preferred Contact: {itemDetails.sellerContact}</p>
                <button onClick={() => setActivePopup(false)}>Close</button>
            </div>
            )}
        </div>
    );
}
export default ItemDetails;