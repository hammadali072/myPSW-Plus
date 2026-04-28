import React, { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import {
  HiOutlineDotsHorizontal,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineRefresh
} from 'react-icons/hi';

interface RequestCardProps {
  name: string;
  type: string;
  initials: string;
  color: string;
  date: string;
  time: string;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED' | 'COMPLETED';
}

const RequestCard: React.FC<RequestCardProps> = ({ name, type, initials, color, date, time, status: initialStatus }) => {
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleStatusUpdate = (newStatus: typeof initialStatus) => {
    setCurrentStatus(newStatus);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-black/5 duration-500 group flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
      <div className="flex items-center gap-5">
        <div className={clsx(
          "size-16 rounded-full flex items-center justify-center text-xl font-bold font-dm shrink-0",
          color
        )}>
          {initials}
        </div>
        <div>
          <h4 className="text-xl font-bold text-gray-900 font-playfair">{name}</h4>
          <p className="text-sm text-gray-400 font-medium font-dm mt-0.5">{type}</p>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f3f0ff] rounded-lg text-primary text-[11px] font-bold font-dm">
              <HiOutlineCalendar className="size-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f3f0ff] rounded-lg text-primary text-[11px] font-bold font-dm">
              <HiOutlineClock className="size-4" />
              <span>{time}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between md:flex-col md:items-end gap-4 relative">
        <span className={clsx(
          "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest",
          currentStatus === 'CONFIRMED' ? "bg-green-50 text-green-500" :
            currentStatus === 'COMPLETED' ? "bg-blue-50 text-blue-500" :
              currentStatus === 'CANCELLED' ? "bg-red-50 text-red-500" : "bg-orange-50 text-orange-500"
        )}>
          {currentStatus}
        </span>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={clsx(
              "size-10 rounded-xl flex items-center justify-center duration-300",
              isMenuOpen ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-gray-300 hover:bg-gray-50 hover:text-primary"
            )}
          >
            <HiOutlineDotsHorizontal className="size-6" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-[50] animate-in fade-in slide-in-from-top-2 duration-200">
              <button
                onClick={() => handleStatusUpdate('CONFIRMED')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-gray-600 hover:bg-green-50 hover:text-green-600 duration-200 group text-left"
              >
                <HiOutlineCheckCircle className="size-4 text-gray-400 group-hover:text-green-500" />
                Confirmed
              </button>
              <button
                onClick={() => handleStatusUpdate('PENDING')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-gray-600 hover:bg-orange-50 hover:text-orange-600 duration-200 group text-left"
              >
                <HiOutlineRefresh className="size-4 text-gray-400 group-hover:text-orange-500" />
                Pending
              </button>
              <button
                onClick={() => handleStatusUpdate('COMPLETED')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-gray-600 hover:bg-blue-50 hover:text-blue-600 duration-200 group text-left"
              >
                <HiOutlineCheckCircle className="size-4 text-gray-400 group-hover:text-blue-500" />
                Completed
              </button>
              <div className="h-px bg-gray-50 my-1 mx-2" />
              <button
                onClick={() => handleStatusUpdate('CANCELLED')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-red-400 hover:bg-red-50 hover:text-red-600 duration-200 group text-left"
              >
                <HiOutlineXCircle className="size-4 text-red-300 group-hover:text-red-500" />
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
