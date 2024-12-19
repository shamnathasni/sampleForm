import mongoose from 'mongoose';


// Employment Schema
const employmentSchema = new mongoose.Schema({
    employmentType: {
      type: String,
      enum: ['Employment', 'Military Pay', 'Independent Contractor', 'Business/Self-Employment'],
      // required: true,
    },
  
    // Employment - General Fields
    employerName: { type: String, 
      // required: function() { return this.employmentType === 'Employment'; } 
    },
    employerAddress: {
      type: Object,
      adress:{
        addressLine1: { type: String, required: true },
        addressLine2: { type: String },
        city: { type: String, required: true },
        county: { type: String },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
      },
    //  required: function() { return this.employmentType === 'Employment'; }
     },
    employerPhone: { type: String, 
      // required: function() { return this.employmentType === 'Employment'; } },
    startDate: { type: Date, required: function() { return this.employmentType === 'Employment' || this.employmentType === 'Independent Contractor'; } },
    endDate: { type: Date },
    jobTitle: { type: String, required: function() { return this.employmentType === 'Employment' || this.employmentType === 'Independent Contractor'; } },
    yearsInProfession: { type: Number, required: function() { return this.employmentType === 'Employment' || this.employmentType === 'Independent Contractor'; } },
    isEmployerRelated: { type: Boolean, required: function() { return this.employmentType === 'Employment'; } }, // Is the employer a family member, property seller, agent, or other party to the transaction
    payType: { type: String, enum: ['Salaried', 'Hourly'], 
      // required: function() { return this.employmentType === 'Employment'; } 
    },
    annualBaseSalary: { type: Number, required: function() { return this.employmentType === 'Employment' && this.payType === 'Salaried'; } },
    hourlyRate: { type: Number,
      //  required: function() { return this.employmentType === 'Employment' && this.payType === 'Hourly'; } 
      },
    hoursPerWeek: { type: Number,
      //  required: function() { return this.employmentType === 'Employment' && this.payType === 'Hourly'; } 
      },
    annualOvertime: { type: Number },
    annualBonus: { type: Number },
    annualCommission: { type: Number },
    otherAnnualIncome: { type: Number },
  
    // Military Pay - Specific to Military Employment
    rank: { type: String,
      //  required: function() { return this.employmentType === 'Military Pay'; } 
      },
    branch: {
      type:Object,
        adress:{
          addressLine1: { type: String, required: true },
          addressLine2: { type: String },
          city: { type: String, required: true },
          county: { type: String },
          state: { type: String, required: true },
          zipCode: { type: String, required: true },
        },   
      //  required: function() { return this.employmentType === 'Military Pay'; } 
      },
    baseMonthlySalary: { type: Number, 
      // required: function() { return this.employmentType === 'Military Pay'; }
     },
    baseAllowanceForSubsistence: { type: Number },
    specialPay: { type: Boolean },
    specialPayDetails: [{
      type: String,
      enum: ['Flight Pay', 'Combat Pay', 'Hazard Pay', 'Overseas Pay', 'Prop Pay', 'Variable Housing Allowance', 'Clothes Allowance'],
      // required: function() { return this.employmentType === 'Military Pay' && this.specialPay; }
    }],
  
    // Independent Contractor - Specific to Independent Contractors
    grossAnnualIncome: { type: Number,
      //  required: function() { return this.employmentType === 'Independent Contractor'; } 
      },
  
    // Business / Self-Employment - Specific to Business Owners
    businessType: { type: String, enum: ['Sole Proprietor', 'LLC', 'S-Corp', 'Partnership'],
      //  required: function() { return this.employmentType === 'Business/Self-Employment'; } 
      },
    businessName: { type: String, 
      // required: function() { return this.employmentType === 'Business/Self-Employment'; }
     },
    businessAddress: {
      type:Object,
        adress:{
          addressLine1: { type: String, required: true },
          addressLine2: { type: String },
          city: { type: String, required: true },
          county: { type: String },
          state: { type: String, required: true },
          zipCode: { type: String, required: true },
        },   
      // required: function() { return this.employmentType === 'Business/Self-Employment'; } 
    },
    businessPhoneNumber: { type: String,
      //  required: function() { return this.employmentType === 'Business/Self-Employment'; }
       },
    businessOwnership: { type: Number,
      //  required: function() { return this.employmentType === 'Business/Self-Employment'; }
       }, // Percentage ownership
    businessGrossAnnualIncome: { type: Number, 
      // required: function() { return this.employmentType === 'Business/Self-Employment'; } 
    },
  
    // Date when employment details were updated or created
    createdAt: { type: Date, default: Date.now },
  });
  
  
  
  const NonEmploymentSchema = new mongoose.Schema({
    reasonForNonEmployment: { 
      type: String, 
      // required: true,
      enum:["Home Maker","Retired","Student","Unemployed","Other"] 
      },
    startDate:{
      type:Date,
      // required:true
    } ,
    StillNonEmployee:{
      type:Boolean,
    },
    endDate:{
      type:Date,
      // required:function() {
      //     return !this.StillNonEmployee
      // }
    },
    incomeSource: {
      type: String,
      enum: [
        "Rental", "Social Security", "Pension", "Alimony or Child Support", 
        "Annuity", "Unemployment Benefit", "Interest or Dividend", "Other"
      ],
      // required: true
    },
  
    // For Rental Income
    rentalPropertyType: {
      type: String,
      enum: [
        "Single Family", "Condominium", "TownHouse", "Two to Four Unit Property",
        "Cooperative", "Manufactured Home"
      ],
      // required: function() { return this.incomeSource === 'Rental'; }
    },
    rentalPropertyAddress: {
      type:Object,
      adress:{
        addressLine1: { type: String},
        addressLine2: { type:String },
        county: { type: String },
        state: { type: String },
        zipCode: { type: String, },
      },   
        // required: function() { return this.incomeSource === 'Rental'; }
    },
    rentalPropertyValue: {
      type: Number,
      // required: function() { return this.incomeSource === 'Rental'; }
    },
    rentalMonthlyRent: {
      type: Number,
      // required: function() { return this.incomeSource === 'Rental'; }
    },
    rentalNumberOfMortgages: {
      type: Number,
      // required: function() { return this.incomeSource === 'Rental'; }
    },
    rentalPrincipalAndInterest: {
      type: Number,
      // required: function() { return this.incomeSource === 'Rental'; }
    },
    rentalWillMortgageBePaidOffBeforeClosing: {
      type: Boolean,
      // required: function() { return this.incomeSource === 'Rental'; }
    },
  
    // Social Security Income
    socialSecurityMonthlyIncome: {
      type: Number,
      // required: function() { return this.incomeSource === 'Social Security'; }
    },
  
    // Pension Income
    pensionEmployerName: {
      type: String,
      // required: function() { return this.incomeSource === 'Pension'; }
    },
    pensionMonthlyIncome: {
      type: Number,
      // required: function() { return this.incomeSource === 'Pension'; }
    },
  
    // Alimony or Child Support
    supportIncomeType: {
      type: String,
      enum: ["Alimony", "Child Support"],
      // required: function() { return this.incomeSource === 'Alimony or Child Support'; }
    },
    supportMonthlyIncome: {
      type: Number,
      // required: function() { return this.incomeSource === 'Alimony or Child Support'; }
    },
  
    // Annuity Income
    annuityDescription: {
      type: String,
      // required: function() { return this.incomeSource === 'Annuity'; }
    },
    annuityMonthlyIncome: {
      type: Number,
      // required: function() { return this.incomeSource === 'Annuity'; }
    },
  
    // Unemployment Benefit
    unemploymentMonthlyIncome: {
      type: Number,
      // required: function() { return this.incomeSource === 'Unemployment Benefit'; }
    },
  
    // Interest or Dividend Income
    interestOrDividendAnnualIncome: {
      type: Number,
      // required: function() { return this.incomeSource === 'Interest or Dividend'; }
    },
  
    // Other Income
    otherIncomeType: {
      type: String,
      enum: [
        "Automobile Allowance", "Boarder Income", "Capital Gains", 
        "Deferred Compensation", "Disability", "Foster Care", "Housing or Parsonage", 
        "Mortgage Credit Certificate", "Mortgage Differential Payments", 
        "Notes Receivable", "Other", "Public Assistance", "Retirement (e.g., IRA)", 
        "Royalty Payment", "Separate Maintenance", "Trusts", "VA Compensation"
      ],
      // required: function() { return this.incomeSource === 'Other'; }
    },
    otherMonthlyIncome: {
      type: Number,
      // required: function() { return this.incomeSource === 'Other'; }
    }
  });

// Demographic Schema
const demographicSchema = new mongoose.Schema({
    sex: {
        type: String,
        enum: ['Female', 'Male', 'I do not wish to provide this information'],
        required: true
      },
      ethnicity: {
        type: String,
        enum: [
          'Hispanic or Latino', 'Mexican', 'Puerto Rican', 'Cuban', 
          'Other Hispanic or Latino', 'Not Hispanic or Latino', 
          'I do not wish to provide this information'
        ],
        required: true
      },
      race: {
        type: [String],
        enum: [
          'American Indian or Alaska Native', 'Asian', 'Black or African American',
          'Native Hawaiian or Other Pacific Islander', 'White', 
          'I do not wish to provide this information'
        ],
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
        type: Date,
        // required: true
      },
      previousPropertyOwnership: {
        ownedInLastThreeYears: {
          type: Boolean,
          // required: true
        },
        propertyUse: {
          type: String,
          enum: ['Primary Residence', 'Second/Vacation Home', 'Investment/Rental Property', 'FHA Secondary Residence'],
          required: true
        },
        titleHeld: {
          type: String,
          enum: ['Solely', 'Jointly with spouse', 'Jointly with other'],
          required: true
        }
      },
      languagePreference: {
        type: String,
        enum: ['English', 'Chinese (中文)', 'Korean (한국어)', 'Spanish (Español)', 'Tagalog', 'Vietnamese (Tiếng Việt)', 'Other', 'I do not wish to provide this information'],
        // required: true
      },
      numberOfDependents: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        required: true
      },
      dependents: [
        {age: { type: Number, required: function() { return this.numberOfDependents > 0; } }}
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
          required: true
        },
        mortgageExplanation: {
          type: String,
          required: function() { return this.applyingForOtherMortgage === true; }
        },
        applyingForNewCredit: {
          type: Boolean,
          required: true
        },
        newCreditExplanation: {
          type: String,
          required: function() { return this.applyingForNewCredit === true; }
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
          required: function() { return this.coSignerOnOtherDebt === true; }
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
          required: true
        },
        moneyBorrowedAmount: {
          type: Number,
          required: function() { return this.borrowingMoneyForTransaction === true; }
        },
        borrowingExplanation: {
          type: String,
          // required: function() { return this.borrowingMoneyForTransaction === true; }
        },
        bankruptcyDeclared: {
          type: Boolean,
          required: true
        },
        bankruptcyType: {
          type: {
            chapter7: { type: Boolean, default: false },
            chapter11: { type: Boolean, default: false },
            chapter12: { type: Boolean, default: false },
            chapter13: { type: Boolean, default: false }
          },
          required: function() { return this.bankruptcyDeclared === true; }
        },
        bankruptcyExplanation: {
          type: String,
          // required: function() { return this.bankruptcyDeclared === true; }
        },
        alimonyChildSupportExpenses: [{
            type: {
              type: String,
              enum: ["Alimony", "Child Support", "Job Related", "Separate Maintenance", "Other"],
              // required: true
            },
            monthlyPaymentAmount: {
              type: Number,
              // required: true
            },
            monthsLeft: {
              type: Number,
              // required: true
            },
            otherExplanation: {
              type: String,
              // required: function() { return this.type === "Other"; }
            }

        }],
        usCitizenshipStatus: {
          type: String,
          enum: ["U.S. Citizen", "Permanent Resident Alien", "Non-Permanent Resident Alien"],
          required: true
        }
      }
});

