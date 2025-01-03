import axios from "axios";
import { configDotenv } from "dotenv";
configDotenv();
import express from 'express';
const router = express.Router();
import EventEmitter from 'events';
import Borrower from "../Model/borrowerModel.js";
import BorrowerProfile from "../Model/borrowerProfileModel.js";

// Start the cron job
// cronJob.start();
// console.log("Cron job has started.");

export const simple = async (req, res) => {
  res.send("Hello, the server is up and running!");
};

// First route: POST /submit (to receive data)
export const submitLoan = async (req, res) => {
  const data = req.body; // Get the data from the request body
  console.log(req.body);

  // Forward the received data to another internal route
  axios
    .post("https://encompass.loanofficercrm.ai/receive", data)
    .then((response) => {
      res.json({
        message: "Data forwarded to /receive route",
        responseFromReceiveRoute: response.data,
      });
    })
    .catch((error) => {
      console.log(error.message)
      console.error("Error sending data:", error);
      res.status(500).json({ message: "Error forwarding data to /receive route" , error:error.message });
    });
};

// Second route: POST /receive (to receive data from the first route)
export const receiveLoan = async (req, res) => {
  const data = req.body; // Get the data from the request body

  // Validate borrower and borrower profile data
  const borrowerData = data.borrower;
  const borrowerProfileData = data.borrowerProfile;

  if (!borrowerData || !borrowerProfileData) {
    return res.status(400).json({ alert: "Missing borrower or borrower profile data" });
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
    const borrowers = new Borrower(borrowerData);
    await borrowers.save();

    const borrowerProfiles = new BorrowerProfile({
      borrowerId: borrowers._id,
      employment: borrowerProfileData.employement,
      demographic: borrowerProfileData.demographic,
      declarations: borrowerProfileData.declarations,
      realestate: borrowerProfileData.realestate,
    });

    await borrowerProfiles.save();

    // Fetch the access token after successful save
      const tokenResponse = await axios.post(
        'https://api.elliemae.com/oauth2/v1/token',
        new URLSearchParams({
          grant_type: 'password',
          username: 'chrisj@encompass:TEBE11371233',
          password: 'loAIcrm1994!',
          client_id: 'fw5t9js',
          client_secret: '^TPShPA0#fi4jit7dJlEqBJl#IsK6bPCuRZONV7e1CJty0w10JnRabA@SaGUq5!q'
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }
      );
  // console.log(tokenResponse.data);
  

    //create encompassloan

    if (!tokenResponse.data.access_token) {
      console.log("accessToken is missing");
      return res.json({message:"accessToken is missing"})
    } else {
      try{ 
        
        const borrower = await Borrower.findOne({_id: borrowers._id})
        console.log(borrower,88);
        
        const borrowerProfile = await BorrowerProfile.findOne({borrowerId: borrowers._id})
            console.log(borrowerProfile,999);
        
        // Utility functions for calculations
        const calculateMonthlyIncome = (annualSalary, hourlyRate, hoursPerWeek) => {
          return annualSalary / 12 || hourlyRate * hoursPerWeek;
        };
        
        const getAddressField = (field, ...sources) => {
          return sources.find(source => source && source[field])?.[field] || '';
        };
        
        const getDependentsAgesDescription = (dependents) => {
          return dependents.map(dependent => dependent.age).join(',');
        };
        
        const getEmployerCity = (borrowerProfile) => {
          return getAddressField('city', 
            borrowerProfile.employment.employerAddress, 
            borrowerProfile.employment.branch, 
            borrowerProfile.employment.businessAddress
          );
        };
        
        const getEmployerPostalCode = (borrowerProfile) => {
          return getAddressField('zipCode', 
            borrowerProfile.employment.employerAddress, 
            borrowerProfile.employment.branch, 
            borrowerProfile.employment.businessAddress
          );
        };
        
        const getEmployerState = (borrowerProfile) => {
          return getAddressField('state', 
            borrowerProfile.employment.employerAddress, 
            borrowerProfile.employment.branch, 
            borrowerProfile.employment.businessAddress
          );
        };
        
        const getEmployerStreetLine1 = (borrowerProfile) => {
          return getAddressField('addressLine1', 
            borrowerProfile.employment.employerAddress, 
            borrowerProfile.employment.branch, 
            borrowerProfile.employment.businessAddress
          );
        };
        
        // Main data structure
        const data = {
          applications: [
            {
              vods: [
                {
                  total: borrower.assets.reduce(
                    (sum, asset) => sum + (asset.cashOrMarketValue || 0),
                    0
                  ), // Sum all cashOrMarketValue
                  items: borrower.assets.map((asset, index) => ({
                    itemNumber: index + 1,
                    type: asset.accountType,
                    accountIdentifier: asset.userid,
                    urla2020CashOrMarketValueAmount: asset.cashOrMarketValue,
                  })),
                },
              ],
              assetsAvailableAmount: 983452,
              borrower: {
                bankruptcyIndicator: borrowerProfile.declarations.financialHistory.bankruptcyDeclared ,
                bankruptcyIndicatorChapterSeven: borrowerProfile.declarations.financialHistory.bankruptcyType.chapter7,
                bankruptcyIndicatorChapterEleven: borrowerProfile.declarations.financialHistory.bankruptcyType.chapter11,
                bankruptcyIndicatorChapterTwelve: borrowerProfile.declarations.financialHistory.bankruptcyType.chapter12,
                bankruptcyIndicatorChapterThirteen: borrowerProfile.declarations.financialHistory.bankruptcyType.chapter13,
                birthDate: borrower.refinanceApplication.dateOfBirth ||
                  borrower.purchaseApplication.personInfo.dateOfBirth,
                dependentCount: borrowerProfile.demographic.numberOfDependents,
                dependentsAgesDescription: getDependentsAgesDescription(borrowerProfile.demographic.dependents),
                domesticRelationshipType: borrower.borrowerPersonalDetails.domesticRelationshipType,
                emailAddressText: borrower.borrowerPersonalDetails.email,
                employment: [
                  {
                    addressCity: getEmployerCity(borrowerProfile),
                    addressPostalCode: getEmployerPostalCode(borrowerProfile),
                    addressState: getEmployerState(borrowerProfile),
                    addressStreetLine1: getEmployerStreetLine1(borrowerProfile),
                    basePayAmount: borrowerProfile.employment.annualBaseSalary,
                    bonusAmount: borrowerProfile.employment.annualBonus || borrowerProfile.employment.specialPay,
                    commissionsAmount: borrowerProfile.employment.annualCommission,
                    employerName: borrowerProfile.employment.employerName || borrowerProfile.employment.businessName,
                    employmentStartDate: borrowerProfile.employment.startDate,
                    specialEmployerRelationshipIndicator: borrowerProfile.employment.isEmployerRelated,
                    ownershipInterestType: borrowerProfile.employment.businessOwnership,
                    employmentMonthlyIncomeAmount: calculateMonthlyIncome(
                      borrowerProfile.employment.annualBaseSalary, 
                      borrowerProfile.employment.hourlyRate, 
                      borrowerProfile.employment.hoursPerWeek
                    ),
                    phoneNumber: borrowerProfile.employment.employerPhone || borrowerProfile.employment.businessPhoneNumber,
                    positionDescription: borrowerProfile.employment.jobTitle,
                    selfEmployedIndicator: borrowerProfile.employment.employmentType === "Business/Self-Employment",
                    timeInLineOfWorkYears: borrowerProfile.employment.yearsInProfession,
                  },
                ],
                firstName: borrower.borrowerPersonalDetails.firstName,
                hmdaGenderType: borrowerProfile.demographic.sex,
                hmdaEthnicityReportedFields: borrowerProfile.demographic.ethnicity,
                hmdaEthnicityType: borrowerProfile.demographic.ethnicity,
                citizenshipResidencyType: borrowerProfile.declarations.financialHistory.usCitizenshipStatus,
                lastName: borrower.borrowerPersonalDetails.lastName,
                mailingAddress: {
                  addressCity: borrower.borrowerPersonalDetails.mailingAddress.city,
                  addressPostalCode: borrower.borrowerPersonalDetails.mailingAddress.zipCode,
                  addressState: borrower.borrowerPersonalDetails.mailingAddress.state,
                  addressStreetLine1: borrower.borrowerPersonalDetails.mailingAddress.addressLine1,
                },
                maritalStatusType: borrower.borrowerPersonalDetails.maritalStatus,
                middleName: borrower.borrowerPersonalDetails.middleName,
                priorPropertyTitleType: borrowerProfile.demographic.previousPropertyOwnership.titleHeld,
                priorPropertyUsageType: borrowerProfile.demographic.previousPropertyOwnership.propertyUse,
                mobilePhone: borrower.borrowerPersonalDetails.phoneNumber,
                residences: [
                  {
                    addressCity: borrower.borrowerPersonalDetails.currentAddress.city,
                    addressPostalCode: borrower.borrowerPersonalDetails.currentAddress.zipCode,
                    addressState: borrower.borrowerPersonalDetails.currentAddress.state,
                    addressStreetLine1: borrower.borrowerPersonalDetails.currentAddress.addressLine1,
                    addressCounty: borrower.borrowerPersonalDetails.currentAddress.county,
                  },
                ],
                specialBorrowerSellerRelationshipIndicator: borrowerProfile.declarations.familyBusinessRelationshipWithSeller,
                sectionBExplanation: borrowerProfile.declarations.familyBusinessExplanation,
                sectionCExplanation: borrowerProfile.declarations.mortgageExplanation,
                sectionDExplanation: borrowerProfile.declarations.newCreditExplanation,
                sectionFExplanation: borrowerProfile.declarations.borrowingExplanation,
                suffixToName: borrower.borrowerPersonalDetails.suffix,
                undisclosedBorrowedFundsAmount: borrowerProfile.declarations.financialHistory.moneyBorrowedAmount,
                undisclosedBorrowedFundsIndicator: borrowerProfile.declarations.financialHistory.borrowingMoneyForTransaction,
                undisclosedCreditApplicationIndicator: borrowerProfile.declarations.propertyQuestions.applyingForNewCredit,
                undisclosedComakerOfNoteIndicator: borrowerProfile.declarations.financialHistory.coSignerOnOtherDebt,
                undisclosedMortgageApplicationIndicator: borrowerProfile.declarations.propertyQuestions.applyingForOtherMortgage,
                textMessagePreferred: true,
              },
              coborrower: {
                dependentCount: 0,
                emailAddressText: borrower.coBorrower.email,
                firstName: borrower.coBorrower.firstName,
                homePhoneNumber: borrower.coBorrower.phoneNumber,
                lastName: borrower.coBorrower.lastName,
                legalOtherThanSpouse: borrower.coBorrower.hasPropertyRightsWithNonSpouse,
                mailingAddress: {
                  addressCity: borrower.coBorrower.mailingAddress.city,
                  addressPostalCode: borrower.coBorrower.mailingAddress.zipCode,
                  addressState: borrower.coBorrower.mailingAddress.state,
                  addressStreetLine1: borrower.coBorrower.mailingAddress.addressLine1,
                },
                maritalStatusType: borrower.coBorrower.maritalStatus,
                middleName: borrower.coBorrower.middleName,
                mobilePhone: borrower.coBorrower.phoneNumber,
                domesticRelationshipType: borrower.coBorrower.domesticRelationshipType,
                residences: [
                  {
                    addressCity: borrower.coBorrower.currentAddress.city,
                    addressPostalCode: borrower.coBorrower.currentAddress.zipCode,
                    addressState: borrower.coBorrower.currentAddress.state,
                    addressStreetLine1: borrower.coBorrower.currentAddress.addressLine1,
                    addressCounty: borrower.coBorrower.currentAddress.county,
                  },
                ],
                suffixToName: borrower.coBorrower.suffix,
                textMessagePreferred: true,
              },
              reoProperties: borrowerProfile.realestate.properties.map((value) => ({
                city: value.propertyAddress.adress.city,
                marketValueAmount: value.propertyValue,
                owner: "Borrower",
                postalCode: value.propertyAddress.adress.zipCode,
                rentalIncomeGrossAmount: value.monthlyRent,
                state: value.propertyAddress.adress.state,
                streetAddress: value.propertyAddress.adress.addressLine1,
              })),
            }, 
          ],
          property: {
            city: borrower.borrowerPersonalDetails.currentAddress.city,
            county: borrower.borrowerPersonalDetails.currentAddress.county,
            gseRefinancePurposeType: borrower.refinanceApplication.loanDetails.refinancePurpose,
            fhaSecondaryResidenceIndicator: true,
            typeRecordingJurisdiction: null,
            loanPurposeType: borrower.refinanceApplication.loanDetails.refinancePurpose,
            loanPurposeTypeUrla: borrower.ApplicationType === "refinanceApplication" ? "Cash-Out Refinance" : "purchase",
            occupancyDisplayField: borrower.refinanceApplication.property.propertyUse === 'Investment or Rental Property' ? "Investment" : "sooper",
            postalCode: borrower.borrowerPersonalDetails.currentAddress.zipCode,
            propertyExistingLienAmount: borrower.borrowerPersonalDetails.principalAndInterestMonthlyPayment,
            streetAddress: borrower.borrowerPersonalDetails.currentAddress.addressLine1,
          },
          purchasePriceAmount: borrower.purchaseApplication.loanDetails.purchasePrice,
          ratelock: {
            baseLoanAmount: borrower.refinanceApplication.loanDetails.loanAmount,
            currentNumberOfDays: 10,
            gsePropertyType: borrower.refinanceApplication.property.propertyType || borrower.purchaseApplication.property.propertyType,
          },
        };
                  
              // Configure headers
              const config = {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${tokenResponse.data.access_token}`,
                },
              };
          
              // Send POST request
              const encompassLoan = await axios.post(
                "https://api.elliemae.com/encompass/v3/loans?loanFolder=Prospect&view=entity",
                data,
                config
              );
              const encompassId = await Borrower.updateOne(
                { _id: borrowers._id }, 
                { $set: { encompassLoanId: encompassLoan.data.id } }
              );
              const encompassIdProfile = await BorrowerProfile.updateOne(
                { borrowerId: borrowers._id }, 
                { $set: { encompassLoanId: encompassLoan.data.id } }
              );
              
          res.json({
          message: "Borrower and assets data successfully saved to MongoDB and Loan created successfully",
          borrowerId: borrowers._id,
          accessToken: tokenResponse.data, // Attach token to the response
          data:encompassLoan.data
        });
        } catch (error) {
            // Log the full error for debugging
            console.error("Error details:", error);
        
            // Check if the error has a response from the server
            if (error.response) {
              console.error("Error response data:", error.encompassLoan.data);
             return res.status(error.encompassLoan.status).json({
                message: error.encompassLoan.data.message || "Error from the server",
                details: error.encompassLoan.data,
              });
            } else if (error.request) {
              // Request was made but no response was received
              console.error("No response received:", error.request);
             return res.status(500).json({ message: "No response received from the server" });
            } else {
              // Some other error occurred during the request setup
              console.error("Request error:", error.message);
             return res.status(500).json({ message: error.message || "An unexpected error occurred" });
            }
          }
    }    
  } catch (error) {
    console.error("Error saving borrower data:", error);
    res.status(500).json({ message: "Error saving borrower data to database" , error:error.message});
  }
};


export const getLoan =  async (req, res) => {   
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.Auth_token}`  // Your Bearer token
        }
      };
      // Make a GET request to the Ellie Mae API
      const response = await axios.get(`https://api.elliemae.com/encompass/v3/loans/${loanId}`, config);
      // Send the response back to the client
      res.status(200).json(response.data);
    } catch (error) {
      console.log(error.message)
    }
  };


  
  // Helper Function: Create Subscription
  export const createSubscription = async () => {
    try {
      // Obtain OAuth token
      const tokenResponse = await axios.post(
        "https://api.elliemae.com/oauth2/v1/token",
        new URLSearchParams({
          grant_type: "password",
          username: "chrisj@encompass:TEBE11371233",
          password: "loAIcrm1994!",
          client_id: "fw5t9js",
          client_secret: "^TPShPA0#fi4jit7dJlEqBJty0w10JnRabA@SaGUq5!q",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
  
      console.log("Token Response:", tokenResponse.data);
  
      const accessToken = tokenResponse.data.access_token;
  
      const payload = {
        events: ["update"],
        endpoint: "https://encompass.loanofficercrm.ai/updateLoan", // Replace with your webhook endpoint
        resource: "Loan",
        enableSubscription: true,
      };
  
      console.log("Payload:", payload);
  
      // Create subscription
      const subscriptionResponse = await axios.post(
        "https://api.elliemae.com/webhook/v1/subscriptions",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      console.log("Subscription created successfully:", subscriptionResponse.data);
    } catch (error) {
      console.error("Error creating subscription:", error.response?.data || error.message);
    }
  };
  

  export const updateDB = async (req, res) => {
    try {
      const { resourceId } = req.body; // Get loanId from the webhook payload
  
      // Check if the loan already exists in your database
      const loan = await Borrower.findOne({ encompassLoanId: resourceId });
  
      if (!loan) {
        console.log(`Loan ${resourceId} not found in DB`);
        return res.status(404).json({ message: 'Loan not found in DB' });
      }
  
      // Update loan details in your DB (if needed)
      await Borrower.updateOne(
        { encompassLoanId: resourceId },
        { $set: { loanStatus: 'Updated' } } // Update any loan-specific fields
      );
  
      console.log('Loan updated successfully:', resourceId);
  
      // Send a response to the webhook trigger
      res.status(200).json({ message: 'Loan updated successfully!' });
  
    } catch (error) {
      console.error('Error updating loan details:', error.message);
      res.status(500).json({
        message: 'Failed to update loan details',
        error: error.message,
      });
    }
  };
  
  

  
  