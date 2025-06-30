import SellForm from "../SellForms/Sell";
import React, { useState, useEffect } from "react";
import BuyList from "../itemList/BuyList";
import UserProfile from "../UserProfile/UserProfile";

function MainContent() {
    const [viewMode, setViewMode] = useState('buy');

    return (
        <div className="main-content">
            <h1>Welcome to the Buy-Sell App</h1>
            <p>Here you can buy and sell items easily.</p>
            <button className="btn btn-secondary" onClick={() => setViewMode('buy')}>Buy Item</button>
            <button className="btn btn-primary" onClick={() => setViewMode('sell')}>Sell Item</button>
            <button className="btn btn-info" onClick={() => setViewMode('profile')}>Profile</button>
            


            {viewMode === 'sell' && <SellForm />}
            {viewMode === 'buy' && <BuyList />}
            {viewMode === 'profile' && <UserProfile />}

        </div>
    );
}
export default MainContent;