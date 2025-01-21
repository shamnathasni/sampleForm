import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
   borrowerId: { type: mongoose.Types.ObjectId, required: true, ref: 'Borrower' },
   encompassLoanId: {
    type: String, // or the appropriate type
    default: null,
  },
    loanProgramName:{type:String},
    agencyCaseIdentifier:{type:String},
    lenderCaseIdentifier:{type:String},
    SSNITIN:{type:String},
    IndividualCredit:{type:Boolean},
    JointCredit:{type:Boolean},
    ExpectedBorrowerCount:{type:Number},
    creditScoreToUse:{type:Number},//Credit Score for Decision Making
    creditReportReferenceIdentifier:{type:String},//Credit Reference #
    //Credit Information & Ordering
    twelveMonthMortgageRentalHistoryIndicator:{type:Boolean},
    commentOfCreditReport:{type:String},
    ////////Property, Title & Trust/////////////////////////////////////////////////////////
    financedNumberOfUnits:{type:Number},
    attachmentType:{type:String},
    gsePropertyType:{type:String},
    projectDesignType:{type:String},
    propertyEstimatedValueAmount:{type:Number},
    propertyAppraisedValueAmount:{type:Number},
    legalDescriptionText1:{type:String},
    legalDescriptionText2:{type:String},
    occupancyDisplayField:{type:String},//Subject Property Occupancy Status
    //Project Type
    condominiumIndicator:{type:Boolean},
    cooperativeIndicator: {type:Boolean},
    pudIndicator: {type:Boolean},
    notInProjectIndicator: {type:Boolean},
    //Community Property State
    borrCommunityPropertyStateResidentIndicator: {type:Boolean},
    communityPropertyStateResidentIndicator: {type:Boolean},
    communityPropertyStateResidentIndicator: {type:Boolean},
    //Energy Improvemen
    propertyEnergyEfficientHomeIndicator: {type:Boolean},
    propertyExistingCleanEnergyLienIndicator: {type:Boolean},

    propertyMixedUsageIndicator: {type:Boolean},
    manufacturedHousing: {type:Boolean},
    aduIndicator: {type:Boolean},
    aduCount:{type:Number},
    aduGrossIncome:{type:Number},
    aduExpenses:{type:Number},
    aduVacancyFactor:{type:Number},
    aduNetIncome:{type:Number},
    //Title and Trust Information
    titleHolderFullName:{type:String},
    titleHolderFullNampropertyEstateType:{type:String},//Estate Will be Held in
    relationshipVestingType:{type:String},//Manner in which Title will be Held
    relationshipVestingTypeOtherDescription:{type:String},//other
    trustClassificationType:{type:String},//Trust Information
    nativeAmericanLandsType:{type:String},//Trust Information
    nativeAmericanLandsTypeOtherDescription:{type:String},//Trust Information
    ///////loan information/////////////////////////////////////////////////////////
    loanPurposeType:{type:String},//Loan Purpose
    loanPurposeTypeUrla:{type:String},
    otherLoanPurposeDescription:{type:String},//Loan Purpose other      
    occupancyDisplayField:{type:String},//Property Will Be
    subjectPropertyGrossRentalIncomeAmount:{type:Number},//Gross Rent
    subjectPropertyOccupancyPercent:{type:Number},//Occupancy Rate
    isConstructionPhaseDisclosedSeparately:{type:Boolean},//Transaction Detail
    conversionOfContractForDeedIndicator:{type:Boolean},
    renovationLoanIndicator:{type:Boolean},
    constructionLoanIndicator:{type:Boolean},
    constructionToPermanentClosingType:{type:String},
    gseRefinancePurposeType:{type:String},//Purpose of Refinance
    withOriginalCreditor:{type:Boolean},//Refinance with Original Creditor
    refinanceCashOutDeterminationType:{type:String},//Refinance Type
    landValueType:{type:String},//land value Type
    acquisition:{type:Boolean},//initial Acquisition
    constructionRefinanceIndicator:{type:Boolean},//refinance
    lotOwnedFreeAndClearIndicator:{type:Boolean},//Lot Owned Free and Clear
    governmentRefinanceType:{type:String},//Refinance Program
    governmentRefinanceTypeOtherDescription: {type:String},//other
    ////Construction Loan Details//////
    lotAcquiredDate: {type:Date},//Lot Acquired Date
    propertyOriginalCostAmount:{type:Number},///Original Cost
    propertyExistingLienAmount:{type:Number},//Existing Lien
    constructionPeriodMonths:{type:Number},//Period
    landEstimatedValueAmount:{type:Number},//Present Value of Lot (a)
    constructionImprovementCostsAmount:{type:Number},//Cost of Improvements (b)
    ginnieConstructionMethodType: {type:String},//Construction Method Type
    manufacturedHomeWidthType: {type:String},//Manufactured Home Width Type
    //////Refinance Detail//////
    refinancePropertyAcquiredYear:{type:Date},//Year Acquired
    refinancePropertyOriginalCostAmount:{type:Number},//Original Cost
    refinancePropertyExistingLienAmount:{type:Number},//Existing Liens to be Paid Off
    refinanceProposedImprovementsDescription:{type:String},//Describe Improvements
    refinanceImprovementsType:{type:String},//Describe Improvements
    refinanceImprovementCostsAmount:{type:String},//cost
