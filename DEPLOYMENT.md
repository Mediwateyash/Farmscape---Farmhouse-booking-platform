# Deployment Guide

This guide explains how to deploy **FarmScape** for free using **Render** (Backend) and **Vercel** (Frontend).

## Prerequisites
1.  A [GitHub](https://github.com/) account.
2.  This repository pushed to your GitHub.

---

## Part 1: Deploy Backend (Render)

1.  **Sign Up**: Go to [render.com](https://render.com/) and sign up with GitHub.
2.  **New Web Service**: Click **New +** -> **Web Service**.
3.  **Connect Repo**: Select your `Farmscape---Farmhouse-booking-platform` repository.
4.  **Configure**:
    -   **Name**: `farmscape-backend` (or any unique name)
    -   **Root Directory**: `backend`
    -   **Environment**: `Node`
    -   **Build Command**: `npm install`
    -   **Start Command**: `node server.js`
5.  **Environment Variables**:
    -   Scroll down to **Environment Variables**.
    -   Add `MONGO_URI`: Your MongoDB connection string (e.g., from MongoDB Atlas).
    -   Add `PORT`: `5000` (Render will override this, but good to have).
6.  **Deploy**: Click **Create Web Service**.
7.  **Copy URL**: Once deployed, copy the backend URL (e.g., `https://farmscape-backend.onrender.com`). You will need this for the frontend.

---

## Part 2: Deploy Frontend (Vercel)

1.  **Sign Up**: Go to [vercel.com](https://vercel.com/) and sign up with GitHub.
2.  **Add New Project**: Click **Add New...** -> **Project**.
3.  **Import Repo**: Import `Farmscape---Farmhouse-booking-platform`.
4.  **Configure**:
    -   **Root Directory**: Click **Edit** and select `frontend`.
    -   **Framework Preset**: Vite (should be auto-detected).
5.  **Environment Variables**:
    -   Expand **Environment Variables**.
    -   Key: `VITE_API_URL`
    -   Value: Paste your Render Backend URL (e.g., `https://farmscape-backend.onrender.com`). **Do not add a trailing slash**.
6.  **Deploy**: Click **Deploy**.
7.  **Done**: Your app is now live! Click the domain to view it.

---

## Troubleshooting
-   **CORS Error**: If you see CORS errors, ensure your Backend allows requests from your Vercel domain. In `server.js`, `app.use(cors())` allows all origins by default, which is fine for testing.
-   **Images**: Uploaded images might disappear on Render (free tier) because the file system is ephemeral. Use external image URLs (like we did with Unsplash) or integrate Cloudinary for permanent storage.
