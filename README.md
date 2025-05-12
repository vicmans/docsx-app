# My Docx files

This project allows users to upload their favorites .docx files and store them in the server.

## Installation

### Prerequisites

* Node.js
* MongoDB (optional)

### Setup

Install dependencies for the backend. Inside the backend folder (Express server):

```sh
cd backend
npm install
```

Install dependencies for the frontend. Inside the frontend folder (React app):

```sh
cd ..
cd frontend
npm install
```

### Configure environment variables

Create a `.env` file inside the `backend` folder for your backend settings. You can use the `.env.example`:

```bash
PORT=3000
DB_TYPE=json
DB_URL=data/path/to/your/data/file.json
```

If you don't configure the `.env` file, the app uses the default values.

Usually the database json file is in the `data` folder.

If you want, you can configure a MongoDb database, setting the `DB_TYPE=mongodb` and `DB_URL` with your MongoDB URI.
See more in the backend [README.md](backend/README.md)

**Start the backend server:**

```bash
cd backend
npm start
```

or development server:

```bash
npm run dev
```

**Start the frontend development server:**

```bash
cd frontend
npm run dev
```

Your app will now be running locally at `http://localhost:5173` for the frontend and `http://localhost:3000` for the backend.

## Usage

* Navigate to the React app in your browser (`http://localhost:5173`).
* Use the links in the navbar to navigate to Upload page.
* The uploaded files will be stored in the `uploads` folder of the server app.
* You can change the status of the uploaded files in the list of the home page by clicking the buttons of the Actions column.

## Used tools

* **Frontend:** React, Axios (for HTTP requests), Vite and Vitest for testing
* **Backend:** Express.js, Multer, mongoose for MongoDB connection
* **Database (optional):** MongoDB (if you are using mongoDB)

## Available endpoints: 

- `POST /upload`
- `GET /files`
- `PUT /files/:id/status`

> For more information, you can see the README.md of [backend project](backend/README.md) and [frontend project](frontend/README.md) app.
