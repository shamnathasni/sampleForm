import express from 'express';
const router = express.Router();

import { createSubscription, getLoan, receiveLoan, simple, submitLoan, updateDB, } from '../controller/encompass_Controller.js'; // Correct import of the controller


// Define POST route for '/get-token' that calls the controller function
router.get('/', simple);
router.get('/loan/:loanId',getLoan)
router.get('/createSubscription', createSubscription);
router.post('/submit', submitLoan);
router.post('/receive', receiveLoan);
router.post('/updateLoan', (req, res) => {
    console.log('Received payload:', req.body);
    res.status(200).json({ message: 'Payload received' });
  });
  


export default router;  // Make sure to export the router
