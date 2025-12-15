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
### 3. Environment Variables (Server)
Create a `.env` file in `server/`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Cloudinary (Image Uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Service (Brevo/Sendinblue)
EMAIL_USER=your_sender_email@gmail.com
# Use Brevo API Key for reliable production email (starts with xkeysib-)
BREVO_API_KEY=xkeysib-your-key-here
```

*Note: Legacy SMTP variables (`SMTP_HOST`, `SMTP_PORT`, `EMAIL_PASS`) are optional if `BREVO_API_KEY` is provided.*

### 4. Frontend Configuration
The frontend connects to the backend URL.
- **Local Development**: Default is `http://localhost:5000/api`
- **Production**: Set `VITE_API_URL` in Vercel/Netlify.

## Deployment

### Backend (Railway/Render)
- Deploy the `server` folder.
- Add all Environment Variables from the list above.
- **Important**: For Railway, set `BREVO_API_KEY` to ensure emails work (Ports 587/465 are often blocked).

### Frontend (Vercel)
- Deploy the `client` folder.
- Add Environment Variable:
  - `VITE_API_URL` = `https://your-backend-url.app/api`


