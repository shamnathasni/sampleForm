import express from 'express';
const router = express.Router();

import { createSubscription, getLoan, receiveLoan, simple, submitLoan, updateDB, } from '../controller/encompass_Controller.js'; // Correct import of the controller


// Define POST route for '/get-token' that calls the controller function
router.get('/', simple);
router.post('/submit', submitLoan);
router.post('/receive', receiveLoan);
router.get('/loan/:loanId',getLoan)
router.post('/updateLoan',updateDB)

router.patch('*', async (req, res) => {
    try {
      // Call createSubscription function
      const subscriptionResponse = await createSubscription();
      console.log('Subscription created successfully:', subscriptionResponse);
  
      // Send a response
      res.status(200).json({ message: 'Subscription created successfully', subscriptionResponse });
    } catch (error) {
      console.error('Error creating subscription:', error.message);
      res.status(500).json({ message: 'Failed to create subscription', error: error.message });
    }
  });

export default router;  // Make sure to export the router
