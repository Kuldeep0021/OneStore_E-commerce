# Luora Jewellery E-Commerce Application

Luora is a modern, responsive full-stack e-commerce application built with React, Vite, Tailwind CSS, Node.js, Express, and MongoDB.

## Features

- **Storefront**: Browse categories and products, add items to cart, and checkout.
- **Admin Panel**: Full CRUD operations for categories and products, with drag-and-drop image uploading.
- **Live Price Updates**: Admin price changes immediately update the database, allowing users to see the latest prices.
- **Authentication**: JWT-based authentication with user and admin roles.
- **Payment Gateway**: Integrated with Razorpay test mode.
- **Responsive Design**: Mobile-first design using Tailwind CSS.

## Technology Stack

- **Frontend**: React, Vite, Tailwind CSS, React Router, Zustand, Axios, Lucide React
- **Backend**: Node.js, Express, MongoDB (Mongoose), Multer, jsonwebtoken, bcryptjs, Razorpay

## Prerequisites

- Node.js (v18+)
- MongoDB (running locally or MongoDB Atlas URI)

## Setup Instructions

### 1. Clone the repository (if applicable) or navigate to the project directory
```bash
cd e:\jew
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Configure `.env` in the `backend` folder based on the `.env.example`:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/luora
JWT_SECRET=supersecret123
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```
*Note: Replace Razorpay keys with your own test credentials from the Razorpay dashboard.*

Start the backend server (runs on port 5000):
```bash
npm run dev
```
*(The backend will automatically create a default admin user and an `uploads/` folder).*

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Start the frontend Vite server (runs on port 5173 by default):
```bash
npm run dev
```

## Admin Access

A default admin account is automatically seeded on the first backend run.

- **Email**: `admin@luora.com`
- **Password**: `Admin@123`

*Note: You should immediately change this password or delete and recreate an admin account for production use.*

## E2E Testing Summary

The following flows have been implemented and tested:

- **User Flow**:
  - Home page loads categories correctly.
  - Category page shows corresponding products.
  - Cart updates correctly with additions, quantity changes, and removals.
  - Checkout form validates fields and opens the Razorpay modal.
- **Admin Flow**:
  - Secure login prevents unauthorized access to `/admin`.
  - Categories and Products can be created, edited, and deleted.
  - Multiple image upload works with preview via drag-and-drop.
  - "Live Price Updates": Editing a price in the admin panel instantly updates the database, fetching the new price on the storefront.
- **Mobile Responsiveness**: Thoroughly designed using Tailwind CSS utility classes to be fully functional down to 375px.

## Known Limitations
- Images are stored locally in the `backend/uploads` directory. For production, consider using AWS S3, Cloudinary, or Firebase Storage.
- Razorpay requires real API keys to fully test the modal. Placeholders will result in an initialization error.
