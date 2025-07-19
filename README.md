# Resume Portfolio Application

A full-stack application for creating resumes and portfolios.

## Features

- Create and manage multiple resumes
- Choose from different resume templates
- Convert resumes to online portfolios
- Optimize resumes with AI
- Download resumes as PDF
- Track resume version history

## Project Structure

The project is divided into two main parts:

- **Frontend**: React application
- **Backend**: Node.js/Express API

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (optional for full functionality)

## Installation

1. Clone the repository
2. Install frontend dependencies:
   ```
   npm install
   ```
3. Install backend dependencies:
   ```
   cd server
   npm install
   ```

## Configuration

### Frontend

Create a `.env` file in the root directory with the following content:

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_BASE_URL=http://localhost:3000
```

### Backend

Create a `.env` file in the `server` directory with the following content:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/resume-portfolio
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

## Running the Application

### Development Mode

To run both frontend and backend concurrently:

```
npm run dev
```

Or use the provided batch file:

```
start-dev.bat
```

### Frontend Only

```
npm start
```

### Backend Only

```
cd server
npm run dev
```

## Accessing the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## Important URLs

- Home: http://localhost:3000/
- Login: http://localhost:3000/login
- Register: http://localhost:3000/register
- Dashboard: http://localhost:3000/dashboard
- Resume Builder: http://localhost:3000/resume/builder
- Portfolio View: http://localhost:3000/portfolio/:username

## Development Notes

- The application can run without a backend connection in development mode
- Mock data is provided for testing purposes
- PDF generation works client-side using html2pdf.js