//////Mortgage Loan Information////
    mortgageType:{type:String},//Mortgage Type Applied For
    fannieMortgageType:{type:String},//Mortgage Type Applied For
    ginnieMortgageType:{type:String},//Mortgage Type Applied For
    freddieMortgageType:{type:String},//Mortgage Type Applied For
    usdaGovernmentLoanType:{type:String},//Mortgage Type Applied For
    otherMortgageTypeDescription:{type:String},//other
    loanAmortizationType:{type:String},//Amortization Type
    fnmProductPlanIdentifier:{type:String},//Amortization Type
    loanProduct:{type:String},//If Adjustable Rate
    ///Loan Features///
    balloonIndicator:{type:Boolean},//ballon/ballon term
    interestOnlyMonths:{type:Number},
    loanRepaymentType:{type:String},//negative amortization
    prepaymentPenaltyIndicator:{type:Boolean},//Prepayment Penalty / Prepayment Penalty Term
    buydownIndicator:{type:Boolean},//Buydown
    paymentFrequencyType:{type:String},//Biweekly
    paymentDeferredFirstFiveYears:{type:String},//Payment Deferred for First Five Years
    affordableLoan:{type:String},//Affordable Loan
    productDescription:{type:String},//Other
    ///Mortgage Lien Type//
    lienPriorityType:{type:String},
    purchasePriceAmount:{type:Number},//Purchase Price
    downPaymentPercent:{type:Number},//Down Payment
    downPaymentAmount:{type:Number},//Down Payment Amount
    noteRate:{type:Number},//Note Rate
    qualifyingRatePercent:{type:Number},//Qual Rate
    loanAmortizationTermMonths:{type:Number},//Loan Term
    balloonLoanMaturityTermMonths:{type:Number},//Due In
    monthlyPayment:{type:Number},//Due In
    /////Proposed Monthly Payment for Property///
    proposedFirstMortgageAmount:{type:Number},//First Mortgage (P&I)
    proposedOtherMortgagesAmount:{type:Number},//Subordinate Lien(s) (P&I)
    proposedHazardInsuranceAmount:{type:Number},//Homeowner's Insurance
    supplementalPropertyInsuranceAmount:{type:Number},//Supplemental Property Insurance
    proposedRealEstateTaxesAmount:{type:Number},//Property Taxes
    proposedMortgageInsuranceAmount:{type:Number},//Mortgage Insurance
    proposedDuesAmount:{type:Number},//Association/Project Dues (Condo, Co-op, PUD)
    proposedOtherAmount:{type:Number},//other
//////Rate & Registration Information//////
    secondaryRegistration: {type:Boolean},
    loanIsLocked: {type:Boolean},
    lockDate:{type:Date},
    rateLock:{type:String},
    lockExpiresDate:{type:Date},
    currentRateSetDate:{type:Date},
    currentRateSetDate:{type:Date},
    rateLockDisclosureDate:{type:String},
    ////Registration Information///
    rateRegistrationLoanIsRegistered:{type:Boolean},//Loan is Registered
    rateRegistrationRegisteredBy:{type:String},//Registered By
    rateRegistrationReference:{type:Number},//Reference Number
    rateRegistrationRegistrationDate:{type:Date},//Registered On
    rateRegistrationExpirationDate:{type:Date},//Registration Expires
    rateRegistrationInvestorName:{type:String},//Investor Name
    investorLoanNumber:{type:Number},//Investor Loan Number
    investorCommitmentNumber:{type:Number},//Investor Commitment Number
