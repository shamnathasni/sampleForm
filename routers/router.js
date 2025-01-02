import express from 'express';
const router = express.Router();

import { getLoan, receiveLoan, simple, submitLoan, } from '../controller/encompass_Controller.js'; // Correct import of the controller


// Define POST route for '/get-token' that calls the controller function
router.get('/', simple);
router.post('/submit', submitLoan);
router.post('/receive', receiveLoan);
router.get('/loan/:loanId',getLoan)
// router.get('/webhookSubscription',createSubscription)
// router.get('/updateLoan',updateLoanDetails)

export default router;  // Make sure to export the router
