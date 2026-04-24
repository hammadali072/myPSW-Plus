import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { clsx } from 'clsx';
import { HiCheck, HiOutlineMinus } from 'react-icons/hi';
import type { ProviderProfileFormData } from '../../../types/profile';

const DaysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const TimeBlocks = [
  { id: 'Morning', time: '6am–12pm' },
  { id: 'Afternoon', time: '12pm–6pm' },
  { id: 'Evening', time: '6pm–10pm' },
  { id: 'Overnight', time: '10pm–6am' }
];

interface ProviderAvailabilityDetailsProps {
  formData: ProviderProfileFormData;
  setFormData: Dispatch<SetStateAction<ProviderProfileFormData>>;
}

const ProviderAvailabilityDetails: React.FC<ProviderAvailabilityDetailsProps> = ({ formData, setFormData }) => {

  const toggleAvailability = (block: string, day: string) => {
    const newAvailability = { ...formData.availability };
    if (!newAvailability[block]) newAvailability[block] = {};
    newAvailability[block][day] = !newAvailability[block][day];
    setFormData({ ...formData, availability: newAvailability });
  };

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h3 className="text-xl sm:text-2xl md:text-[28px] font-bold text-gray-900 font-playfair tracking-tight leading-tight">When are you available?</h3>
        <p className="text-sm sm:text-base text-gray-400 font-medium leading-relaxed font-dm">Set your typical weekly hours. Clients can only book you during your available times. Adjust anytime.</p>
      </div>

      <div className="border border-gray-200 rounded-2xl sm:rounded-3xl bg-white shadow-sm pb-2">
        <table className='min-w-full text-left border-collapse overflow-x-auto'>
          <thead>
            <tr className="border-b border-gray-100">
              <th className="w-[140px] sm:w-[160px] p-4 font-normal" />
              {DaysOfWeek.map(day => (
                <th key={day} className="p-3 sm:p-4 text-[11px] sm:text-[13px] font-bold text-gray-400 font-dm text-center">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TimeBlocks.map((block, idx) => (
              <tr key={block.id} className={clsx(
                "hover:bg-gray-50/50 duration-200",
                idx !== TimeBlocks.length - 1 && "border-b border-gray-100"
              )}>
                <td className="w-[140px] sm:w-[160px] p-4 align-middle">
                  <div className="flex flex-col justify-center">
                    <span className="text-[13px] sm:text-[14px] font-bold text-gray-900 font-dm">{block.id}</span>
                    <span className="text-[11px] sm:text-[12px] text-gray-400 font-medium font-dm mt-0.5">{block.time}</span>
                  </div>
                </td>
                {DaysOfWeek.map(day => {
                  const isAvailable = formData.availability?.[block.id]?.[day];
                  return (
                    <td key={day} className="p-2 sm:p-3 align-middle">
                      <div className="flex justify-center">
                        <button
                          onClick={() => toggleAvailability(block.id, day)}
                          className={clsx(
                            "size-8 sm:size-10 rounded-xl flex items-center justify-center duration-300 transition-all",
                            isAvailable
                              ? "bg-gradient-to-r from-primary to-primary-light text-white shadow-sm scale-100"
                              : "bg-[#f3f0ff] text-gray-300 hover:bg-gray-100 scale-95"
                          )}
                        >
                          {isAvailable ? <HiCheck className="size-4 sm:size-5" /> : <HiOutlineMinus className="size-4 sm:size-5" />}
                        </button>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProviderAvailabilityDetails;
