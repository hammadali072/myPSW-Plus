import React from 'react';
import type { Dispatch, SetStateAction, ChangeEvent } from 'react';
import { clsx } from 'clsx';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import { HiChevronDown } from 'react-icons/hi';
import type { ProfileFormData, SavedPaymentMethod } from '../../../types/profile';
import { FaBitcoin, FaPaypal, FaCreditCard } from 'react-icons/fa';

const PaymentMethodsData = [
  { id: 'Credit or Debit Card', Icon: FaCreditCard, iconColor: 'text-gray-700 bg-gray-100' },
  { id: 'Bitcoin', Icon: FaBitcoin, iconColor: 'text-[#f7931a] bg-[#f7931a]/10' },
  { id: 'PayPal', Icon: FaPaypal, iconColor: 'text-[#003087] bg-[#003087]/10' }
];

interface PaymentMethodProps {
  formData: ProfileFormData;
  setFormData: Dispatch<SetStateAction<ProfileFormData>>;
  showCvv: boolean;
  setShowCvv: Dispatch<SetStateAction<boolean>>;
  handleCardNumberChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCardExpiryChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCardCvvChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  formData,
  setFormData,
  showCvv,
  setShowCvv,
  handleCardNumberChange,
  handleCardExpiryChange,
  handleCardCvvChange
}) => {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h3 className="text-xl sm:text-3xl font-bold text-gray-900 font-playfair tracking-tight leading-tight">Payment information</h3>
        <div>
          <p className="text-sm sm:text-lg text-gray-400 font-medium leading-relaxed font-dm text-balance">Add your preferred payment method. You won't be charged until you book your first appointment.</p>
        </div>
        <div className="flex items-center gap-2">
          <FaLock className="text-emerald-600 size-4" />
          <span className="text-xs sm:text-sm font-bold text-emerald-700 font-dm tracking-wide">256-bit SSL encrypted • Secured by Stripe</span>
        </div>
      </div>

      <div className="space-y-10">
        {/* Saved Payment Methods Badges */}
        {formData.savedPaymentMethods.length > 0 && (
          <div className="space-y-4">
            {formData.savedPaymentMethods.map((method: SavedPaymentMethod, index: number) => (
              <div key={index} className="border border-green-200/50 rounded-2xl md:rounded-3xl p-5 sm:p-7 flex items-center justify-between bg-green-50/30 shadow-sm relative group animate-in slide-in-from-bottom-4">
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="size-12 sm:size-14 rounded-xl sm:rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0 border border-gray-100">
                    <FaLock className="text-gray-700 size-6" /> {/* Placeholder for type icon from Data */}
                  </div>
                  <div>
                    <h5 className="text-base sm:text-lg font-bold text-gray-900 font-dm">{method.type}</h5>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium font-dm uppercase tracking-widest">{method.details}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <div className="flex items-center gap-1.5 opacity-60">
                    <span className="text-[10px] sm:text-[13px] font-bold text-green-600 uppercase tracking-widest font-dm">Added</span>
                    <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <button
                    onClick={() => {
                      const newMethods = [...formData.savedPaymentMethods];
                      newMethods.splice(index, 1);
                      setFormData({ ...formData, savedPaymentMethods: newMethods });
                    }}
                    className="text-gray-400 hover:text-red-500 duration-300 opacity-0 group-hover:opacity-100 font-bold text-xs font-dm underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Payment Methods Options */}
        <div className="space-y-4">
          {PaymentMethodsData.map((method) => {
            const isSelected = formData.paymentMethod === method.id;
            return (
              <button
                key={method.id}
                onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                className={clsx(
                  "w-full flex items-center justify-between p-5 sm:p-7 rounded-2xl md:rounded-3xl duration-300 border-2 transition-transform active:scale-[0.99] text-left",
                  isSelected
                    ? "border-primary bg-[#f3f0ff]"
                    : "border-gray-100 bg-white hover:border-primary/20 hover:bg-gray-50/50"
                )}
              >
                <div className="flex items-center gap-5 sm:gap-6">
                  <div className={clsx("size-10 sm:size-14 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm shrink-0", method.iconColor)}>
                    <method.Icon className="size-5 sm:size-7" />
                  </div>
                  <span className={clsx(
                    "text-base sm:text-xl font-bold font-dm transition-colors duration-300",
                    isSelected ? "text-gray-900" : "text-gray-700"
                  )}>
                    {method.id}
                  </span>
                </div>

                {/* Radio indicator */}
                <div className={clsx(
                  "size-6 sm:size-7 rounded-full border-2 flex items-center justify-center shrink-0 duration-300",
                  isSelected ? "border-primary" : "border-gray-300/80 hover:border-gray-400"
                )}>
                  <div className={clsx("size-3 sm:size-3.5 rounded-full bg-primary duration-300", isSelected ? "scale-100 opacity-100" : "scale-50 opacity-0")} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Card Details Form */}
        <div className={clsx(
          "border border-gray-100 rounded-2xl md:rounded-3xl p-6 sm:p-10 space-y-8 bg-white shadow-sm overflow-hidden duration-700",
          formData.paymentMethod === 'Credit or Debit Card' ? "animate-in slide-in-from-top-4 fade-in block" : "hidden"
        )}>
          <h4 className="text-lg sm:text-xl font-bold text-gray-900 font-playfair tracking-tight">Card Details</h4>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-dm font-bold text-gray-900 uppercase tracking-widest ml-1 opacity-60">Cardholder name</label>
              <input
                type="text"
                placeholder="Enter cardholder name"
                value={formData.cardName}
                onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                className="w-full bg-white border-2 border-primary/10 rounded-xl md:rounded-2xl p-4 sm:p-5 outline-none focus:border-primary duration-300 text-gray-900 font-medium placeholder:text-gray-400 text-sm sm:text-base"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-dm font-bold text-gray-900 uppercase tracking-widest ml-1 opacity-60">Card number</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleCardNumberChange}
                  className="w-full bg-white border-2 border-primary/10 rounded-xl md:rounded-2xl p-4 sm:p-5 pr-14 outline-none focus:border-primary duration-300 text-gray-900 font-medium placeholder:text-gray-400 text-sm sm:text-base tracking-widest"
                />
                <FaLock className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 size-6" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-dm font-bold text-gray-900 uppercase tracking-widest ml-1 opacity-60">Expiry date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={formData.cardExpiry}
                  onChange={handleCardExpiryChange}
                  className="w-full bg-white border-2 border-primary/10 rounded-xl md:rounded-2xl p-4 sm:p-5 outline-none focus:border-primary duration-300 text-gray-900 font-medium placeholder:text-gray-400 text-sm sm:text-base tracking-widest"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-dm font-bold text-gray-900 uppercase tracking-widest ml-1 opacity-60">CVV</label>
                <div className="relative">
                  <input
                    type={showCvv ? "text" : "password"}
                    placeholder="•••"
                    value={formData.cardCvv}
                    onChange={handleCardCvvChange}
                    className="w-full bg-white border-2 border-primary/10 rounded-xl md:rounded-2xl p-4 sm:p-5 pr-12 outline-none focus:border-primary duration-300 text-gray-900 font-medium placeholder:text-gray-400 text-sm sm:text-base tracking-widest"
                  />
                  <div
                    onClick={() => setShowCvv(!showCvv)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 size-5 cursor-pointer hover:text-primary duration-300 group"
                  >
                    {showCvv ? <FaEyeSlash className="size-full group-active:scale-90 duration-300" /> : <FaEye className="size-full group-active:scale-90 duration-300" />}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-dm font-bold text-gray-900 uppercase tracking-widest ml-1 opacity-60">Country</label>
                <div className="relative">
                  <select
                    value={formData.cardCountry}
                    onChange={(e) => setFormData({ ...formData, cardCountry: e.target.value })}
                    className="w-full bg-white border-2 border-primary/10 rounded-xl md:rounded-2xl p-4 sm:p-5 outline-none focus:border-primary duration-300 text-gray-900 font-medium appearance-none text-base cursor-pointer"
                  >
                    <option value="Canada">🇨🇦 Canada</option>
                    <option value="USA">🇺🇸 USA</option>
                    <option value="UK">🇬🇧 UK</option>
                    <option value="Australia">🇦🇺 Australia</option>
                  </select>
                  <HiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-dm font-bold text-gray-900 uppercase tracking-widest ml-1 opacity-60">Postal code</label>
                <input
                  type="text"
                  placeholder="A1B 2C3"
                  value={formData.cardPostal}
                  onChange={(e) => setFormData({ ...formData, cardPostal: e.target.value.toUpperCase() })}
                  className="w-full bg-white border-2 border-primary/10 rounded-xl md:rounded-2xl p-4 sm:p-5 outline-none focus:border-primary duration-300 text-gray-900 font-medium placeholder:text-gray-400 text-sm sm:text-base"
                />
              </div>
            </div>

            <div className="pt-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-6">
              <span className="text-sm sm:text-[15px] font-bold text-primary font-dm hover:text-primary-light duration-300 underline underline-offset-4 cursor-pointer hover:scale-105 active:scale-95 transition-transform">Skip / Add Later ›</span>
              <button
                onClick={() => {
                  if (formData.cardNumber && formData.cardName) {
                    setFormData({
                      ...formData,
                      savedPaymentMethods: [...formData.savedPaymentMethods, {
                        type: 'Credit or Debit Card',
                        details: `•••• ${formData.cardNumber.slice(formData.cardNumber.length > 5 ? -4 : 0).replace(/\s/g, '') || 'Card'}`
                      }],
                      cardName: '',
                      cardNumber: '',
                      cardExpiry: '',
                      cardCvv: ''
                    });
                  }
                }}
                disabled={!(formData.cardNumber && formData.cardName)}
                className={clsx(
                  "px-8 py-4 rounded-xl md:rounded-2xl font-bold text-sm sm:text-base duration-300 text-white w-full sm:w-auto text-center cursor-pointer",
                  (formData.cardNumber && formData.cardName) ? "bg-primary hover:bg-primary-light active:scale-95 shadow-md shadow-primary/20 bg-gradient-to-r from-primary to-primary-light" : "bg-gray-300 cursor-not-allowed"
                )}
              >
                Save Card Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
