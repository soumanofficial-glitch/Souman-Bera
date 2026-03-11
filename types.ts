import React from 'react';

export type LoanType = 'Personal Loan' | 'Business Loan' | 'Home Loan' | 'Loan Against Property' | 'Balance Transfer' | 'Car Loan';
export type EmploymentType = 'Salaried (Private)' | 'Salaried (Govt)' | 'Self-Employed Business' | 'Self-Employed Professional';
export type CibilRange = '750+' | '700-749' | '650-699' | 'Below 650';
export type IncomeRange = 'Above ₹50,000' | '₹30,000 - ₹50,000' | '₹20,000 - ₹30,000' | 'Below ₹20,000';

export interface LeadFormData {
  // Step 1
  loanType: LoanType;
  
  // Step 2 (Qualifiers)
  employmentType: EmploymentType;
  incomeRange: IncomeRange;
  cibilScore: CibilRange;
  
  // Step 3 (Details - Dynamic)
  loanAmount: string;
  companyName?: string; // Personal/Business
  workExperience?: string; // Personal
  propertyType?: string; // Home
  propertyValue?: string; // Home/LAP
  city?: string;
  existingBank?: string; // BT
  currentEmi?: string; // BT/Health
  
  // Step 4 (Health)
  hasOngoingLoans: 'Yes' | 'No';
  totalMonthlyEmis: string;
  hasDefaults: 'Yes' | 'No';

  // Step 5 (Contact)
  fullName: string;
  mobile: string;
  email: string;
  pan?: string;
  consent: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  text: string;
  loanType: string;
}

export interface Bank {
  name: string;
  logoText: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}