///////Employment & Income/////
//////Assets, Gifts & Grants//////
    assetsAccountOwner:{type:String},//owner
    holderName:{type:String},//Financial Institution  
    urla2020CashOrMarketValueAmount:{type:Number},//Cash or Market Value
    ///Other Assets///
    otherAssets: [
        {
          borrowerType:{type:String},
          assetType: {type:String},
          cashOrMarketValue:{type:Number},
        }
      ],
      /////Gifts or Grants You Have Been Given or Will Receive for this Loan///
      giftsGrants: [
        {
          assetType: {type:String},//Asset Type
          source: {type:String},//
          amount:{type:Number},
          owner:{type:String}, 
          depositedIndicator: {type:Boolean},
          amtAppliedToDownPayment:{type:Number}, //AMT Applied to Down Payment
          amtAppliedToClosingCosts: {type:Number},
        }
      ],
      urlPage4Comments:{type:String},//comments
///////Liabilities/////
      ///Credit Cards, Other Debts and Leases////
      creditAccountOwner:{type:String},
      liabilityType:{type:String},//Account Type
      creditCompanyName:{type:String},
      accountIdentifier:{type:String},//Account 
      unpaidBalanceAmount:{type:String},//Unpaid Balance
      monthlyPaymentAmount:{type:String},//Monthly Payment
      payoffStatusIndicator:{type:Boolean},//Monthly Payment
      otherLiabilities: [
        {
          borrowerType: {type:String},//Account Owner
          liabilityOrExpenseType: {type:String},//Liability / Expense Type
          monthlyPayment: {type:Number},//Monthly Payment
        }
      ],
      //////Other New Mortgage Loans on the Property You are Buying or Refinancing////
      totalAppliedToDownpayment:{type:Number},
      ////Financial Information - Real Estate////
      financialInformation:{
        owner:{type:String},
        foreignAddressIndicator:{typt:Boolean},
        streetAddress:{type:String},
        unitType:{type:String},
        unitNumber:{type:String},
        state:{type:String},
        postalCode:{type:Number},
        country:{type:String},
        marketValueAmount:{type:Number},//Property Value
        propertyStatus:{type:String},//Property Status
        purchasePrice:{type:Number},//Property Value
        acquiredDate:{type:Date},//Property Value
        yearBuilt:{type:Number},//Property Value
        maintenanceExpenseAmount:{type:Number},//Monthly Ins, Taxes, Assoc Dues, etc.
        rentalIncomeGrossAmount:{type:Number},//Monthly Rental Income
        rentalIncomeNetAmount:{type:Number},//Net Monthly Rental Income
        percentageofRental:{type:Number},//Percentage of Rental
        participationPercentage:{type:Number},//Percentage of Rental
      },
