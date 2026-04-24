import { useState } from 'react';
import type { Dispatch, SetStateAction, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProviderProfileFormData, ProfileErrors } from '../types/profile';

interface UseProviderProfileStateReturn {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  formData: ProviderProfileFormData;
  setFormData: Dispatch<SetStateAction<ProviderProfileFormData>>;
  errors: ProfileErrors;
  setErrors: Dispatch<SetStateAction<ProfileErrors>>;
  handleContinue: () => void;
  handleBack: () => void;
}

export const useProviderProfileState = (): UseProviderProfileStateReturn => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showCvv, setShowCvv] = useState(false);

  const [formData, setFormData] = useState<ProviderProfileFormData>({
    appLanguage: 'English',
    spokenLanguages: ['English', 'Punjabi'],
    firstName: '',
    lastName: '',
    professionalTitle: '',
    profilePhoto: '',
    email: '',
    phone: '',
    countryCode: '+1',
    countryFlag: '🇨🇦',
    altContactName: '',
    altContactPhone: '',
    altCountryCode: '+1',
    altCountryFlag: '🇨🇦',
    smsAlerts: true,
    emailAlerts: true,
    messageAlerts: true,
    streetAddress: '',
    postalCode: '',
    city: '',
    province: '',
    serviceRadius: 25,
    gender: 'Female',
    pronouns: '',
    showGender: true,
    pswCertificate: null,
    backgroundCheck: null,
    yearsExperience: '8 Years',
    specializations: [],
    professionalBio: '',
    services: [],
    availability: {
      Morning: { Mon: true, Tue: false, Wed: true, Thu: false, Fri: true, Sat: true, Sun: false },
      Afternoon: { Mon: true, Tue: false, Wed: true, Thu: false, Fri: false, Sat: false, Sun: false },
      Evening: { Mon: false, Tue: false, Wed: false, Thu: false, Fri: false, Sat: false, Sun: false },
      Overnight: { Mon: false, Tue: false, Wed: false, Thu: false, Fri: false, Sat: false, Sun: false }
    }
  });

  const [errors, setErrors] = useState<ProfileErrors>({
    username: ''
  });

  const validateUsername = (val: string) => {
    if (!val) return '';
    const cleanVal = val.replace(/^@/, '');
    if (cleanVal.length < 12 || cleanVal.length > 20) return 'Username must be 12-20 characters';
    if (!/^[a-zA-Z0-9]+$/.test(cleanVal)) return 'Only letters and numbers allowed';
    return '';
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData({ ...formData, username: val });
    setErrors({ ...errors, username: validateUsername(val) });
  };

  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    const truncated = rawValue.slice(0, 16);
    const formatted = truncated.replace(/(\d{4})(?=\d)/g, '$1 ');
    setFormData({ ...formData, cardNumber: formatted });
  };

  const handleCardExpiryChange = (e: ChangeEvent<HTMLInputElement>) => {
    let inputVal = e.target.value;
    if (formData.cardExpiry.length === 3 && inputVal.length === 2 && formData.cardExpiry.includes('/')) {
      inputVal = inputVal.slice(0, 1);
    }
    const rawValue = inputVal.replace(/\D/g, '');
    let formatted = rawValue.slice(0, 4);
    if (formatted.length >= 3) {
      formatted = `${formatted.slice(0, 2)}/${formatted.slice(2, 4)}`;
    } else if (formatted.length === 2 && inputVal.length > formData.cardExpiry.length) {
      formatted = `${formatted}/`;
    }
    setFormData({ ...formData, cardExpiry: formatted });
  };

  const handleCardCvvChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 3);
    setFormData({ ...formData, cardCvv: val });
  };

  const handleContinue = () => {
    if (currentStep < 12) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/setup-complete');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return {
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    errors,
    setErrors,
    handleContinue,
    handleBack
  };
};
