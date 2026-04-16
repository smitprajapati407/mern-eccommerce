 🛒 MERN E-Commerce Application ( NEXT CART)

A full-stack e-commerce web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) 

 🚀 Features

* 🔐 User Authentication (JWT-based)
* 🛍️ Product Management
* 🛒 Cart Functionality
* 📦 Order Creation & Management
* 💳 Razorpay Payment Integration
* 🧑‍💼 Admin Controls
* ⚡ RESTful API with proper MVC structure


 🛠️ Tech Stack

Frontend:

* React.js (Vite)
* CSS,HTML,Tailwind

Backend:

* Node.js
* Express.js

Database:

* MongoDB (MongoDB Compass)

Architecture:

* MVC Pattern (Models, Controllers, Routes)
* Middleware for authentication & error handling

Payments:

* Razorpay


 📂 Project Structure

```
MERN-ECOMMERCE-MAIN/
│
├── backend/
│   ├── config/          # Database & app configuration
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth & error handling
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── server.js        # Entry point
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/    # API calls
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

⚙️ Installation & Setup
 1️⃣ Clone Repository


git clone https://github.com/smitprajapati407/mern-ecommerce

cd MERN-ECOMMERCE-MAIN


 2️⃣ Backend Setup


cd backend
npm install

Run backend:
node server.js

3️⃣ Frontend Setup

Open new terminal:

cd frontend
npm install
npm run dev


💳 Payment Integration

Razorpay is used for secure payment processing.

* Integrated Razorpay Checkout
* Backend verifies payment
* Supports test mode for development

 🧠 Database

MongoDB is used as the database.
MongoDB Compass was used for local database management and visualization.


🎯 Future Improvements

* ⭐ Product Reviews & Ratings
* ❤️ Wishlist Feature
* 📍 Order Tracking
* 📊 Admin Dashboard


👨‍💻 Author

Smit Prajapati