const RealEstateSchema = new mongoose.Schema({
    properties: [{
      propertyType: {
        type: String,
        enum: [
          "Single Family", "Condominium", "Town House", "Two to Four Unit Property", 
          "Manufactured Home", "Cooperative", "Commercial"
        ],
        // required: true
      },
      numberOfUnits: {
        type: Number,
        enum:[2,3,4],
        // required: function() { return this.propertyType === 'Two to Four Unit Property'; }
      },
      propertyAddress: {
        type:Object,
        adress:{
          addressLine1: { type: String, required: true },
          addressLine2: { type: String },
          city: { type: String, required: true },
          county: { type: String },
          state: { type: String, required: true },
          zipCode: { type: String, required: true },
        },        
          required: true
      },
      propertyValue: {
        type: Number,
        required: true
      },
      currentUse: {
        type: String,
        enum: ["Primary Residence", "Second/Vacation Residence", "Investment/Rental Property", "Property Pending Sale", "Property Sold"],
        // required: true
      },
      useAfterTransaction: {
        type: String,
        enum: ["Retain as Primary Residence", "Retain as Second/Vacation Residence", "Retain as Investment/Rental Property", "Property Pending Sale", "Property Sold"],
        // required: true
      },
      rentalIncome: {
        type: Boolean,
        // required: true
      },
      monthlyRent: {
        type: Number,
        required: function() { return this.rentalIncome === true; }
      },
      numberOfMortgages: {
        type: Number,
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
  nonEmployment: NonEmploymentSchema,
  demographic: demographicSchema,
  declarations: declarationsSchema,
  realestate: RealEstateSchema
});

const BorrowerProfile = mongoose.model("BorrowerProfile", BorrowerProfileSchema);

export default BorrowerProfile;
