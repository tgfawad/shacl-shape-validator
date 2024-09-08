# shacl-shape-validator

A small app to validate RDF graph with SHACL. The app provides two services, a front end and a backend. Front end is responsible for uploading rdf data graph and rdf shape and to produce a report based on backend shacl validation.

## How to Run the App

You can run the app in two ways:

### Method 1: Using Docker Compose in the Root Directory

1. Build the Docker images:
   ```sh
   docker-compose up --build -d
2. Open your browser and go to `http://localhost:3000`.
3. to check the backend, go to `http://localhost:5000`.
3. To stop the app, run:
   ```sh
   docker-compose down
### Method 2: Running Backend and Frontend Separately
1. Build and start the backend:
   ```sh
   cd backend
   docker-compose up --build
2. Open your browser and go to `http://localhost:5000` to see if the backend is running.
3. Install frontend dependencies and start the frontend:
   ```sh
   cd ../frontend
   npm install
   npm start
4. Open your browser and go to `http://localhost:3000`.