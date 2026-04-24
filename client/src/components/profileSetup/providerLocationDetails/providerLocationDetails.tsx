import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { ProviderProfileFormData } from '../../../types/profile';

interface ProviderLocationDetailsProps {
  formData: ProviderProfileFormData;
  setFormData: Dispatch<SetStateAction<ProviderProfileFormData>>;
}

const ProviderLocationDetails: React.FC<ProviderLocationDetailsProps> = ({ formData, setFormData }) => {
  // Approximate clients based on radius for demo purposes
  const getClientsNearby = (radius: number) => {
    if (radius === 0) return 0;
    return Math.floor(radius * 13.6);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, serviceRadius: parseInt(e.target.value) });
  };

  // Calculate percentage for slider fill
  const maxRadius = 100;
  const sliderPercent = (formData.serviceRadius / maxRadius) * 100;

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h3 className="text-xl sm:text-2xl md:text-[28px] font-bold text-gray-900 font-playfair tracking-tight leading-tight">Where are you based?</h3>
        <p className="text-sm sm:text-base text-gray-400 font-medium leading-relaxed font-dm">Your location and service radius determine which clients can find and book you.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[11px] sm:text-[13px] font-bold text-gray-900 font-dm">Street address</label>
          <input
            type="text"
            placeholder="123 Queen St."
            value={formData.streetAddress || ''}
            onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
            className="w-full bg-white border border-gray-200 rounded-xl md:rounded-2xl p-3 sm:p-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary duration-300 text-gray-900 font-medium placeholder:text-gray-400 text-sm sm:text-base font-dm shadow-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[11px] sm:text-[13px] font-bold text-gray-900 font-dm">Postal code</label>
          <input
            type="text"
            placeholder="A1B 2C3"
            value={formData.postalCode || ''}
            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
            className="w-full bg-white border border-gray-200 rounded-xl md:rounded-2xl p-3 sm:p-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary duration-300 text-gray-900 font-medium placeholder:text-gray-400 text-sm sm:text-base font-dm shadow-sm uppercase"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <label className="text-[11px] sm:text-[13px] font-bold text-gray-900 font-dm">City</label>
            <input
              type="text"
              placeholder="Toronto"
              value={formData.city || ''}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full bg-white border border-gray-200 rounded-xl md:rounded-2xl p-3 sm:p-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary duration-300 text-gray-900 font-medium placeholder:text-gray-400 text-sm sm:text-base font-dm shadow-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] sm:text-[13px] font-bold text-gray-900 font-dm">Province</label>
            <input
              type="text"
              placeholder="ON"
              value={formData.province || ''}
              onChange={(e) => setFormData({ ...formData, province: e.target.value })}
              className="w-full bg-white border border-gray-200 rounded-xl md:rounded-2xl p-3 sm:p-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary duration-300 text-gray-900 font-medium placeholder:text-gray-400 text-sm sm:text-base font-dm shadow-sm uppercase"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <div>
          <label className="text-[11px] sm:text-[13px] font-bold text-gray-900 font-dm block">Service radius</label>
          <span className="text-[10px] sm:text-[11px] text-gray-400 font-medium font-dm block mt-0.5">Clients within this distance from your address can book you</span>
        </div>
        
        <div className="border border-gray-200 rounded-xl md:rounded-2xl p-4 sm:p-6 mt-3 shadow-sm bg-white">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xl sm:text-2xl font-bold text-gray-900 font-dm">{formData.serviceRadius} km</span>
            <span className="text-[11px] sm:text-[13px] font-medium text-gray-400 font-dm">~{getClientsNearby(formData.serviceRadius)} clients nearby</span>
          </div>

          <div className="relative w-full h-2 bg-[#f3f0ff] rounded-full mt-2">
            <div 
              className="absolute top-0 left-0 h-full bg-primary rounded-full pointer-events-none"
              style={{ width: `${sliderPercent}%` }}
            />
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={formData.serviceRadius ?? 25}
              className="absolute top-0 left-0 size-full opacity-0 cursor-pointer"
            />
            <div 
              className="absolute top-1/2 -translate-y-1/2 size-5 sm:size-6 bg-white border-2 border-primary rounded-full pointer-events-none shadow-sm duration-75"
              style={{ left: `calc(${sliderPercent}% - ${sliderPercent === 100 ? 20 : (sliderPercent === 0 ? 0 : 10)}px)` }}
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            {['0 km', '25 km', '50 km', '75 km', '100 km'].map((label, i) => (
              <span key={i} className="text-[10px] sm:text-[11px] font-medium text-gray-400 font-dm">{label}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderLocationDetails;