///////////Qualifying the Borrower//////
    ////////Due from Borrower(s)//////////
    alterationsImprovementsOrRepairsAmount:{type:Number},///Improvements, Renovations and Repairs
    landIfAcquiredSeparatelyAmount:{type:Number},///Improvements, Renovations and Repairs
    landIfAcquiredSeparatelyAmount:{type:Number},///Land (if acquired separately)
    totalNonSubjectPropertyDebtsToBePaidOffAmount:{type:Number},///E. Credit Cards and Other Debts Paid off (see Table 2c. Liabilities - Credit Cards, Other Debts and Leases that you owe)
    borrEstimatedClosingCostsAmount:{type:Number},///Borrower Closing Costs (Including Prepaid and Initial Escrow Payments)
    borrowerPaidDiscountPointsAmount:{type:Number},
    /////Total Mortgage Loans//////
    loanAmount:{type:Number},
    /////Total Credits///
    useItemizedCredits:{type:Boolean},
    sellerPaidClosingCostsAmount:{type:Number},//Seller Credits (Seller-Paid Fees)
    urlaTotalOtherCreditsAmount:{type:Number},//Other Credits
    nonSpecificLenderCredit:{type:Number},//Non Specific Lender Credit
    nonSpecificSellerCredit:{type:Number},//Non Specific Seller Credit
    totalOtherAssetToLoan:{type:Number},//Total of Other Assets Applied to Loan
    fhaMiPremiumRefundAmount:{type:Number},//MI Premium Refund
    stdFinalDeposit:{type:Number},//Cash Deposit On Sales Contract
    purchaseCredits: [{
      amount:{type:Number} ,
      purchaseCreditType: {type:String},
      purchaseCreditSource: {type:String},
    }],
    cashFromToBorrowerAmount:{type:Number},///Cash From/To the Borrower (Line H minus Line K and Line N)

    borrower:{
        realEstateDoesNotApply:{type:Boolean},
        otherLiabilitiesDoesNotApply:{type:Boolean},
        giftsAndGrantsIndicatorBor:{type:Boolean},//Does Not Apply
        authorizedCreditReportIndicator:{type:Boolean},
        authorizedCreditReportDate:{type:Date},
        creditReportAuthorizationMethod:{type:String},
        experianCreditScore:{type:String},
        transUnionScore:{type:String},
        equifaxScore:{type:String},
        minFicoScore:{type:String},
///////Employment & Income/////
        currentEmploymentDoesNotApply:{type:Boolean},
        employerName:{type:String},
        foreignAddressIndicator:{type:Boolean},
        addressLine1: { type: String },
        city: { type: String },
        UnitType: { type: String,  },
        unit: { type: String,  },
        Country: { type: String },
        county: { type: String },
        state: { type: String },
        zipCode: { type: String },
        position: { type: String },
        employerPhone: { type: Number },
        timeInLineOfWorkYears: { type: Number },
        jobTermMonths: { type: Number },
        employmentStartDate: { type: Date },
        specialEmployerRelationshipIndicator:{type:Boolean},//I am employed by a family member, property seller, real estate agent, or other party to the tr
        selfEmployedIndicator:{type:Boolean},//Check if you are the Business Owner or Self-Employed
        ownershipInterestType:{type:String},
        basePayAmount:{type:Number},
        bonusAmount:{type:Number},
        commissionsAmount:{type:Number},
        overtimeAmount:{type:Number},
        otherAmount:{type:Number},
        militaryEmployer:{type:Boolean},
        militaryCombatPay:{type:Number},
        militaryFlightPay:{type:Number},
        militaryHazardPay:{type:Number},
        militaryOverseasPay:{type:Number},
        militaryPropPay:{type:Number},
        militaryHazardPay:{type:Number},
        clothingAllowance:{type:Number},
        rationsAllowance:{type:Number},
        variableHousingAllowance:{type:Number},
        quartersAllowance:{type:Number},
        otherAllowanceDescription:{type:Number},
        militaryEntitlement:{type:Number},
        //////Additional Employment / Self Employment and Income////
        additionalEmploymentDoesNotApply:{type:Boolean},
        additionalEmployment:{
            employerName:{type:String},
        foreignAddressIndicator:{type:Boolean},
        addressLine1: { type: String },
        city: { type: String },
        UnitType: { type: String,  },
        unit: { type: String,  },
        Country: { type: String },
        county: { type: String },
        state: { type: String },
        zipCode: { type: String },
        position: { type: String },
        employerPhone: { type: Number },
        timeInLineOfWorkYears: { type: Number },
        jobTermMonths: { type: Number },
        employmentStartDate: { type: Date },
        specialEmployerRelationshipIndicator:{type:Boolean},//I am employed by a family member, property seller, real estate agent, or other party to the tr
        selfEmployedIndicator:{type:Boolean},//Check if you are the Business Owner or Self-Employed
        ownershipInterestType:{type:String},
        basePayAmount:{type:Number},
        bonusAmount:{type:Number},
        commissionsAmount:{type:Number},
        overtimeAmount:{type:Number},
        otherAmount:{type:Number},
        militaryEmployer:{type:Boolean},
        militaryCombatPay:{type:Number},
        militaryFlightPay:{type:Number},
        militaryHazardPay:{type:Number},
        militaryOverseasPay:{type:Number},
        militaryPropPay:{type:Number},
        militaryHazardPay:{type:Number},
        clothingAllowance:{type:Number},
        rationsAllowance:{type:Number},
        variableHousingAllowance:{type:Number},
        quartersAllowance:{type:Number},
        otherAllowanceDescription:{type:Number},
        militaryEntitlement:{type:Number},
        },
     ///Previous Employment / Self Employment and Income
     previousEmploymentDoesNotApply:{
        employerName:{type:String},
        foreignAddressIndicator:{type:Boolean},
        addressLine1: { type: String },
        city: { type: String },
        UnitType: { type: String,  },
        unit: { type: String,  },
        Country: { type: String },
        county: { type: String },
        state: { type: String },
        zipCode: { type: String },
        employerPhone: { type: Number },
        position: { type: String },
        employmentStartDate: { type: Date },
        employmentEndDate: { type: Date },
        selfEmployedIndicator:{type:Boolean},//Check if you are the Business Owner or Self-Employed
     },
     additionalOtherIncome:{type:Number},//Borrower Other Monthly Incomes
     userDefinedIncome:{type:Number},
/////////Declarations/////////
      intentToOccupyIndicator:{type:Boolean},// Will you occupy the property as your primary residence?
      intentToOccupyExplanation:{type:String},
      homeownerPastThreeYearsIndicator:{type:Boolean},//homeownerPastThreeYearsIndicator
      priorPropertyUsageType:{type:Boolean},//(1) What type of property did you own: primary residence (PR), FHA secondary residence (SR), second home (SH), or investment property (IP)?
      priorPropertyTitleType:{type:Boolean},//(2) How did you hold title to the property: by yourself (S), jointly with your spouse (SP), or jointly with another person (O)?
      specialBorrowerSellerRelationshipIndicator:{type:Boolean},//B. If this is a Purchase Transaction: Do you have a family relationship or business affiliation with the seller of the property?
      specialBorrowerSellerRelationshipExplanation:{type:String},
      undisclosedBorrowedFundsIndicator:{type:Boolean},
      undisclosedBorrowedFundsExplanation:{type:String},
      undisclosedBorrowedFundsAmount:{type:Number},
      undisclosedCreditApplicationIndicator:{type:Boolean},
      undisclosedCreditApplicationExplanation:{type:String},
      undisclosedMortgageApplicationIndicator:{type:Boolean},
      undisclosedMortgageApplicationExplanation:{type:String},
      propertyProposedCleanEnergyLienIndicator:{type:Boolean},
      propertyProposedCleanEnergyLienExplanation:{type:String},
      ///////////About Your Finances////////

      outstandingJudgementsIndicator:{type:Boolean},//G. Are there any outstanding judgements against you?
      outstandingJudgementsExplanation:{type:String},//
      presentlyDelinquentIndicatorUrl:{type:Boolean},//H. Are you currently delinquent or in default on a federal debt?
      presentlyDelinquentExplanation:{type:String},//H. Are you currently delinquent or in default on a federal debt?
      partyToLawsuitIndicatorUrla:{type:Boolean},//I. Are you a party to a lawsuit in which you potentially have any personal financial liability?
      partyToLawsuitExplanation:{type:String},//I. Are you a party to a lawsuit in which you potentially have any personal financial liability?
      priorPropertyDeedInLieuConveyedIndicator:{type:Boolean},//j. Have you conveyed title to any property in lieu of foreclosure in the past 7 years
      priorPropertyDeedInLieuConveyedExplanation:{type:String},//j.
      priorPropertyShortSaleCompletedIndicator:{type:Boolean},//k.
      priorPropertyShortSaleCompletedExplanation:{type:String},//k.
      priorPropertyForeclosureCompletedIndicator:{type:Boolean},//l.
      priorPropertyForeclosureCompletedExplanation:{type:String},//l.
/////////Demographic///////
      applicationTakenMethodType:{type:String},
      isEthnicityBasedOnVisual:{type:String},
      isRaceBasedOnVisual:{type:String} ,  
      isSexBasedOnVisual:{type:String} ,
      /////ethnicity///
      hmdaEthnicityReportedFields:{type:String},
      hmdaHispanicLatinoOtherOriginIndicator:{type:Boolean},
      hmdaMexicanIndicator: {type:Boolean},
      hmdaOtherHispanicLatinoOrigin:{type:Boolean},
      hmdaPuertoRicanIndicator: {type:Boolean},
      hmdaEthnicityDoNotWishIndicator: {type:Boolean},
      hmdaEthnicityHispanicLatinoIndicator: {type:Boolean},
      hmdaEthnicityNotHispanicLatinoIndicator: {type:Boolean},
      hmdaEthnicityInfoNotProvided: {type:Boolean},
      /////Race/////
      hmdaAfricanAmericanIndicator: {type:Boolean},
      hmdaAmericanIndianIndicator: {type:Boolean},
      hmdaAmericanIndianTribe: {type:String},
      hmdaAsianIndianIndicator: {type:Boolean},
      hmdaAsianIndicator: {type:Boolean},
      hmdaAsianOtherRaceIndicator: {type:Boolean},
      hmdaChineseIndicator: {type:Boolean},
      hmdaEthnicityReportedFields: {type:String},
      hmdaEthnicityType:{type:String},
      hmdaFilipinoIndicator: {type:Boolean},
      hmdaGenderType: {type:String},
      hmdaGuamanianOrChamorroIndicator: {type:Boolean},
      hmdaJapaneseIndicator: {type:Boolean},
      hmdaKoreanIndicator: {type:Boolean},
      hmdaMexicanIndicator: {type:Boolean},
      hmdaNativeHawaiianIndicator: {type:Boolean},
      hmdaOtherAsianRace:{type:String},
      hmdaOtherPacificIslanderRace: {type:String},
      hmdaPacificIslanderIndicator: {type:Boolean},
      hmdaPacificIslanderOtherIndicator: {type:Boolean},
      hmdaSamoanIndicator: {type:Boolean},
      hmdaVietnameseIndicator: {type:Boolean},
      hmdaWhiteIndicator: {type:Boolean},
/////Homeownership Education and Housing Counseling////
     ownershipEducationConfirmationIndicator:{type:Boolean},
     ownershipEducationFormatType:{type:String},
     ownershipEducationPartyRoleIdentifier: {type:String},
     ownershipEducationAgencyName: {type:String},
     ownershipEducationCompletionDate:{type:Date},
     ///Borrower - Housing Counseling///
     ownershipConfirmationIndicator: {type:Boolean},
     ownershipFormatType: {type:String},
     ownershipPartyRoleIdentifier: {type:String},
     homeCounselingAgencyName: {type:String},
     homeCounselingCompletionDate:{type:Date},
////////Military Service & Language Preference//////
     selfDeclaredMilitaryServiceIndicator:{type:Boolean},
     activeDuty:{type:String},
     militaryServiceExpectedCompletionDate:{type:Date},
     reserveNationalGuardReserveActivated:{type:Boolean},
     survivingSpouse:{type:Boolean},
     language:{type:String},
/////////Continuation Information//////
     additionalInformation:{type:String}
},
    
    coBorrower:{
        realEstateDoesNotApply:{type:Boolean},
        otherLiabilitiesDoesNotApply:{type:Boolean},
        otherAssetsDoesNotApply:{type:Boolean},
        authorizedCreditReportIndicator:{type:Boolean},//Does not apply to
        giftsAndGrantsIndicatorBor:{type:Boolean},//Does Not Apply
///////Employment & Income/////
        currentEmploymentDoesNotApply:{type:Boolean},//Does not apply to
        employerName:{type:String},
        foreignAddressIndicator:{type:Boolean},
        addressLine1: { type: String },
        city: { type: String },
        UnitType: { type: String,  },
        unit: { type: String,  },
        Country: { type: String },
        county: { type: String },
        state: { type: String },
        zipCode: { type: String },
        position: { type: String },
        employerPhone: { type: Number },
        timeInLineOfWorkYears: { type: Number },
        jobTermMonths: { type: Number },
        employmentStartDate: { type: Date },
        specialEmployerRelationshipIndicator:{type:Boolean},//I am employed by a family member, property seller, real estate agent, or other party to the tr
        selfEmployedIndicator:{type:Boolean},//Check if you are the Business Owner or Self-Employed
        ownershipInterestType:{type:String},
        basePayAmount:{type:Number},
        bonusAmount:{type:Number},
        commissionsAmount:{type:Number},
        overtimeAmount:{type:Number},
        otherAmount:{type:Number},
        militaryEmployer:{type:Boolean},
        militaryCombatPay:{type:Number},
        militaryFlightPay:{type:Number},
        militaryHazardPay:{type:Number},
        militaryOverseasPay:{type:Number},
        militaryPropPay:{type:Number},
        militaryHazardPay:{type:Number},
        clothingAllowance:{type:Number},
        rationsAllowance:{type:Number},
        variableHousingAllowance:{type:Number},
        quartersAllowance:{type:Number},
        otherAllowanceDescription:{type:Number},
        militaryEntitlement:{type:Number},
        //////Additional Employment / Self Employment and Income////
        additionalEmploymentDoesNotApply:{type:Boolean},
        additionalEmployment:{
            employerName:{type:String},
        foreignAddressIndicator:{type:Boolean},
        addressLine1: { type: String },
        city: { type: String },
        UnitType: { type: String,  },
        unit: { type: String,  },
        Country: { type: String },
        county: { type: String },
        state: { type: String },
        zipCode: { type: String },
        position: { type: String },
        employerPhone: { type: Number },
        timeInLineOfWorkYears: { type: Number },
        jobTermMonths: { type: Number },
        employmentStartDate: { type: Date },
        specialEmployerRelationshipIndicator:{type:Boolean},//I am employed by a family member, property seller, real estate agent, or other party to the tr
        selfEmployedIndicator:{type:Boolean},//Check if you are the Business Owner or Self-Employed
        ownershipInterestType:{type:String},
        basePayAmount:{type:Number},
        bonusAmount:{type:Number},
        commissionsAmount:{type:Number},
        overtimeAmount:{type:Number},
        otherAmount:{type:Number},
        militaryEmployer:{type:Boolean},
        militaryCombatPay:{type:Number},
        militaryFlightPay:{type:Number},
        militaryHazardPay:{type:Number},
        militaryOverseasPay:{type:Number},
        militaryPropPay:{type:Number},
        militaryHazardPay:{type:Number},
        clothingAllowance:{type:Number},
        rationsAllowance:{type:Number},
        variableHousingAllowance:{type:Number},
        quartersAllowance:{type:Number},
        otherAllowanceDescription:{type:Number},
        militaryEntitlement:{type:Number},
        },
     ///Previous Employment / Self Employment and Income
     previousEmploymentDoesNotApply:{
        employerName:{type:String},
        foreignAddressIndicator:{type:Boolean},
        addressLine1: { type: String },
        city: { type: String },
        UnitType: { type: String,  },
        unit: { type: String,  },
        Country: { type: String },
        county: { type: String },
        state: { type: String },
        zipCode: { type: String },
        employerPhone: { type: Number },
        position: { type: String },
        employmentStartDate: { type: Date },
        employmentEndDate: { type: Date },
        selfEmployedIndicator:{type:Boolean},//Check if you are the Business Owner or Self-Employed
     },
     additionalOtherIncome:{type:Number},//Co-Borrower Other Monthly Incomes
     userDefinedIncome:{type:Number},
     /////////Declarations/////////
     intentToOccupyIndicator:{type:Boolean},// Will you occupy the property as your primary residence?
     intentToOccupyExplanation:{type:String},
     homeownerPastThreeYearsIndicator:{type:Boolean},//homeownerPastThreeYearsIndicator
     priorPropertyUsageType:{type:Boolean},//(1) What type of property did you own: primary residence (PR), FHA secondary residence (SR), second home (SH), or investment property (IP)?
     priorPropertyTitleType:{type:Boolean},//(2) How did you hold title to the property: by yourself (S), jointly with your spouse (SP), or jointly with another person (O)?
     specialBorrowerSellerRelationshipIndicator:{type:Boolean},//B. If this is a Purchase Transaction: Do you have a family relationship or business affiliation with the seller of the property?
     specialBorrowerSellerRelationshipExplanation:{type:String},
     undisclosedBorrowedFundsIndicator:{type:Boolean},
     undisclosedBorrowedFundsExplanation:{type:String},
     undisclosedBorrowedFundsAmount:{type:Number},
     undisclosedCreditApplicationIndicator:{type:Boolean},
     undisclosedCreditApplicationExplanation:{type:String},
     undisclosedMortgageApplicationIndicator:{type:Boolean},
     undisclosedMortgageApplicationExplanation:{type:String},
     propertyProposedCleanEnergyLienIndicator:{type:Boolean},
     propertyProposedCleanEnergyLienExplanation:{type:String},
     ///////////About Your Finances////////

     outstandingJudgementsIndicator:{type:Boolean},//G. Are there any outstanding judgements against you?
     outstandingJudgementsExplanation:{type:String},//
     presentlyDelinquentIndicatorUrl:{type:Boolean},//H. Are you currently delinquent or in default on a federal debt?
     presentlyDelinquentExplanation:{type:String},//H. Are you currently delinquent or in default on a federal debt?
     partyToLawsuitIndicatorUrla:{type:Boolean},//I. Are you a party to a lawsuit in which you potentially have any personal financial liability?
     partyToLawsuitExplanation:{type:String},//I. Are you a party to a lawsuit in which you potentially have any personal financial liability?
     priorPropertyDeedInLieuConveyedIndicator:{type:Boolean},//j. Have you conveyed title to any property in lieu of foreclosure in the past 7 years
     priorPropertyDeedInLieuConveyedExplanation:{type:String},//j.
     priorPropertyShortSaleCompletedIndicator:{type:Boolean},//k.
     priorPropertyShortSaleCompletedExplanation:{type:String},//k.
     priorPropertyForeclosureCompletedIndicator:{type:Boolean},//l.
     priorPropertyForeclosureCompletedExplanation:{type:String},//l.
     bankruptcyIndicator:{type:Boolean},
     bankruptcyIndicatorChapterSeven:{type:Boolean},
     bankruptcyIndicatorChapterEleven:{type:Boolean},
     bankruptcyIndicatorChapterTwelve:{type:Boolean},
     bankruptcyIndicatorChapterThirteen:{type:Boolean},
     /////Race/////
     hmdaAfricanAmericanIndicator: {type:Boolean},
     hmdaAmericanIndianIndicator: {type:Boolean},
     hmdaAmericanIndianTribe: {type:String},
     hmdaAsianIndianIndicator: {type:Boolean},
     hmdaAsianIndicator: {type:Boolean},
     hmdaAsianOtherRaceIndicator: {type:Boolean},
     hmdaChineseIndicator: {type:Boolean},
     hmdaEthnicityReportedFields: {type:String},
     hmdaEthnicityType:{type:String},
     hmdaFilipinoIndicator: {type:Boolean},
     hmdaGenderType: {type:String},
     hmdaGuamanianOrChamorroIndicator: {type:Boolean},
     hmdaJapaneseIndicator: {type:Boolean},
     hmdaKoreanIndicator: {type:Boolean},
     hmdaMexicanIndicator: {type:Boolean},
     hmdaNativeHawaiianIndicator: {type:Boolean},
     hmdaOtherAsianRace:{type:String},
     hmdaOtherPacificIslanderRace: {type:String},
     hmdaPacificIslanderIndicator: {type:Boolean},
     hmdaPacificIslanderOtherIndicator: {type:Boolean},
     hmdaSamoanIndicator: {type:Boolean},
     hmdaVietnameseIndicator: {type:Boolean},
     hmdaWhiteIndicator: {type:Boolean},
     Gender:{type:String},
/////Homeownership Education and Housing Counseling////
     ownershipEducationConfirmationIndicator:{type:Boolean},
     ownershipEducationFormatType:{type:String},
     ownershipEducationPartyRoleIdentifier: {type:String},
     ownershipEducationAgencyName: {type:String},
     ownershipEducationCompletionDate:{type:Date},
     ///Borrower - Housing Counseling///
     ownershipConfirmationIndicator: {type:Boolean},
     ownershipFormatType: {type:String},
     ownershipPartyRoleIdentifier: {type:String},
     homeCounselingAgencyName: {type:String},
     homeCounselingCompletionDate:{type:Date},
////////Military Service & Language Preference//////
     selfDeclaredMilitaryServiceIndicator:{type:Boolean},
     activeDuty:{type:String},
     militaryServiceExpectedCompletionDate:{type:Date},
     reserveNationalGuardReserveActivated:{type:Boolean},
     survivingSpouse:{type:Boolean},
     language:{type:String},
/////////Continuation Information//////
      additionalInformation:{type:String}

    },

     
/////Income from Other Sources/////
     otherSrcIncomeDoesNotApply:{type:Boolean},
     otherIncomeSources: [
        {
          owner:{ type: String },//Account Owner
          description: { type: String },//Income Source
          monthlyAmount: { type: Number },//Monthly Income
        }
      ],
      otherTotalIncome:{ type: Number },//Total Other Monthly Income
////////Loan Originator Information//////
      loanOriginatorName:{type:String},
      companyId:{type:Number},
      interviewersCompanyStateLicense:{type:Number},
      loanOriginatorAddress:{
        StreetAddress:{type:String},
        unitType:{type:String},
        unit:{type:String},
        city:{type:String},
        state:{type:String},
        zipCode:{type:String},

      },
      loanOriginatprName:{type:String},
      nmlsLoanOriginatorId:{type:Number},
      interviewerLicenseIdentifier:{type:String},
      originatorFirstName:{type:String},
      originatorLastName:{type:String},
      originatorMiddleName:{type:String},
      originatorSuffixName:{type:String},
      interviewerEmail:{type:String},
      interviewerPhoneNumber:{type:Number},
      signatureDateFor1003:{type:Date},
})


const Loan = mongoose.model("Loan",loanSchema)

export default Loan