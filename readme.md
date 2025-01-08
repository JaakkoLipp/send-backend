# File Sharing Backend

The backend service for the **File Sharing Application**, built with **Node.js** and **Express**, and uses **MongoDB** for file metadata storage. This backend is designed to work seamlessly with the [File Sharing Frontend](https://github.com/JaakkoLipp/send-frontend) React project.

## Features

- **File Upload**: Handle file uploads with unique identifiers.
- **File Download**: Serve files by their unique IDs.
- **Automatic File Deletion**:
  - Files are deleted from the server after download or after a set expiration period.
- **Maximum File Size**: Enforces a file size limit (e.g., 5 MB) for uploads.
- **Secure Headers**: Exposes essential headers like `Content-Disposition` for filename handling.

## Code structure and architecture

Using MVC architecture for the backend, services are divided accordingly. Inside the source folder are controllers handling logic and processing, models for storing data correctly into MongoDB, and routes containing API paths acting as views. Utils folder contains (WIP) file encrypter and a unique ID generator for the uploaded files. Uploaded files are currently stored into uploads folder. Jest tests are located in tests folder, current code coverage is about 55%.

## Tech Stack

- **Node.js**: Backend runtime.
- **Express**: Framework for handling routes and middleware.
- **Multer**: Middleware for handling file uploads.
- **MongoDB**: Remote database for storing file metadata.

## Requirements

- **Node.js** (v16 or higher recommended)
- **npm**
- **MongoDB** (remote or local)

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/file-sharing-backend.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd file-sharing-backend
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Set Environment Variables**:
   Create a `.env` file in the project root with the following:
   ```env
   PORT=5000
   MONGO_URI=mongodb://your-mongodb-uri
   ```
   Replace `your-mongodb-uri` with your actual MongoDB connection string.

## Usage

1. **Start the Server**:

   ```bash
   npm start
   ```

2. **Backend Server**:
   - The server will be running at `http://localhost:5000` (or the `PORT` specified in your `.env` file).
   - Ensure the [File Sharing Frontend](https://github.com/JaakkoLipp/send-frontend) is configured to communicate with this backend.

## API Endpoints

### **File Operations**

- **Upload a File**:

  - **Method**: `POST`
  - **URL**: `/api/files/upload`
  - **Body**: `multipart/form-data` containing the file.
  - **Headers**: Automatically enforces a set size limit.

- **Download a File**:

  - **Method**: `GET`
  - **URL**: `/api/files/download/:id`
  - **Response**: Serves the requested file.

- **Delete a File After Download**:
  - Files are automatically deleted from the server and database after successful download.

### **Additional Features**

- Files are automatically deleted after a time-to-live (TTL) period (e.g., 5 minutes).

## Project Structure

```
src/
├── controllers/
│   ├── fileController.js     # Logic for upload, download, and file deletion
├── models/
│   ├── File.js               # MongoDB file schema
├── routes/
│   ├── fileRoutes.js         # File-related API routes
├── app.js                    # Main entry point
├── utils/
│   ├── idGen.js              # Helper for generating unique IDs
```

---

## Environment Variables

| Variable    | Description                 | Example                      |
| ----------- | --------------------------- | ---------------------------- |
| `PORT`      | Port for the backend server | `5000`                       |
| `MONGO_URI` | MongoDB connection string   | `mongodb://your-mongodb-uri` |

## To-Do Features

- **Encryption**:
  - Add p2p file encryption.
- **File List Endpoint**:
  - Add an endpoint to list all uploaded files (for admins).
- **Authentication**:
  - Add user authentication for secure file handling.
- **Advanced Analytics**:
  - Track file downloads and provide statistics.

## License

This project is licensed under the [MIT License](LICENSE).
