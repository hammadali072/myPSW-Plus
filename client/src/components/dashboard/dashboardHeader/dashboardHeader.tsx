import React, { useState, useRef, useEffect } from 'react';
import { HiOutlineSearch, HiOutlineBell, HiOutlineMenuAlt2, HiOutlineUser, HiOutlineCog, HiOutlineLogout } from 'react-icons/hi';
import { clsx } from 'clsx';

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onMenuClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const profileOptions = [
    { label: 'My Profile', icon: HiOutlineUser, onClick: () => { } },
    { label: 'Setting', icon: HiOutlineCog, onClick: () => { } },
    { label: 'Log Out', icon: HiOutlineLogout, onClick: () => { }, variant: 'danger' },
  ];

  return (
    <header className="sticky top-0 h-20 lg:h-24 flex items-center justify-between px-6 lg:px-10 bg-white z-40 border-b border-gray-200">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-500 hover:text-primary duration-300"
        >
          <HiOutlineMenuAlt2 className="size-7" />
        </button>
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900 font-playfair flex items-center gap-2">
            Hi, Jack <span className="hidden sm:inline">Hudson</span> <span className="text-xl lg:text-2xl">👋</span>
          </h1>
          <p className="hidden sm:block text-xs lg:text-sm text-gray-400 font-medium font-dm mt-0.5 lg:mt-1">Good morning</p>
        </div>
      </div>

      <div className="flex items-center gap-4 lg:gap-8">
        <div className="relative hidden md:block w-64 lg:w-90">
          <input
            type="text"
            placeholder="Search"
            className="w-full h-12 lg:h-14 bg-gray-50 border border-[#e2daf5] rounded-2xl pl-12 pr-4 outline-none focus:bg-white focus:border-primary/20 duration-300 font-dm text-sm font-medium"
          />
          <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5 lg:size-6" />
        </div>

        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={clsx(
              "size-10 lg:size-12 flex items-center justify-center relative duration-300",
              showNotifications ? "text-primary" : "text-gray-400"
            )}
          >
            <HiOutlineBell className="size-6 lg:size-7" />
            <span className="absolute top-0.5 right-0.5 size-4 lg:size-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[8px] lg:text-[10px] font-bold text-white">3</span>
          </button>

          <div className={clsx(
            "absolute top-full right-0 mt-4 w-84 bg-white rounded-2xl border border-gray-100 shadow-2xl shadow-black/5 p-4 origin-top duration-300 transform",
            showNotifications ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          )}>
            <div className="flex items-center justify-between mb-4 px-2">
              <h4 className="text-md font-bold text-gray-900 font-dm">Notifications</h4>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2 py-1 rounded-md">3 New</span>
            </div>
            <div className="space-y-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="px-3 py-4 border-b border-gray-50 hover:bg-gray-50 duration-300 cursor-pointer group">
                  <div className="flex gap-3">
                    <div className="size-10 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                      <HiOutlineBell className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 font-dm">New Appointment Request</p>
                      <p className="text-xs text-gray-400 font-medium font-dm mt-0.5">Jane Smith sent you a request...</p>
                      <p className="text-[10px] text-gray-300 font-bold mt-1">2 mins ago</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-3 text-sm font-bold text-primary hover:bg-primary/5 rounded-md duration-300">
              View all notifications
            </button>
          </div>
        </div>

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 p-1 rounded-full hover:bg-gray-50 duration-300"
          >
            <div className="size-10 lg:size-14 rounded-full overflow-hidden border-2 border-primary/10 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150"
                alt="User"
                className="size-full object-cover"
              />
            </div>
          </button>

          <div className={clsx(
            "absolute top-full right-0 mt-4 w-64 bg-white rounded-2xl border border-gray-100 shadow-2xl shadow-black/5 p-4 origin-top duration-300 transform",
            showProfileMenu ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          )}>
            <div className="p-3 mb-2 border-b border-gray-50">
              <p className="text-base font-bold text-gray-900 font-dm">Jack Hudson</p>
              <p className="text-sm text-gray-400 font-medium font-dm">jack.hudson@email.com</p>
            </div>
            <div className="space-y-1">
              {profileOptions.map((option) => (
                <button
                  key={option.label}
                  onClick={() => {
                    option.onClick();
                    setShowProfileMenu(false);
                  }}
                  className={clsx(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium font-dm duration-300",
                    option.variant === 'danger'
                      ? "text-red-500 hover:bg-red-50"
                      : "text-gray-700 hover:bg-gray-50 hover:text-primary"
                  )}
                >
                  <option.icon className="size-5" />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
