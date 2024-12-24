import mongoose from 'mongoose';


// Employment Schema
const employmentSchema = new mongoose.Schema({
  isEmployed: { type: Boolean, required: true, default:true}, // True for employment, false for non-employment

  // Common Fields
  startDate: { type: String,
    //  required: true
     },
  endDate: { type: String },
  reasonForNonEmployment: { 
    type: String, 
    // enum: ["Home Maker", "Retired", "Student", "Unemployed", "Other"] 
  },

  // Employment-Specific Fields
  employmentType: {
    type: String,
    // enum: ['Employment', 'Military Pay', 'Independent Contractor', 'Business/Self-Employment'],
  },
  employerName: { type: String },
  employerAddress: {
    addressLine1: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    county: { type: String },
    state: { type: String },
    zipCode: { type: String },
  },
  employerPhone: { type: String },
  jobTitle: { type: String },
  payType: { type: String, 
    // enum: ['Salaried', 'Hourly']
   },
  annualBaseSalary: { type: String },
  hourlyRate: { type: String },
  hoursPerWeek: { type: String },
  annualOvertime: { type: String },
  annualBonus: { type: String },
  annualCommission: { type: String },
  otherAnnualIncome: { type: String },

  // Military Pay Fields
  rank: { type: String },
  branch: {
    addressLine1: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    county: { type: String },
    state: { type: String },
    zipCode: { type: String },
  },
  baseMonthlySalary: { type: String },
  baseAllowanceForSubsistence: { type: String },
  specialPay: { type: Boolean },
  specialPayDetails: [{
    type: String,
    // enum: ['Flight Pay', 'Combat Pay', 'Hazard Pay', 'Overseas Pay', 'Prop Pay', 'Variable Housing Allowance', 'Clothes Allowance'],
  }],

  // Independent Contractor Fields
  grossAnnualIncome: { type: String },

  // Business / Self-Employment Fields
  // businessType: { type: String, enum: ['Sole Proprietor', 'LLC', 'S-Corp', 'Partnership'] },
  businessName: { type: String },
  businessAddress: {
    addressLine1: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    county: { type: String },
    state: { type: String },
    zipCode: { type: String },
  },
  businessPhoneNumber: { type: String },
  businessOwnership: { type: String }, // Percentage ownership
  businessGrossAnnualIncome: { type: String },

  // Non-Employment Specific Fields
  incomeSource: {
    type: String,
    // enum: [
    //   "Rental", "Social Security", "Pension", "Alimony or Child Support", 
    //   "Annuity", "Unemployment Benefit", "Interest or Dividend", "Other"
    // ]
  },
  rentalPropertyType: { 
    type: String, 
    // enum: ["Single Family", "Condominium", "TownHouse", "Two to Four Unit Property", "Cooperative", "Manufactured Home"] 
  },
  rentalPropertyAddress: {
    addressLine1: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    county: { type: String },
    state: { type: String },
    zipCode: { type: String },
  },
  rentalPropertyValue: { type: String },
  rentalMonthlyRent: { type: String },
  rentalNumberOfMortgages: { type: String },
  rentalPrincipalAndInterest: { type: String },
  rentalWillMortgageBePaidOffBeforeClosing: { type: Boolean },

  socialSecurityMonthlyIncome: { type: String },
  pensionEmployerName: { type: String },
  pensionMonthlyIncome: { type: String },
  supportIncomeType: { 
    type: String, 
    // enum: ["Alimony", "Child Support"] 
  },
  supportMonthlyIncome: { type: String },
  annuityDescription: { type: String },
  annuityMonthlyIncome: { type: String },
  unemploymentMonthlyIncome: { type: String },
  interestOrDividendAnnualIncome: { type: String },
  otherIncomeType: {
    type: String,
    // enum: [
    //   "Automobile Allowance", "Boarder Income", "Capital Gains", 
    //   "Deferred Compensation", "Disability", "Foster Care", "Housing or Parsonage", 
    //   "Mortgage Credit Certificate", "Mortgage Differential Payments", 
    //   "Notes Receivable", "Other", "Public Assistance", "Retirement (e.g., IRA)", 
    //   "Royalty Payment", "Separate Maintenance", "Trusts", "VA Compensation"
    // ]
  },
  otherMonthlyIncome: { type: String },

  // Timestamp
  createdAt: { type: Date, default: Date.now },
});


