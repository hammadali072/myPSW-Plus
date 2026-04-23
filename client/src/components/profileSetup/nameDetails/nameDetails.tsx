import React from 'react';
import type { Dispatch, SetStateAction, ChangeEvent } from 'react';
import { clsx } from 'clsx';
import type { ProfileFormData, ProfileErrors } from '../../../types/profile';

interface NameDetailsProps {
  formData: ProfileFormData;
  setFormData: Dispatch<SetStateAction<ProfileFormData>>;
  errors: ProfileErrors;
  handleUsernameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isFamilyMember?: boolean;
}

const NameDetails: React.FC<NameDetailsProps> = ({
  formData,
  setFormData,
  errors,
  handleUsernameChange,
  isFamilyMember
}) => {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h3 className="text-xl sm:text-3xl font-bold text-gray-900 font-playfair tracking-tight leading-tight">{isFamilyMember ? "What's their name?" : "What's your name?"}</h3>
        <p className="text-sm sm:text-lg text-gray-400 font-medium leading-relaxed font-dm text-balance">This is how your caregivers and our team will address {isFamilyMember ? "them" : "you"}.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-dm font-bold text-gray-900 uppercase tracking-widest ml-1 opacity-60">First name</label>
          <input
            type="text"
            placeholder={isFamilyMember ? "Enter their first name" : "Enter your first name"}
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="mt-2 w-full bg-white border-2 border-primary/10 rounded-xl md:rounded-2xl p-4 sm:p-5 outline-none focus:border-primary duration-300 text-gray-900 font-medium placeholder:text-gray-300 text-sm sm:text-base"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-dm font-bold text-gray-900 uppercase tracking-widest ml-1 opacity-60">Last name</label>
          <input
            type="text"
            placeholder={isFamilyMember ? "Enter their last name" : "Enter your last name"}
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="mt-2 w-full bg-white border-2 border-primary/10 rounded-xl md:rounded-2xl p-4 sm:p-5 outline-none focus:border-primary duration-300 text-gray-900 font-medium placeholder:text-gray-300 text-sm sm:text-base"
          />
        </div>

        <div className="space-y-2">
          <label className={clsx(
            'text-xs sm:text-sm font-dm font-bold uppercase tracking-widest ml-1 opacity-60',
            errors.username ? 'text-red-500 opacity-100' : 'text-gray-900'
          )}>Username (optional)</label>
          <div className="relative">
            <input
              type="text"
              placeholder="@johnsmith"
              value={formData.username}
              onChange={handleUsernameChange}
              className={clsx(
                'mt-2 w-full bg-white border-2 rounded-xl md:rounded-2xl p-4 sm:p-5 outline-none duration-300 text-gray-900 font-medium placeholder:text-gray-300 shadow-sm text-sm sm:text-base',
                errors.username ? 'border-red-500 focus:border-red-600' : 'border-primary/5 focus:border-primary'
              )}
            />
          </div>
          {errors.username ? (
            <p className="text-xs text-red-500 font-bold ml-1 font-dm">{errors.username}</p>
          ) : (
            <p className="text-[10px] text-gray-400 font-bold ml-1 uppercase tracking-wider font-dm">12-20 chars, letters and numbers only</p>
          )}
        </div>
      </div>

      <div className="pt-4">
        <span className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 font-dm block mb-4 underline underline-offset-4 decoration-primary/30">PREVIEW</span>
        <div className="bg-white border border-gray-100 rounded-2xl md:rounded-3xl p-5 sm:p-6 flex items-center gap-5 shadow-sm overflow-hidden">
          <div className="size-14 sm:size-16 shrink-0 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-lg sm:text-xl font-bold shadow-lg shadow-primary/20">
            {((formData.firstName?.[0] || '') + (formData.lastName?.[0] || '')).toUpperCase() || 'JS'}
          </div>
          <div className="min-w-0">
            <h4 className="text-lg sm:text-xl font-bold text-gray-900 font-playfair leading-none truncate">
              {formData.firstName || formData.lastName ? `${formData.firstName} ${formData.lastName}`.trim() : 'John Smith'}
            </h4>
            <p className="text-xs sm:text-sm text-gray-400 font-medium mt-1 font-dm truncate">
              {formData.username ? (formData.username.startsWith('@') ? formData.username : `@${formData.username}`) : 'myPSW Member'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameDetails;
