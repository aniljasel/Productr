# Productr - MERN Stack Assignment

A fully functional website developed using MERN stack (MongoDB, Express, React, Node.js).

## Features
- **Frontend**: React.js with Vite, Vanilla CSS for styling (Glassmorphism/Dark theme).
- **Backend**: Node.js + Express.js REST APIs.
- **Database**: MongoDB with Mongoose schemas.
- **Functionality**:
    - Product CRUD (Create, Read, Update, Delete).
    - Publish/Unpublish toggle.
    - Dashboard with statistics.
    - Search and Filter products.
    - Responsive Design.

## Project Structure
```
project-root/
├─ client/          # Frontend React App
└─ server/          # Backend Node API
```

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB URI (local or Atlas)

### 1. Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `server/` with the following:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```
   *(Note: A default config is provided but you should use your own URI)*
4. Seed the database (Optional):
   ```bash
   node seed/seedProducts.js
   ```
5. Start the server:
   ```bash
   npm start
   # or
   npm run dev (if nodemon is installed)
   ```

### 2. Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the browser at `http://localhost:5173`.

## Environment Variables
The backend requires a `MONGO_URI`. The frontend API URL is configured to `http://localhost:5000/api` by default in `client/src/api/api.js`.

