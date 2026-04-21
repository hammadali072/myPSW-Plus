export interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
  countryCode: string;
  email: string;
}

export interface SavedPaymentMethod {
  type: string;
  details: string;
}

export interface ProfileFormData {
  language: string;
  languageFlag: string;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  countryCode: string;
  countryFlag: string;
  email: string;
  smsNotifications: boolean;
  emailNotifications: boolean;
  streetAddress: string;
  postalCode: string;
  city: string;
  province: string;
  dobMonth: string;
  dobDay: string;
  dobYear: string;
  gender: string;
  pronouns: string;
  heightValue: number;
  heightUnit: string;
  weightValue: number;
  weightUnit: string;
  emergencyName: string;
  emergencyRelation: string;
  emergencyPhone: string;
  emergencyEmail: string;
  emergencyCountryCode: string;
  emergencyContacts: EmergencyContact[];
  careConditions: string[];
  careServices: string[];
  paymentMethod: string;
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  cardCountry: string;
  cardPostal: string;
  savedPaymentMethods: SavedPaymentMethod[];
}

export interface ProfileErrors {
  username: string;
}
