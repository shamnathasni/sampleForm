import axios from "axios";
import Loan from "../Model/loanModel.js";
import Borrower from "../Model/borrowerModel.js";
import BorrowerProfile from "../Model/borrowerProfileModel.js";

export const updateDB = async (req, res) => {
    console.log("Triggered");
  
    try {
    //   console.log("Request Body:", req.body);
    //   const { meta } = req.body;
  
    //   if (!meta || !meta.resourceId) {
    //     return res.status(400).json({ message: "Invalid request body" });
    //   }
  
    //   const { resourceId } = meta;

    //with testing webhook.site
     // Retrieve loanId from request (adjust based on how it's sent)
     const loanId = req.params.loanId; // or req.body.loanId or req.params.loanId
    
     if (!loanId) {
       return res.status(400).json({ message: "loanId is required" });
     }
  
      // Obtain OAuth token
      const tokenResponseData = await axios.post(
        "https://api.elliemae.com/oauth2/v1/token",
        new URLSearchParams({
          grant_type: "password",
          username: "chrisj@encompass:TEBE11371233",
          password: "loAIcrm1994!",
          client_id: "fw5t9js",
          client_secret: "^TPShPA0#fi4jit7dJlEqBJl#IsK6bPCuRZONV7e1CJty0w10JnRabA@SaGUq5!q",
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
  
      const accessToken = tokenResponseData.data.access_token;
  
      if (!accessToken) {
        return res.status(500).json({ message: "accessToken is missing" });
      }
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };
  
      // Make a GET request to the Ellie Mae API
      const response = await axios.get(
        `https://api.elliemae.com/encompass/v3/loans/${loanId}`,
        config
      );
  
      console.log("Ellie Mae API Response:", response.data);
  
      // Update loan details in DB
      await Loan.updateMany(
        { encompassLoanId: loanId },
        { $set: { 
            loanStatus: "Updated", 
            loanProgramName:response.data.loanProgramName?response.data.loanProgramName:"",
            agencyCaseIdentifier:response.data.agencyCaseIdentifier?response.data.agencyCaseIdentifier:"",
            lenderCaseIdentifier:response.data.lenderCaseIdentifier,
            IndividualCredit:response.data.IndividualCredit,
            JointCredit:response.data.JointCredit,
            ExpectedBorrowerCount:response.data.ExpectedBorrowerCount,
            borrowerCount:response.data.borrowerCount,
            borrower:{
                aliasName:response.data.applications[0].borrower.aliasName,
                foreignAddressIndicator:response.data.applications[0].borrower.residences[0].foreignAddressIndicator,
                
            },
            coBorrower:{
                aliasName:response.data.applications[0].coborrower.aliasName,
                hmdaNoCoApplicantIndicator:response.data.applications[0].coborrower.hmdaNoCoApplicantIndicator,
                printOnAdditionalBorrowerPage:response.data.applications[0].coborrower.printOnAdditionalBorrowerPage,
                foreignAddressIndicator:response.data.applications[0].coborrower.residences[0].foreignAddressIndicator,
            },

        } }
      );

      await Borrower.updateMany({encompassLoanId:loanId},{$set:{
       borrowerPersonalDetails: {
        firstName :response.data.applications[0].borrower.firstName,
        middleName :response.data.applications[0].borrower.middleName,
        lastName :response.data.applications[0].borrower.lastName,
        suffix :response.data.applications[0].borrower.suffixToName,
        maritalStatus:response.data.applications[0].borrower.maritalStatusType,
        mobilePhone:response.data.applications[0].borrower.homePhoneNumber,
        WorkPhone:response.data.applications[0].borrower.workPhoneNumber,
        CellPhone:response.data.applications[0].borrower.mobilePhone,
        email:response.data.applications[0].borrower.emailAddressText,
        currentAddress: {
          addressLine1:response.data.applications[0].borrower.residences[0].urla2020StreetAddress ,
          city:response.data.applications[0].borrower.residences[0].addressCity,
          UnitType:response.data.applications[0].borrower.residences[0].addressUnitDesignatorType,
          unit:response.data.applications[0].borrower.residences[0].addressUnitIdentifier,
          state:response.data.applications[0].borrower.residences[0].addressState,
          zipCode:response.data.applications[0].borrower.residences[0].addressPostalCode,
          Country:response.data.applications[0].borrower.residences[0].country,
        },
        yearsofCurrentAddress:response.data.applications[0].borrower.residences[0].durationTermYears,
        monthsofCurrentAddress:response.data.applications[0].borrower.residences[0].durationTermMonths,
        currentAddressHousing:response.data.applications[0].borrower.residences[0].residencyBasisType,
        priorResidenceDoesNotApply:response.data.applications[0].borrower.priorResidenceDoesNotApply,
        formerAddress:{
          addressLine1:response.data.applications[0].borrower.residences[1].urla2020StreetAddress ,
          city:response.data.applications[0].borrower.residences[1].addressCity,
          UnitType:response.data.applications[0].borrower.residences[1].addressUnitDesignatorType,
          unit:response.data.applications[0].borrower.residences[1].addressUnitIdentifier,
          state:response.data.applications[0].borrower.residences[1].addressState,
          zipCode:response.data.applications[0].borrower.residences[1].addressPostalCode,
          Country:response.data.applications[0].borrower.residences[1].country,
        },
        yearsofFormerAddress:response.data.applications[0].borrower.residences[0].durationTermYears,
        monthsofFormerAddress:response.data.applications[0].borrower.residences[0].durationTermMonths,
        formerAddressHousing:response.data.applications[0].borrower.residences[0].residencyBasisType,
        },
        coBorrower:{
            firstName :response.data.applications[0].coborrower.firstName,
            middleName :response.data.applications[0].coborrower.middleName,
            lastName :response.data.applications[0].coborrower.lastName,
            suffix :response.data.applications[0].coborrower.suffixToName,
            dateOfBirth :response.data.applications[0].coborrower.birthDate,
            maritalStatus:response.data.applications[0].coborrower.maritalStatusType,
            numberOfDependents :response.data.applications[0].coborrower.dependentCount,
            dependents: response.data.applications[0].coborrower.dependentsAgesDescription.split(",").map((age) => ({age: age.trim(),}))}, // Split the string into an array of strings
            mobilePhone: response.data.applications[0].coborrower.homePhoneNumber,
            WorkPhone: response.data.applications[0].coborrower.workPhoneNumber,
            CellPhone: response.data.applications[0].coborrower.mobilePhone,
            email: response.data.applications[0].coborrower.emailAddressText,
            currentAddress: {
              addressLine1:response.data.applications[0].coborrower.residences[0].urla2020StreetAddress ,
              city:response.data.applications[0].coborrower.residences[0].addressCity,
              UnitType:response.data.applications[0].coborrower.residences[0].addressUnitDesignatorType,
              unit:response.data.applications[0].coborrower.residences[0].addressUnitIdentifier,
              state:response.data.applications[0].coborrower.residences[0].addressState,
              zipCode:response.data.applications[0].coborrower.residences[0].addressPostalCode,
              Country:response.data.applications[0].coborrower.residences[0].country,
            },
            yearsofCurrentAddress:response.data.applications[0].coborrower.residences[0].durationTermYears,
            monthsofCurrentAddress:response.data.applications[0].coborrower.residences[0].durationTermMonths,
            currentAddressHousing:response.data.applications[0].coborrower.residences[0].residencyBasisType,
            priorResidenceDoesNotApply:response.data.applications[0].coborrower.priorResidenceDoesNotApply,
            formerAddress:{
              addressLine1:response.data.applications[0].coborrower.residences[1].urla2020StreetAddress ,
              city:response.data.applications[0].coborrower.residences[1].addressCity,
              UnitType:response.data.applications[0].coborrower.residences[1].addressUnitDesignatorType,
              unit:response.data.applications[0].coborrower.residences[1].addressUnitIdentifier,
              state:response.data.applications[0].coborrower.residences[1].addressState,
              zipCode:response.data.applications[0].coborrower.residences[1].addressPostalCode,
              Country:response.data.applications[0].coborrower.residences[1].country,
            },
          }, 
        refinanceApplication:{
            personInfo:{ dateOfBirth :response.data.applications[0].borrower.birthDate,}
        },
        purchaseApplication:{
            personInfo:{ dateOfBirth :response.data.applications[0].borrower.birthDate,}
        }
    
      })

      await BorrowerProfile.updateMany(
        { encompassLoanId: loanId },
        {
          $set: {
            demographic: {
              numberOfDependents: response.data.applications[0].borrower.dependentCount || "0", // Default to "0" if undefined
              dependents: response.data.applications[0].borrower.dependentsAgesDescription.split(",").map((age) => ({age: age.trim(),})), // Default to an empty array if description is missing
            },
          },
        }
      );
      
  
      console.log("Loan updated successfully:");
      res.status(200).json({ message: "Loan updated successfully!" });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ message: "Failed to update loan details", error: error.message });
    }
  };
  