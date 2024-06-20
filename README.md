# Slidely Backend Server

This is the backend server for the Slidely Form Application. It is built using Express and TypeScript and uses a JSON file as a database to store submissions.

## Prerequisites

- Node.js installed
- TypeScript installed (`npm install -g typescript`)

## Getting Started

### Clone the repository:

```bash
git clone https://github.com/VMR123/slidely_backend.git
cd slidely_backend
```

### Install dependencies:

```bash
npm install
```

### Build the project:

```bash
npm run build
```

### Run the server:

```bash
npm start
```

Alternatively, you can run the server in development mode with automatic restarts on changes:

```bash
npm run dev
```

The server will run on `http://localhost:5000`.

## API Endpoints

### /ping

- **Method**: GET
- **Description**: A simple endpoint to check if the server is running.
- **Response**: `true`

### /submit

- **Method**: POST
- **Description**: Submits a new form entry.
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "phone": "string",
    "github_link": "string",
    "stopwatch_time": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Submission saved"
  }
  ```

### /read

- **Method**: GET
- **Description**: Retrieves a form entry by index.
- **Query Parameters**:
  - `index` (integer): The index of the submission to retrieve.
- **Response**:
  ```json
  {
    "name": "string",
    "email": "string",
    "phone": "string",
    "github_link": "string",
    "stopwatch_time": "string"
  }
  ```
  - or
  ```json
  {
    "message": "Submission not found"
  }
  ```

### /delete

- **Method**: DELETE
- **Description**: Deletes a form entry by index.
- **Query Parameters**:
  - `index` (integer): The index of the submission to delete.
- **Response**:
  ```json
  {
    "message": "Submission deleted"
  }
  ```
  - or
  ```json
  {
    "message": "Submission not found"
  }
  ```

### /edit

- **Method**: PUT
- **Description**: Edits an existing form entry.
- **Request Body**:
  ```json
  {
    "index": "integer",
    "name": "string",
    "email": "string",
    "phone": "string",
    "github_link": "string",
    "stopwatch_time": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Submission updated"
  }
  ```
  - or
  ```json
  {
    "message": "Submission not found"
  }
  ```

## Database Structure

The `db.json` file stores submissions as an array of objects. Each object represents a submission with the following structure:

```json
[
  {
    "name": "string",
    "email": "string",
    "phone": "string",
    "github_link": "string",
    "stopwatch_time": "string"
  }
]
```

The backend server now supports the new functionalities for editing and deleting submissions too, providing a comprehensive API for the Slidely Form Application.