// Demographic Schema
const demographicSchema = new mongoose.Schema({
    sex: {
        type: String,
        // enum: ['Female', 'Male', 'I do not wish to provide this information'],
        // required: true
      },
      ethnicity: {
        type: String,
        // enum: [
        //   'Hispanic or Latino', 'Mexican', 'Puerto Rican', 'Cuban', 
        //   'Other Hispanic or Latino', 'Not Hispanic or Latino', 
        //   'I do not wish to provide this information'
        // ],
        // required: true
      },
      race: {
        type: [String],
        // enum: [
        //   'American Indian or Alaska Native', 'Asian', 'Black or African American',
        //   'Native Hawaiian or Other Pacific Islander', 'White', 
        //   'I do not wish to provide this information'
        // ],
        // required: true
      },
      raceOtherDescription: {
        type: String, 
        // required: function() { return this.race.includes('Other'); } 
      },
      currentAddress: {
        type:Object,
        adress:{
          addressLine1: { type: String,
            //  required: true 
            },
          addressLine2: { type: String },
          city: { type: String, 
            // required: true 
          },
          county: { type: String },
          state: { type: String, 
            // required: true
           },
          zipCode: { type: String, 
            // required: true
           },
        },   
        // required: true
      },
      moveInDate: {
        type: String,
        // required: true
      },
      previousPropertyOwnership: {
        ownedInLastThreeYears: {
          type: Boolean,
          // required: true
        },
        propertyUse: {
          type: String,
          // enum: ['Primary Residence', 'Second/Vacation Home', 'Investment/Rental Property', 'FHA Secondary Residence'],
          // required: true
        },
        titleHeld: {
          type: String,
          // enum: ['Solely', 'Jointly with spouse', 'Jointly with other'],
          // required: true
        }
      },
      languagePreference: {
        type: String,
        // enum: ['English', 'Chinese (中文)', 'Korean (한국어)', 'Spanish (Español)', 'Tagalog', 'Vietnamese (Tiếng Việt)', 'Other', 'I do not wish to provide this information'],
        // required: true
      },
      numberOfDependents: {
        type: String,
        // enum: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        // required: true
      },
      dependents: [
        {age: { type: String, 
          // required: function() { return this.numberOfDependents > 0; } 
        }}
      ]
});

