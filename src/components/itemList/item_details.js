import react, { useState, useEffect } from "react";
function ItemDetails({ itemId }) {
    const [itemDetails, setItemDetails] = useState(null);
    const [error, setError] = useState(null);
    const [activePopup, setActivePopup] = useState(false);

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await fetch(`/api/items/${itemId}`);
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
            <h2>{itemDetails.itemName}</h2>
            <p>Price: ${itemDetails.price}</p>
            <p>Description: {itemDetails.description}</p>
            <p>Seller: {itemDetails.sellerName}</p>
            <button className="interested-btn" onClick={showSellerInfo}>Interested!</button>
            {activePopup === 'sellerInfo' && (
                <div className="popup">
                    <h3>Seller Information</h3>
                    <p>Name: {itemDetails.sellerName}</p>
                    <p>Contact: {itemDetails.sellerContact}</p>
                    <button onClick={() => setActivePopup(false)}>Close</button>
                </div>
            )}
        </div>
    );
}
export default ItemDetails;