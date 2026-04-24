import React, { useState, useRef, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { clsx } from 'clsx';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { HiChevronDown, HiOutlineExclamationCircle } from 'react-icons/hi';
import { MdOutlineAccountBalance, MdOutlineCreditCard, MdOutlinePayment } from 'react-icons/md';
import type { ProviderProfileFormData, ProfileErrors } from '../../../types/profile';

const PayoutMethodsData = [
  { id: 'Direct Bank Deposit', Icon: MdOutlineAccountBalance, iconColor: 'text-primary bg-primary/10' },
  { id: 'Debit Card', Icon: MdOutlineCreditCard, iconColor: 'text-gray-700 bg-gray-100' },
  { id: 'PayPal', Icon: MdOutlinePayment, iconColor: 'text-[#003087] bg-[#003087]/10' },
  { id: 'Interac e-Transfer', Icon: MdOutlinePayment, iconColor: 'text-[#f59e0b] bg-[#f59e0b]/10' },
];

const CanadianBanks = [
  'Royal Bank of Canada (RBC)',
  'Toronto-Dominion Bank (TD)',
  'Bank of Nova Scotia (Scotiabank)',
  'Bank of Montreal (BMO)',
  'Canadian Imperial Bank of Commerce (CIBC)',
  'National Bank of Canada',
  'HSBC Canada',
  'Desjardins',
  'Simplii Financial',
  'Tangerine',
  'Other'
];

interface ProviderPayoutDetailsProps {
  formData: ProviderProfileFormData;
  setFormData: Dispatch<SetStateAction<ProviderProfileFormData>>;
  errors: ProfileErrors;
  onSkip: () => void;
}

const ProviderPayoutDetails: React.FC<ProviderPayoutDetailsProps> = ({ formData, setFormData, onSkip }) => {
  const [showAccount, setShowAccount] = useState(false);
  const [isBankOpen, setIsBankOpen] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const bankRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (bankRef.current && !bankRef.current.contains(e.target as Node)) setIsBankOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const update = (field: Partial<ProviderProfileFormData>) => setFormData(prev => ({ ...prev, ...field }));

  const touch = (field: string) => setTouched(t => ({ ...t, [field]: true }));

  // Validation
  const nameError = touched.accountHolderName && !formData.accountHolderName?.trim();
  const institutionError = touched.institutionNumber && formData.institutionNumber && !/^\d{3}$/.test(formData.institutionNumber);
  const transitError = touched.transitNumber && formData.transitNumber && !/^\d{5}$/.test(formData.transitNumber);
  const accountError = touched.accountNumber && formData.accountNumber && !/^\d{7,12}$/.test(formData.accountNumber);
  const bankError = touched.bankName && !formData.bankName;

  const isBankDeposit = formData.payoutMethod === 'Direct Bank Deposit';

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <h3 className="text-xl sm:text-3xl font-bold text-gray-900 font-playfair tracking-tight leading-tight">How would you like to be paid?</h3>
        <p className="text-sm sm:text-lg text-gray-400 font-medium leading-relaxed font-dm text-balance">
          Set up your payout method so earnings from completed appointments go directly to you. Payments are processed within 2–3 business days.
        </p>
        <div className="flex items-center gap-2">
          <FaLock className="text-emerald-600 size-4" />
          <span className="text-xs sm:text-sm font-bold text-emerald-700 font-dm tracking-wide">256-bit SSL encrypted • Paid within 48 hours</span>
        </div>
      </div>

      <div className="space-y-10">
        {/* Payout Method Selection */}
        <div className="space-y-4">
          {PayoutMethodsData.map((method) => {
            const isSelected = formData.payoutMethod === method.id;
            return (
              <button
                key={method.id}
                type="button"
                onClick={() => update({ payoutMethod: method.id })}
                className={clsx(
                  'w-full flex items-center justify-between p-5 sm:p-7 rounded-2xl md:rounded-3xl duration-300 border-2 active:scale-[0.99] text-left',
                  isSelected ? 'border-primary bg-[#f3f0ff]' : 'border-gray-100 bg-white hover:border-primary/20 hover:bg-gray-50/50'
                )}
              >
                <div className="flex items-center gap-5 sm:gap-6">
                  <div className={clsx('size-10 sm:size-14 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm shrink-0', method.iconColor)}>
                    <method.Icon className="size-5 sm:size-7" />
                  </div>
                  <span className={clsx('text-base sm:text-xl font-bold font-dm duration-300', isSelected ? 'text-gray-900' : 'text-gray-700')}>
                    {method.id}
                  </span>
                </div>
                <div className={clsx('size-6 sm:size-7 rounded-full border-2 flex items-center justify-center shrink-0 duration-300', isSelected ? 'border-primary' : 'border-gray-300/80')}>
                  <div className={clsx('size-3 sm:size-3.5 rounded-full bg-primary duration-300', isSelected ? 'scale-100 opacity-100' : 'scale-50 opacity-0')} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Bank Account Details */}
        {isBankDeposit && (
          <div className="border border-gray-100 rounded-2xl md:rounded-3xl p-6 sm:p-10 space-y-8 bg-white shadow-sm animate-in slide-in-from-top-4 fade-in duration-500">
            <h4 className="capitalize text-lg sm:text-xl font-bold text-gray-900 font-playfair tracking-tight">Bank account details</h4>

            <div className="space-y-6">
              {/* Account Holder Name */}
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-dm font-bold text-gray-900 uppercase tracking-widest ml-1 opacity-60">Account holder name</label>
                <input
                  type="text"
                  placeholder="Full legal name"
                  value={formData.accountHolderName || ''}
                  onChange={(e) => update({ accountHolderName: e.target.value })}
                  onBlur={() => touch('accountHolderName')}
                  className={clsx(
                    'w-full bg-white border-2 rounded-xl md:rounded-2xl p-4 sm:p-5 outline-none duration-300 text-gray-900 font-medium placeholder:text-gray-400 text-sm sm:text-base',
                    nameError ? 'border-red-400 focus:border-red-400' : 'border-primary/10 focus:border-primary'
                  )}
                />
                {nameError && (
                  <p className="text-xs text-red-500 font-medium font-dm flex items-center gap-1 ml-1">
                    <HiOutlineExclamationCircle className="size-3.5" /> Full legal name is required
                  </p>
                )}
              </div>

              {/* Institution + Transit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-dm font-bold text-gray-900 uppercase tracking-widest ml-1 opacity-60">Institution number</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={3}
                    placeholder="3 digits"
                    value={formData.institutionNumber || ''}
                    onChange={(e) => update({ institutionNumber: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                    onBlur={() => touch('institutionNumber')}
                    className={clsx(
                      'w-full bg-white border-2 rounded-xl md:rounded-2xl p-4 sm:p-5 outline-none duration-300 text-gray-900 font-medium placeholder:text-gray-400 text-sm sm:text-base tracking-widest',
                      institutionError ? 'border-red-400 focus:border-red-400' : 'border-primary/10 focus:border-primary'
                    )}
                  />
                  {institutionError && (
                    <p className="text-xs text-red-500 font-medium font-dm flex items-center gap-1 ml-1">
                      <HiOutlineExclamationCircle className="size-3.5" /> Must be exactly 3 digits
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-dm font-bold text-gray-900 uppercase tracking-widest ml-1 opacity-60">Transit number</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={5}
                    placeholder="5 digits"
                    value={formData.transitNumber || ''}
                    onChange={(e) => update({ transitNumber: e.target.value.replace(/\D/g, '').slice(0, 5) })}
                    onBlur={() => touch('transitNumber')}
                    className={clsx(
                      'w-full bg-white border-2 rounded-xl md:rounded-2xl p-4 sm:p-5 outline-none duration-300 text-gray-900 font-medium placeholder:text-gray-400 text-sm sm:text-base tracking-widest',
                      transitError ? 'border-red-400 focus:border-red-400' : 'border-primary/10 focus:border-primary'
                    )}
                  />
                  {transitError && (
                    <p className="text-xs text-red-500 font-medium font-dm flex items-center gap-1 ml-1">
                      <HiOutlineExclamationCircle className="size-3.5" /> Must be exactly 5 digits
                    </p>
                  )}
                </div>
              </div>

              {/* Account Number */}
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-dm font-bold text-gray-900 uppercase tracking-widest ml-1 opacity-60">Account number</label>
                <div className="relative">
                  <input
                    type={showAccount ? 'text' : 'password'}
                    inputMode="numeric"
                    placeholder="Account number"
                    value={formData.accountNumber || ''}
                    onChange={(e) => update({ accountNumber: e.target.value.replace(/\D/g, '').slice(0, 12) })}
                    onBlur={() => touch('accountNumber')}
                    className={clsx(
                      'w-full bg-white border-2 rounded-xl md:rounded-2xl p-4 sm:p-5 pr-14 outline-none duration-300 text-gray-900 font-medium placeholder:text-gray-400 text-sm sm:text-base tracking-widest',
                      accountError ? 'border-red-400 focus:border-red-400' : 'border-primary/10 focus:border-primary'
                    )}
                  />
                  <div
                    onClick={() => setShowAccount(!showAccount)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 size-5 cursor-pointer hover:text-primary duration-300 group"
                  >
                    {showAccount ? <FaEyeSlash className="size-full group-active:scale-90 duration-300" /> : <FaEye className="size-full group-active:scale-90 duration-300" />}
                  </div>
                </div>
                {accountError && (
                  <p className="text-xs text-red-500 font-medium font-dm flex items-center gap-1 ml-1">
                    <HiOutlineExclamationCircle className="size-3.5" /> Must be 7–12 digits
                  </p>
                )}
              </div>

              {/* Bank Name Dropdown */}
              <div className="space-y-2 relative" ref={bankRef}>
                <label className="text-xs sm:text-sm font-dm font-bold text-gray-900 uppercase tracking-widest ml-1 opacity-60">Bank name</label>
                <div
                  onClick={() => { setIsBankOpen(!isBankOpen); touch('bankName'); }}
                  className={clsx(
                    'flex items-center justify-between w-full bg-white border-2 rounded-xl md:rounded-2xl p-4 sm:p-5 cursor-pointer duration-300',
                    bankError ? 'border-red-400' : isBankOpen ? 'border-primary' : 'border-primary/10 hover:border-primary/30'
                  )}
                >
                  <span className={clsx('text-sm sm:text-base font-medium font-dm', formData.bankName ? 'text-gray-900' : 'text-gray-400')}>
                    {formData.bankName || 'Select your bank'}
                  </span>
                  <HiChevronDown className={clsx('size-5 text-gray-400 duration-300', isBankOpen && 'rotate-180')} />
                </div>
                {isBankOpen && (
                  <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white rounded-xl md:rounded-2xl shadow-logs border border-gray-100 overflow-hidden z-50 max-h-52 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                    {CanadianBanks.map((bank, i) => (
                      <div
                        key={i}
                        onClick={() => { update({ bankName: bank }); setIsBankOpen(false); }}
                        className={clsx('px-5 py-3.5 cursor-pointer duration-200 text-sm sm:text-base font-medium font-dm', formData.bankName === bank ? 'bg-primary/5 text-primary' : 'text-gray-600 hover:bg-gray-50')}
                      >
                        {bank}
                      </div>
                    ))}
                  </div>
                )}
                {bankError && (
                  <p className="text-xs text-red-500 font-medium font-dm flex items-center gap-1 ml-1">
                    <HiOutlineExclamationCircle className="size-3.5" /> Please select a bank
                  </p>
                )}
              </div>

              {/* Footer actions */}
              <div className="pt-4 flex flex-col-reverse sm:flex-row items-center justify-between gap-6">
                <span
                  onClick={onSkip}
                  className="text-sm sm:text-[15px] font-bold text-primary font-dm hover:text-primary-light duration-300 underline underline-offset-4 cursor-pointer hover:scale-105 active:scale-95"
                >
                  Skip / Add Banking Later ›
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Debit Card Details */}
        {formData.payoutMethod === 'Debit Card' && (
          <div className="border border-gray-100 rounded-2xl md:rounded-3xl p-6 sm:p-10 space-y-8 bg-white shadow-sm animate-in slide-in-from-top-4 fade-in duration-500">
            <h4 className="text-lg sm:text-xl font-bold text-gray-900 font-playfair tracking-tight">Debit Card Details</h4>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-dm font-bold text-gray-900 uppercase tracking-widest ml-1 opacity-60">Cardholder name</label>
                <input
                  type="text"
                  placeholder="Full name on card"
                  value={formData.debitCardName || ''}
                  onChange={(e) => update({ debitCardName: e.target.value })}
                  className="w-full bg-white border-2 border-primary/10 rounded-xl md:rounded-2xl p-4 sm:p-5 outline-none focus:border-primary duration-300 text-gray-900 font-medium placeholder:text-gray-400 text-sm sm:text-base"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-dm font-bold text-gray-900 uppercase tracking-widest ml-1 opacity-60">Card number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={formData.debitCardNumber || ''}
                  onChange={(e) => update({ debitCardNumber: e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ') })}
                  className="w-full bg-white border-2 border-primary/10 rounded-xl md:rounded-2xl p-4 sm:p-5 outline-none focus:border-primary duration-300 text-gray-900 font-medium placeholder:text-gray-400 text-sm sm:text-base tracking-widest"
                />
              </div>
              <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-between gap-6">
                <span onClick={onSkip} className="text-sm sm:text-[15px] font-bold text-primary font-dm hover:text-primary-light duration-300 underline underline-offset-4 cursor-pointer">Skip / Add Later ›</span>
              </div>
            </div>
          </div>
        )}

        {/* PayPal Details */}
        {formData.payoutMethod === 'PayPal' && (
          <div className="border border-gray-100 rounded-2xl md:rounded-3xl p-6 sm:p-10 space-y-8 bg-white shadow-sm animate-in slide-in-from-top-4 fade-in duration-500">
            <h4 className="text-lg sm:text-xl font-bold text-gray-900 font-playfair tracking-tight">PayPal Account</h4>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-dm font-bold text-gray-900 uppercase tracking-widest ml-1 opacity-60">PayPal email address</label>
                <input
                  type="email"
                  placeholder="your-email@paypal.com"
                  value={formData.paypalEmail || ''}
                  onChange={(e) => update({ paypalEmail: e.target.value })}
                  className="w-full bg-white border-2 border-primary/10 rounded-xl md:rounded-2xl p-4 sm:p-5 outline-none focus:border-primary duration-300 text-gray-900 font-medium placeholder:text-gray-400 text-sm sm:text-base"
                />
              </div>
              <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-between gap-6">
                <span onClick={onSkip} className="text-sm sm:text-[15px] font-bold text-primary font-dm hover:text-primary-light duration-300 underline underline-offset-4 cursor-pointer">Skip / Add Later ›</span>
              </div>
            </div>
          </div>
        )}

        {/* Interac e-Transfer Details */}
        {formData.payoutMethod === 'Interac e-Transfer' && (
          <div className="border border-gray-100 rounded-2xl md:rounded-3xl p-6 sm:p-10 space-y-8 bg-white shadow-sm animate-in slide-in-from-top-4 fade-in duration-500">
            <h4 className="text-lg sm:text-xl font-bold text-gray-900 font-playfair tracking-tight">Interac e-Transfer Details</h4>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-dm font-bold text-gray-900 uppercase tracking-widest ml-1 opacity-60">Email for e-Transfer</label>
                <input
                  type="email"
                  placeholder="your-email@example.com"
                  value={formData.interacEmail || ''}
                  onChange={(e) => update({ interacEmail: e.target.value })}
                  className="w-full bg-white border-2 border-primary/10 rounded-xl md:rounded-2xl p-4 sm:p-5 outline-none focus:border-primary duration-300 text-gray-900 font-medium placeholder:text-gray-400 text-sm sm:text-base"
                />
              </div>
              <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-between gap-6">
                <span onClick={onSkip} className="text-sm sm:text-[15px] font-bold text-primary font-dm hover:text-primary-light duration-300 underline underline-offset-4 cursor-pointer">Skip / Add Later ›</span>
              </div>
            </div>
          </div>
        )}

        {/* Tax disclaimer */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl md:rounded-3xl p-4 sm:p-6">
          <HiOutlineExclamationCircle className="size-5 sm:size-6 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm font-medium font-dm text-amber-700 leading-relaxed">
            You're responsible for reporting your earnings for tax purposes. myPSW will provide a yearly earnings summary.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProviderPayoutDetails;