// Declarations Schema
const declarationsSchema = new mongoose.Schema({
    propertyQuestions: {
        familyBusinessRelationshipWithSeller: {
          type: Boolean,
          // required: true
        },
        familyBusinessExplanation: {
          type: String,
          // required: function() { return this.familyBusinessRelationshipWithSeller === true; }
        },
        applyingForOtherMortgage: {
          type: Boolean,
          // required: true
        },
        mortgageExplanation: {
          type: String,
          // required: function() { return this.applyingForOtherMortgage === true; }
        },
        applyingForNewCredit: {
          type: Boolean,
          // required: true
        },
        newCreditExplanation: {
          type: String,
          // required: function() { return this.applyingForNewCredit === true; }
        },
         Priority: {
          type: Boolean,
          // required: true
        },
        lienExplanation: {
          type: String,
          // required: function() { return this.lienPriority === true; }
        },
        preForeclosureSale: {
          type: Boolean,
          // required: true
        },
        preForeclosureExplanation: {
          type: String,
          // required: function() { return this.preForeclosureSale === true; }
        }
      },
      financialHistory: {
        coSignerOnOtherDebt: {
          type: Boolean,
          // required: true
        },
        coSignerExplanation: {
          type: String,
          // required: function() { return this.coSignerOnOtherDebt === true; }
        },
        outstandingJudgments: {
          type: Boolean,
          // required: true
        },
        judgmentsExplanation: {
          type: String,
          // required: function() { return this.outstandingJudgments === true; }
        },
        delinquentFederalDebt: {
          type: Boolean,
          // required: true
        },
        delinquentDebtExplanation: {
          type: String,
          // required: function() { return this.delinquentFederalDebt === true; }
        },
        lawsuitLiability: {
          type: Boolean,
          // required: true
        },
        lawsuitExplanation: {
          type: String,
          // required: function() { return this.lawsuitLiability === true; }
        },
        titleConveyedInLieuOfForeclosure: {
          type: Boolean,
          // required: true
        },
        titleConveyedExplanation: {
          type: String,
          // required: function() { return this.titleConveyedInLieuOfForeclosure === true; }
        },
        propertyForeclosure: {
          type: Boolean,
          // required: true
        },
        foreclosureExplanation: {
          type: String,
          // required: function() { return this.propertyForeclosure === true; }
        },
        borrowingMoneyForTransaction: {
          type: Boolean,
          // required: true
        },
        moneyBorrowedAmount: {
          type: String,
          // required: function() { return this.borrowingMoneyForTransaction === true; }
        },
        borrowingExplanation: {
          type: String,
          // required: function() { return this.borrowingMoneyForTransaction === true; }
        },
        bankruptcyDeclared: {
          type: Boolean,
          // required: true
        },
        bankruptcyType: {
          type: {
            chapter7: { type: Boolean, default: false },
            chapter11: { type: Boolean, default: false },
            chapter12: { type: Boolean, default: false },
            chapter13: { type: Boolean, default: false }
          },
          // required: function() { return this.bankruptcyDeclared === true; }
        },
        bankruptcyExplanation: {
          type: String,
          // required: function() { return this.bankruptcyDeclared === true; }
        },
        alimonyChildSupportExpenses: [{
            type: {
              type: String,
              // enum: ["Alimony", "Child Support", "Job Related", "Separate Maintenance", "Other"],
              // required: true
            },
            monthlyPaymentAmount: {
              type: String,
              // required: true
            },
            monthsLeft: {
              type: String,
              // required: true
            },
            otherExplanation: {
              type: String,
              // required: function() { return this.type === "Other"; }
            }

        }],
        usCitizenshipStatus: {
          type: String,
          // enum: ["U.S. Citizen", "Permanent Resident Alien", "Non-Permanent Resident Alien"],
          // required: true
        }
      }
});

const RealEstateSchema = new mongoose.Schema({
    properties: [{
      propertyType: {
        type: String,
        // enum: [
        //   "Single Family", "Condominium", "Town House", "Two to Four Unit Property", 
        //   "Manufactured Home", "Cooperative", "Commercial"
        // ],
        // required: true
      },
      numberOfUnits: {
        type: String,
        enum:["2","3","4"],
        // required: function() { return this.propertyType === 'Two to Four Unit Property'; }
      },
      propertyAddress: {
        type:Object,
        adress:{
          addressLine1: { type: String,  },
          addressLine2: { type: String },
          city: { type: String,  },
          county: { type: String },
          state: { type: String,  },
          zipCode: { type: String,  },
        },        
          // required: true
      },
      propertyValue: {
        type: String,
        // required: true
      },
      currentUse: {
        type: String,
        // enum: ["","Primary Residence", "Second/Vacation Residence", "Investment/Rental Property", "Property Pending Sale", "Property Sold"],
        // required: true
      },
      useAfterTransaction: {
        type: String,
        // enum: [ "","Retain as Primary Residence", "Retain as Second/Vacation Residence", "Retain as Investment/Rental Property", "Property Pending Sale", "Property Sold"],
        // required: true
      },
      rentalIncome: {
        type: Boolean,
        // required: true
      },
      monthlyRent: {
        type: String,
        // required: function() { return this.rentalIncome === true; }
      },
      numberOfMortgages: {
        type: String,
        // required: true
      },
      mortgagePaidOffBeforeClosing: {
        type: Boolean,
        // required: true
      },
    }]
  });

// Combined Schema
const BorrowerProfileSchema = new mongoose.Schema({
 borrowerId: { type: mongoose.Types.ObjectId, required: true, ref: 'Borrower' },
  employment: employmentSchema,
  demographic: demographicSchema,
  declarations: declarationsSchema,
  realestate: RealEstateSchema
});

const BorrowerProfile = mongoose.model("BorrowerProfile", BorrowerProfileSchema);

export default BorrowerProfile;
