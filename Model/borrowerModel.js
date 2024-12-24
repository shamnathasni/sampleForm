import mongoose from 'mongoose';

const borrowerSchema = new mongoose.Schema(
  {
    loanStatus: {
      type: String,
      default: "created",
    },
    borrowerPersonalDetails: {
      firstName: { type: String,
        //  required: true
         },
      middleName: { type: String },
      lastName: { type: String, 
        // required: true 
      },
      suffix: { type: String },
      phoneNumber: { type: String,
        //  required: true
         },
      email: { type: String,
        //  required: true 
        },
      maritalStatus: {
        type: String,
        // enum: ['Married', 'Separated', 'Unmarried'],
        // required: true,
      },
      hasPropertyRightsWithNonSpouse: {
        type: Boolean,
        // required: function () {
        //   return this.borrowerPersonalDetails?.maritalStatus === 'Unmarried';
        // },
      },
      domesticRelationshipType: {
        type: String,
        // enum: ["",'Civil union', 'Domestic Partnership', 'Registered Reciprocal Beneficiary Relationship', 'Other'],
        // required: function () {
        //   return this.borrowerPersonalDetails?.maritalStatus === 'Unmarried';
        // },
      },
      otherRelationshipExplanation: {
        type: String,
        // required: function () {
        //   return (
        //     this.borrowerPersonalDetails?.maritalStatus === 'Unmarried' &&
        //     this.borrowerPersonalDetails?.domesticRelationshipType === 'Other'
        //   );
        // },
      },
      relationshipState: {
        type: String,
        // enum: ["",'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Florida', 'Georgia', 'Texas'],
        // required: function () {
        //   return this.borrowerPersonalDetails?.maritalStatus === 'Unmarried';
        // },
      },
      currentAddress: {
        addressLine1: { type: String,
          //  required: true 
          },
        addressLine2: { type: String },
        city: { type: String,  },
        county: { type: String },
        state: { type: String,  },
        zipCode: { type: String,  },
      },
      sameAsMailingAddress: { type: Boolean },
      mailingAddress: {
        addressLine1: { type: String },
        addressLine2: { type: String },
        city: { type: String },
        county: { type: String },
        state: { type: String },
        zipCode: { type: String },
      },
    },
    coBorrower: {
      firstName: { type: String },
      middleName: { type: String },
      lastName: { type: String },
      suffix: { type: String },
      phoneNumber: { type: String },
      email: { type: String,},
      maritalStatus: {
        type: String,
        // enum: ['Married', 'Separated', 'Unmarried'],
      },
      isSpouse: {
        type: Boolean,
        // required: function () {
        //   return this.coBorrower?.maritalStatus === 'Married';
        // },
      },
      hasPropertyRightsWithNonSpouse: {
        type: String,
        // required: function () {
        //   return this.coBorrower?.maritalStatus === 'Unmarried';
        // },
      },

      isMilitaryPersonnel: {
        type: Boolean,
        // required: true,
      },
      currentMilitaryStatus: {
        type: String,
        // enum: [
        //   'Active Duty',
        //   'Non-Activated Member of the Reserves',
        //   'Non-Activated Member of the National Guard',
        //   'Retired, Discharged, or Separated from Service',
        //   'Surviving Spouse',
        // ],
        // required: function () {
        //   return this.Borrower?.isMilitaryPersonnel;
        // },
      },
      militaryBranch: {
        type: String,
        // enum: ['Air Force', 'Army', 'Coast Guard', 'Marines', 'National Guard', 'Navy', 'Space Force'],
        // required: function () {
        //   return this.coBorrower?.isMilitaryPersonnel;
        // },
      },
      rank: {
        type: String,
        // enum: [
        //   'E-1', 'E-2', 'E-3', 'E-4', 'E-5', 'E-6', 'E-7', 'E-8', 'E-9','O-1', 'O-1E', 'O-2', 'O-2E', 'O-3', 'O-3E', 'O-4', 'O-5', 'O-6',
        // ],
        // required: function () {
        //   return this.coBorrower?.isMilitaryPersonnel;
        // },
      },
      yearsInProfession: { type: String },
      liveWithPerson: { type: Boolean },
      currentAddress: {
        addressLine1: { type: String, },
        addressLine2: { type: String },
        city: { type: String,  },
        county: { type: String },
        state: { type: String },
        zipCode: { type: String },
      },
      sameAsMailingAddress: { type: Boolean },
      mailingAddress: {
        addressLine1: { type: String },
        addressLine2: { type: String },
        city: { type: String },
        county: { type: String },
        state: { type: String },
        zipCode: { type: String },
      },
      canProvideInformation: { type: Boolean,
        //  required: true
         },
      agreeToShareFinancialInfo: { type: Boolean, 
        // required: true 
      },
    },
    ApplicationType: {
      type: String,
      // enum: ["Refinance Application", "Purchase Application"],
      // // required: true,
    },
    refinanceApplication: {
      property: {
        propertyType: {
          type: String,
          // enum: ['Single family', 'Condominium', 'Town House', 'Two to Four unit Property', 'Cooperative', 'Manufactured home'],
          // required: function () {
          //   return this.ApplicationType === "refinanceApplication";
          // },
        },
        numberOfUnits: {
          type: String,
          // enum: ["2", "3", "4"],
          // required: function () {
          //   return this.propertyType === 'Two to Four unit Property' && this.ApplicationType === "refinanceApplication";      
          // },
        },
        ////////
        plannedUnitDevelopment: {
          type: Boolean,
          // required: function () {
          //   return this.ApplicationType === "refinanceApplication";
          // },
        },
        propertyUse: {
          type: String,
          // enum: ['Primary Residence', 'Second/Vacation Home', 'Investment or Rental Property', 'FHA Secondary Residence'],
          // required: function () {
          //   return this.ApplicationType === "refinanceApplication";
          // },
        },
        propertyAddress: {
          type:Object,
          adress:{
            addressLine1: { type: String, },
            addressLine2: { type: String },
            city: { type: String, },
            county: { type: String },
            state: { type: String, },
            zipCode: { type: String,},
          },   
          // required: function () {
          //   return this.ApplicationType === "refinanceApplication";
          // },
        },
        /////optianal/////
        numberOfMortgages: {
          type: String,
          // required: function () {
          //   return this.ApplicationType === "refinanceApplication";
          // },
        },
        principalAndInterestMonthlyPayment: {
          type: String, // Optional field
        },
        willMortgageBePaidOff: {
          type: Boolean,
          default: false, // Optional, defaults to false
        },
        monthlyRent: {
          type: String,
          // required: function () {
          //   return this.propertyUse === 'Investment or Rental Property' && this.ApplicationType === "refinanceApplication";
          // },
        }
      },
      loanDetails: {
        loanAmount: {
          type: String,
          // required: function () {
          //   return this.ApplicationType === "refinanceApplication";
          // },
        },
        refinancePurpose: {
          type: String,
          // enum: [null,'Lower rate or change terms', 'Cash-out for Home Improvement', 'Cash-out for Debt Consolidation', 'Other'],
          // required: function () {
          //   return this.ApplicationType === "refinanceApplication";
          // },
        },
        applyingForOtherLoans: {
          type: Boolean,
          default: false,
        },
      },
      personInfo: {
        socialSecurityNumber: {
          type: String,
          // required: function () {
          //   return this.ApplicationType === "refinanceApplication";
          // },
        },
        dateOfBirth: {
          type: String,
          // required: function () {
          //   return this.ApplicationType === "refinanceApplication";
          // },
        },
      },
    },
    purchaseApplication: {
      property: {
        propertyType: {
          type: String,
          // enum: [null,'Single family', 'Condominium', 'Town House', 'Two to Four unit Property', 'Cooperative', 'Manufactured home'],
          // required: function () {
          //   return this.ApplicationType === "purchaseApplication";
          // },
        },
        numberOfUnits: {
          type: String,
          // enum: [null,"2", "3", "4"],
          // required: function () {
          //     return this.propertyType === 'Two to Four unit Property' && this.ApplicationType === "purchaseApplication";      
          // },
        },
        plannedUnitDevelopment: {
          type: Boolean,
          // required: function () {
          //   return this.ApplicationType === "purchaseApplication";
          // },
        },
        propertyUse: {
          type: String,
          // enum: [null,'Primary Residence', 'Second/Vacation Home', 'Investment or Rental Property', 'FHA Secondary Residence'],
          // required: function () {
          //   return this.ApplicationType === "purchaseApplication";
          // },
        },
        MonthlyIncome:{
          type:Boolean,
          default:true
        },
        expectedMonthlyRentalIncome: {
          type: String,
          // required: function () {
          //   return this.propertyUse === 'Investment or Rental Property' && this.MonthlyIncome ;
          // },
        },
        propertyCounty: {
          type: String,
          //  required: function () {
          //   return this.ApplicationType === "purchaseApplication";
          // },
        },
      },
      loanDetails: {
          purchasePrice: {
            type: String,
            // required: function () {
            //   return this.ApplicationType === "purchaseApplication";
            // },
          },
          loanAmount: {
            type: String,
            // required: function () {
            //   return this.ApplicationType === "purchaseApplication";
            // },
          },
          applyingForOtherLoans: {
            type: Boolean,
            default: false,
          },
      },
      personInfo: {
        socialSecurityNumber: {
          type: String,
          // required: function () {
          //   return this.ApplicationType === "purchaseApplication";
          // },
        },
        dateOfBirth: {
          type: String,
          // required: function () {
          //   return this.ApplicationType === "purchaseApplication";
          // },
        },
      },
    },
    assets: [{
      asset: {
        type: Boolean,
        default: true, // Indicates whether the account is linked or not
      },
      institutionName: {
        type: String,
        // enum: [null,"Bank Of America","Chase","Citi","Wells Fargo","Capital One Bank","USAA","U.S.Bank","Navy Federal Credit Union",],
        // required: function() {
        //   return this.asset; // Institution name is required only if asset is true
        // },
      },
      userid: {
        type: String,
        // required: function() {
        //     return this.asset; // Password is required if asset (account) is linked (true)
        //   }, 
      },
      password: {
        type: String,
        // required: function() {
        //   return this.asset; // Password is required if asset (account) is linked (true)
        // },
      },
      accountType: {
        type: String,
        // enum: [null,"Checking","Brokerage","Retirement","Savings","Trust","Certificate of Deposit","Money Market","Annuity","Mutual Fund","Stocks","Stock Options","Bonds","Bridge Loan Proceeds","Individual Development Account","Cash Value of Life Insurance","Other",],
        // required: function() {
        //   return !this.asset; // Account type is required if asset (account) is linked (true)
        // },
      },
      cashOrMarketValue: {
        type: String,
        // required: function() {
        //   return !this.asset;// Cash or market value is required if asset (account) is linked (true)
        // },
        min: 0, // Cash or market value must be a non-negative number
      },
    }],
  },
  { timestamps: true } // Optional: to track creation and update times
);

const Borrower = mongoose.model('Borrower', borrowerSchema);

export default Borrower;
