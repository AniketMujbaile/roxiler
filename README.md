# roxiler
API to initialize the database. fetch the JSON from the third party API and
initialize the database with seed data.


## Technologies Used

- Node.js
- React.js
- Express.js
- MongoDB
 

## Project Structure

The project is organized into two main folders: `frontend` and `backend`.

### Frontend

The `client` folder contains the React.js application.

#### Installation

```bash
cd client
npm install
```

#### Usage

```bash
npm start
```

### Backend

The `server` folder contains the Node.js and Express backend, along with the MongoDB database.

#### Installation

1. Create a MongoDB database and update the connection details in `server/config/mongoose.js`.

## Configuration File

 .env then modify to your environment variables PORT, mongodb uri.

```ENV

PORT= 3000

MONGODB_URI= YOUR_URL
 
```
2. Install dependencies:

```bash
cd server
npm install
```

3. Run the server:

```bash
npm start
```