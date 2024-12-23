import express from "express";
import axios from "axios";
import cronJob from "./cronjob.js";
import mongoose from "./config/db_config.js";
import Borrower from "./Model/borrowerModel.js";
import BorrowerProfile from "./Model/borrowerProfileModel.js";

const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Start the cron job
cronJob.start();
console.log("Cron job has started.");

// First route: POST /submit (to receive data)
app.post("/submit", (req, res) => {
  const data = req.body; // Get the data from the request body

  // Forward the received data to another internal route
  axios
    .post("https://sampleform-cnzr.onrender.com/receive", data)
    .then((response) => {
      res.json({
        message: "Data forwarded to /receive route",
        responseFromReceiveRoute: response.data,
      });
    })
    .catch((error) => {
      console.error("Error sending data:", error);
      res.status(500).json({ message: "Error forwarding data to /receive route" });
    });
});

// Second route: POST /receive (to receive data from the first route)
app.post("/receive", async (req, res) => {
  const data = req.body; // Get the data from the request body

  // Validate borrower and borrower profile data
  const borrowerData = data.borrower;
  const borrowerProfileData = data.borrowerProfile;

  if (!borrowerData || !borrowerProfileData) {
    return res.status(400).json({ message: "Missing borrower or borrower profile data" });
  }

  if (!borrowerData.borrowerPersonalDetails?.email) {
    return res.status(400).json({ message: "Invalid or missing email address" });
  }

  if (
    !borrowerProfileData.employement ||
    !borrowerProfileData.demographic ||
    !borrowerProfileData.declarations ||
    !borrowerProfileData.realestate
  ) {
    return res.status(400).json({ message: "Missing required fields in borrower profile data" });
  }

  try {
    const borrower = new Borrower(borrowerData);
    await borrower.save();

    const borrowerProfile = new BorrowerProfile({
      borrowerId: borrower._id,
      employment: borrowerProfileData.employement,
      demographic: borrowerProfileData.demographic,
      declarations: borrowerProfileData.declarations,
      realestate: borrowerProfileData.realestate,
    });

    await borrowerProfile.save();

    res.json({
      message: "Borrower and assets data successfully saved to MongoDB",
      borrowerId: borrower._id,
    });
  } catch (error) {
    console.error("Error saving borrower data:", error);
    res.status(500).json({ message: "Error saving borrower data to database" });
  }
});

// Start the server
const PORT =  000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
