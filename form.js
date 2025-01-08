import express from "express";
import axios from "axios";
// import cronJob from "./cronjob.js";
import mongoose from "./config/db_config.js";
import cors from 'cors';
import router from "./routers/router.js";

const app = express();
app.use(cors());
// Middleware to parse JSON data
app.use(express.json());

 // Sample route to test connection
app.use('/', router);


// Start the server
const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Set server timeout to 1 hour (3600000 milliseconds)
server.setTimeout(3600000);