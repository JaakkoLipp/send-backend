# File Sharing Backend

This is a distributed full-stack filesharing project, with a Node.js/Express backend with remote MongoDB. Designed to be used with send-frontend react project. Strict one week deadline project (WIP).

## Features

- Upload files
- Download files
- Delete files
- List all files
- User auth for security and privacy

## Requirements

- Node.js
- npm

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/file-sharing-backend.git
   ```
2. Navigate to the project directory:
   ```sh
   cd file-sharing-backend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. configure dotenv with PORT=####:
   ```sh
   touch .env
   ```

## Usage

1. Start the server:
   ```sh
   npm start
   ```
2. The server will be running on `http://localhost:[DOTENV SPECIFIED PORT]`.

## API Endpoints

- `POST /upload` - Upload a file
- `GET /files` - List all files
- `GET /files/:filename` - Download a file
- `DELETE /files/:filename` - Delete a file

## License

This project is licensed under the MIT License.
