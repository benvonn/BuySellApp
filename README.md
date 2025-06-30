# 🛒 Buy-Sell App

A full-stack web application for buying and selling items in a user-friendly marketplace.

## ⚙️ Technologies Used
- **Frontend**: React
- **Backend**: ASP.NET Core (C#), Entity Framework Core
- **Database**: SQL Server

## 🚀 Features
- User authentication (login & signup)
- Post items for sale with name, description, and price
- View all items listed by all users
- View detailed information for any item
- Manage your posted items: mark as sold, delete
- Responsive dashboard with segmented user views
- Editable user profile with contact preferences

## 📁 Key Components Overview

### 🧩 Main Layout
- `MainContent.js`: Central layout and routing logic.

### 🛍️ Item Listing
- `BuyList.js`: Displays all items posted by users.
- `item_details.js`: Detailed view of a selected item.

### 📦 Sell Items
- `Sell.js`: Form to submit new items for sale.

### 👤 User Forms
- `login_form.js`: Handles user login.
- `signup_form.js`: Handles user registration.

### 🧾 User Profile
- `UserItems.js`: View, mark as sold, or delete your own items.
- `UserMinibox.js`: Button container for user dashboard navigation.
- `UserProfile.js`: Shows profile details and lets users edit contact preferences.

---

## 🧪 How to Run

### 🖥️ Frontend (React)
 ```bash
cd buy-sellapp
npm install
npm start
```
### Backend (ASP.NET)
```bash
Open solution in Visual Studio or terminal
Make sure SQLserver LocalDb is accessible
In the terminal: 
dotnet ef database update
dotnet run


