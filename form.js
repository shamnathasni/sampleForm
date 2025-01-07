import express from "express";
import axios from "axios";
// import cronJob from "./cronjob.js";
import mongoose from "./config/db_config.js";
import cors from 'cors';
import Borrower from "./Model/borrowerModel.js";
import BorrowerProfile from "./Model/borrowerProfileModel.js";
import router from "./routers/router.js";

const app = express();
app.use(cors());
// Middleware to parse JSON data
app.use(express.json());

 // Sample route to test connection
app.use('/', router);


// Start the server
const PORT = 3000;
app.listen(PORT,'0.0.0.0',() => {
  // console.log(`Server is running on port http://localhost:${PORT}`);
  console.log(`Server is running on port ${PORT}`);
});
