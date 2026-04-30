import React from 'react';

interface AppointmentItemProps {
  name: string;
  location: string;
  image: string;
  time: string;
  status: 'Confirmed' | 'Pending';
  isToday?: boolean;
}

const AppointmentItem: React.FC<AppointmentItemProps> = ({ name, location, image, time, status, isToday }) => {
  return (
    <div className="py-6 border-b border-border-soft last:border-0 duration-300 group px-2">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          <div className="size-15 rounded-full overflow-hidden border-2 border-primary/5 shadow-sm">
            <img src={image} alt={name} className="size-full object-top object-cover group-hover:scale-110 duration-500" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-gray-900 font-dm">{name}</h4>
            <p className="text-md text-gray-400 font-medium font-dm mt-0.5">{location}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isToday && (
            <span className="px-3 py-1.5 bg-accent-extralight text-accent text-[11px] font-black uppercase tracking-widest rounded-full">
              Today
            </span>
          )}
          <div className="px-4 py-2 bg-primary-extralight rounded-full text-primary font-bold text-sm font-dm">
            {time}
          </div>
          <span className="px-4 py-2 bg-emerald-50 text-emerald-500 rounded-full text-sm font-bold font-dm">
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentItem;
