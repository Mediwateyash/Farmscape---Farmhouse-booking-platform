# FarmScape - Farmhouse Booking Platform

FarmScape is a full-stack MERN application for booking farmhouses. It features a user panel for browsing and booking farmhouses, and an admin panel for managing listings and bookings.

## Features

### User Panel
- **Home Page**: View all farmhouses with search and location filters.
- **Details Page**: View farmhouse details, images, amenities, and book.
- **Dashboard**: View booking status (Pending/Approved/Rejected).
- **Authentication**: Simple email/password login and registration.

### Admin Panel
- **Dashboard**: View total users, bookings, and farmhouses.
- **Farmhouse Management**: Add, update, and delete farmhouses with image upload.
- **Booking Management**: Approve or reject user bookings.
- **User Management**: View and delete users.

## Tech Stack
- **Frontend**: React, Vite, Axios, React Router
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Image Upload**: Multer
- **Authentication**: Simple session-based (MongoDB stored credentials)

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed or MongoDB Atlas URI

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following content:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```
4. Seed the admin user (Optional):
   ```bash
   node seeder.js
   ```
   *Default Admin Credentials:*
   - Email: `admin@example.com`
   - Password: `adminpassword`
5. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/admin/login` - Login admin

### Farmhouses
- `GET /api/farmhouses` - Get all farmhouses
- `GET /api/farmhouses/:id` - Get single farmhouse
- `POST /api/farmhouses` - Create farmhouse (Admin, Multipart form data)
- `PUT /api/farmhouses/:id` - Update farmhouse (Admin)
- `DELETE /api/farmhouses/:id` - Delete farmhouse (Admin)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get all bookings (Admin)
- `GET /api/bookings/mybookings/:userId` - Get user bookings
- `PUT /api/bookings/:id/status` - Update booking status (Admin)

### Users
- `GET /api/users` - Get all users (Admin)
- `DELETE /api/users/:id` - Delete user (Admin)

## Deployment

### Backend (Render/Heroku)
1. Push code to GitHub.
2. Create a new Web Service on Render.
3. Connect GitHub repo.
4. Set Root Directory to `backend`.
5. Set Build Command to `npm install`.
6. Set Start Command to `node server.js`.
7. Add Environment Variables (`MONGO_URI`).

### Frontend (Vercel/Netlify)
1. Push code to GitHub.
2. Create a new Project on Vercel.
3. Connect GitHub repo.
4. Set Root Directory to `frontend`.
5. Set Build Command to `npm run build`.
6. Set Output Directory to `dist`.
