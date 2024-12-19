import express from 'express';
import axios from 'axios';
import mongoose from './config/db_config.js'; 
import Borrower from './Model/borrowerModel.js'; 
import BorrowerProfile from './Model/borrowerProfileModel.js';

const app = express();

// Middleware to parse JSON data
app.use(express.json());

// First route: POST /submit (to receive data)
app.post("/submit", (req, res) => {
  const data = req.body;  // Get the data from the request body

  // Send the received data to another internal route (within the same server)
  axios.post('https://sampleform-cnzr.onrender.com/receive', data)
    .then(response => {
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
  const data = req.body;  // Get the data from the request body

  // Validate required fields in borrower data and borrowerProfile data
  const borrowerData = data.borrower;
  const borrowerProfileData = data.borrowerProfile;

  if (!borrowerData || !borrowerProfileData) {
    return res.status(400).json({ message: "Missing borrower or borrower profile data" });
  }

  const email = borrowerData.borrowerPersonalDetails.email;
  if (!email) {
    return res.status(400).json({ message: "Invalid or missing email address" });
  }

  const { employement, nonEmployement, demographic, declarations, realestate } = borrowerProfileData;

  // Check for missing fields in borrower data
  if (!borrowerData.borrowerPersonalDetails || !borrowerData.borrowerPersonalDetails.firstName || !borrowerData.borrowerPersonalDetails.lastName) {
    return res.status(400).json({ message: "Missing required fields in borrower data" });
  }

  // Check for missing fields in borrower profile data
  if (!employement || !nonEmployement || !demographic || !declarations || !realestate) {
    return res.status(400).json({ message: "Missing required fields in borrower profile data" });
  }

  try {
    // Create a new borrower document
    const borrower = new Borrower(borrowerData);
    await borrower.save();

    const borrowerProfile = new BorrowerProfile({
      borrowerId: borrower._id,
      employment: employement,
      nonEmployment: nonEmployement,
      demographic: demographic,
      declarations: declarations,
      realestate: realestate,
    });

    // Save to the database
    const profile = await borrowerProfile.save();

    res.json({
      message: 'Borrower and assets data successfully saved to MongoDB',
      borrowerId: borrower._id,  // Return the ID of the saved borrower
      responseFromReceiveRoute: data  // Optionally send back the full data for debugging
    });

  } catch (error) {
    console.error("Error saving borrower data:", error);
    res.status(500).json({ message: "Error saving borrower data to database" });
  }
});

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
