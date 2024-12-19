import express from 'express';
import axios from 'axios';
import mongoose from '../config/db_config.js'; 
import  Borrower  from '../Models/borrowerModel.js'; 
import BorrowerProfile from "../Models/borrowerProfileModel.js"

const app = express();

// Middleware to parse JSON data
app.use(express.json());

// First route: POST /submit (to receive data)
app.post("/submit", (req, res) => {
//   console.log("POST /submit route triggered");

  const data = req.body;  // Get the data from the request body
//   console.log("Received data:", data);

  // Send the received data to another internal route (within the same server)
  axios.post('http://localhost:3000/receive', data)
    .then(response => {
    //   console.log("Response from /receive:", response.data);

      // Send back the response from the internal route
      res.json({
        message: "Data forwarded to /receive route",
        responseFromReceiveRoute: response.data
      });
    })
    .catch(error => {
      console.error("Error sending data:", error);
      res.status(500).json({ message: "Error forwarding data to /receive route" });
    });
});

// Second route: POST /receive (to receive data from the first route)
app.post("/receive", async (req, res) => {
    // console.log("POST /receive route triggered");
  
    const data = req.body;  // Get the data from the request body
    // console.log("Received data for saving to MongoDB:", data);
  
    try {
      // First, save Borrower data
      const borrowerData = req.body.borrower;  // Expecting the same structure as provided
      const borrowerProfileData = req.body.borrowerProfile;  // Expecting the same structure as provided
 console.log("borrowerProfileData",borrowerProfileData,"borrowerProfileData");

      // Create a new borrower document
      const borrower = new Borrower(borrowerData);
      await borrower.save();

      const borrowerProfile = new BorrowerProfile({
        borrowerId:borrower._id,
        employment: borrowerProfileData.employement,
        nonEmployment: borrowerProfileData.nonEmployement,
        demographic: borrowerProfileData.demographic,
        declarations: borrowerProfileData.declarations,
        realestate:borrowerProfileData.realestate}
      );
      
      // Save to the database
      const profile = await borrowerProfile.save();
      console.log(profile);

      res.json({
        message: 'Borrower and assets data successfully saved to MongoDB',
        borrowerId: borrowerData._id,  // Return the ID of the saved borrower
        responseFromReceiveRoute: data  // Optionally send back the data
      });
    } catch (error) {
      console.error("Error saving borrower data:", error);
      res.status(500).json({ message: "Error saving borrower and assets data to MongoDB" });
    }
  });

// Start the Express server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
